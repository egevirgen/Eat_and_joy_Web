firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
             window.open ('ana_sayfa.html','_self',false)

  } else {
    // No user is signed in.
             window.open ('login.html','_self',false)
  }
});