
document.addEventListener('deviceready', onDeviceReady, false);




function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

    function blah(){
        var urlIn = $("#urlIn").val();
        var userIn = $("#username").val();
        var pwIn = $("#pw").val();

        console.log(urlIn,userIn,pwIn);
        $.ajax({
            method: "GET",
            url: urlIn,
            headers: {
              "accept": "application/json",
              "Access-Control-Allow-Origin":"*"
            }, // Headers. Informen a la API del tipus de trucada que s'està fent.
            data: {

                "usr":userIn,
                "pass":pwIn

            }  // Dades a enviar al servidor

          }).done(function (msg) {
            for(let item in msg.artists) {
              console.log(msg.artists[item]);
              // aquí caldría fer mes coses, of course...
              // ...
            };
          }).fail(function () {
              alert("ERROR");
          });
    }
   $("#sendBut").on("click", blah);

}
