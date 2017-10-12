// initialize elements
var hesap_olustur = document.getElementById("hesap_olustur");
var oturum_ac = document.getElementById("oturum_ac");
var sifre_unuttum = document.getElementById("forgot_password");
var email = document.getElementById("email");
var sifre = document.getElementById("password");


// oturum açma click listener
oturum_ac.addEventListener('click', function () {
   
    firebase.auth().signInWithEmailAndPassword(email.value, sifre.value).then(function() {
        if(firebase.auth().currentUser.emailVerified)
            {
                // diğer sayfaya geçilsin
            }
        else{
            firebase.auth().signOut();
            console.log("Mailinizi verify etmemişsiniz yav")
        }
    }).catch(function(error) {
  // Hata mesajı handle etme
        var errorMessage = error.message;
         
        if(errorMessage.includes("The email address is badly formatted.")){
            console.log(errorMessage);
        }
        if(errorMessage.includes("There is no user record corresponding to this identifier. The user may have been deleted.")){
            console.log(errorMessage);
        }
        if(errorMessage.includes("The password is invalid or the user does not have a password.")){
            console.log(errorMessage);
        }
        if(errorMessage.includes("A network error (such as timeout, interrupted connection or unreachable host) has occurred.")){
            console.log(errorMessage);
        }
  
});
    
}, false);

// kayıt olma click listener
hesap_olustur.addEventListener('click', function () { 
    
    window.open ('sign_up.html','_self',false)

}, false);

// şifre unuttum click listener
sifre_unuttum.addEventListener('click', function () { 
    
}, false);

// oturum açma durum kontrolörü
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
   // Yeni sayfaya atlayacak
  } else {
   // User girişi yapılmamış bu sayfada kalacak
  }
});


