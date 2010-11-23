jQuery Mandate
=========================

A super lightweight jQuery form validation plugin that provides flexible JSON Rule Schemas.

The current king of jQuery validation comes in at 14kb minified, and pretty much every other jQuery validation plugin relies on class="validate(min)" crap. Screw that, I don't think that kind of application logic should be so tightly integrated into the form elements. Mandate allows for powerful validation schemas, along with implementing the HTML5 validation attributes: min, max, step and pattern.

Rules are easy to make and add, as are the error decorators.

Oh, and it's going to achieve this in under 2kb when minified.

Status
-------------------------

Oh, I've only just begun.

To Do
-------------------------
* Implement messages at a rule, and schema level
* Implement HTML5 input types as rules (email, url, number, color, )
* Complete all common rules (email, url, pattern, alpha, alphanumeric etc.)
* Include the form="myform" attribute for inputs that are not descendants of the form node (http://www.w3schools.com/html5/html5_form_attributes.asp)


Implementation
-------------------------

Schemas are an object containing jQuery selectors for forms, with element names that contain a list of rules to implement. A defaults object can be provided that allows you to provide page wide validation for elements that are likely to be in multiple forms.

This defines a page wide schema for elements with name="name", and tells the input name="summary" inside form id form1 that it must be at least 5, and no more than 100 characters.

	$.Mandate.schema = {
		defaults : {
			name : {minlen : [3], maxlen: [50]}
		},
		'#form1' : {
			summary : { minlen : [5], maxlen : [100]}
		}
	}

	$('form').submit(function(e){
		if(!$(this).validate()) e.preventDefault();
	});

Why Mandate?
------------------------
Because to mandate something is to require it, and we're mandating that you abide by our rules.

Oh and because it sounds like 'Man date'.
