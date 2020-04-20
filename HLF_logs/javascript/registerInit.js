let network = require('./network.js');
let response = network.registerUser('user1',1);
console.log('response from registerVoter: ');
if (response.error) {
    console.log(response.error);
} 
response = network.registerUser('user2',0);
console.log('response from registerVoter: ');
if (response.error) {
    console.log(response.error);
}
