// Copyright 2010 Mal Curtis http://mal.co.nz

$.Mandate

// HTML5 Compatible Rules
// min, max, step, pattern, required
.rule('min', '{n.u} needs to be at least {1}', function(min){
	return +$(this).val()  >= min;
})

.rule('max', '{n.u} needs to be no more than {1}',  function(max){
	return +$(this).val()  <= max;
})

.rule('range', '{n.u} needs to be between {1} and {2}',  function(min, max){
	var val = +$(this).val();
	return val >= min && val <= max;
})

.rule('pattern', '{n.u} does not match the required pattern',  function(pattern){
	return $(this).val().match(new RegExp(pattern));
})

.rule('step', '{n.u} must be divisible by {1}',  function(step){
	return +$(this).val() % step == 0;
})

.rule('required', '{n.u} is required',  function(){
	return $(this).val() != '';
})

.rule('minlen', '{n.u} needs to be at least {1} chars long', function(min){
	return $(this).val().length >= min ;
})

.rule('maxlen', '{n.u} needs to be no more than {1} chars long', function(max){
	return $(this).val().length <= max;
})

.rule('rangelen', '{n.u} needs to be between {1} and {2} chars long', function(min, max){
	var length = $(this).val().length;
	return length >= min && length <= max;
})

.rule('email', '{n.u} is not an email', function(){
	return $(this).val().match(/^([_a-z0-9\-\+\:']+)(\.[_a-z0-9\-\+\:]+)*@([a-z0-9-]+)(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i);
})

.rule('url', '{n.u} is not a url', function(){
	return $(this).val().match(/^(http|https):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?/i);
})

