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
const format_exporter_js_1 = require("../src/format/format_exporter.js");
const exporter = new format_exporter_js_1.FormatExporter(process.env.OPENAI_KEY);
var document = `
- To properly implement this, we need information on all sessions created in a city (this means managed and unmanaged)
    
    - We also need information on the plates used in these sessions
        
- This cannot be implemented on cities in which we do not have the configurations on our side

- The objective is to limit the max time a car is allowed to park withing certain parameters
    
- This can be applied in any group of positions
    
    - These positions can be on any layer of the hierarchy (parents, children, children of children, etc)
        
        - For this to work we will need to add validations to the configurations that basically translate to: “There can be no two different buckets configured in any one position hierarchy”
            
- The limit reset should be configurable per period or per day
    
    - A nice to have would be also allowing the configuration of a "buffer period" after each session instead of a fixed time of the day (like the new madrid platform)
        
- A plate/user belonging to a group can change the selected bucket
    
    - Be this from api-groups (Residents/Reduced Mobility and such) or from DGT (emissions profiles)
        
- The slider should be reduced to only show allowed points (within the max time)
    
    - This can be postponed for after the first delivery
        
    - We may at some point need to show some information to the user of when the reset will happens
        
- Other than the slider being reduced, there will be no information passed to the user about a forced rotation scenario being present in a given zone/center/tariff
    
- Passes will not affect the forced rotation
    
- We can’t ask for the max allowed date for a time before the end of an existing session
    
    - This implies that on extends we send the current session end instead of the start or the request time
        
- There can be no max forced rotation time larger than a paid duration of an interval between two resets
    
    - In other words, if there's reset at lunch and at the end of the day, and if the afternoon period is 4h (14h-18h), the forced rotation can never be more than 4h
        
- The buckets will have a corresponding schedule
    
    - This means two blobs will have duplicated schedules (ShortStayDefinitions and “ForcedRotationDefinitions”) but this can be hidden in the MFL-Tool
        
- Two types of scheduled forced rotation can exist
    
    - One in which if the max allowed time can overflow to the next period
        
    - One in which the reset time is a hard limit
        

# Doubts

- If a session goes through a free period, does the real duration count or only the paid?
    
    - What if there is no session? Does it work like madrid that keeps counting even after the session ends?
        
    - ANSWER: Only the paid duration counts!
        
- Does the timer always reset at the configured time or does having an active session during it have any effect?
    
    - ANSWER: It always resets!
        
- Is there a need to inform the parking_meters about the max time still allowed?
    
    - What if a parking_meter that does not know the max time. Should we refuse an unmanaged session that goes over it or not? If we accept it, should we start a session with the full time or only the allowed time?
        
    - NOT-ANSWER: John Doe is going to investigate
`;
function call() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield exporter.export(document);
        console.log(response);
    });
}
call();
