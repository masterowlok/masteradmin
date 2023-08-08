var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var users= require('../models/users');
const adminsecretKey='fgjhfgj%4456hjhghj'
router.use(function (req, res, next) {
       var token = req.headers['x-access-token'];
       if (token) {
               jwt.verify(token, adminsecretKey,
               async function (err, decoded) {
               if (err) {
                       let errordata = {
                       message: err.message,
                       expiredAt: err.expiredAt
                       };
                       // console.log(errordata);
                       return res.status(500).json({
                       message: 'Unauthorized Access'
                       });
               }
               req.decoded = decoded;
               const getData = await users.findById(decoded.id,{ remember_token: 1,}).exec();
               if(getData && token == getData.remember_token){
                   next(); 
               } else {
                   return res.status(500).json({
                   message: 'Token Mismatch'
                   });  
               }
               
               });
       } else {
               return res.status(500).json({
               message: 'Forbidden Access'
       });
       }
});

module.exports = router;
