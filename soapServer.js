const soap = require('soap');
const express = require('express');
const xml = require('fs').readFileSync('Service.wsdl', 'utf8');

//express server example
const app = express();
//console.log(xml)
//body parser middleware are supported (optional)

const verifyToken = (token) => {
    if(token === 'cleitin-perneta-fazendo-cabalhota') return true;
    return false;
}

const myService = {
    MyService: {
        SumNumbers: {
            HandleSum: function(args) {
                console.log(args)
                const isValidToken = verifyToken(args.token);
                if (!isValidToken) {
                    throw {
                        Fault: {
                          Code: {
                            Value: 'soap:Sender',
                            Subcode: { value: 'document:BadArguments' }
                          },
                          Reason: { Text: 'Invalid token' },
                          statusCode: 401
                        }
                      };
                }
                const getSumResponse = args.number1 + args.number2;
                return {
                    response: getSumResponse
                }
            },
            authenticate: (args) => {
                const { login, password } = args;

                if (login === 'assef' && password === '1234');

                return { token: 'cleitin-perneta-fazendo-cabalhota'}
            }
        }
    }
}

app.listen(8001, () => {
    //Note: /wsdl route will be handled by soap module
    //and all other routes & middleware will continue to work
    const server = soap.listen(app, '/wsdl', myService, xml, function(){
      console.log('server initialized');
    });
});