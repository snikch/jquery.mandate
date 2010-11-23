// Copyright 2010 Mal Curtis http://mal.co.nz
if (typeof jQuery == 'undefined') throw("jQuery Required");

(function($){
	// Public General Plugin methods $.Mandate
	$.Mandate = {
		auto : false,
		blur : true,
		bubble : true,
		debug : false,
		decorator : false,
		elements: 'input[type!="submit"], select, textarea',
		html5rules : ['min','max','step','required'],
		rules : {},
		schema : {},
		
		rule : function(name, func){
			this.rules[name] = func;
			return this;
		},

		validate : function(form){
			return validate(form);
		}

	};

	var opts = $.extend({
		hasFirebug : "console" in window && "firebug" in window.console,
		hasConsoleLog: "console" in window && "log" in window.console
	}, $.Mandate);

	log = function(msg){
		if(!$.Mandate.debug) return;
		if(typeof msg == 'object'){
			var m ='';
			for(var i in msg){
				m += i + ' = ' + msg[i] + "\n";
			}
			msg = m;
		}
		msg = "[Mandate] " + msg;
		opts.hasFirebug ?
			console.log(msg) :
			opts.hasConsoleLog ?
				window.console.log(msg) :
				alert(msg);
	}

	validate = function (form){
		opts = $.extend({}, opts, formSchema(form));

		if('defaults' in $.Mandate.schema) $.extend(opts, $.Mandate.schema.defaults);

		var valid = true;
		var decoratations = [];

		log('Validating form with an id of: ' + $(form).attr('id'));
		$(opts.elements, form).each(function(){
			var $this = $(this);
			var name = $this.attr('name');
			var rules = $.extend({}, html5Rules($this));
			if(name in opts)
			{
				$.extend(rules, opts[name]);
			}
			log('Validating element with name: ' + name);
			for(var i in rules){
				log('Validating element: ' + name + ' with rule: ' + i);
				if(!applyRule(this, i, rules[i])){
					valid = false;
					decoratations.push({
						el: this,
						rule: i
					});
					log('Rule: ' + i + ' failed');

					if(!$.Mandate.bubble) return false;
					break;
				}		
				log('Rule: ' + i + ' passed');
			}
		});

		log(decoratations);

		decorate(form, decoratations);	
		return valid;

	}
	
	decorate = function(form, decorations){
		$.Mandate.decorator(form, decorations);
	}

	applyRule = function(el, name, params){
	//	params.unshift($el);
		var rule = $.Mandate.rules[name];
		return rule.apply(el, params);	
	}

	formSchema = function(form){
		for(var i in $.Mandate.schema){
			if($(form).is(i)){
				log('Found schema for: ' + i);
				return $.Mandate.schema[i];
			}else{
				log('Form is NOT: ' + i);
			}
		}
		log('Found no schema for this form');
		return {};
	}

	html5Rules = function($el){
		var rules = {};
		$.each($.Mandate.html5rules, function(k, v){
			if(typeof $el.attr(v) == 'undefined') return;
			rules[v] = [$el.attr(v)];
			log('Adding HTML5 element rule: ' + v);
		});
		return rules;
	}

	$.fn.validate = function(){
		return $.Mandate.validate(this);
	}
})(jQuery);
