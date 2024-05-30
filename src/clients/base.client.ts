import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

export class Client {
  private chain : any;
  private parser : any;

  constructor(settings: ClientSettings, system_prompt : string, parser : any = new StringOutputParser()) {
    this.parser = parser

    var prompt = ChatPromptTemplate.fromMessages([
      ["system", system_prompt + "\n{format_instructions}"],
      ["assistant", "{assistant}"],
      ["user", "{prompt}"]
    ])
    var model = new ChatOpenAI({
      openAIApiKey: settings.openAIKey,
      modelName: settings.gptModel,
    })

    this.chain = prompt.pipe(model).pipe(parser)
  }

  async answer(user_input : string, assistant_input : string = "") {
    return await this.chain.invoke({
      prompt: user_input, 
      assistant: assistant_input, 
      format_instructions: this.parser.getFormatInstructions()
    })
  }
}

export interface ClientSettings {
  openAIKey : string,
  gptModel : string
}