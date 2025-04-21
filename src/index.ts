import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const cliArgs = process.argv.slice(2);
if (cliArgs.length === 0) {
  console.error("error...");
  process.exit(1);
}
console.log({cliArgs});

const server = new McpServer({
  name: "Repeating Thoughts",
  version: "1.0.0"
});

server.tool(
  "repeating_thoughts",
  "Use the tool to think about something. It will not obtain new information or change the database, but just append the thought to the log. Use it when complex reasoning or some cache memory is needed.",
  {
    thought: z.string().describe("A thought to think about."),
  },
  async ({ thought }) => {
    console.log(thought);
    return {
      content: [{ type: "text", text: cliArgs[Math.floor(Math.random() * cliArgs.length)] }]
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
