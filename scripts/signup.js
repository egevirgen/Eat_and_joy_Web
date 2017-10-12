// initialize elements
var firma_adi = document.getElementById("firma_adi_id");
var email = document.getElementById("email");
var telefon = document.getElementById("telefon_numarasi");
var password = document.getElementById("sifre");
var password_repeat = document.getElementById("sifre_tekrar");
var submit = document.getElementById("ileri");
var database = firebase.database();

telefon.maxLength="10";

// kayıt olma click listener
submit.addEventListener('click', function () { 
    if(firma_adi.value === ""){
        console.log("firma adı boş");
    }
    else if(telefon.value.length<10){
         console.log("Telefon numarası eksik veya hatalı girildi");    
            }
    else if(password.value != password_repeat.value){
        console.log("passwords are not equal");
    }
    else{
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value).catch(function(error) {
  // Handle Errors here.
  var errorMessage = error.message;
  console.log(errorMessage);
  if(errorMessage.includes("The email address is badly formatted.")){
            console.log(errorMessage);
        }
  if(errorMessage.includes("The password must be 6 characters long or more.")){
            console.log(errorMessage);
        }
  if(errorMessage.includes("The email address is already in use by another account.")){
            console.log(errorMessage);
        }
  if(errorMessage.includes("A network error (such as timeout, interrupted connection or unreachable host) has occurred.")){
            console.log(errorMessage);
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
        }, function(error) {
            console.error('Sign Out Error', error);
        });

    }).catch(function(error) {
  // An error happened.
        console.log("error");
});     
        });
   

  } 
});
