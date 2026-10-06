<div align="center">

# Claude Code CLI Agent

**A terminal-native AI coding assistant powered by the Anthropic Claude Agent SDK**

[![Node.js](https://img.shields.io/badge/Node.js-≥18-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Claude SDK](https://img.shields.io/badge/Claude_Agent_SDK-0.3.x-D97706?logo=anthropic&logoColor=white)](https://www.npmjs.com/package/@anthropic-ai/claude-agent-sdk)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

Read, edit, execute, and plan — directly from your terminal.

[Getting Started](#-getting-started) · [Usage](#-usage) · [Modes](#-execution-modes) · [Architecture](#-architecture) · [Contributing](#-contributing)

</div>

---

## Overview

**Claude Code CLI Agent** (`cursor-cli`) is an interactive terminal-based coding assistant built with TypeScript and the official [Anthropic Claude Agent SDK](https://www.npmjs.com/package/@anthropic-ai/claude-agent-sdk). It brings autonomous agent capabilities — file reading, code editing, shell execution, web search, and architectural planning — into a streaming conversational interface you control from the command line.

Think of it as your pair-programming partner that lives in the terminal: ask it to explain code, refactor modules, draft architecture plans, or execute commands — all through natural language.

---

## ✨ Features

### Core Capabilities

- **Interactive Multi-Turn Chat** — Continuous conversational sessions with real-time streaming output and visual feedback
- **One-Shot Prompts** — Execute single queries directly from the command line without entering a persistent session
- **Guided Startup Flow** — ASCII banner, preflight environment checks, and interactive mode selection in one command

### Execution Modes

Three distinct modes with granular permission control:

| Mode | Description | What It Can Do |
|:-----|:------------|:---------------|
| `agent` | Full coding assistant | Read, edit, write files & run shell commands |
| `ask` | Safe exploration | Read files, search the web — **no modifications** |
| `plan` | Architecture & planning | Gather context, propose solutions — **no edits applied** |

### In-Session Controls

Switch behaviors on the fly with slash commands during any chat session:

```
/mode agent|ask|plan   Switch permission mode mid-session
/context               Inspect context window & token usage
/help                  Show available commands
/exit                  End the chat session
```

### Developer Experience

- **Preflight Doctor** — Built-in environment verification (Node.js version, API key)
- **Rich Terminal UI** — ASCII banners, boxed panels, colored output, and loading spinners
- **Verbose Mode** — Optional detailed agent loop logging for debugging

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version |
|:------------|:--------|
| [Node.js](https://nodejs.org/) | `≥ 18.0.0` |
| Package Manager | [pnpm](https://pnpm.io/) (recommended) / npm / yarn |
| [Anthropic API Key](https://console.anthropic.com/) | Active key with Claude model access |

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Mahesh0426/cli-code-agent.git
cd cli-code-agent
```

**2. Install dependencies**

```bash
pnpm install
```

**3. Configure your API key**

```bash
cp .env.example .env
```

Add your key to the `.env` file:

```env
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxx
```

**4. Verify your environment**

```bash
pnpm dev doctor
```

Expected output:

```
✅ Node.js is >= 18
✅ Anthropic API key is set
```

---

## 📖 Usage

### Guided Startup (Recommended)

The `wakeup` command provides a guided experience — banner display, preflight checks, mode selection, and chat entry:

```bash
pnpm dev wakeup
```

### Interactive Chat

Start a persistent multi-turn chat session:

```bash
# Default mode (agent) — full read/write/execute access
pnpm dev chat

# Read-only exploration
pnpm dev chat --mode ask

# Architecture planning with verbose logging
pnpm dev chat --mode plan --verbose
```

### One-Shot Prompt

Send a single query without entering a chat session:

```bash
pnpm dev talk "Explain the project structure in src/agent"

# With verbose output
pnpm dev talk "Summarize what this repository does" --verbose
```

### Other Commands

```bash
pnpm dev banner    # Display the ASCII art welcome banner
pnpm dev doctor    # Run environment health checks
pnpm dev hello     # Print a greeting (test command)
```

---

## ⚙️ Execution Modes

Each mode maps to a specific permission profile and tool set from the Claude Agent SDK:

### `agent` — Full Coding Assistant

> **Permission:** `acceptEdits` · **Tools:** `Read`, `Edit`, `Write`, `Bash`, `Glob`, `Grep`

The default and most powerful mode. The agent can read your codebase, write and edit files, and execute shell commands. Ideal for refactoring, bug fixes, and code generation tasks.

### `ask` — Safe Exploration

> **Permission:** `dontAsk` · **Tools:** `Read`, `Glob`, `Grep`, `WebSearch`, `WebFetch`

A read-only mode that guarantees **no files will be modified**. The agent can explore your codebase, search the web, and answer questions. Use this when you want answers without any risk of changes.

### `plan` — Architecture & Planning

> **Permission:** `plan` · **Tools:** `Read`, `Glob`, `Grep`, `WebSearch`, `WebFetch`

Similar to `ask` in terms of safety (no edits applied), but optimized for drafting architectural proposals, migration strategies, and implementation plans before committing to changes.

> **💡 Tip:** You can switch modes at any time during a chat session using the `/mode` slash command.

---

## 🏗️ Architecture

```
claude-code-cli-agent/
├── src/
│   ├── index.ts                 # Application entrypoint
│   ├── cli.ts                   # Commander CLI setup & command routing
│   │
│   ├── agent/                   # Core agent logic
│   │   ├── create-session.ts    # Agent session initialization
│   │   ├── input-queue.ts       # Async queue for user input handling
│   │   ├── message-handler.ts   # Stream message parsing & rendering
│   │   ├── modes.ts             # Mode definitions, tools & permissions
│   │   ├── permission.ts        # Permission helpers
│   │   └── run-query.ts         # One-shot query executor
│   │
│   ├── commands/                # CLI command implementations
│   │   ├── chats.ts             # Interactive multi-turn chat
│   │   └── wake-up.ts           # Guided startup flow
│   │
│   ├── config/                  # Configuration & environment
│   │   ├── constants.ts         # Mode definitions & slash commands
│   │   └── env.ts               # Environment validation (doctor)
│   │
│   └── ui/                      # Terminal UI components
│       ├── banner.ts            # Figlet ASCII banner
│       ├── format.ts            # Chalk color formatting utilities
│       └── spinner.ts           # Ora spinner wrapper
│
├── .env.example                 # Environment variable template
├── package.json                 # Scripts, dependencies & metadata
└── tsconfig.json                # TypeScript compiler configuration
```

---

## 🧰 Tech Stack

| Category | Technology | Purpose |
|:---------|:-----------|:--------|
| **Runtime** | [Node.js](https://nodejs.org/) `≥ 18` | JavaScript runtime |
| **Language** | [TypeScript](https://www.typescriptlang.org/) `7.0` | Type-safe development with ES module syntax |
| **AI** | [@anthropic-ai/claude-agent-sdk](https://www.npmjs.com/package/@anthropic-ai/claude-agent-sdk) | Autonomous agent loops, tool usage & permissions |
| **CLI Framework** | [Commander.js](https://github.com/tj/commander.js) | Command parsing & routing |
| **Prompts** | [@inquirer/prompts](https://github.com/SBoudrias/Inquirer.js) | Interactive select menus & input prompts |
| **Styling** | [Chalk](https://github.com/chalk/chalk) + [Boxen](https://github.com/sindresorhus/boxen) | Terminal colors & boxed layouts |
| **Banner** | [Figlet](https://github.com/patorjk/figlet.js) | ASCII text art generation |
| **Spinner** | [Ora](https://github.com/sindresorhus/ora) | Elegant loading indicators |
| **Process** | [Execa](https://github.com/sindresorhus/execa) | Subprocess execution |
| **Dev** | [tsx](https://github.com/privatenumber/tsx) | Fast TypeScript execution & watch mode |
| **Env** | [dotenv](https://github.com/motdotla/dotenv) | `.env` file loading |

---

## 📝 Scripts Reference

| Command | Description |
|:--------|:------------|
| `pnpm dev <command>` | Run the CLI in development mode via `tsx` |
| `pnpm dev:watch` | Development mode with hot-reloading on file changes |
| `pnpm build` | Compile TypeScript to JavaScript (`src/` → `dist/`) |
| `pnpm start` | Run the compiled production build (`dist/index.js`) |

### Building for Production

```bash
# Compile
pnpm build

# Run compiled output
pnpm start
```

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/your-feature`)
3. **Commit** your changes (`git commit -m 'Add your-feature'`)
4. **Push** to the branch (`git push origin feature/your-feature`)
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).

---

<div align="center">

Built with ❤️ using the [Anthropic Claude Agent SDK](https://docs.anthropic.com/)

</div>
