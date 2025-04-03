import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import type { OptionValues } from "commander";

export const getVersion = () => {
  // Get package version from package.json
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const packageJsonPath = join(__dirname, "..", "package.json");
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8")) as {
    version: string;
  };
  const packageVersion = packageJson.version;

  return packageVersion;
};

// Default tool description
const defaultDescription = `
Look up information in the Knowledge Base. Use this tool when you need to:
  - Find relevant documents or information on specific topics
  - Retrieve company policies, procedures, or guidelines
  - Access product specifications or technical documentation
  - Get contextual information to answer company-specific questions
  - Find historical data or information about projects
`.trim();

export const parseOptions = (options: OptionValues) => {
  if (!process.env.AGENTSET_API_KEY)
    throw new Error("AGENTSET_API_KEY not set");
  const API_KEY = process.env.AGENTSET_API_KEY;

  const NAMESPACE_ID = (options.namespace ||
    process.env.AGENTSET_NAMESPACE_ID) as string | undefined;
  if (!NAMESPACE_ID)
    throw new Error("Either pass --namespace or set AGENTSET_NAMESPACE_ID");

  const tenantId = options.tenant as string | undefined;

  console.error("Using namespace: ", NAMESPACE_ID);
  if (tenantId) {
    console.error("Using tenant: ", tenantId);
  }

  // Use the provided description if available, otherwise use the default
  if (options.description) {
    console.error("Using overridden description");
  }
  const description = (options.description || defaultDescription) as string;

  return {
    API_KEY,
    NAMESPACE_ID,
    tenantId,
    description,
  };
};
