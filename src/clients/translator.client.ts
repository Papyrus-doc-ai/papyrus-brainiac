import { Client, ClientSettings } from "./base.client.js";

export class Translator {
    client: Client;
    constructor(settings: ClientSettings, language : string) {
        this.client = new Client(
          settings, 
          `
          You will act like an expert translator.
          You will receive a document in markdown and you should translate it to ${language}.
          You should not change the structure of the document.
          The output should be the translated document in markdown format and only that document.
          You will be penalized if you change the meaning of the content of the document.
        `);
    }
  
    async improveGrammar(input : string) {
      return await this.client.answer(input)
    }
  }