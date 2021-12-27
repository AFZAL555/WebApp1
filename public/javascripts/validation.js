
let nameTest,emailTest,phnTest,commentTest;

function nameCheck() {
    var nameVal=document.getElementById("name").value
    var regex =  /^[-a-zA-Z-()]+(\s+[-a-zA-Z-()]+)*$/
    if (nameVal==""){

        $("#name-error").html("Field is required")
        // $("#name").css({'border':'solid 1px red'})
		nameTest= false;

    }
    else if(nameVal.match(regex)){
        $("#name-error").html("")
        // $("#name").css({'border':'solid 1px black'})
        nameTest=true;
        }
    
}


function emailCheck(){
    var emailVal=document.getElementById("email").value
    var regex=/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
    if (emailVal==""){
        //console.log("email input is empty");
        $("#email-error").html("Field is required")
        // $("#email").css({'border':'solid 1px red'})
        emailTest=false;

    }
    else if(emailVal==" "){
        //console.log("Don't enter space first");
        $("#email-error").html("Dont enter space first")
        // $("#email").css({'border':'solid 1px red'})
        emailTest=false;
    }
    else if(emailVal.match(regex)){
        $("#email-error").html("")
        // $("#email").css({'border':'solid 1px black'})
        emailTest=true;
    }
    else{
        $("#email-error").html("Invalid Entry");
        // $("#email").css({'border':'solid 1px red'})
        emailTest=false;
    }
}

function phoneCheck(){
    var phnVal=document.getElementById("phone").value
    var regex=/^\d+$/;
     if(phnVal=="" || phnVal==" "){
        //console.log("input field is empty");
        $("#phone-error").html("Field is required")
        // $('#phone').css({'border':'solid 1px red'})
        phnTest=false;
    }
    else if(phnVal.match(regex) && (phnVal.length == 10)){
        //console.log(phnVal);
        $('#phone-error').html("")
        // $('#phone').css({'border':'solid 1px black'})
        phnTest=true;
    }
    else if(phnVal.length<10){
      if(phnVal.match(regex)){
          $('#phone-error').html("Invalid phone number")
        //   $('#phone').css({'border':'solid 1px red'})
          phnTest=false;
      }
    }
    else if(phnVal.length>10){
        if(phnVal.match(regex)){
            $('#phone-error').html("Invalid phone number")
            // $('#phone').css({'border':'solid 1px red'})
            phnTest=false;
             }
            
      else{
        $('#phone-error').html("Use only numbers ")
        // $('#phone').css({'border':'solid 1px red'})
        phnTest=false;
      }
    }
    else{
        $('#phone-error').html("Invalid number ")
        // $('#phone').css({'border':'solid 1px red'})
        phnTest=false;
    }
    

}

