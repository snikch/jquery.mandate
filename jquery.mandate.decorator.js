// Copyright 2010 Mal Curtis http://mal.co.nz

$.Mandate.decorator = function(form, decorations){
	var e = $('#feedback', form.parent());
	if(!e.length > 0){
		e = $('<ul id="feedback" />');
		$(form).before(e);
	}else{
		e.children().remove();
	}
	for(var i in decorations){
		e.append('<li class="error">' + decorations[i].m + '</li>');
	}
}
