

sizr.resizeOnKeyboard = true;


(function () {
	
	var p = document.getElementById('dimensions');
	
	p.ontouchstart = function () { return false; };


	sizr.on('resize', function (width, height) {
		var caption = width + ' x ' + height + 'px';
		if (sizr.screenKeyboard) caption += ' [kb]';
		
		p.style.width = width - 2 + 'px';
		p.style.height = height - 2 + 'px';
		p.style.lineHeight = height - 2 + 'px';
		p.innerHTML = caption;
	});
	
	
	sizr.on('keyboardshow', function () {
//		p.style.backgroundColor = 'darkblue';
	});
	
	
	sizr.on('keyboardhide', function () {
		p.style.backgroundColor = 'black';
	});
	
})();

