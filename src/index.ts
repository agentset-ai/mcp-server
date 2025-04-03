#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Agentset } from "agentset";
import { Command } from "commander";
import fetch from "node-fetch";
import { z } from "zod";

import { getVersion, parseOptions } from "./utils";

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (!globalThis.fetch) {
  globalThis.fetch = fetch as unknown as typeof global.fetch;
}

// Parse command line arguments
const program = new Command();
program
  .version(getVersion(), "-v, --version", "output the current version")
  .option(
    "-d, --description [description]",
    "override the default tool description",
  )
  .option("-t, --tenant [tenant]", "specify the Agentset tenant id to use")
  .option(
    "--ns, --namespace [namespace]",
    "specify the Agentset namespace id to use",
  )
  .parse(process.argv);
const options = program.opts();

const { API_KEY, NAMESPACE_ID, tenantId, description } = parseOptions(options);

// Create an MCP server
const server = new McpServer({
  name: "Agentset MCP",
  version: "1.0.0",
});

const agentset = new Agentset({ apiKey: API_KEY });
const ns = agentset.namespace(NAMESPACE_ID);

server.tool(
  "knowledge-base-retrieve",
  description,
  {
    query: z
      .string()
      .describe("The query to search for data in the Knowledge Base"),
    topK: z
      .number()
      .describe("The maximum number of results to return. Defaults to 10.")
      .min(1)
      .max(100)
      .optional()
      .default(10),
    rerank: z
      .boolean()
      .describe(
        "Whether to rerank the results based on relevance. Defaults to true.",
      )
      .optional()
      .default(true),
  },
  async ({ query, topK, rerank }) => {
    const result = await ns.search(
      query,
      {
        topK,
        rerank,
      },
      tenantId ? { tenantId } : undefined,
    );

    const content = result.map((item) => ({
      type: "text" as const,
      text: item.text,
    }));

    return { content };
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Agentset MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
