"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammar_fixer_js_1 = require("../src/clients/grammar_fixer.js");
var document = `
# Padrões 

## Quem?

#### Pessoas
Uma daily pode ser focada nas pessoas e no que elas andam a fazer. Nesse caso, toda a gente envolvida no dia a dia da equipa deveria estar presente. Isto inclui os developers, os PM, QAs e supporte (em outros tipos de empresa/projeto, também faz sentido estar malta de todas as outras áreas potencialmente envolvidas: Marketing, Produto, Customer Care, etc.).

#### Tarefas
"if the stories are so important to the project, **they** ought to be the ones speaking in the standup"
Quando toda a gente parece sempre ocupada mas o trabalho não avança, pode ser bom mudar o foco das reuniões para as tarefas em vez das pessoas. Pode levar a que os bloqueios se notem mais e que mais pessoas se ofereçam para ajudar a desbloquear.`;
function call() {
    return __awaiter(this, void 0, void 0, function* () {
        const agent = new grammar_fixer_js_1.GrammarFixer(process.env.OPENAI_KEY);
        const response = agent.improveGrammar(document);
        console.log(response);
    });
}
