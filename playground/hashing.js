const {SHA256} = require('crypto-js');
const jwt = require ('jsonwebtoken');
const bcrypt = require('bcryptjs');

let data = {
     id:10,
     text:'A ver que pasa'
};
let token = jwt.sign(data, '123abc');
console.log(token);

let decoded = jwt.verify(token, '123abc');
console.log(decoded);

// let password = '123gre';

// bcrypt.genSalt(10,(err,salt) => {
//     bcrypt.hash(password,salt, (err,hash) =>{
//         console.log(hash);
//     });
// });

// let hashedPass = '$2a$10$Vs8GAvbN/sQOOu7MxWi74uq1YPDBhY3yFOqGRIp0Nfq7VNJ9XL.wy';

// bcrypt.compare('123gre', hashedPass, (err,res) => {
//     console.log(res);
// })