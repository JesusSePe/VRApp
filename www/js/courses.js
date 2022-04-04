document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, {});
  });

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {

    get_courses();
    $('.tabs').tabs();
    $('.modal').modal();
   
}

function get_courses(){
        $.ajax({
        method: "GET",
        url: localStorage.getItem("url")+"/api/get_courses",
        headers: {
            "accept": "application/json",

        }, 
        data: {
            "token":localStorage.getItem("token"),
        }

        }).done(function (msg) {
            show_courses(msg.course_list)
            console.log(msg)

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
        }, 
        data: {
            "token":localStorage.getItem("token"),
            "courseID":$(this)[0].id
        }

        }).done(function(msg){
            console.log(msg.course)
            $("#det").empty();
           //Attachments
            msg.course.elements.forEach(element => {
                console.log(element.type);
                $('#det').append('<li> <div class="collapsible-header"><i class="material-icons">import_contacts</i>'+element.title+'</div><div class="collapsible-body"><span>'+element.description+'</span></div></li>');
                
            
            });
            //Tasks
            msg.course.tasks.forEach(task => {
                $('#det').append('<li> <div class="collapsible-header"><i class="material-icons">assignment</i>'+task.title+'</div><div class="collapsible-body"><span> <table> <thead> <tr> <th>Grade</th> <th>Feedback</th> </tr> </thead> <tbody> <tr> <td>'+task.uploads[0].grade+'</td> <td>'+task.uploads[0].feedback+'</td>  </tr> </tbody> </table></span></div></li>');
            });
            //VR Tasks
           
            msg.course.vr_tasks.forEach(vrtask => {
                $('#det').append('<li> <div class="collapsible-header "><i class="material-icons">assignment</i>'+vrtask.title+'</div><div class="collapsible-body"><span><ul id="ul'+vrtask.ID+'" class="collection" > </ul></span></div></li>');
               
                    vrtask.completions.forEach(c =>{
                        if (c.autograde != 'undefined') {
                        $('#ul'+vrtask.ID).append('<li class="collection-item"><table > <thead> <tr> <th>Passed Items</th> <th>Failed Items</th> <th>Grade</th><th>Feedback</th>  </tr> </thead> <tbody> <tr> <td>'+c.autograde.passed_items+'</td><td> '+c.autograde.failed_items+'</td> <td>'+c.grade+'</td>  <td>'+c.feedback+'</td>  </tr> </tbody> </table></li>')
                        }
                    })


            $('#ul'+vrtask.ID).append('<li class="collection-item"><a id="'+vrtask.ID+'" class="btn vrbtn waves-effect waves-light right"><i class="material-icons center">videocam</i></a></li>');
            M.Tabs.getInstance(document.getElementById("tabs")).select("courseDet");
            });
            
            $('.vrbtn').on('click',get_pin);
        }).fail(function(){
            alert("ERROR")
        });

        function get_pin(){
            $.ajax({
                method: "GET",
                url: localStorage.getItem("url")+"/api/pin_request",
                headers: {
                    "accept": "application/json",
                    "Access-Control-Allow-Origin":"*"
                }, 
                data: {
                    "session_token":localStorage.getItem("token"),
                    "taskID": $(this)[0].id
                }
        
                }).done(function(msg){
                    console.log(msg)
                    alert(msg.PIN)
                });

        }
}

