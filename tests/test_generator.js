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
const readline_1 = require("readline");
const generator_js_1 = require("../src/clients/generator.js");
const generator = new generator_js_1.Generator(process.env.OPENAI_KEY);
const suggestion = "Define acronyms like EMEL and EOS Server when they are first mentioned to improve clarity for readers.";
const document = `
# Motivation

With the new on-street features that have been done and the future ones that are planned, the need has started to arise to give these features to the parking meters and the unmanaged flow. This implied that the parking meters that want these features will have to simulate/calculate stays with an API instead of what happens now which is that they have the fares on their side.

Ideally this would be done in the Fare Service/Parking Platform future but since there is some urgency from EMEL for this to happen we might not be able to wait for that.

# As Is

The parking meters that currently exist have the sequences on their side and use the unmanaged API of the EOS Server, either directly or through an adapter that applied format transformations. No validations are performed on the stay values which means, as long as the position used exists, any stay can be created with any duration and any cost.

# Proposal

The new parking meters will need to do a simulation/calculation of a stay before they start/register it. Before ParkingV2 this will need to be done through the _fares_ endpoint because it is the closest we have to an entry point for the fare calculation. The registering of sessions/stays will need to still be done through the unmanaged API. EOS Server will perform the communication to the Fare Service which currently is only responsible for the new features (Forced Rotation and Free Periods).

In the ParkingV2 scenario, the whole of the fare calculation will be in the Fare Service. This means the simulation/calculation will be done directly on it and not go through EOS Server. Similarly, in this scenario, the registering of sessions is done on the Parking Platform, ideally also not going through the EOS Server.

## Problems and Worries

- Currently no validations are made in the unmanaged flow. Since we will be providing both the calculation and the registering of sessions, something could be done to avoid this.
    
- The rollout of parking meters is not something easily done and if we are introducing this flow on the what exists today, when we rollout ParkingV2 then a second parking meter rollout would be required.
    
- If our service is down, the parking meters would not be able to check the calculation and would probably be forced to use an emergency fare.
    
- Mobility/Enforcement also have a forced rotation concept that is based in a different data source. This could cause problems if the configurations are different between the two services. This can also be a problem if for instance the parking meters use the emergency fare and register sessions without checking if it is allowed in the forced rotation limitations.
    

## Enter Parking Meter Abstraction (Adapter in the diagram)

To resolve the rollout problem, we could add an adapter before the existing endpoints. This would provide an abstraction to the services and flows of the Parking world. This way, the parking meters would only have to change once.

This service could also use a promise-like concept to give us some assurance of the way the sessions registered are calculated. We could say the register endpoint of this adapter only works with a promise and not the usual start, end, cost values. The promise would be created and returned on the calculation endpoint and then it would be sent on the register endpoint. This ensures that no session can be registered that did not go through our calculation. This might present a problem in the case of the emergency fare so we might still have to allow some sessions to be registered “normally” but it would be best if we could avoid this case.

The API of this adapter should be fare based, as opposed to position based like the current simulation API. A simple mapping can be done between fare and position to accommodate the current API. This layer will also enable us in the future to separate different variants of the same fare (ex: between the blue fare for ECO cars and blue fare of B class cars) without the parking meter to have to do any extra requests to different services (in this example, to an emissions profile service).

## Possible (and maybe impossible) Improvements

- The Parking Meter Abstraction could have some permission management to avoid different parking meter companies to access the contexts of each other. This might even be done on a more detailed level like each parking meter only accessing the contexts it is in. (not sure if this is useful but having the option is always nice).
    
- In theory the session registering could be done asynchronously. This would make the service a lot more fault tolerant (if the platform was down we could still, eventually receive stays). Not sure if the level of confidence in eventual consistency is at the point where this is acceptable to EMEL, but according to Mobility the parking meters issue physical tickets and the enforcement controller also uses those before issuing offenses.
    

# Doubts

|**Doubts**|**Finder of Answer**|**Answer**|
|---|---|---|
|Can we simply say that if our service is down then the parking meters stop working?|||
|How do the parking meters currently work if the unmanaged api is down?|||
`;
function call() {
    return __awaiter(this, void 0, void 0, function* () {
        const question = yield generator.getQuestionForSuggestion(document, suggestion);
        const rl = (0, readline_1.createInterface)({
            input: process.stdin,
            output: process.stdout,
        });
        new Promise(resolve => rl.question("Q: " + question + "\nA: ", ans => {
            rl.close();
            resolve(ans);
        })).then((answer) => __awaiter(this, void 0, void 0, function* () {
            console.log("Generating document...");
            const updated = yield generator.updateDocumentWithAnswer(document, question, answer);
            console.log(updated);
        }));
    });
}
call();
