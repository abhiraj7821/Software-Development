import {tool} from '@langchain/core/tools'
import {z} from 'zod'
import { ChatOpenAI } from "@langchain/openai";
import {config} from 'dotenv'
import {createPost} from './tweet.js';

config()

const llm = new ChatOpenAI({
    apiKey:process.env.OPENAI_API_KEY,
    modelName:"gpt-4o-mini",
});


// Twiter tool




const twitterTool = tool(createPost, {
    name: "createPost",
    description: "Create a post on Twitter",
    schema: z.object({
        status: z.string().describe("The content of the post to be created on Twitter"),
    }),
});


const multiply = tool(async ({a,b})=>{
    return `${a*b}`
},{
    name:"multiply",
    description:"Multiply two numbers",
    schema:z.object({
        a:z.number().describe("Fitst Number"),
        b:z.number().describe("Secound Number"),
    }),
})

const add = tool( async ({a,b})=>{
    return `${a+b}`
},{
    name:"add",
    description:"Add two numbers",
    schema:z.object({
        a:z.number().describe("First Number"),
        b:z.number().describe("Secound Number"),
    }),
})

const devide = tool( async({a,b})=>{
    return `${a/b}`;
},{
    name:"devide",
    description:"Devide two Numbers",
    schema:z.object({
        a:z.number().describe("First Number"),
        b:z.number().describe("Second Number"),
    })
})


const tools=[multiply,add,devide,twitterTool];
const toolsByNamme = Object.fromEntries(tools.map((tool)=>[tool.name,tool]));
const llmWithTools = llm.bindTools(tools);

import { MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import {
  SystemMessage,
  ToolMessage
} from "@langchain/core/messages";

// Nodes
async function llmCall(state) {
  // LLM decides whether to call a tool or not
  const result = await llmWithTools.invoke([
    {
      role: "system",
      content: "You are a helpful assistant tasked with performing arithmetic on a set of inputs."
    },
    ...state.messages
  ]);

  return {
    messages: [result]
  };
}
// Node
const toolNode = new ToolNode(tools);

// Conditional edge function to route to the tool node or end
function shouldContinue(state) {
  const messages = state.messages;
  const lastMessage = messages.at(-1);

  // If the LLM makes a tool call, then perform an action
  if (lastMessage?.tool_calls?.length) {
    return "Action";
  }
  // Otherwise, we stop (reply to the user)
  return "__end__";
}

// Build workflow
const agentBuilder = new StateGraph(MessagesAnnotation)
  .addNode("llmCall", llmCall)
  .addNode("tools", toolNode)
  // Add edges to connect nodes
  .addEdge("__start__", "llmCall")
  .addConditionalEdges(
    "llmCall",
    shouldContinue,
    {
      // Name returned by shouldContinue : Name of next node to visit
      "Action": "tools",
      "__end__": "__end__",
    }
  )
  .addEdge("tools", "llmCall")
  .compile();

// Invoke
const messages = [{
  role: "user",
  content: "create a post on Twitter with the text on 'How ai can create posts for you using ai agents.'"
}];
const result = await agentBuilder.invoke({ messages });
console.log(result.messages);




