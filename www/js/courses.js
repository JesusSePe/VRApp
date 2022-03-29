document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, {});
  });

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {

    get_courses();
    $('.tabs').tabs();
   
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
        $('#course').append('<li> <div class="collapsible-header"><i class="material-icons">book</i>'+course.title+'</div><div class="collapsible-body"><span>'+course.description+'</span><a id="'+course._id+'" class="btn coursebtn waves-effect waves-light right"><i class="material-icons right">send</i></a></div></li>');
        
      };
      console.log(msg)
      $('.coursebtn').on('click',get_course_details);

      

}

function get_course_details(){
    $.ajax({
        method: "GET",
        url: localStorage.getItem("url")+"/api/get_course_details",
        headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*"
        }, 
        data: {
            "session_token":localStorage.getItem("token"),
            "courseID":$(this)[0].id
        }

        }).done(function(msg){
            console.log(msg.course)
            $("#det").empty();
           //Attachments
            msg.course.elements.forEach(element => {
                console.log(element.type);
                $("#det").append('<br>   <li class="collection-item "> <p>'+element.title+'</p></li>')
            
            });
            //Tasks
            msg.course.tasks.forEach(task => {
                $("#det").append('<br>   <li class="collection-item"> <p>'+task.title+'</p></li>')
            });
            //VR Tasks
            msg.course.vr_tasks.forEach(vrtask => {
                $("#det").append('<br>   <li class="collection-item"> <div><a id="'+vrtask.ID+'" class="btn vrbtn waves-effect waves-light right"><i class="material-icons right">send</i></a> <p>'+vrtask.title+'</p></div></li>')
                $('.vrbtn').on('click',get_pin);
            M.Tabs.getInstance(document.getElementById("tabs")).select("courseDet");
            });
        }).fail(function(){
            alert("ERROR")
        });

        function get_pin(){
            console.log($(this)[0].id)
        }
}

