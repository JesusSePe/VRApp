
document.addEventListener('deviceready', onDeviceReady, false);




function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

    function blah(){
        console.log("Funciona");
        var urlIn = $("#urlIn").val();
        console.log(urlIn);
        $.ajax({
            method: "GET",
            url: urlIn,
            dataType: "json",   // necessitem això pq ens retorni un objecte JSON
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
