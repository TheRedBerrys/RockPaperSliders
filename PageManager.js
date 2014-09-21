var gameManager, graphicsManager;

var currLevel = 0;
var currCompleted = "___";
getLevel();
var completedContainer = document.getElementById("completed-container");
var levelContainer = document.getElementById("level-container");
	
var imagesLoaded = {};
imagesLoaded.rock = false;
imagesLoaded.paper = false;
imagesLoaded.scissors = false;

var checkImages = function() {
	if (imagesLoaded.rock && imagesLoaded.paper && imagesLoaded.scissors)
		reset(false);
};

var rockImage = new Image();
var paperImage = new Image();
var scissorsImage = new Image();

rockImage.src = "Rock.png";
paperImage.src = "Paper.png";
scissorsImage.src = "Scissors.png";

rockImage.onload = function() {
	imagesLoaded.rock = true;
	checkImages();
};

paperImage.onload = function() {
	imagesLoaded.paper = true;
	checkImages();
};

scissorsImage.onload = function() {
	imagesLoaded.scissors = true;
	checkImages();
};

var reset = function(wait) {
	gameManager = new GameManager(Levels[currLevel]);
	graphicsManager = new GraphicsManager(gameManager, rockImage, paperImage, scissorsImage);
	redraw(wait);
};

var startNextGame = function() {
	var tileCompleted = gameManager.getFirstTile();
	
	if (tileCompleted === "R") {
		currCompleted = "R" + currCompleted.substring(1);
	}
	else if (tileCompleted === "P") {
		currCompleted = currCompleted.substring(0, 1) + "P" + currCompleted.substring(2);
	}
	else if (tileCompleted === "S") {
		currCompleted = currCompleted.substring(0, 2) + "S";
	}
	
	if (currCompleted === "RPS") {
		currLevel++;
		currCompleted = "___";
	}
	
	setLevel();
	reset(true);
};

var redraw = function(wait) {
	completedContainer.innerHTML = currCompleted;
	levelContainer.innerHTML = (currLevel + 1) + " / " + Levels.length;
	if (wait) {
		setTimeout(1000, graphicsManager.draw());
	}
	else {
		graphicsManager.draw();
	}
};

window.onresize = function() {
	graphicsManager.resize();
	redraw(false); 
};

var makeMove = function(direction) {
	gameManager.makeMove(direction);
	redraw(false);
	if (gameManager.isSuccess())
		startNextGame();
	else if (gameManager.isFailure())
		reset(true);
};

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
};

function setLevel() {
	setCookie("level", currLevel + "|" + currCompleted, 1000);
};

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
};

function getLevel() {
	var levelCookie = getCookie("level");
	if (levelCookie == "") {
		currLevel = 0;
		currCompleted = "___";
	}
	else {
		var split = levelCookie.split("|");
		currLevel = parseInt(split[0]);
		currCompleted = split[1];
	}
};