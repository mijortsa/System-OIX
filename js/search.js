(function($) {
	jQuery.expr[':'].Contains = function(a,i,m){
      return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
  };
  function listFilter(header, list) { 
	// header is any element, list is an unordered list
   // create and add the filter form to the header
    var form = $("<form>").attr({"class":"filterform","action":"#"}),
        input = $("<input>").attr({"class":"filterinput","type":"text","id":"searchinput","placeholder":"Type to Search..."});
    $(form).append(input).appendTo(header);

     $(input)
		.click( function(){
			$(this).val("");
			$(list).find(".ui-listview-item").slideUp().hide();
		})
		.keyup( function () {
			var filter = $(this).val();
			if(filter) {
				// this finds all links in a list that contain the input,
				// and hide the ones not containing the input while showing the ones that do
				$(list).find("a:not(:Contains(" + filter + "))").parent().slideUp();	
				$(list).find("a:Contains(" + filter + ")").parent().slideDown();
				$(list).show();
			} 
			else if(filter==""){
				$(list).find(".ui-listview-item").slideUp().hide();
			}
			else{
				$(list).hide();
			}
			return false;
		})
		.focusout(function(){
         
		});
  }

  //ondomready
	$(document).ready(function() {
		$(document).keydown(function() {
			$("input").focus();
		});
		listFilter($("#header"), $("#listSearch"));
		//var ars = $("#listSearch").html();
		//$("#test").text(ars);
	});
}) (jQuery);
