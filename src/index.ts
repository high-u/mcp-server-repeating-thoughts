import { FastMCP } from "fastmcp";
import { z } from "zod";

// Command line argument parsing
const cliArgs = process.argv.slice(2);
if (cliArgs.length === 0) {
  console.error("error...");
  process.exit(1);
}
console.log({cliArgs});

const server = new FastMCP({
  name: "My Server",
  version: "1.0.0",
});

server.addTool({
  name: "repeating_thoughts",
  description: "Use the tool to think about something. It will not obtain new information or change the database, but just append the thought to the log. Use it when complex reasoning or some cache memory is needed.",
  parameters: z.object({
    thought: z.string().describe("A thought to think about."),
  }),
  execute: async (args) => {
    const enhance = cliArgs[Math.floor(Math.random() * cliArgs.length)];
    return enhance;
  },
});

server.start({
  transportType: "stdio",
});
