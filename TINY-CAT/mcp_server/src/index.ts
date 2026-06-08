import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { getAllCatTool, recommendCatTool } from "./tools/recommendCat.tool.ts";

// Create server instance
const server = new McpServer({
  name: "TINY-CATS",
  version: "1.0.0",
});


server.registerTool("recommend-cats", {
  title : "Recommend Cats",
  description : "Recommend a Best cat breed according to input",
  inputSchema : {
    kidsFriendly : z.boolean(),
    apartmentFriendly : z.boolean(),
  },
},
 async ( {kidsFriendly, apartmentFriendly}) => {
    const result = await recommendCatTool(kidsFriendly, apartmentFriendly);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result),
        }
      ]
    }
  }
);


server.registerTool(
  "get-all-cats", 
  {
  title : " All Cats",
  description : "cats Data",
},
 async () => {
    const result = await getAllCatTool();

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result),
        }
      ]
    }
  }
);

const transport = new StdioServerTransport();

server.connect(transport);

console.error("Tiny-Cats MCP running...");