import { ChatPromptTemplate, MessagesPlaceholder, SystemMessagePromptTemplate } from "@langchain/core/prompts"
import { ChatMessageHistory } from "langchain/memory";
import { ChatOpenAI } from "@langchain/openai";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { ClientSettings } from "./base.client";

export class FeedBackPersonaBot {
    private conversation : any;
    private messageHistory : ChatMessageHistory;
    private config : any;
    constructor(settings: ClientSettings, persona : string) {

        var prompt = ChatPromptTemplate.fromMessages(
            [
                SystemMessagePromptTemplate.fromTemplate(`
                    You will receive a description of a persona that you should act as and a document in markdown format.
                    The user will then ask you questions about the document and you should answer as the persona.
                    Please respond only to questions directly related to that persona. 
                    If the user ask about anything not related to that persona, such as programming or cooking, do not provide an answer. 
                    If you receive a question outside of your expertise, you can either state that it's not within your field of expertise or simply skip the question."
                    You will be penalized if you make any references to you persona.
                    You will be penalized if you break character. 
                    Do not be overly optimistic. Be harsh if necessary.
                    If the user asks you something that your persona would not know you should not answer.
                    === Persona ===
                    ${persona}
                    === Document ===
                    {document}
                `),
                new MessagesPlaceholder("history"),
                ["human", "{message}"],
            ]
        )
        var model = new ChatOpenAI({openAIApiKey: settings.openAIKey, modelName: settings.gptModel})
        
        const runnable = prompt.pipe(model);
        this.messageHistory = new ChatMessageHistory();

        this.conversation = new RunnableWithMessageHistory({
            runnable,
            getMessageHistory: (_sessionId) => this.messageHistory,
            inputMessagesKey: "message",
            historyMessagesKey: "history",
        });

        this.config =  { configurable: { sessionId: "1" } };

    }
  
    async question(document : string, question : string) {
        var inputs = {
            document: document, 
            message: question
        }
        var response = await this.conversation.invoke(inputs, this.config)
        return response.content
    }
  }