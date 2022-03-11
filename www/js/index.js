
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
            contentType: "application/json", 
            data: JSON.stringify({

                "usr":userIn,
                "pass":pwIn

            })  // necessitem això pq ens retorni un objecte JSON

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
