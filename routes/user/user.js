var express = require('express');
const session = require('express-session');
const { response } = require('../../app');
var router = express.Router();
var functionhelper = require('../../helpers/functionHelper')

router.get('/',function(req,res,next){
    if(req.session.status){
        res.redirect('/userhome')
    }
    else{
        res.render('user/userlogin',{err:req.session.loginError}) 
        req.session.loginError = false;
    }
    
});

router.post('/userAuthentication',function(req,res,next){
    var userDetail=req.body;
    functionhelper.checkUser(userDetail).then((response)=>{

        if(response.user){

        req.session.user=response.user;
        req.session.status= response.status;

            res.redirect('/userhome')
        }
      
        else{  
               errormessage = "invalid username or password";
                res.render('user/userlogin',{errormessage})

        }
    })
});


router.get('/userhome', function (req, res, next) {

    if (req.session.status) {
  
  
      let items = [
        {
          title: "Samsung s21",
          content: "Cinematic mode. Adaptive 120Hz display. Super Retina XDR display. Ultra Wide camera. A15 Bionic. ",
          image: "../images/13pro.png",
          category: "Smart Phone",
          rate: "25000"
  
        },
        {
          title: "iphone 13 pro",
          content: "Cinematic mode. Adaptive 120Hz display. Super Retina XDR display. Ultra Wide camera. A15 Bionic. ",
          image: "../images/13pro.png",
          category: "Smart Phone",
          rate: "150000"
  
        },
        {
          title: "Oppo F19",
          content: "Night vision. Adaptive 120Hz display. Super Retina XDR display. Ultra Wide camera. o19 Bionic.",
          image: "../images/oppf19.png",
          category: "Smart Phone",
          rate: "23000"
  
        },
        {
          title: "Vivo V20",
          content: "Cinematic mode. Adaptive 120Hz display. Super Retina XDR display. Ultra Wide camera. A15 Bionic. ",
          image: "../images/13pro.png",
          category: "Smart Phone",
          rate: "29000"
  
        },
        {
          title: "MacBook pro",
          content: "most powerful notebooks. Fast M1 processors, incredible graphics, and spectacular Retina displays. Now available in a 14-inch model.",
          image: "../images/mcbook.png",
          category: "PC",
          rate: "11,2000"
  
        },
        {
          title: "HP Ryzen 3",
          content: "most powerful pc. Fast Ryzen 3 processors, incredible graphics,classic feel good and spectacular Retina displays. Now available in a 14-inch model.",
          image: "../images/hplap.png",
          category: "PC",
          rate: "42,499"
  
        },
        {
          title: "Dell Vostro 14",
          content: "most powerful pc. Fast Ryzen 3 processors, incredible graphics,classic feel good and spectacular Retina displays. Now available in a 14-inch model.",
          image: "../images/delllap.png",
          category: "PC",
          rate: "39,999"
  
        },
        {
          title: "Lenovo Yoga 9i",
          content: "most powerful pc. Fast Ryzen 3 processors, incredible graphics,classic feel good and spectacular Retina displays. Now available in a 14-inch model.",
          image: "../images/hplap.png",
          category: "PC",
          rate: "1,69999"
  
        }
  
      ];
      
      res.render('user/userhomepage', { items});
      console.log('user home page.....');
  
    }
    else {
      res.redirect('/');
    }
  
  });


router.get('/logout',function(req,res,next){
    req.session.destroy();
    res.redirect('/')
});

router.get('/signup',function(req,res,next){
    res.render('user/usersignup')

});


router.post('/signupcomplete',function(req,res,next){
    console.log(req.body);
    var userData = req.body;
    functionhelper.newuserData(userData).then((status)=>{
        if (status){
            successmessage="Registration Successfully Completed "
            res.render('user/usersignup',{successmessage});
        }
        else{
            errormessage = "Account Creation Failed..!";
            res.render('user/usersignup',{errormessage});
        }
    })
   
});
module.exports = router;