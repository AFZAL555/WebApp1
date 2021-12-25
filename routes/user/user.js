var express = require('express');
const session = require('express-session');
const { response } = require('../../app');
var router = express.Router();
var functionhelper = require('../../helpers/functionHelper')

router.get('/',function(req,res,next){
    console.log(req.session.status);
    console.log("....................");
    if(req.session.status){
        res.redirect('/')
    }
    else{

        res.render('user/userSignin',{err:req.session.loginError}) 
        req.session.loginError = false;
    }
    
})

router.post('/form',function(req,res,next){
    var userDetail=req.body;
    helper.checkUser(userDetail).then((response)=>{

        if(response.user){

        req.session.user=response.user;
        req.session.status= response.status;

            res.redirect('/')
        }
      
        else{  
               req.session.loginError = "invalid username or password";
                res.redirect('/')

        }
    })
})

router.get('/logout',function(req,res,next){
    req.session.destroy();
    res.redirect('/signin')
})

router.get('/',function(req,res,next){
    if(req.session.status){
        res.redirect('/')
    }
    else{
        res.render('user/userSignup')
    }
   
})



router.post('/signupForm',function(req,res,next){
    console.log(req.body);
    var userData = req.body;
    helpers.newuserData(userData).then((status)=>{
        if (status){
            res.redirect('/signin');
        }
        else{
            res.redirect('/signup');
        }
    })
   
})







module.exports = router;