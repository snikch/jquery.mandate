// Copyright 2010 Mal Curtis http://mal.co.nz

$.Mandate

// HTML5 Compatible Rules
// min, max, step, pattern, required
.rule('min', function(min){
	return +$(this).val()  >= min;
})

.rule('max', function(max){
	return +$(this).val()  <= max;
})

.rule('range', function(min, max){
	var val = +$(this).val();
	return val >= min && val <= max;
})

.rule('pattern', function(pattern){
	return $(this).val().match(new RegExp(pattern));
})

.rule('step', function(step){
	return +$(this).val() % step == 0;
})

.rule('required', function(){
	return $(this).val() != '';
})

.rule('minlen', function(min){
	return $(this).val().length >= min ;
})

.rule('maxlen', function(max){
	return $(this).val().length <= max;
})

.rule('rangelen', function(min, max){
	var length = $(this).val().length;
	return length >= min && length <= max;
})

.rule('email', function(){
	return $(this).val().match(/^([_a-z0-9\-\+\:']+)(\.[_a-z0-9\-\+\:]+)*@([a-z0-9-]+)(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i);
})

.rule('url', function(){
	return $(this).val().match(/^(http|https):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?/i);
})
