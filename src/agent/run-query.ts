import { query } from "@anthropic-ai/claude-agent-sdk";
import chalk from "chalk";
import { handleMessage, MessageHandlerOptions } from "./message-handler.js";
import { buildModeOptions, type CliMode } from "./modes.js";
import { startSpinner, stopSpinner } from "../ui/spinner.js";

export type RunQueryOptions = {
  mode?: CliMode;
  verbose?: boolean;
};

export const runQuery = async (
  prompt: string,
  options: RunQueryOptions = {},
) => {
  try {
    const { verbose = false, mode = "agent" } = options;

    startSpinner("Thinking...");
    for await (const message of query({
      prompt,
      options: buildModeOptions(mode),
    })) {
      handleMessage(message, { verbose });
    }
  } catch (error) {
    console.error(chalk.red(`Error running query: ${error}`));
  } finally {
    stopSpinner();
  }
};
