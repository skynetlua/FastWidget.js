

var FastWidget = (function() {
	var assert = console.assert;
	var log    = console.log;
	var create_widget;
	function Widget(name) {
		this._name = name;
	}
	Widget.prototype = {
		set: function() {
			for (var i = 0, len = arguments.length; i < len; i++) {
				var arg = arguments[i];
				if (arg instanceof Widget) {
					this._childs = this._childs || [];
					this._childs.push(arg);
				} else {
					if (typeof(arg) === "string") {
						this._text = arg;
					} else if (typeof(arg) === "number") {
						this._text = arg.toString();
					} else if (typeof(arg) === "object") {
						this._props = this._props || {};
						for (k in arg) {this._props[k] = arg[k];}
					}else{
						assert(false);
					}
				}
			}
			return this;
		},
		addchild:function(child) {
			this._childs = this._childs || [];
			this._childs.push(child);
			return this;
		},
		new:function() {
			var child = create_widget.apply(null, arguments);
			this.addchild(child);
			return child;
		},
		batch:function(name, args) {
			var arg;
			var child;
			for (var i = 0; i < args.length; i++) {
				arg = args[i];
				child = create_widget(name);
				if (typeof(arg) == "string" || typeof(arg) == "number") {
					child.set(arg);
				}else if (typeof(arg) === "object"){
					child.set.apply(child, arg);
				}else{
					assert(false);
				}
				this.addchild(child);
			}
			return this;
		},
		setprop:function(key, val) {
			this._props = this._props || {};
			if (arguments.length <= 2) {
				this._props[key] = val;
			}else{
				assert(arguments.length%2 == 0);
				for (var i = 0, len = arguments.length; i < len; i+=2) {
					this._props[arguments[i]] = arguments[i+1];
				}
			}
			return this;
		},
		echo: function() {
			if(this._name === "txt"){
				var retval = self._text || "";
				if (this._childs){
					for (var i = 0, len = this._childs.length; i < len; i++) {
						retval = retval+this._childs[i].echo();
					}
				}
				return retval;
			}
			var retval = "<" + this._name + " ";
			if (this._props) {
				for (k in this._props) {
					if (typeof(this._props[k]) === "string") {
						retval = retval+k+"=\""+this._props[k]+"\" ";
					} else {
						retval = retval+k+"="+this._props[k]+" ";
					}
				}
			}
			if (!this._text && !this._childs) {
				return retval + "/>";
			}
			retval = retval+ ">"+ (this._text || "")
			if (this._childs) {
				for (var i = 0, len = this._childs.length; i < len; i++) {
					retval = retval + this._childs[i].echo();
				}
			}
			return retval+ "</"+ this._name+">";
		},
		goodecho: function(sep, depth) {
			sep = sep || "\n";
			depth = depth || 0;
			var indent = "";
			for (var i = 0; i < depth; i++) {indent = indent+"	";}
			if(this._name === "txt"){
				var retval = indent+(self._text || "");
				if (this._childs){
					for (var i = 0, len = this._childs.length; i < len; i++) {
						retval = retval+this._childs[i].echo();
					}
				}
				return retval;
			}
			var props = "";
			if (this._props) {
				for (k in this._props) {
					if (typeof(this._props[k]) === "string") {
						props = props+k+"=\""+this._props[k]+"\" ";
					} else {
						props = props+k+"="+this._props[k]+" ";
					}
				}
			}
			if (!this._text && !this._childs) {
				return indent+"<"+this._name+" "+props+"/>"+sep;
			}
			var preseq = sep;
			var suindent = indent;
			var retval = this._text || "";
			if (this._childs) {
				for (var i = 0, len = this._childs.length; i < len; i++) {
					retval = retval+this._childs[i].goodecho(sep, depth + 1);
				}
			} else {
				preseq = "";
				suindent = "";
			}
			return indent+"<"+this._name+" "+props+">"+preseq+retval+suindent+"</"+this._name+">"+sep;
		},
		show:function(id) {
			document.getElementById(id).innerHTML = this.echo();
		}
	};
	create_widget = function(name) {
		var wgt = new Widget(name);
		if (arguments.length > 1) {
			wgt.set.apply(wgt, [].slice.call(arguments, 1));
		}
		return wgt;
	};
	return create_widget;
})();


	
