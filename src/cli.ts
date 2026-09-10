import { Command } from "commander";

export function createCli() {
  const program = new Command()
    .name("cursor-cli")
    .description("CLI for cursor-ai")
    .version("1.0.0");

  program
    .command("hello")
    .description("Print a grating. ")
    .action(() => {
      console.log("hello world");
    });

  program.action(() => {
    console.log("Welcome to the cursor-ai CLI");
    program.help();
  });

  return program;
}
