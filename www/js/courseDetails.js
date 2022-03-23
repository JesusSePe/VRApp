document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, {});
 
  });


document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    
    get_course_details();

   
}

