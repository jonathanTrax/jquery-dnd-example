  $( function() { 
    // There's the gallery and the trash
    var $gallery = $( "#gallery" ), $doneList = $( "#done-list" );
 
    // Let the gallery items be draggable
    $( "li", $gallery ).draggable({
      revert: "invalid", // when not dropped, the item will revert back to its initial position
      containment: "document",
      helper: "clone",
      cursor: "move"
    });
 
    // Let the trash be droppable, accepting the gallery items
    $doneList.droppable({
      accept: "#gallery > li",
      classes: {
        "ui-droppable-active": "ui-state-highlight"
      },
      drop: function( event, ui ) {
        imageDone( ui.draggable );
      }
    });
 
    // Let the gallery be droppable as well, accepting items from the trash
    $gallery.droppable({
      accept: "#done-list li",
      classes: {
        "ui-droppable-active": "custom-state-active"
      },
      drop: function( event, ui ) {
        toDoImage( ui.draggable );
      }
    });
 
    function imageDone( $item ) {
      $item.hide(0, function() {
        var $list = $( "ul", $doneList ).length ?
          $( "ul", $doneList ) :
          $( "<ul class='gallery ui-helper-reset'/>" ).appendTo( $doneList );
        $item.appendTo( $list ).show();
      });
    }
 
    // Image recycle function
    function toDoImage( $item ) {
      $item.hide(0, function() {
        $item
          .find( "a.ui-icon-refresh" )
            .remove()
          .end()
          .appendTo( $gallery )
          .show();
      });
    }
} );