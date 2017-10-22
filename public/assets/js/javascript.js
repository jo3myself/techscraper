$(document).ready(function(){

// when addNote click
  $('.addNote').on('click', function(){

    var articleId = $(this).data("id");
    var baseURL = window.location.origin;
    var frmName = "form-add-" + articleId;
    var frm = $('#' + frmName);

    // add the note to the database
    $.ajax({
      url: baseURL + '/add/note/' + articleId,
      type: 'POST',
      data: frm.serialize(),
    })
    .done(function() {
      // reload the page after done
      location.reload();
    });

    return false;

  });

    // when deleteNote execute
  $('.deleteNote').on('click', function(){

    var noteId = $(this).data("id");
    var baseURL = window.location.origin;

    // delete the note from database
    $.ajax({
      url: baseURL + '/remove/note/' + noteId,
      type: 'POST',
    })
    .done(function() {
      location.reload();
    });

    return false;

  });  
});