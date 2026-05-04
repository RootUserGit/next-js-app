/**
 * Example snippets for docs only — replace bucket names, ARNs, and credential IDs.
 */

export const jenkinsfileS3StaticSync = `pipeline {
  agent any

  environment {
    AWS_REGION = 'us-east-1'
    S3_BUCKET  = 'my-company-static-site-bucket'
  }

  options {
    timestamps()
    ansiColor('xterm')
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Lint') {
      steps {
        sh 'npm run lint'
      }
    }

    stage('Build static export') {
      steps {
        sh 'npm run build'
        archiveArtifacts artifacts: 'out/**/*', fingerprint: true, onlyIfSuccessful: true
      }
    }

    stage('Sync to S3') {
      steps {
        withAWS(credentials: 'jenkins-aws-static-site', region: env.AWS_REGION) {
          sh '''
            aws s3 sync out/ "s3://$S3_BUCKET/" --delete \\
              --exclude ".DS_Store"
          '''
        }
      }
    }

    stage('Invalidate CloudFront (optional)') {
      when {
        expression { return env.CF_DISTRIBUTION_ID?.trim() }
      }
      steps {
        withAWS(credentials: 'jenkins-aws-static-site', region: env.AWS_REGION) {
          sh '''
            aws cloudfront create-invalidation \\
              --distribution-id "$CF_DISTRIBUTION_ID" \\
              --paths "/*"
          '''
        }
      }
    }
  }

  post {
    success { echo 'Static site published.' }
    failure { echo 'Fix the build before retrying deploy.' }
  }
}`;

export const dockerfileMultistageStatic = `# syntax=docker/dockerfile:1
# --- deps: reproducible install layer ---------------------------------
FROM node:20-bookworm-slim AS deps
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates \\
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json* ./
RUN npm ci

# --- build: compile Next static export --------------------------------
FROM node:20-bookworm-slim AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build
# Expect next.config: output: "export" → ./out

# --- export: small runtime with static files + AWS CLI for optional sync
FROM alpine:3.20 AS export
WORKDIR /site
RUN apk add --no-cache aws-cli bash

COPY --from=build /app/out .

CMD ["sh", "-c", "echo 'Files in /site' && du -sh /site"]`;

export const dockerignoreExample = `# VCS & editor
.git
.gitignore
.cursor
.vscode

# Next.js build cache (rebuilt in image)
.next

# Local export (rebuilt in image)
out

# deps (installed in Dockerfile)
node_modules
coverage
*.log

# OS
.DS_Store
Thumbs.db`;

export const jenkinsfileDockerBuildThenS3 = `pipeline {
  agent any

  environment {
    AWS_REGION = 'us-east-1'
    S3_BUCKET  = 'my-company-static-site-bucket'
    IMAGE_NAME = 'static-site-builder'
    IMAGE_TAG  = "\${BUILD_NUMBER}"
  }

  options { timestamps() }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Build container (multi-stage)') {
      steps {
        sh '''
          docker build \\
            --target export \\
            -t "$IMAGE_NAME:$IMAGE_TAG" \\
            -t "$IMAGE_NAME:latest" \\
            .
        '''
      }
    }

    stage('Extract static files from image') {
      steps {
        sh '''
          CID=$(docker create "$IMAGE_NAME:$IMAGE_TAG")
          rm -rf publish && mkdir -p publish
          docker cp "$CID:/site/." publish/
          docker rm -v "$CID"
        '''
      }
    }

    stage('Upload to S3') {
      steps {
        withAWS(credentials: 'jenkins-aws-static-site', region: env.AWS_REGION) {
          sh '''
            aws s3 sync publish/ "s3://$S3_BUCKET/" --delete
          '''
        }
      }
    }

    stage('Smoke website URL') {
      steps {
        sh '''
          curl -fsSI "http://$S3_BUCKET.s3-website-$AWS_REGION.amazonaws.com/" || true
        '''
      }
    }
  }

  post {
    always {
      sh 'docker rmi "$IMAGE_NAME:$IMAGE_TAG" 2>/dev/null || true'
    }
  }
}`;
