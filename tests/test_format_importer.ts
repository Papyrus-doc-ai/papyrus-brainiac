import { FormatImporter } from "../src/format/format_importer.js";

const importer = new FormatImporter(process.env.OPENAI_KEY!)

const outline = `
  [
    "Motivation",
    "As Is",
    "Proposal",
    "Problems and Worries",
    "Enter Parking Meter Abstraction (Adapter in the diagram)",
    "Possible (and maybe impossible) Improvements",
    "Doubts"
  ]
  `

const document = `
  O cliente quer que seja possível que os veículos com distintivo de 0 emissões não paguem as sessões e passes onstreet.
  Atualmente não é possível criar tarifas com custo 0. Também não é possível criar descontos de 100% para produtos onstreet.
  Temos que avaliar algumas opções para resolver este problema:
    - Alterar a MFL-API e o CC para que seja possível criar tarifas com custo 0
    - Criar o conceito de multiplier para que se possa multiplicar o resultado do motor de tarifas por 0
    - Adicionar a possibilidade de configurar descontos para sessões on street.
  `

async function call() {
  const response = await importer.import(outline, document)
  console.log(response)
}

call()