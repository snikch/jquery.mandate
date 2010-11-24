// Copyright 2010 Mal Curtis http://mal.co.nz

$.Mandate.decorator = function(form, decorations){
	var feedback = $('<ul id="feedback" />');
	for(var i in decorations){
		feedback.append('<li class="error">' + decorations[i].m + '</li>');
	}
	
	$(form).before(feedback);


}
