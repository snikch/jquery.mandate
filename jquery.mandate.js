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
		html5rules : ['min','max','step','required','pattern'],
		rules : {},

		schema : function(s){
			if('rules' in s){
				for(i in s.rules){
					this.rule(i, s.rules[i]);
				}
				delete s.rules;
			}
			$.extend(schema, s);
		},

		rule : function(name, func){
			this.rules[name] = func;
			return this;
		},

		validate : function(form){
			return validate(form);
		}

	};
	var schema = {}, n = {t:'title',n:'name',r:'rel'}, u='undefined', o='object';

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

		if('defaults' in schema) $.extend(opts, schema.defaults);

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
				// If the rule params are an object, return the param property
				p = typeof rules[i] == o ? rules[i].p : rules[i];
				log('Validating element: ' + name + ' with rule: ' + i);
				if(!applyRule(this, i, p)){
					valid = false;
					decoratations.push({
						el: this,
						rule: i,
						m: flesh(rules[i].m, this, p)
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

	flesh = function(m, e, p){
		m = m.replace(/{([a-z0-9.]+)}/mg, function(m,r){
			if(parseInt(r) > 0)
			{
				return p[parseInt(r)-1];
			}
			// Get the modifiers
			m = r.split('.')[1];
			// Get the replacements
			r = r.split('.')[0].split('');
			for(i in r){
				a = $(e).attr(n[r[i]]);
				if(typeof a != u){
					var v = a;
					break;
				}
			}
			if(typeof m == u) return v;
			log('Modifying: ' + v + ' with modifiers: ' + m);
			uf = function(s){return s.substr(0,1).toUpperCase() + s.substr(1); }
			m = m.split('');
			for(i in m){
				switch(m[i]){
					// Upper case first letters
					case 'u':
						v = uf(v);
						break;
					case 'q':
						v = '"' + v + '"';
						break;
				}
			}
			return v;
		});
		return m;
	}

	applyRule = function(el, name, params){
		var rule = $.Mandate.rules[name];
		return rule.apply(el, params);
	}

	formSchema = function(form){
		for(var i in schema){
			if($(form).is(i)){
				log('Found schema for: ' + i);
				return schema[i];
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
