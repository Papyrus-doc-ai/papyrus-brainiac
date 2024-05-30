import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { OpenAIEmbeddings } from "@langchain/openai";
import { ObsidianLoader } from "langchain/document_loaders/fs/obsidian";

const DEFAULT_MODEL = "text-embedding-3-large";

export class VectorStore {
    private model : string;
    private vectorStore : FaissStore | undefined;
    constructor(model=DEFAULT_MODEL) {
        this.model = model;
    }

    async update(filePath : string) {
        const loader = new ObsidianLoader(filePath);
        const docs = await loader.load();
        this.vectorStore = await FaissStore.fromDocuments(docs, new OpenAIEmbeddings({modelName: this.model}));
    }

    async search(prompt : string) {
        if (!this.vectorStore) {
            throw new Error("Vector store not initialized");
        }
        return this.vectorStore.similaritySearch(prompt, 4);
    }
}