var randtoken = require('rand-token')

const getRandomToken = () =>{
    var token = randtoken.generate(16);
    return token;
}

module.exports = { 
    getRandomToken: getRandomToken
}