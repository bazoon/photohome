// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery

//= require jquery.turbolinks
//= require jquery_ujs
//= require jquery.tokeninput
//= require jquery-ui/dialog
//= require jquery-ui/datepicker
//= require jquery-ui-datepicker-ru

// Or peek any of them yourself
//= require bootstrap
//= require bootstrap-editable
//= require bootstrap-editable-rails

//= require turbolinks
//= require redactor-rails
//= require fotorama


//= require_tree .


$(document).ready(function() {

$('.jury_rate').on('rating.change', function(event, value, caption) {
  var data = $(this).attr("data");
  $.post( "/jury_rating", { rate: value, data: data  }, function(data) {} );
});

$('.final_estimate').on('rating.change', function(event, value, caption) {
  var data = $(this).attr("data");
  $.post( "/admin/final_rating", { rate: value, data: data  }, function(data) {} );
});

// $('.jury_rate').on('click',function() {
    
//     var data = $(this).attr("data");
//     var rate = this.value;
//     $.post( "/jury_rating", { rate: rate, data: data  }, function(data) {

//         // alert(data);

//     } );
// });

// $('.final_estimate').on('click',function() {
//     var data = $(this).attr("data");
//     var rate = this.value;
//     $.post( "/admin/final_rating", { rate: rate, data: data  }, function(data) {} );

// });


$('.fotorama').fotorama({
  maxwidth: '100%',
  ratio: 16/9,
  allowfullscreen: true,
  nav: 'thumbs'
  
});


// убирает флеш сообщения через некоторое время
// $("div[id^='flash_box']").fadeOut(10000);
// !!! нужно изменить способ адресации фоторамы здесь чтобы не трогало фотораму на главной
$('.fotorama').on(
  'fotorama:show',
  function (e, fotorama, extra) {
    // console.log(fotorama.activeFrame.img);
    var re = /\d+/;
    var href = fotorama.activeFrame.img
    var id = href.match(re)
    var image_path = "/gallery/show/"+id;  
//!!! Здесь нет префикса языка 

    $(".comlink").attr('href',image_path)
    
  }
);

    


});

