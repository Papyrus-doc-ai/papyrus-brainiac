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
const analiser_js_1 = require("../src/clients/analiser.js");
const analiser = new analiser_js_1.Analiser(process.env.OPENAI_KEY);
var document = `
### Parking Meter v2

This screen is filled using the /geo/positions endpoint. To get these positions we will map zones to positions and if needed map fare_types into parent positons.

For this screen, the positions gathered in the previous one will also be used but we need passes to show up (from the EOS /products endpoint). To get these, we will map fares that have steps in months or years (from the SGORA /fares endpoint) to passes. The pass names should be concatenated between the duration and the zone name. Example names:

- La Roqueta - Monthly Residents
    
- La Roqueta - Yearly Residents
    
- Ciudad Vieja - Monthly Residents
    
- Ciudad Vieja - Yearly Residents
    

To fill the slider, we need to do a request for /calculate-price to get the fare_type_id and fare_id that corresponds with the plate and zone of the parking request. Then we will do a /fares request to get the full slider points. For the quick selection points (of parking meter v1) we need to do N separate requests to /calculate-prices (to avoid this, we might be able to simply not configure any selection points).

For the confirmation screen we just need a /calculate-price and when a session is confirmed, we will use parking-integrations service and flow to register the session in the external system.

For the passes flow, the endpoints are the same except we should not need to do a /fares since there is no slider.

### Parking Meter v1

For Pv1 I think we need parent positions that correspond to the fare_types in the SGORA /fares request. The passes are the same as Pv2.

This next screen should show the children positions which correspond to the SGORA /zones.

The rest of the flow should be the same, using /calculate-prices for most of the screens and the /fares for the slider. The only different thing between Pv1 and Pv2 is the quick selection points. These need to be pre-defined (by Empark?) and then we will do N /calculate-prices for the N selection points.
`;
function call() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield analiser.getSuggestionPoints(document);
        console.log(response);
    });
}
call();
