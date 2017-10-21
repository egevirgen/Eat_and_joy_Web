var profile_dialog = document.getElementById("profile_dialog");
var dialog = document.querySelector('dialog');
var signout = document.getElementById("ileri");
var progress = document.getElementById("progress");
var content = document.getElementById("content");

var dialogprofilephoto = document.getElementById("dialog-profile-photo");
var dialogprofilename = document.getElementById("dialog-profile-name");
var dialogprofileemail = document.getElementById("dialog-profile-email");

var firmaadivalue = document.getElementById("firma_adi_value");
var firmaemailvalue = document.getElementById("firma_email_value");
var firmatelefonvalue = document.getElementById("firma_telefon_value");

var inner_firma_adi = document.getElementById("firma_adi_profile");
var kaydet_1 = document.getElementById("kaydet_1");
var iptal_1 = document.getElementById("iptal_1");
var summary_1 = document.getElementById("summary_1");
var hata_1 = document.getElementById("hata1");
var firebase_user;



firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      firebase_user=user;
      return firebase.database().ref('/Companies/' + user.uid).once('value').then(function(snapshot){
    progress.style.visibility='hidden';  
    content.style.opacity='1'
    dialogprofilename.innerHTML=snapshot.val().company_name
    dialogprofileemail.innerHTML=snapshot.val().company_email
    firmaadivalue.innerHTML=snapshot.val().company_name
    inner_firma_adi.value=snapshot.val().company_name
    firmaemailvalue.innerHTML=snapshot.val().company_email
    firmatelefonvalue.innerHTML=snapshot.val().company_phone
});
  } else {
    window.open ('index.html','_self',false)
  }
});

signout.addEventListener('click', function (){
                          firebase.auth().signOut().then(function() {
            window.open ('index.html','_self',false)
        }); });

iptal_1.addEventListener('click', function (){
            inner_firma_adi.value=firmaadivalue.innerHTML;
           progress.style.visibility='hidden';  
           summary_1.click();
});

kaydet_1.addEventListener('click', function (){
           if(inner_firma_adi.value === ""){
               hata1.innerHTML = "Firma adı boş olamaz"
           }
    else{
         progress.style.visibility='visible';  
         firebase.database().ref('Companies/' + firebase_user.uid).update({
    company_name: inner_firma_adi.value     
  }).then(function() {
            progress.style.visibility='hidden';
            summary_1.click();
            firmaadivalue.innerHTML=inner_firma_adi.value
            dialogprofilename.innerHTML=inner_firma_adi.value
        });
   

}});


if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }

profile_dialog.addEventListener('click', function () { 
    dialog.showModal();
    dialog.style.opacity = 1; //For real browsers;
    dialog.style.filter = "alpha(opacity=100)"; //For IE;
    dialog.style.webkitTransform = "scale(1)";
    dialog.style.MozTransform = "scale(1)";
    dialog.style.msTransform = "scale(1)";
    dialog.style.OTransform = "scale(1)";
    dialog.style.transform = "scale(1)";
    

}, false);

dialog.addEventListener('click', function (event) {
    var rect = dialog.getBoundingClientRect();
    var isInDialog=(rect.top <= event.clientY && event.clientY <= rect.top + rect.height
      && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
    if (!isInDialog) {
            dialog.style.opacity = 0; //For real browsers;
            dialog.style.filter = "alpha(opacity=0)"; //For IE;
            dialog.style.webkitTransform = "scale()";
            dialog.style.MozTransform = "scale(0)";
            dialog.style.msTransform = "scale(0)";
            dialog.style.OTransform = "scale(0)";
            dialog.style.transform = "scale(0)";
            setTimeout(function() {  dialog.close(); }, 300);
    }
});