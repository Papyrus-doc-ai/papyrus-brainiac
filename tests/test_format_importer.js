"use strict";
const __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const format_importer_js_1 = require("../src/format/format_importer.js");
const importer = new format_importer_js_1.FormatImporter(process.env.OPENAI_KEY);
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
  `;
  const document = `
  O cliente quer que seja possível que os veículos com distintivo de 0 emissões não paguem as sessões e passes onstreet.
  Atualmente não é possível criar tarifas com custo 0. Também não é possível criar descontos de 100% para produtos onstreet.
  Temos que avaliar algumas opções para resolver este problema:
    - Alterar a MFL-API e o CC para que seja possível criar tarifas com custo 0
    - Criar o conceito de multiplier para que se possa multiplicar o resultado do motor de tarifas por 0
    - Adicionar a possibilidade de configurar descontos para sessões on street.
  `;
function call() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield importer.import(outline, document);
        console.log(response);
    });
}
call();
