# Agentset MCP

MCP server for Agentset.

[![npm version][npm-badge]][npm]
[![License][license-badge]][license]
[![Build Status][build-badge]][build]
[![Downloads][downloads-badge]][npm]
[![Size][size-badge]][npm]

## Installation

using npm:

```sh
AGENTSET_API_KEY=your-api-key npx @agentset/mcp --ns your-namespace-id
```

using yarn:

```sh
AGENTSET_API_KEY=your-api-key yarn dlx @agentset/mcp --ns your-namespace-id
```

using pnpm:

```sh
AGENTSET_API_KEY=your-api-key pnpm dlx @agentset/mcp --ns your-namespace-id
```

## Adding to Claude

```json
{
  "mcpServers": {
    "agentset": {
      "command": "npx",
      "args": ["-y", "@agentset/mcp@latest"],
      "env": {
        "AGENTSET_API_KEY": "agentset_xxx",
        "AGENTSET_NAMESPACE_ID": "ns_xxx"
      }
    }
  }
}
```

## Tips

Passing namespace id as an environment variable

```sh
AGENTSET_API_KEY=your-api-key AGENTSET_NAMESPACE_ID=your-namespace-id npx @agentset/mcp
```

Passing a custom tool description

```sh
AGENTSET_API_KEY=your-api-key npx @agentset/mcp --ns your-namespace-id -d "Your custom tool description"
```

Passing a tenant id:

```sh
AGENTSET_API_KEY=your-api-key npx @agentset/mcp --ns your-namespace-id -t your-tenant-id
```

## API Reference

Visit the [full documentation](https://docs.agentset.ai) for more details.

<!-- Links -->

[docs]: https://docs.agentset.ai/
[build-badge]: https://github.com/agentset-ai/mcp-server/actions/workflows/release.yml/badge.svg
[build]: https://github.com/agentset-ai/mcp-server/actions/workflows/release.yml
[license-badge]: https://badgen.net/github/license/agentset-ai/mcp-server
[license]: https://github.com/agentset-ai/mcp-server/blob/main/LICENSE
[npm]: https://www.npmjs.com/package/@agentset/mcp
[npm-badge]: https://badgen.net/npm/v/@agentset/mcp
[downloads-badge]: https://img.shields.io/npm/dm/@agentset/mcp.svg
[size-badge]: https://badgen.net/packagephobia/publish/@agentset/mcp
