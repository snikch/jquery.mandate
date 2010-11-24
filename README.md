jQuery Mandate
=========================

A super lightweight jQuery form validation plugin that provides flexible JSON Rule Schemas.

The current king of jQuery validation comes in at 14kb minified, and pretty much every other jQuery validation plugin relies on class="validate(min)" crap. Screw that, I don't think that kind of application logic should be so tightly integrated into the form elements. Mandate allows for powerful validation schemas, along with implementing the HTML5 validation attributes: min, max, step and pattern.

Rules are easy to make and add, as are the error decorators.

Oh, and it's going to achieve this in under 2kb when minified.

Status
-------------------------

Oh, I've only just begun. I've got it validating against the simple rules I've supplied, and passing elements with errors to the decorator - the rest is just polish.

To Do
-------------------------
* Implement messages at a rule, and schema level
* Implement HTML5 input types as rules (email, url, number, color etc.)
* Complete all common rules (email, url, pattern, alpha, alphanumeric etc.)
* Include the form="myform" attribute for inputs that are not descendants of the form node (http://www.w3schools.com/html5/html5_form_attributes.asp)
* It would be cool to optionally pass an event to the validate method so that rules could optionally make an async call, with the result determining wether to refire the event. e.g. call twitter api to confirm a supplied twitter user exists.


Implementation
-------------------------

Schemas are an object containing jQuery selectors for forms, with element names that contain a list of rules to implement. A defaults object can be provided that allows you to provide page wide validation for elements that are likely to be in multiple forms.

This defines a page wide schema for elements with name="name", and tells the input name="summary" inside form id form1 that it must be at least 5, and no more than 100 characters.

	$.Mandate.schema = {
		defaults : {
			name : {minlen : {p:[3], m:'{n.u} needs to be at least {1} characters long'}, maxlen: [50]}
		},
		'#form1' : {
			summary : { minlen : [5], maxlen : [100]}
		}
	}

	$('form').submit(function(e){
		if(!$(this).validate()) e.preventDefault();
	});

Templates
------------------------
Templating implementation is still incomplete, and only works for messages passed directly in the schema (no defaulting or bubbling yet).

	Example
	"{tn} needs to be at least {1} characters long" 

In the first replacement this will look for a title tag (t) and if that doesn't exist it will use the name (n). {1} Refers to the first parameter passed to the rule, so if the schema was minlen : [3] then it would replace {1} with 3.

You can also modify the name values with modifiers after a period, such as u which will uppercase the first letter e.g. {tn.u}.

Values: t: title, n: name, l:label, r: rel
Modifiers: u: upper case first letter, q: wrap in quotes

More to come in this space.


Why Mandate?
------------------------
Because to mandate something is to require it, and we're mandating that you abide by our rules.

Oh and because it sounds like 'Man date'.
