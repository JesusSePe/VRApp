
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

    function logIn(){
        localStorage.setItem("url",$("#urlIn").val())
        var userIn = $("#username").val();
        var pwIn = $("#pw").val();

        $.ajax({
            method: "GET",
            url: localStorage.getItem("url")+"/api/login",
            headers: {
              "accept": "application/json",

            }, // Headers. Informen a la API del tipus de trucada que s'està fent.
            data: {
                "email":userIn,
                "password":pwIn
            }  // Dades a enviar al servidor

          }).done(function (msg) {
            if(msg.status=="OK"){

              localStorage.setItem("token", msg.token);
              
              window.open("courses.html")
 
            }
            if(msg.status=="ERROR"){
              alert(msg.message);
              
            }

          }).fail(function () {
              alert("Wrong credentials");
            
          });
    }

   $("#sendBut").on("click", logIn);

}
