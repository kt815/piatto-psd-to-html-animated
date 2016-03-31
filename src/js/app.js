

$(document).ready(function() {
    console.log('ok') 

		// browser window scroll (in pixels) after which the "back to top" link is shown
		var offset = 300,
		//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
		offset_opacity = 2000,
		//duration of the top scrolling animation (in ms)
		scroll_top_duration = 700,
		//grab the "back to top" link
		$back_to_top = $('.cd-top');
		$next_to_bottom = $('.cd-bottom');
		                             
	//hide or show the "back to top" link

	$(window).scroll(function(){
		( $(this).scrollTop() < offset ) ? $next_to_bottom.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible');
	});

	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible');
	});


	//smooth scroll to top
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});


	$next_to_bottom.on('click', function(event){
	    	event.preventDefault();
	    	$('body,html').animate({
			scrollTop: $(document).height() ,
			}, scroll_top_duration
                );
	});

// Scroll menu items
// Attach the click event
$('a[href*=#menu]').on("click", function(event) {
   			event.preventDefault();
   			var target = $(this).attr("href"); //Get the target
            var offset = $(target).offset();
    		var scrollToPosition = offset.top;
    
    		$('body,html').animate({
    		'scrollTop': scrollToPosition , 
    	    }, 700
    	         );
});

$("a[data-gallary*=leanModal]").leanModal({ top : 100, closeButton: ".modal_close" });

});

