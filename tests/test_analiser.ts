import {Analiser} from "../src/clients/analiser.js";

const analiser = new Analiser(process.env.OPENAI_KEY!)

const document = `
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
`

async function call() {
    const response = await analiser.getSuggestionPoints(document)
    console.log(response)
}

call()