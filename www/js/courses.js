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
        $('#course').append('<li> <div class="collapsible-header"><i class="material-icons">book</i>'+course.title+'</div><div class="collapsible-body"><span>'+course.description+'</span><a id="'+course._id+'" class="btn waves-effect waves-light right"><i class="material-icons right">send</i></a></div></li>');
        
      };
      console.log(msg)
      $('.btn').on('click',get_course_details);

      

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
            $("#det").append('<li class="collection-header"><h4>'+msg.course.title+'</h4></li>')
           //Attachments
            $("#det").append('<h3><i class="material-icons medium prefix">assignment</i>Attachments</h3>');
            msg.course.elements.forEach(element => {
                console.log(element.type);
                if(element.type=="HTML"){
                    $("#det").append('<br>   <li class="collection-item "> <h5><i class="material-icons prefix">language</i>'+element.title+'</h5><p>'+element.description+'</p><code>'+element.contents+'</code></li>')
                }
                if(element.type=="file"){
                    $("#det").append('<br>   <a href="#'+element.file+'" class="collection-item"> <h5> <i class="material-icons prefix">insert_drive_file</i>'+element.title+'</h5> <p>'+element.description+'</p></a>')
                }
                
            });
            //Tasks
            $("#det").append('<h3><i class="material-icons medium prefix">attachment</i>Tasks</h3>');
            msg.course.tasks.forEach(task => {
                $("#det").append('<br>   <li class="collection-item"> <h5>'+task.title+'</h5><p>'+task.description+'</p></li>')
                task.uploads.forEach(upload => {
                    if(task.type=="file"){
                        $("#det").append('<p>  student id: '+upload.studentID+'</p> <a  href="#'+upload.file+'">'+upload.text+'</a>  <p>'+upload.grade+'</p> <p>'+upload.feedback+'</p> <hr> ')
                    }
                    if(task.type=="HTML"){
                        $("#det").append('<p> student id: '+upload.studentID+'</p> <p>'+upload.text+'</p>  <p>'+upload.grade+'</p> <p>'+upload.feedback+'</p> <hr>')

                    }
                });
            });
            //VR Tasks
            $("#det").append('<h3><i class="material-icons medium prefix">videocam</i>VR-Tasks</h3>');
            msg.course.vr_tasks.forEach(vrtask => {
                $("#det").append('<br>   <li class="collection-item"> <h5>'+vrtask.title+'</h5><p>'+vrtask.description+'</p> </li>')
                
            });
            
            M.Tabs.getInstance(document.getElementById("tabs")).select("courseDet");

        }).fail(function(){
            alert("ERROR")
        });

}

