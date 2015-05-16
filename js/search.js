(function($) {
	jQuery.expr[':'].Contains = function(a,i,m){
      return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
  };
	// accending sort
	function asc_sort(a, b){
		return ($(b).text()) < ($(a).text()) ? 1 : -1;    
	}
	// decending sort
	function dec_sort(a, b){
		return ($(b).text()) > ($(a).text()) ? 1 : -1;    
	}
	//remove duplicate
	function removeDup(a){
		var seen = {};
		$(a).each(function() {
			var txt = $(this).text();
				if (seen[txt])
					$(this).remove();
				else
					seen[txt] = true;
		});
	}
	function listFilter(header, list) { 
	// header is any element, list is an unordered list
   // create and add the filter form to the header
    var form = $("<div>").attr({"class":"filterform"}),
        input = $("<input>").attr({"class":"filterinput","type":"text","id":"searchinput","placeholder":"Search"});
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
				$(list).find("a:not(:Contains(" + filter + "))").parent().slideUp().hide();
				$(list).find("a:Contains(" + filter + ")").parent().slideDown().show();
				$(list).show();				
			}
			else if(filter==""){$(list).find(".ui-listview-item").slideUp().hide();}
			else{$(list).hide();}
			return false;
		})
		.keypress(function(e){
			if(e.which==13){
				var a = $(list).find(".ui-listview-item:visible").first().children().attr('desktop');
				Utils.run_desktop(a);
			}
		});
  }
  //ondomready
	$(document).ready(function() {
		$(document).keydown(function() {$("input").focus();});
		listFilter($("#header"), $("#listSearch"));
		$("#listSearch .ui-listview-item").sort(asc_sort).appendTo('#listSearch');
		removeDup("#listSearch .ui-listview-item");
	});
}) (jQuery);
