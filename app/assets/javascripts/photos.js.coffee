# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/
jQuery ->
  	  $('#photo_theme_tokens').tokenInput('/photo_ajax/theme_tokens',{theme: 'facebook',prePopulate: $('#photo_theme_tokens').data('load')})

#$('#photo_theme_tokens').focus ->
	
