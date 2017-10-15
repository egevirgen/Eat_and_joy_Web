// initialize elements
var hesap_olustur = document.getElementById("hesap_olustur");
var oturum_ac = document.getElementById("oturum_ac");
var sifre_unuttum = document.getElementById("forgot_password");
var email = document.getElementById("email");
var sifre = document.getElementById("password");
var email_hata = document.getElementById("hata1");
var sifre_hata = document.getElementById("hata2");
var genel_hata = document.getElementById("hata3");
var progress = document.getElementById("progress");
progress.style.visibility='hidden';

$(document).keypress(function (e) {
    if (e.which == 13) {
        oturum_ac.click()
    }
});


// oturum açma click listener
oturum_ac.addEventListener('click', function () {
    progress.style.visibility='visible';
    email_hata.innerHTML="";
    sifre_hata.innerHTML="";
    genel_hata.innerHTML="";
   
    firebase.auth().signInWithEmailAndPassword(email.value, sifre.value).then(function() {
        if(firebase.auth().currentUser.emailVerified)
            {
                // diğer sayfaya geçilsin
            window.open ('order.html','_self',false)
            }
        else{
            progress.style.visibility='hidden';
            firebase.auth().signOut();
            genel_hata.innerHTML="Hesabınız aktif değil"
        }
    }).catch(function(error) {
  // Hata mesajı handle etme
        var errorMessage = error.message;
        console.log(errorMessage)
        progress.style.visibility='hidden'; 
        if(errorMessage.includes("A network error (such as timeout, interrupted connection or unreachable host) has occurred.")){
            genel_hata.innerHTML="Bağlantı hatası"
        }
        else if(errorMessage.includes("The email address is badly formatted.")){
            email_hata.innerHTML="Lütfen E-mail adresinizi kontrol edin"
        }
        else if(errorMessage.includes("There is no user record corresponding to this identifier. The user may have been deleted.")){
            email_hata.innerHTML="E-mail adresi bulunamadı"
        }
        else if(errorMessage.includes("The password is invalid or the user does not have a password.")){
            sifre_hata.innerHTML="Şifrenizi kontrol edin"
        }
        else if(errorMessage.includes("We have blocked all requests from this device due to unusual activity. Try again later.")){
            genel_hata.innerHTML="Cihaz geçici olarak bloke edildi"
        }
        else if(errorMessage.includes("The user account has been disabled by an administrator.")){
            genel_hata.innerHTML="Bu hesap yönetici tarafından askıya alındı"
        }
       
  
});
    
}, false);

// kayıt olma click listener
hesap_olustur.addEventListener('click', function () { 
    progress.style.visibility='visible';
    window.open ('sign_up.html','_self',false)

}, false);

// şifre unuttum click listener
sifre_unuttum.addEventListener('click', function () { 
    
}, false);


