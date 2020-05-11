const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.post('/',function(req,res){
    let username = req.body.username;
    let password = req.body.password;
    console.log(req.body);
    let str = 'username:'+username+',password:'+password;
    fs.writeFile(path.join(__dirname,"../data.txt"),str,function(err,data){
        if(err) return res.send(JSON.stringify({error: true,message: '修改失败'}))
        res.send(JSON.stringify({error: false,message: '修改成功'}))
    })
})

module.exports = router;