$(document).ready(function(){
  $("#celebs tbody tr:even").addClass('zebra');
  $("#celebs tbody tr").hover(function(){
    $(this).addClass('zebraHover');//When mouseover, change the color by using the class "zebreHover"
    }, function(){
    $(this).removeClass('zebraHover');//When mouseleave, restore the color by removing the class "zebreHover"
  });
});

