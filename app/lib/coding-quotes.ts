export type CodingQuote = {
  text: string;
  /** Optional attribution or punchline setup */
  tag?: string;
};

/** Lightweight dev humor — rotates on the home page. */
export const CODING_QUOTES: CodingQuote[] = [
  { text: "There are two hard problems in computer science: cache invalidation, naming things, off-by-one errors." },
  { text: "I don’t always test my code, but when I do, I do it in production." },
  { text: '"It works on my machine" is not a deployment strategy—it is a threat.' },
  { text: "Debugging is like being the detective in a crime movie where you are also the murderer." },
  { text: "I told my linter to relax once. Now it sends me postcards from Barbados." },
  { text: "YAML: yet another markup language—that stands for ‘You Aren’t Laughing Much’." },
  { text: "My code compiled on the first try. I restarted the IDE just to feel something." },
  { text: "git push —force-with-lease is how you say ‘trust issues’ in hexadecimal." },
  { text: "I don’t fear merge conflicts—I fear resolving them sober." },
  { text: "The pipeline failed at 3 AM. Jenkins and I share the same bedtime: never." },
  { text: "Containers don’t solve every problem—they just standardized how we blame the orchestrator." },
  { text: "I renamed my branch main to therapy—same conflict rate." },
  { text: "Stack Overflow copy-paste is my love language." },
  { text: "I write self-documenting code. The documentation says: figure it out." },
  { text: "If at first you don’t succeed, delete `node_modules` and pray." },
  { text: "I don’t fear missing semicolons; I fear whoever decided semicolons are optional." },
  { text: "My sleep schedule runs on cron: `0 */error * * *`." },
  { text: "I asked the database for enlightenment. It returned NULL." },
  { text: "Agile isn’t chaotic—it’s choreography with spreadsheets." },
  { text: "I put ‘TODO’ in production once. HR put ‘TOSOON’ on my desk." },
  { text: "The cloud is just someone else’s computer—and their billing alerts." },
  { text: "I don’t dislike meetings—I dislike when they subtract from ‘time spent fixing typo in prod’." },
  { text: "Recursion is when you solve a problem by creating a worse problem confidently." },
  { text: "I’m not impatient—the CPU is wrong and I refuse to apologize." },
  { text: "Clean code reads like prose. My code reads like a ransom note. Still ships." },
  { text: "I automate everything except sleep. That Jenkins job is still flaky." },
  { text: "Binary: it’s either 101% done or you're lying." },
  { text: "I whisper ‘it’s not DNS’ three times—it was always DNS." },
];
