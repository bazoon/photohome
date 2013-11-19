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
//= require jquery.ui.dialog




// Or peek any of them yourself
//= require twitter/bootstrap/dropdown
//= require twitter/bootstrap/modal

//= require turbolinks
//= require redactor-rails
//= require fotorama

//= require_tree .


$(document).ready(function() {

var sudoSlider = $("#slider").sudoSlider({
   effect: "fade",
   auto:true,
   prevNext: true,
     numeric:true

});
 

// убирает флеш сообщения через некоторое время
$("div[id^='flash_box']").fadeOut(10000);


 $(".jury_estimate").jRating({
         // step:true,
         length : 10, // nb of stars
         phpPath: "/jury_rating",
         nbRates: 10,
         type: "big",
         rateMax: 10,
         canRateAgain: true,  
         decimalLength: 2  ,
         
         // onSuccess : function(){
         //   alert('Success : your rate has been saved :)');
         // },
         // onError : function(){
         //   alert('Error !');
         // }
         


       });


 $(".final_estimate").jRating({
         // step:true,
         length : 3, // nb of stars
         phpPath: "/admin/final_rating",
         nbRates: 3,
         type: "big",
         rateMax: 3,
         canRateAgain: true,  
         step: true
         // decimalLength: 1,
         
         // onSuccess : function(){
         //   alert('Success : your rate has been saved :)');
         // },
         // onError : function(){
         //   alert('Error !');
         // }
         


       });
 
     


});

