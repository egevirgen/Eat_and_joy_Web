var profile_dialog = document.getElementById("profile_dialog");
var dialog = document.getElementById("dialog1");
var dialog2 = document.getElementById("dialog2");
var signout = document.getElementById("ileri");
var progress = document.getElementById("progress");
var content = document.getElementById("content");
var auth = firebase.auth();

var dialogprofilephoto = document.getElementById("dialog-profile-photo");
var dialogprofilename = document.getElementById("dialog-profile-name");
var dialogprofileemail = document.getElementById("dialog-profile-email");

var firmaadivalue = document.getElementById("firma_adi_value");
var firmaemailvalue = document.getElementById("firma_email_value");
var firmatelefonvalue = document.getElementById("firma_telefon_value");

var inner_firma_adi = document.getElementById("firma_adi_profile");
var inner_telefon = document.getElementById("telefon_profile");
var kaydet_1 = document.getElementById("kaydet_1");
var kaydet_2 = document.getElementById("kaydet_2");
var iptal_1 = document.getElementById("iptal_1");
var iptal_2 = document.getElementById("iptal_2");
var summary_1 = document.getElementById("summary_1");
var summary_2 = document.getElementById("summary_2");
var summary_3 = document.getElementById("summary_3");
var hata_1 = document.getElementById("hata1");
var hata_2 = document.getElementById("hata2");
var firebase_user;
var firebase_snapshot;

var profile_fab = document.getElementById("profile_change");
var picker = document.getElementById("picker");

inner_telefon.maxLength="10";
hata_2.style.color = 'blue';
hata_2.innerHTML="Telefon numaranızı başında sıfır olmadan yazınız";

        var el = document.getElementById('vanilla-demo');
          var vanilla = new Croppie(el, {
    viewport: { width: 200, height: 200 },
    boundary: { width: 350, height: 350 },
    showZoomer: true
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      firebase_user=user;
      return firebase.database().ref('/Companies/' + user.uid).once('value').then(function(snapshot){
    firebase_snapshot=snapshot;
    progress.style.visibility='hidden';  
    content.style.opacity='1'
    dialogprofilename.innerHTML=snapshot.val().company_name
    dialogprofileemail.innerHTML=snapshot.val().company_email
    firmaadivalue.innerHTML=snapshot.val().company_name
    inner_firma_adi.value=snapshot.val().company_name
    inner_telefon.value=snapshot.val().company_phone
    firmaemailvalue.innerHTML=snapshot.val().company_email
    firmatelefonvalue.innerHTML="(+90) "+snapshot.val().company_phone
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

iptal_2.addEventListener('click', function (){
        
           inner_telefon.value=firebase_snapshot.val().company_phone
           progress.style.visibility='hidden';  
           summary_2.click();
    hata_2.style.color = 'blue';
             hata_2.innerHTML="Telefon numaranızı başında sıfır olmadan yazınız"; 
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

kaydet_2.addEventListener('click', function (){
           if(inner_telefon.value.length<10){
               hata2.style.color = 'red';
               hata2.innerHTML = "Telefon numarası hatalı girildi";    
            }
    else{
         progress.style.visibility='visible';  
         firebase.database().ref('Companies/' + firebase_user.uid).update({
    company_phone: inner_telefon.value     
  }).then(function() {
            hata_2.style.color = 'blue';
             hata_2.innerHTML="Telefon numaranızı başında sıfır olmadan yazınız"; 
            progress.style.visibility='hidden';
            summary_2.click();
            firmatelefonvalue.innerHTML="(+90) "+inner_telefon.value
        });
}});

window.addEventListener('load', function() {
  document.querySelector('input[type="file"]').addEventListener('change', function() {
      if (this.files && this.files[0]) {
          var img = document.getElementById('myImg'); 
          var url_photo = URL.createObjectURL(this.files[0]);
             dialog2.showModal();
            dialog2.style.opacity = 1; //For real browsers;
    dialog2.style.filter = "alpha(opacity=100)"; //For IE;
    dialog2.style.webkitTransform = "scale(1)";
    dialog2.style.MozTransform = "scale(1)";
    dialog2.style.msTransform = "scale(1)";
    dialog2.style.OTransform = "scale(1)";
    dialog2.style.transform = "scale(1)";
          vanilla.bind({
    url: url_photo
});
//on button click
vanilla.result('blob').then(function(blob) {
    // do something with cropped blob
});

          
         
      }
  });
});

 summary_3.onclick = function () { 
                progress.style.visibility='visible';  
     auth.sendPasswordResetEmail(firebase_snapshot.val().company_email).then(function() {
         progress.style.visibility='hidden';  
         alert("Şifre sıfırlama maili başarıyla gönderildi.");

     }).catch(function(error) {
                    progress.style.visibility='hidden';  
         console.log(error.message)
           alert("Hata oluştu.");

     });
     return false;};

if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
 if (! dialog2.showModal) {
      dialogPolyfill.registerDialog(dialog2);
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



 profile_fab.onclick = function () { 
        picker.click();
     return false;};
