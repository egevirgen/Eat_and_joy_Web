// initialize elements
var firma_adi = document.getElementById("firma_adi_id");
var email = document.getElementById("email");
var telefon = document.getElementById("telefon_numarasi");
var password = document.getElementById("sifre");
var password_repeat = document.getElementById("sifre_tekrar");
var firma_adi_hata = document.getElementById("hata1");
var email_hata = document.getElementById("hata2");
var telefon_hata = document.getElementById("hata3");
var sifre_hata = document.getElementById("hata4");
var genel_hata = document.getElementById("hata6");
var submit = document.getElementById("ileri");
var database = firebase.database();
var progress = document.getElementById("progress");
var loginbox = document.getElementById("login-box");
var verification_text = document.getElementById("verification_content");
var verification = document.getElementById("verification");
progress.style.visibility='hidden';

telefon.maxLength="10";
telefon_hata.style.color = 'blue';
telefon_hata.innerHTML="Telefon numaranızı başında sıfır olmadan yazınız";

// kayıt olma click listener
submit.addEventListener('click', function () { 
    
    firma_adi_hata.innerHTML="";
    email_hata.innerHTML="";
    telefon_hata.style.color = 'blue';
    if(telefon.value.length!=10)
    telefon_hata.innerHTML="Telefon numaranızı başında sıfır olmadan yazınız";
    else
    telefon_hata.innerHTML="";
    sifre_hata.innerHTML="";
    genel_hata.innerHTML="";
    
    if(firma_adi.value === ""){
        firma_adi_hata.innerHTML="Firma adı boş olamaz"
    }
    if(telefon.value.length<10){
         telefon_hata.style.color = 'red';
         telefon_hata.innerHTML = "Telefon numarası hatalı girildi";    
            }
    if(password.value != password_repeat.value){
        sifre_hata.innerHTML="Şifreler uyuşmuyor"
    }
    else{

    progress.style.visibility='visible';
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value).catch(function(error) {
  // Handle Errors here.
    progress.style.visibility='hidden';     
  var errorMessage = error.message;
  console.log(errorMessage);
  if(errorMessage.includes("The email address is badly formatted.")){
            email_hata.innerHTML="Lütfen E-mail adresinizi kontrol edin"
        }
  if(errorMessage.includes("The password must be 6 characters long or more.")){
            sifre_hata.innerHTML="Şifre en az 6 karakter olmalıdır"
        }
   if(errorMessage.includes("Password should be at least 6 characters")){
            sifre_hata.innerHTML="Şifre en az 6 karakter olmalıdır"
        }        
  if(errorMessage.includes("The email address is already in use by another account.")){
            email_hata.innerHTML="E-mail halihazırda kullanılıyor"
        }
  if(errorMessage.includes("A network error (such as timeout, interrupted connection or unreachable host) has occurred.")){
              genel_hata.innerHTML="Bağlantı hatası"
        }        
});
    }

}, false);


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
        database.ref('Companies/' + user.uid).set({
            
    company_name: firma_adi.value,
    company_email: email.value,
    company_phone : telefon.value
            
  }).then(function(){
             user.sendEmailVerification().then(function() {
  // Email sent.
        firebase.auth().signOut().then(function() {
            console.log('Signed Out');
            // Burda mail gönderildi git kabul et vs denicek
            window.open ('sign_up_success.html','_self',false)
            progress.style.visibility='hidden';
        }, function(error) {
            console.error('Sign Out Error', error);
            progress.style.visibility='hidden';
        });

    }).catch(function(error) {
  // An error happened.
            progress.style.visibility='hidden';
        console.log("error");
});     
        });
   

  } 
});
