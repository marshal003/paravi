(function($){
	
	/** JS for configuration
	 *  This is for Option 1 - Configuration using End point  **/
	$('.insurance-form').on('submit', function(e) {
	    e.preventDefault();
	    var result = { };

	    $.each($('.insurance-form').serializeArray(), function() {
	        result[this.name] = this.value;
	    });
	    
	    $.ajax({
			type: "POST",
  		  	url: '/create-personalized-video/',
  		  	data: result,
  		  	success: function(data, textStatus, jQxhr){
  		  		window.location.href = "/success?request_id=" + data["request_id"] + "&job_id=" + data["job_id"] 
  		  	},
  		  	error: function(jqXhr, textStatus, errorThrown){
  		  		showError(errorThrown);
  		  	}
		});
	});
	
	
	$(".cal-total").on('change', function(e) {
		var payout = $('.payout').val(),
			duration = $('.duration').val();
		$(".amount").val(payout*duration*12 *1.25);
	});


	/** JS common for all error messages **/
	function showError(message) {
		$(".dump-filepath-error").css("display", "block");
		$(".dump-filepath-error").html(message);
		$(".dump-filepath-error").delay(3000).fadeOut();
	}

})(jQuery);
