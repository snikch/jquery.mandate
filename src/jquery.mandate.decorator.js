// Copyright 2010 Mal Curtis http://mal.co.nz

$.Mandate.decorator = function(form, decorations, valid){
	var e = $('#errorbox', form.parent());
	if(valid)
	{
		e.remove();
		return;
	}
	if(!e.length > 0){
		e = $('<div id="errorbox"><ul /></div>');
		$(form).before(e);
	}else{
		e.find('ul').children().remove();
	}
	$.each(decorations, function(k,v){
		e.find('ul').append('<li class="error">' +v.m + '</li>');
	});
}
