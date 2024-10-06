import {GrammarFixer} from "../src/clients/grammar_fixer.js";

const document = `
# Padrões 

## Quem?

#### Pessoas
Uma daily pode ser focada nas pessoas e no que elas andam a fazer. Nesse caso, toda a gente envolvida no dia a dia da equipa deveria estar presente. Isto inclui os developers, os PM, QAs e supporte (em outros tipos de empresa/projeto, também faz sentido estar malta de todas as outras áreas potencialmente envolvidas: Marketing, Produto, Customer Care, etc.).

#### Tarefas
"if the stories are so important to the project, **they** ought to be the ones speaking in the standup"
Quando toda a gente parece sempre ocupada mas o trabalho não avança, pode ser bom mudar o foco das reuniões para as tarefas em vez das pessoas. Pode levar a que os bloqueios se notem mais e que mais pessoas se ofereçam para ajudar a desbloquear.`


async function call() {
    const agent = new GrammarFixer(process.env.OPENAI_KEY!)

    const response = agent.improveGrammar(document)

    console.log(response)
}