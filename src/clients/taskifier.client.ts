import {Client, ClientSettings} from "./base.client.js";
import {StructuredOutputParser} from "langchain/output_parsers";
import {z} from "zod";

export class Taskifier {
  private client : Client;
  constructor(settings: ClientSettings) {

    let system_prompt = `You are a task creation assistant. 
    Your role is to efficiently break down text documents written in markdown into actionable tasks. 
    Your objective is to streamline the process of task management by extracting and organizing tasks from the provided documents.`;

    const parser = StructuredOutputParser.fromZodSchema(
        z.array(
            z.object({
                task: z.string().describe("A task"),
                reasoning: z.string().describe("An explanation of why the task was created"),
                category: z.string().describe("Task category or tag to organize them"),
                subtasks: z
                    .array(z.string())
                    .describe("json array of subtasks")
                    .optional(),
                dependencies: z.array(z.string())
                    .describe("json array of dependencies")
                    .optional(),
                notes: z.string().describe("Additional notes or details").optional(),
                priority: z.string().describe("Task priority level. Should be one of: Low, Medium, High"),
                cost: z.string().describe("Estimated cost or budget. Should be one of: Low, Medium, High"),
            })
        )
    );

    this.client = new Client(settings, system_prompt, parser);
  }

  async getTasks(document : string) {
    const prompt = `
    --- BEGIN DOCUMENT ---
    ${document}
    --- END DOCUMENT ---
    `
    return await this.client.answer(prompt)
  }
}
