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

var firstTouch;

document.body.addEventListener("touchstart", function(evt) {
	evt.preventDefault();
	firstTouch = evt.changedTouches[0];
}, false);

document.body.addEventListener("touchend", function(evt) {
	evt.preventDefault();
	var lastTouch = evt.changedTouches[0];
	var direction = "";
	
	if (firstTouch)
	{
		var dX = lastTouch.clientX - firstTouch.clientX;
		var dY = lastTouch.clientY - firstTouch.clientY;
		var absDX = Math.abs(dX);
		var absDY = Math.abs(dY);
		
		if (absDX > absDY)
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
		
		firstTouch = undefined;
	}
	
	if (direction !== "") {
		makeMove(direction);
	}
}, false);