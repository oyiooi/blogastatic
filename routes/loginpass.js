var expresss = require('express');
var router = expresss.Router();
var fs = require('fs');
var path = require('path');

function tojson(str){
    let obj={};
    let ary = str.toString().split(',');
    for(let i=0;i<ary.length;i++){
        let ary2 = ary[i].split(':');
        obj[ary2[0]]=ary2[1]
    }

    return obj;
}

router.post('/',function(req,res,next){
    let username = req.body.name;
    let password = req.body.password;
    fs.readFile(path.join(__dirname,"../data.txt"),function(err,data){
        if(err) return res.send(JSON.stringify({error: true,message: '文件读取错误'}));
        let obj = tojson(data);
        console.log(obj);
        if(username!==obj.username) return res.send(JSON.stringify({error: false,mismatch: true,message: '用户名不存在'}));
        if(password!==obj.password) return res.send(JSON.stringify({error: false,mismatch: true,message: '密码错误'}));
        res.cookie('blog','blog123',{maxAge: 3600000*8})
        res.send(JSON.stringify({error: false, mismatch: false,message: '登录成功'}));
    })
});

module.exports = router;