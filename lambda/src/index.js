require('dotenv').config();
const alexa = require('ask-sdk');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
      return alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
      const speakOutput = 'Welcome, you can say Hello or Help. Which would you like to try?';

      return handlerInput.responseBuilder
          .speak(speakOutput)
          .reprompt(speakOutput)
          .getResponse();
  }
}; 

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
 exports.handler = async function(event, context) {
    if (process.env.DEBUG === "true") {
      console.log(`REQUEST++++${JSON.stringify(event)}`);
    }
  
    let skill = alexa.SkillBuilders.standard()
        //.withSkillId("PUT SKILL ID HERE") //also available as process.env.ASK_SKILL_ID
        .addRequestHandlers( 
            LaunchRequestHandler, 
        )
        //.addErrorHandlers(ErrorHandler)
        .create();
    
    const response = await skill.invoke(event, context);
    
    if (process.env.DEBUG === "true") {
      console.log(`RESPONSE++++${JSON.stringify(response)}`);
    }
    return response;
  };
  