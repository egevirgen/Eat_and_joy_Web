var profile_dialog = document.getElementById("profile_dialog");
var dialog = document.querySelector('dialog');
var signout = document.getElementById("ileri");

var dialogprofilephoto = document.getElementById("dialog-profile-photo");
var dialogprofilename = document.getElementById("dialog-profile-name");
var dialogprofileemail = document.getElementById("dialog-profile-email");

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      return firebase.database().ref('/Companies/' + user.uid).once('value').then(function(snapshot) {
    dialogprofilename.innerHTML=snapshot.val().company_name
    dialogprofileemail.innerHTML=snapshot.val().company_email
});
  } else {
    window.open ('index.html','_self',false)
  }
});

signout.addEventListener('click', function (){
                          firebase.auth().signOut().then(function() {
            window.open ('index.html','_self',false)
        }); });

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
