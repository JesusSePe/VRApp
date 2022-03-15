
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
              "Access-Control-Allow-Origin":"*"
            }, // Headers. Informen a la API del tipus de trucada que s'està fent.
            data: {
                "username":userIn,
                "password":pwIn
            }  // Dades a enviar al servidor

          }).done(function (msg) {
            if(msg.status=="OK"){

              localStorage.setItem("token", msg.session_token);
              window.open("courses.html")
 
            }
            if(msg.status=="ERROR"){
              alert(msg.message);
              
            }

          }).fail(function () {
              alert("ERROR");
            
          });
    }

   $("#sendBut").on("click", logIn);

}
