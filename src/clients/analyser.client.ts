import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";
import { Client, ClientSettings } from "./base.client.js";

export class Analiser {
  private client : Client;
  constructor(settings: ClientSettings) {
    const parser = StructuredOutputParser.fromZodSchema(
      z.array(
        z.string().describe("A suggestion where the document can be improved")
      )
    );

    this.client = new Client(
      settings,
      `You will receive a document written in markdown format. Understand its structure and then provide some points where it can be improved. 
      Your output should be a list of suggestions.
      `,
      parser)
  }

  async getSuggestionPoints(document : string) {
    const prompt = `
    What can be improved in the folowing document?
    --- BEGIN DOCUMENT ---
    ${document}
    --- END DOCUMENT ---
    `
    return await this.client.answer(prompt)
  }
}
