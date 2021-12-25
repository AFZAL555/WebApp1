var express = require('express');
var router = express.Router();
var functionhelper = require('../../helpers/functionHelper');



router.get('/',function(req,res,next){
    if(req.session.admin){
        res.redirect('/adminlog8714/adminhome');
    }
    else{
        res.render('admin/adminlogin');
    }    
});

router.post('/adminauthentication',function(req,res,next){
  
    adminusenameandpassword = req.body;
    functionhelper.adminValidate(adminusenameandpassword).then((response)=>{
        if(response.status){
            req.session.admin=response.status;
            res.redirect('/adminlog8714/adminhome');
        }
        else{
            errormessage = 'Incorrect Username or Password!.Please Check it out.'
            res.render('admin/adminlogin',{errormessage});
        }
    });
    
});

router.get('/adminhome', function (req, res, next) {

    if (req.session.admin) {
  
  
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
      
      res.render('admin/adminhomepage', { items});
      console.log('admin home page.....');
  
    }
    else {
      res.redirect('/adminlog8714');
    }
  
  });

router.get('/userslist',function(req,res,next){

    if(req.session.admin){

        functionhelper.getuserDetails().then((response)=>{

            console.log(response.userDetails);
            var userDetails = response.userDetails;

            res.render('admin/userslist',{userDetails});
        })
    }
    else{
        res.redirect('/adminlog8714');
    }
});
router.get('/logout',function(req,res,next){
    req.session.destroy();
    res.redirect('/adminlog8714');
});

router.get('/usermodify/:id',function(req,res,next){
    var id = req.params.id
    functionhelper.userDetails(id).then((response)=>{ 
        if(response){
            var user=response.userDetail
            res.render('admin/userupdate',{user});
        }
        else{
            console.log("error occured");
        }
    });

});

router.get('/createuser',function(req,res,next){
    if(req.session.admin)
    {
         res.render('admin/newUser')
    }
    else
    {
        res.redirect('/adminlog8714')
    }

});

router.post('/adminnewuser',function(req,res,next){
    var userDetails = req.body;
    functionhelper.adminUsercreate(userDetails).then((response)=>{
        console.log(response)
        if(response){
            var successmessage="New User Successfully Created...!"
            res.render('admin/newUser',{successmessage})
        }
        else{
            var errormessage = 'New User Creation Failed...!'
            res.render('admin/newUser',{errormessage})
        }
    })
});

router.post('/userupdate/:id',function(req,res,next){
    console.log(req.params.id)
    var id = req.params.id
    console.log(id);
    var updatedData = req.body
    

    functionhelper.userModify(id,updatedData).then((response)=>{
        if(response){
            res.redirect('/adminlog8714/userslist')

        }
        else{
            var errormessage = 'User Updation Failed...!'
            res.render('admin/userupdate',{errormessage})
        }
    })
});

router.get('/delete/:id',function(req,res,next){
    console.log(req.params.id)
    var id=req.params.id;
    functionhelper.userDelete(id).then((response)=>{
        if(response){
            res.redirect('/adminlog8714/userslist')
        }
        else{
            res.redirect('/adminlog8714/')
        }
    })
});

router.get('/block/:id',function(req,res,next){
    var id = req.params.id;
    functionhelper.userBlock(id).then((response)=>{
        if(response){
            res.redirect('/adminlog8714/userslist')
        }
        else{
            res.redirect('/adminlog8714/userslist')
        }
    })
});

router.get('/unblock/:id',function(req,res,next){
    var id = req.params.id;
    functionhelper.userUnblock(id).then((response)=>{
        if(response){
            res.redirect('/adminlog8714/userslist')
        }
        else{
            res.redirect('/adminlog8714/userslist')
        }
    })
});

module.exports = router;