# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

jQuery ->
      $('#site_photo_user_id').tokenInput('/ajax/users',{theme: 'facebook',prePopulate: $('#site_photo_user_id').data('load')})

