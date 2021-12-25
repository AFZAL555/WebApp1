var express = require('express');
var router = express.Router();
var functionhelper = require('../../helpers/functionHelper')



router.get('/',function(req,res,next){
    if(req.session.admin){
        res.redirect('/admin/panel')
    }
    else{
        res.render('admin/adminSignin')
    }    
})

router.post('/',function(req,res,next){
  
    adminCredential = req.body;
    functionhelper.adminValidate(adminCredential).then((response)=>{
        if(response.status){
            req.session.admin=response.status;
            res.redirect('/admin/panel')
        }
        else{
            res.redirect('/admin')
        }
    })
    
})

router.get('/panel',function(req,res,next){

    if(req.session.admin){

        functionhelper.getuserDetails().then((response)=>{

            console.log(response.userDetails)
            var userDetails = response.userDetails;

            res.render('admin/adminPanel',{userDetails})
        })
    }
    else{
        res.redirect('/admin')
    }
})
router.get('/logout',function(req,res,next){
    req.session.destroy();
    res.redirect('/admin')
})

module.exports = router;