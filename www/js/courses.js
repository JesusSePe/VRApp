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
        $('#courses').append('<li> <div class="collapsible-header"><i class="material-icons">book</i>'+course.title+'</div> <div class="collapsible-body"><span id='+index+'>'+course.description+'</span></div></li>');
        // <div class="collapsible-body"><span>'+course.description+'</span><a id="'+course._id+'" class="btn waves-effect waves-light right"><i class="material-icons right">send</i></a></div></li>
        get_course_details(course._id,index)
      };

      //$('a').on('click',course_details);
      

}

function course_details(){
    localStorage.setItem("courseId", $(this).attr('id'))
    window.open("courseDetails.html")
}

function get_course_details(id,index){
    console.log("entra")
    $.ajax({
        method: "GET",
        url: localStorage.getItem("url")+"/api/get_course_details",
        headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*"
        }, 
        data: {
            "session_token":localStorage.getItem("token"),
            "courseID":id
        }

        }).done(function(msg){
            console.log(msg.course)
            msg.course.elements.forEach(element => {
                $("#"+index).append('<br><h3>'+element.title+'</h3><p>'+element.description+'</p>')
            });
            msg.course.tasks.forEach(task => {
                $("#"+index).append('<br><h3>'+task.title+'</h3><p>'+task.description+'</p>')
            });
            msg.course.vr_tasks.forEach(vrtask => {
                $("#"+index).append('<br><h3>'+vrtask.title+'</h3><p>'+vrtask.description+'</p>')
            });
            

        }).fail(function(){
            alert("ERROR")
        });

}

