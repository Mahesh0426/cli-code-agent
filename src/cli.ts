import { Command } from "commander";
import { printBanner } from "./ui/banner.js";
import { requireApiKey } from "./config/env.js";
import chalk from "chalk";
import { runQuery } from "./agent/run-query.js";

export function createCli() {
  const program = new Command()
    .name("cursor-cli")
    .description("CLI for cursor-ai")
    .version("1.0.0");

  //Hello command
  program
    .command("hello")
    .description("Print a grating. ")
    .action(() => {
      console.log("hello world");
    });

  //Banner command - it shows welcome banner with cursor name
  program
    .command("banner")
    .description("Show the welcome banner")
    .action(() => {
      printBanner();
    });

  //Doctor command - it checks if the environment is ready
  program
    .command("doctor")
    .description("Check environment is ready")
    .action(async () => {
      const { execa } = await import("execa");
      const { stdout } = await execa("node", ["-v"]);
      if (Number(stdout.slice(1)) < 18) {
        throw new Error("Node.js version 18 or higher is required");
      }
      // 2. Check Anthropic API key is set
      const apiKey = requireApiKey();
      if (!apiKey) {
        throw new Error("ANTHROPIC_API_KEY is not set");
      }
      console.log(chalk.green("✅ Node.js is >= 18"));
      console.log(chalk.green("✅ Anthropic API key is set"));
    });

  program
    .command("talk")
    .description("Send a one-shot prompt to the agent.")
    .argument("<prompt>", "prompt to send to the agent")
    .option("-v, --verbose", "shows verbose output")
    .action(async (prompt: string, opts: { verbose?: boolean }) => {
      requireApiKey();
      await runQuery(prompt, { verbose: opts.verbose });
    });

  program.action(() => {
    console.log("Welcome to the cursor-ai CLI");
    program.help();
  });

  return program;
}
