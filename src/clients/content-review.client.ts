import { z } from "zod";
import { StructuredOutputParser } from "langchain/output_parsers";

import { Client, ClientSettings } from "./base.client";

const system_prompt = `
    You will act like a fact checker.
    The text provided will contain technical information on a given subject. 
    Your job is to verify the information and provide corrections or additional information.
    Do not change the original meaning of the text.
    For each wrong fact you find, provide an explanation of why it is wrong and a corrected version of the text.
`;

export class TechCheck {
    client: Client;
    constructor(settings: ClientSettings) {
      this.client = new Client(settings, system_prompt, TechCheck.createParser());
    }

    static createParser() : StructuredOutputParser<z.infer<z.ZodType<any, any, any>>>{
      return StructuredOutputParser.fromZodSchema(
        z.array(
            z.object({
                claim: z.string().describe("The part of the original text that had the mistake."),
                reasoning: z.string().describe("An explanation of why the original text is wrong."),
                corrected: z.string().describe("The corrected version of the original text.")
            })
        )
      );
    }
  
    async factCheck(input : string) {
      return await this.client.answer(input)
    }
  }