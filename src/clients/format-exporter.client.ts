import {Client, ClientSettings} from "./base.client.js";

export class FormatExporter {
  private formatGenerator : Client;
  constructor(settings: ClientSettings) {
    this.formatGenerator = new Client(
      settings,
      `You will act like a format exporter.
      The user will send you a document and you should extract the outline of the document.
      Include the headers for each section and a small description of the type of content that should be included in each section.
      You will be penalized if you make references to the content of the document.
      The output must have the headers with markdown format.
      The section description should be between a < and a >. `
    )
  }

  async export(document : string) {
    return await this.formatGenerator.answer(document);
  }
}