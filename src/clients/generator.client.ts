import { Client, ClientSettings } from "./base.client.js";

export class Generator {
  private questionGenerator : Client;
  private documentImprover : Client;
  constructor(settings: ClientSettings) {
    this.questionGenerator = new Client(
      settings,
      `You are an assistant that will help the user to improve a document.
      You will receive a document written in markdown format and a problem with it.
      Your audience is the writer of the document.
      Do not assume anythin about the informartion on the document. Prompt the user for any information you require.
      `
    )
    
    this.documentImprover = new Client(
      settings,
      `You will receive a document written in markdown format and information to improve that document.
      Your audience is the writer of the document.
      You will be penalized if you modify the structure. You will be penalized if you modify content that is not related with the user answer.
      The output shuold be an updated version of the document that incorporates the user answer.
      You will be penalized if you include anything more than the document itself.
      You will be penalized if you include the BEGIN DOCUMENT and END DOCUMENT tags.
      `)
  }

  async getQuestionForSuggestion(document : string, suggestion : string) {
    var prompt = `
      What information do you need to improve the document on the following problem:
      ${suggestion}
      --- BEGIN DOCUMENT ---
      ${document}
      --- END DOCUMENT ---
      `
    return await this.questionGenerator.answer(prompt)
  }

  async updateDocumentWithAnswer(document : string, suggestion : string, answer : string) {

    var prompt = `
      ANSWER: ${answer}
      --- BEGIN DOCUMENT ---
      ${document}
      --- END DOCUMENT ---
      `
    return await this.documentImprover.answer(prompt, suggestion)
  }
}