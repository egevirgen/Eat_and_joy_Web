var oturum_ac = document.getElementById("oturum_ac");
var email = document.getElementById("email");
var email_hata = document.getElementById("hata1");
var auth = firebase.auth();
var progress = document.getElementById("progress");
var left = document.getElementById("left");
var right = document.getElementById("right");
var resend = document.getElementById("yeniden_gonder");
var snackbarContainer = document.querySelector('#demo-toast-example');

function opacity() {
     left.style.opacity=0;
     setTimeout(function() {  right.style.opacity=1;
                              left.style.visibility='hidden'; }, 1000);
}

resend.addEventListener('click', function(){
     auth.sendPasswordResetEmail(email.value).then(function() {
         (function() {
  
    var data = {message: 'Şifre yenileme maili yeniden gönderildi'};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
 
}());
     }).catch(function(error){
           if(error.message.includes("RESET_PASSWORD_EXCEED_LIMIT")){
           var data = {message: 'Şifre isteme limitine ulaştınız'};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
        }
          if(error.message.includes("A network error (such as timeout, interrupted connection or unreachable host) has occurred.")){
            var data = {message: 'Bağlantı hatası'};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
        }
                 
     });
});

progress.style.visibility='hidden';
oturum_ac.addEventListener('click', function () { 
    progress.style.visibility='visible';
    email_hata.innerHTML="";

    auth.sendPasswordResetEmail(email.value).then(function() {
  // Email sent.
      opacity();
       
        progress.style.visibility='hidden';
}).catch(function(error) {
        progress.style.visibility='hidden';
        console.log(error.message);
         if(error.message.includes("The email address is badly formatted.")){
            email_hata.innerHTML="Lütfen E-mail adresinizi kontrol edin"
        }
        if(error.message.includes("A network error (such as timeout, interrupted connection or unreachable host) has occurred.")){
            email_hata.innerHTML="Bağlantı hatası"
        }
        if(error.message.includes("RESET_PASSWORD_EXCEED_LIMIT")){
            email_hata.innerHTML="Şifre isteme limitine ulaştınız"
        }
        if(error.message.includes("There is no user record corresponding to this identifier. The user may have been deleted.")){
            email_hata.innerHTML="Kayıtlı kullanıcı bulunamadı"
        }
  // An error happened.
});

});


