
document.addEventListener('deviceready', onDeviceReady, false);




function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

    function logIn(){
        var urlIn = $("#urlIn").val();
        var userIn = $("#username").val();
        var pwIn = $("#pw").val();

        console.log(urlIn,userIn,pwIn);
        $.ajax({
            method: "GET",
            url: urlIn+"/api/login",
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
                var token = msg.session_token;
                $.ajax({
                  method: "GET",
                  url: urlIn+"/api/get_courses",
                  headers: {
                    "accept": "application/json",
                    "Access-Control-Allow-Origin":"*"
                  }, 
                  data: {
                      "session_token":token,
                  }
      
                }).done(function (msg) {
                console.log(msg.course_list);
                window.open("courses.html")

                }).fail(function () {
                  alert("ERROR");
              });
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
