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
const fidback_full_js_1 = require("../src/clients/fidback_full.js");
const readline_1 = require("readline");
var document = `
#### Safety
A broker should be a member of the SIPC and FINRA, this can probably be found in the website but can, and should, be searched in the associations websites. 
What kind of insurance does the broker have in the case the company goes down? Members of SIPC are held to a minimum standard but brokers should cover a bit more.
What kind of protection is there against fraud? Some brokers might require different things from you to insure this kind of protection, check that before going in.
What are current customers saying? Search the broker in association with terms like "insurance claim", "fraud protection" and "customer service."
Does the broker have 2FA? Is the broker selling your data?
`;
var persona = "Expert in finances and investment.";
const agent = new fidback_full_js_1.FidBackBot(process.env.OPENAI_KEY, persona);
const rl = (0, readline_1.createInterface)({
    input: process.stdin,
    output: process.stdout,
});
// Function to wrap rl.question in a promise
const questionAsync = (question) => {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
};
// Asynchronous function to continuously ask questions
const askQuestionAsync = () => __awaiter(void 0, void 0, void 0, function* () {
    let input;
    do {
        input = yield questionAsync('User: ');
        // You can await a promise here
        var result = yield agent.question(document, input);
        console.log(`AI: ` + result);
        // Example: await someAsyncOperation(input);
    } while (input !== 'exit');
    console.log('Exiting the program...');
    rl.close();
});
// Start the loop
askQuestionAsync();
