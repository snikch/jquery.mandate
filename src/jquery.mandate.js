// Copyright 2010 Mal Curtis http://mal.co.nz
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
		html5els : ['email','url'],
		rules : {},
		messages : {},

		schema : function(s){
			if('rules' in s){
				for(i in s.rules){
					this.rule(i, s.rules[i]);
				}
				delete s.rules;
			}
			$.extend(schema, s);
		},

		rule : function(a, b, c){
			this.rules[a] = typeof b == f ? b : c;
			if(typeof c != u) this.messages[a] = b;
			return this;
		},

		validate : function(form, is){
			return validate(form, is);
		}

	};
	var schema = {}, n = {t:'title',n:'name',r:'rel'}, u = 'undefined', o = 'object', f = 'function', y = 'array', d=$.Mandate;

	var opts = $.extend({
		hasFirebug : "console" in window && "firebug" in window.console,
		hasConsoleLog: "console" in window && "log" in window.console
	}, d);

	log = function(msg){
		if(!d.debug) return;
		if(typeof msg == o){
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

	validate = function (form, is){
		var s = {}, valid = true, decoratations = [], ms=$.extend({},d.messages);
		if('defaults' in schema) $.extend(s, schema.defaults);
		$.extend(true, s, fs(form));

		log('Validating form with an id of: ' + $(form).attr('id'));
		$(opts.elements, form).each(function(){
			var $this = $(this), name = $this.attr('name'), rules = $.extend(true, {}, h5($this)), em = $.extend({}, ms);
			if(typeof is != u && !$this.is(is)) return;
			// If this element is in the schema, add its rules to the rules array
			if(name in s)
			{
				$.extend(true, rules, s[name]);
			}
			// Add any rule specific messages to override the base messages
			$.each(rules, function(a,b){
				if(typeof b.m != u) em[a] = b.m;
			});
			log('Validating element with name: ' + name);

			// Test all rules
			for(var i in rules){
				// Params are either the p property of the object, or the array
				p = typeof rules[i].p != u ? rules[i].p : rules[i];
				log('Validating element: ' + name + ' with rule: ' + i);

				if(!v(this, i, p)){
					log('Using Rule: ' + em[i]);

					valid = false;
					decoratations.push({
						el: this,
						rule: i,
						m: flesh(em[i], this, p)
					});
					log('Rule: ' + i + ' failed');

					if(!d.bubble) return false;
					break;
				}
				log('Rule: ' + i + ' passed');
			}
		});


		d.decorator(form, decoratations, valid);
		return valid;

	}

	// Flesh is the templating function
	flesh = function(m, e, p){
		// Replace all {xxx} instances with their appropriate values
		m = m.replace(/{([a-z0-9.]+)}/mg, function(m,r){
			// If we've got a number, add in the param is equates to.
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
					var c = a;
					break;
				}
			}
			if(typeof m == u) return c;
			log('Modifying: ' + c + ' with modifiers: ' + m);
			uf = function(s){return s.substr(0,1).toUpperCase() + s.substr(1); }
			m = m.split('');
			for(i in m){
				switch(m[i]){
					// Upper case first letters
					case 'u':
						c = uf(c);
						break;
					case 'q':
						c = '"' + c + '"';
						break;				}
			}
			return c;
		});
		return m;
	}

	// Checks if the supplied named rule is valid against the supplied element and rule params
	v = function(el, name, params){
		log('applying rule');
		var rule = d.rules[name];
		if(!$.isArray(params)) params = [];
		return rule.apply(el, params);
	}

	fs = function(form){
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

	h5 = function($el){
		var rules = {};
		$.each(d.html5rules, function(a, b){
			if(typeof $el.attr(b) == 'undefined') return;
			rules[b] ={p: [$el.attr(b)]};
			log('Adding HTML5 element rule: ' + b);
		});
		return rules;
	}

	$.fn.validate = function(is){
		return d.validate(this, is);
	}
})(jQuery);

