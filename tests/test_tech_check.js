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
const tech_check_js_1 = require("../src/clients/tech_check.js");
var document = `
#### Safety
A broker should be a member of the SIPC and FINRA, this can probably be found in the website but can, and should, be searched in the associations websites. 
What kind of insurance does the broker have in the case the company goes down? Members of SIPC are held to a minimum standard but brokers should cover a bit more.
What kind of protection is there against fraud? Some brokers might require different things from you to insure this kind of protection, check that before going in.
What are current customers saying? Search the broker in association with terms like "insurance claim", "fraud protection" and "customer service."
Does the broker have 2FA? Is the broker selling your data?
`;
function call() {
    return __awaiter(this, void 0, void 0, function* () {
        const agent = new tech_check_js_1.TechCheck(process.env.OPENAI_KEY);
        const response = agent.factCheck(document);
        console.log(response);
    });
}
