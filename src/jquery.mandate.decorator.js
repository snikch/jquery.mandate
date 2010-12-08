// Copyright 2010 Mal Curtis http://mal.co.nz

$.Mandate.decorator = function(form, decorations){
	var e = $('#errorbox', form.parent());
	if(!e.length > 0){
		e = $('<div id="errorbox"><ul /></div>');
		$(form).before(e);
	}else{
		e.find('ul').children().remove();
	}
	for(var i in decorations){
		e.find('ul').append('<li class="error">' + decorations[i].m + '</li>');
	}
}
