
var busy = false,
	p = document.getElementsByTagName ('p')[0];	

p.ontouchstart = function () { return false; };

function sizeScreen () {

	if (!busy) {
		busy = true;
	
		p.style.width = '';
		p.style.height = '9999px';
		p.style.border = 'none';
		p.innerHTML = '';
		
		window.setTimeout (function () {
			window.scrollTo (0, 0);
		
			window.setTimeout (function () {
				var width = window.innerWidth, //document.body.clientWidth,
					height = window.innerHeight; //document.body.clientHeight;
		
				p.innerHTML = width + ' x ' + height + 'px';
				
				p.style.width = width - 2 + 'px';
				p.style.height = height - 2 + 'px';
				p.style.lineHeight = height - 2 + 'px';
				p.style.border = '1px solid red';
	
				window.setTimeout (function () {
					busy = false;
				}, 500);
				
			}, 100);
		}, 100);
	}
}


window.onresize	= sizeScreen;
sizeScreen ();
