document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, {});
  });


document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {


    get_courses();

}

function get_courses(){
        $.ajax({
        method: "GET",
        url: localStorage.getItem("url")+"/api/get_courses",
        headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*"
        }, 
        data: {
            "session_token":localStorage.getItem("token"),
        }

        }).done(function (msg) {
            show_courses(msg.course_list)
        
        }).fail(function () {
        alert("ERROR");
    });
}
function show_courses(msg){

    for (let index = 0; index < msg.length; index++) {
        const course = msg[index];
        $('#courses').append('<li> <div class="collapsible-header"><i class="material-icons">book</i>'+course.title+'</div> <div class="collapsible-body"><span>'+course.description+'</span><a class="btn waves-effect waves-light right"><i class="material-icons right">send</i></a></div></li>');
      };

}