import { Client, ClientSettings } from "./base.client.js";

const system_prompt = `
    You will act like a grammar and writing style fixer.
    The user will send you a text and you should find and fix any grammatical errors and improve the writing style.
    Do not translate the text into a different language.
    Return the changed text and nothing else.
`;

export class GrammarFixer {
    client: Client;
    constructor(settings: ClientSettings) {
        this.client = new Client(settings, system_prompt);
    }
  
    async improveGrammar(input : string) {
      return await this.client.answer(input)
    }
  }