var upKeys = [38, 87, 73];
var downKeys = [40, 83, 75];
var leftKeys = [37, 65, 74];
var rightKeys = [39, 68, 76];

document.addEventListener('keydown', function(event) {
	var direction = "";
	
	if (upKeys.indexOf(event.keyCode) > -1)
		direction = "up";
	else if (downKeys.indexOf(event.keyCode) > -1)
		direction = "down";
	else if (leftKeys.indexOf(event.keyCode) > -1)
		direction = "left";
	else if (rightKeys.indexOf(event.keyCode) > -1)
		direction = "right";
		
	if (direction !== "") {
		makeMove(direction);
	}
});

var firstTouchX = null
var firstTouchY = null;

document.body.addEventListener("touchstart", function(evt) {
	evt.preventDefault();
	firstTouchX = evt.changedTouches[0].clientX;
	firstTouchY = evt.changedTouches[0].clientY;
}, false);

document.body.addEventListener("touchend", function(evt) {
	evt.preventDefault();
	var lastTouch = evt.changedTouches[0];
	var direction = "";
	
	if (firstTouchX && firstTouchY)
	{
		var dX = lastTouch.clientX - firstTouchX;
		var dY = lastTouch.clientY - firstTouchY;
		var absDX = Math.abs(dX);
		var absDY = Math.abs(dY);
		
		if (Math.abs(dX) > Math.abs(dY))
		{
			if (dX > 0)
				direction = "right";
			else
				direction = "left";
		}
		else
		{
			if (dY > 0)
				direction = "down";
			else
				direction = "up";
		}
		
		firstTouchX = null;
		firstTouchY = null;
	}
	
	if (direction !== "") {
		makeMove(direction);
	}
}, false);

document.getElementById("instructions").addEventListener("click", function(evt) {
	window.open("instructions.html", '_blank');
}, false);