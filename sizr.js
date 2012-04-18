
var sizr = {
	
	_busy: false,
	_listeners: {},
	_keyboardHeight: 0,
	_footer: document.createElement('span'),
	
	element: null,
	screenKeyboard: false,
	resizeOnKeyboard: false,
	currentWidth: null,
	currentHeight: null,
	
	
	on: function (eventName, listener) {
		if (!this._listeners[eventName]) this._listeners[eventName] = [];
		this._listeners[eventName].push (listener);
	},
	
	
	_trigger: function (eventName, data) {
		var listeners = this._listeners[eventName];
		if (!listeners) return;
		
		for (var i = 0, l = listeners.length; i < l; i++) {
			listeners[i].apply (window, data);
		}
	},
	
	
	_calculateSize: function () {
		var me = this,
			element = this.element;
		
		if (element && !this._busy) {
			this._busy = true;
		
			element.style.width = '';
			element.style.height = '9999px';
			
			window.setTimeout (function () {
				window.scrollTo (0, 0);
			
				window.setTimeout (function () {
					var width = window.innerWidth,
						height = window.innerHeight - me._keyboardHeight;
			
					element.style.width = width + 'px';
					element.style.height = height + 'px';
					me._footer.style.top = height + 'px';
					
					if (me.screenKeyboard && !me._keyboardHeight) {
						me._busy = false;
						me._calculateKeyboardHeight();
		
					} else {
						me._updateSize();

						window.setTimeout (function () {
							me._busy = false;
						}, 500);
					}
					
				}, 50);
			}, 50);
		}
	},
	
	
	_updateSize: function () {
		var element = this.element,
			width = element.clientWidth,
			height = element.clientHeight;
			
		if (width !== this.currentWidth || height !== this.currentHeight) {
			this.currentWidth = width;
			this.currentHeight = height;
			
			this._trigger('resize', [width, height]);
		}
	},
	
	
	init: function () {
		var me = this,
			bodyStyle = document.body.style,
			footerStyle = this._footer.style,
			element = document.getElementById('sizr-wrapper');
		
		bodyStyle.margin = bodyStyle.padding = '0';

		document.body.appendChild(this._footer);
		footerStyle.position = 'absolute';
		footerStyle.left = '-9999px';


		window.addEventListener('resize', function () { 
			me._calculateSize(); 
		}, true);

		window.addEventListener('orientationchange', function () { 
			if (me.screenKeyboard) me._keyboardHeight = 0;
		}, true);


		if (element) this.setElement(element);
	},
	
	
	setElement: function (element) {
		var me = this;

		this.element = element;
		element.style.overflow = 'hidden';
		element.addEventListener('focus', function (e) { me._handleFocus (e); }, true);
		element.addEventListener('blur', function (e) { me._handleBlur (e); }, true);

		this._calculateSize();
	},


	_handleFocus: function (e) {
		this._setKeyboard(true);
		this._calculateKeyboardHeight();
	},


	_handleBlur: function (e) {
		this._setKeyboard(false);
		this._keyboardHeight = 0;
		this._calculateSize();
	},


	_calculateKeyboardHeight: function () {
		this._footer.scrollIntoView();
		this._keyboardHeight = document.body.scrollTop;
		
		window.scrollTo (0, 0);
		this._calculateSize();		
	},
	
	
	_setKeyboard: function (onScreen) {
		this.screenKeyboard = !!onScreen;
		// todo add class
		this._trigger('keyboard' + (onScreen? 'show' : 'hide'));
	}
	
};


sizr.init();