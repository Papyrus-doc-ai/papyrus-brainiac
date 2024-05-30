import { FidBackBot } from "../src/clients/fidback_full.js";
import { createInterface } from "readline";

var document = `
#### Safety
A broker should be a member of the SIPC and FINRA, this can probably be found in the website but can, and should, be searched in the associations websites. 
What kind of insurance does the broker have in the case the company goes down? Members of SIPC are held to a minimum standard but brokers should cover a bit more.
What kind of protection is there against fraud? Some brokers might require different things from you to insure this kind of protection, check that before going in.
What are current customers saying? Search the broker in association with terms like "insurance claim", "fraud protection" and "customer service."
Does the broker have 2FA? Is the broker selling your data?
`

var persona = "Expert in finances and investment."

const agent = new FidBackBot(process.env.OPENAI_KEY!, persona)

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});


// Function to wrap rl.question in a promise
const questionAsync = (question : string) : Promise<string> => {
    return new Promise((resolve) => {
      rl.question(question, resolve);
    });
};
  
// Asynchronous function to continuously ask questions
const askQuestionAsync = async () => {
    let input;
    do {
        input = await questionAsync('User: ');
        // You can await a promise here
        var result = await agent.question(document, input)
        console.log(`AI: ` + result);
        // Example: await someAsyncOperation(input);
    } while (input !== 'exit');

    console.log('Exiting the program...');
    rl.close();
};
  
// Start the loop
askQuestionAsync();
    