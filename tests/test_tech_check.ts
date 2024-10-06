import { TechCheck } from "../dist/clients/tech_check.js";

const document = `
#### Safety
A broker should be a member of the SIPC and FINRA, this can probably be found in the website but can, and should, be searched in the associations websites. 
What kind of insurance does the broker have in the case the company goes down? Members of SIPC are held to a minimum standard but brokers should cover a bit more.
What kind of protection is there against fraud? Some brokers might require different things from you to insure this kind of protection, check that before going in.
What are current customers saying? Search the broker in association with terms like "insurance claim", "fraud protection" and "customer service."
Does the broker have 2FA? Is the broker selling your data?
`

async function call() {

    const agent = new TechCheck(process.env.OPENAI_KEY!)

    const response = agent.factCheck(document)

    console.log(response)
}

call()