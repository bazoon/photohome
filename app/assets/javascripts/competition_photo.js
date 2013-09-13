


function add_to_string(s,num) {

  if(s.length == 0) {
    return num.toString();
  } else {

    return s+","+num;

  }

}

function remove_from_string(s,num) {


  var nums = s.split(",");
  var index = nums.indexOf(num.toString())

  if(index > -1) {
    nums.splice(index,1)
  }

  return nums.join(",")

}



function id_in_string(s,num) {

  var nums = s.split(",");
  var num_s =num.toString();
  // alert(num_s);
  var index = nums.indexOf(num_s);
  // alert(index);


  if(index > -1) return true;
  return false;

}

function photo_ids() {
  return $("#competition_photo_photo_ids").val();
}


function add_photo(id) {
  
 
  if(!id_in_string(photo_ids(),id)) {

    var elem_id = "#ph"+id;
    var elem_clon = $(elem_id).clone();

    elem_clon.attr("id","phc"+id);
    elem_clon.attr("num",id);
    elem_clon.appendTo("#next");


    $("#competition_photo_photo_ids").val(add_to_string(photo_ids(),id));


    $('#phc'+id).on("click", "", function() { 
      var s = $("#competition_photo_photo_ids").val();
      s = remove_from_string(photo_ids(),$(this).attr("num"));
      $("#competition_photo_photo_ids").val(s);
      $(this).remove(); 
    });

}

}