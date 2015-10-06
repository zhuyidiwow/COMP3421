$(document).ready(function() {
  var $window = $(window),
  $navigation = $("#navigation");
  $navigation.data("top",$navigation.offset().top);

  $window.scroll(function() {
    if (!$navigation.hasClass("fixed") && ($window.scrollTop() > $navigation.offset().top)) {
        $navigation.addClass("fixed");
        //Your Code Here
    }
    else if ($navigation.hasClass("fixed") && ($window.scrollTop() < $navigation.data("top"))) {
        $navigation.removeClass("fixed");
        //Your Code Here
    }
  }); 
});
//$navigation.data("top")