# 🤖 Claude Code CLI Agent (`cursor-cli`)

A powerful, interactive terminal-based AI coding assistant built with TypeScript and the **Anthropic Claude Agent SDK** (`@anthropic-ai/claude-agent-sdk`). Inspired by tools like Claude Code and Cursor CLI, this agent can inspect codebases, execute shell commands, plan refactors, and stream interactive conversations directly from your terminal.

---

## 🌟 Key Features

- **💬 Interactive Multi-turn Chat**: Continuous conversational loop with real-time streaming agent output and spinner feedback.
- **🚀 Guided Wakeup Flow (`wakeup`)**: Displays an ASCII banner, runs preflight environment checks, and lets you pick your execution mode interactively.
- **⚡ One-Shot Prompts (`talk`)**: Execute single-turn queries and commands without entering a persistent chat session.
- **🛡️ 3 Execution Modes & Permission Safety**:
  - `agent`: Full agent loop capable of reading files, writing/editing code, and executing terminal commands.
  - `ask`: Read-only exploration mode (`Read`, `Glob`, `Grep`, `WebSearch`, `WebFetch`) that guarantees your files won't be modified.
  - `plan`: Exploration and architectural planning mode for drafting solutions before making changes.
- **⌨️ Mid-Session Slash Commands**:
  - Switch permission modes on the fly (`/mode agent|ask|plan`).
  - Inspect context window and token usage (`/context`).
  - View help (`/help`) and gracefully exit (`/exit`).
- **🩺 Preflight Doctor**: Built-in environment verification for Node.js runtime and API key configuration.
- **🎨 Rich Terminal UI**: Styled ASCII banners, boxed highlights, formatted status outputs, and spinners powered by Chalk, Boxen, Figlet, and Ora.

---

## 🛠️ Technologies Used

| Technology                                                                                         | Purpose                                                                        |
| :------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------- |
| **[Node.js](https://nodejs.org/) (v18+)**                                                          | JavaScript runtime environment                                                 |
| **[TypeScript](https://www.typescriptlang.org/)**                                                  | Strongly typed programming language with modern ES module syntax               |
| **[@anthropic-ai/claude-agent-sdk](https://www.npmjs.com/package/@anthropic-ai/claude-agent-sdk)** | Official Anthropic SDK for autonomous agent loops, tool usage, and permissions |
| **[Commander.js](https://github.com/tj/commander.js)**                                             | Command-line argument parsing and command routing                              |
| **[@inquirer/prompts](https://github.com/SBoudrias/Inquirer.js)**                                  | Interactive CLI prompts (select menus, inputs)                                 |
| **[Chalk](https://github.com/chalk/chalk)** & **[Boxen](https://github.com/sindresorhus/boxen)**   | Terminal styling, colors, and boxed layout containers                          |
| **[Figlet](https://github.com/patorjk/figlet.js)**                                                 | ASCII text banners                                                             |
| **[Ora](https://github.com/sindresorhus/ora)**                                                     | Elegant terminal loading spinners                                              |
| **[Execa](https://github.com/sindresorhus/execa)**                                                 | Subprocess execution for environment checks                                    |
| **[tsx](https://github.com/privatenumber/tsx)**                                                    | Fast TypeScript execution and watch mode for development                       |
| **[dotenv](https://github.com/motdotla/dotenv)**                                                   | Environment variable management                                                |

---

## 📋 Prerequisites

Before running the project, make sure you have:

1. **Node.js** `v18.0.0` or higher:
   ```bash
   node -v
   ```
2. **Package Manager**: [pnpm](https://pnpm.io/) is recommended (`pnpm@10`), but standard `npm` or `yarn` also work.
3. **Anthropic API Key**: An active API key with access to Claude models from [Anthropic Console](https://console.anthropic.com/).

---

## 📥 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Mahesh0426/cli-code-agent.git
cd cli-code-agent
```

_(Note: If you have cloned to a different folder name like `claude-code-cli-agent`, navigate into that folder)._

### 2. Install Dependencies

Using `pnpm` (recommended):

```bash
pnpm install
```

Or using `npm`:

```bash
npm install
```

### 3. Configure Environment Variables

Copy the sample environment file to `.env`:

```bash
cp .env.example .env
```

Open `.env` and insert your Anthropic API Key:

```env
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxx
```

### 4. Verify Your Environment

Run the doctor command to ensure your setup is ready:

```bash
pnpm dev doctor
```

Output:

```text
✅ Node.js is >= 18
✅ Anthropic API key is set
```

---

## 🚀 Usage

### 1. Guided Wakeup (Recommended)

Launches the banner, executes preflight checks, allows you to select a mode, and begins your chat:

```bash
pnpm dev wakeup
```

### 2. Start an Interactive Chat

Start chatting directly in a specific mode:

```bash
# Start in default 'agent' mode
pnpm dev chat

# Start in read-only 'ask' mode
pnpm dev chat --mode ask

# Start in 'plan' mode with verbose output
pnpm dev chat --mode plan --verbose
```

#### In-Chat Slash Commands

While chatting, you can use the following commands:

- `/mode agent|ask|plan` — Dynamically change mode during the session
- `/context` — Print context window and token usage statistics
- `/help` — Display list of available commands
- `/exit` — Quit the active session

### 3. One-Shot Prompt (`talk`)

Send a single query or task to the agent directly from the command line:

```bash
pnpm dev talk "Explain the project structure in src/agent"
```

With verbose logging:

```bash
pnpm dev talk "Summarize what this repository does" --verbose
```

### 4. Display Banner

Show the CLI ASCII art banner:

```bash
pnpm dev banner
```

---

## 🧭 CLI Modes Explained

| Mode        | Allowed Tools                                   | Permissions   | Description                                                                  |
| :---------- | :---------------------------------------------- | :------------ | :--------------------------------------------------------------------------- |
| **`agent`** | `Read`, `Edit`, `Write`, `Bash`, `Glob`, `Grep` | `acceptEdits` | Full coding assistant mode. Can read, edit files, and run commands.          |
| **`ask`**   | `Read`, `Glob`, `Grep`, `WebSearch`, `WebFetch` | `dontAsk`     | Safe exploration mode. Blocked from writing, editing, or executing commands. |
| **`plan`**  | `Read`, `Glob`, `Grep`, `WebSearch`, `WebFetch` | `plan`        | Planning mode. Gathers context to construct an architectural proposal.       |

---

## 📁 Project Structure

```text
claude-code-cli-agent/
├── .env.example            # Sample environment configuration template
├── package.json            # Scripts, dependencies, and metadata
├── tsconfig.json           # TypeScript configuration
├── src/
│   ├── index.ts            # Application entrypoint
│   ├── cli.ts              # Commander CLI setup and command definitions
│   ├── agent/              # Agent logic and session management
│   │   ├── create-session.ts   # Initializes agent query session
│   │   ├── input-queue.ts      # Async queue for interactive user inputs
│   │   ├── message-handler.ts  # Parses and renders agent stream messages
│   │   ├── modes.ts            # Mode definitions, tool access, and permissions
│   │   ├── permission.ts       # Permission helpers
│   │   └── run-query.ts        # One-shot query executor
│   ├── commands/           # CLI Command implementations
│   │   ├── chats.ts            # Interactive multi-turn chat command
│   │   └── wake-up.ts          # Preflight checks, mode picker, and startup
│   ├── config/             # Configuration & constants
│   │   ├── constants.ts        # CLI modes, descriptions, and slash commands
│   │   └── env.ts              # Environment validation and doctor checks
│   └── ui/                 # Terminal formatting & visual feedback
│       ├── banner.ts           # Figlet ASCII banner and boxen panels
│       ├── format.ts           # Color formatting utilities
│       └── spinner.ts          # Ora spinner wrapper
└── dist/                   # Compiled JavaScript output (after build)
```

---

## 🏗️ Build & Production

To compile TypeScript into production-ready JavaScript:

```bash
pnpm build
```

To run the compiled binary:

```bash
pnpm start
```

---

## 📜 Scripts Reference

- `pnpm dev`: Run the CLI in development mode using `tsx`.
- `pnpm dev:watch`: Run the CLI with automatic hot-reloading on file change.
- `pnpm build`: Compile TypeScript files (`src/`) into `dist/`.
- `pnpm start`: Run the compiled JavaScript entrypoint (`dist/index.js`).

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).
