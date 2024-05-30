import {Client, ClientSettings} from "./base.client.js";

export class FormatImporter {
  private formatImporter : Client;

  constructor(settings: ClientSettings) {
    this.formatImporter = new Client(settings, `
      You are an expert in writing organized documents. 
      You will receive the format template that you will need to fill and a document from where you will collect the information.
      Efficiently adapt the structure of the given document, ensuring seamless integration of the given outline/template.
      You will be penalized for returning anything other than the final document.
      Answer with Markdown format.
    `)
  }

  async import(outline : string, document : string) {
    const prompt = `
      === TEMPLATE ===
      ${outline}    
      === DOCUMENT ===
      ${document}
      === FINAL DOCUMENT ===
    `

    return await this.formatImporter.answer(prompt)
  }
}