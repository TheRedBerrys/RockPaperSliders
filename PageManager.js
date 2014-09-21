var gameManager, graphicsManager;

var currLevel = getLevel();
var completedContainer = document.getElementById("completed-container");
var levelContainer = document.getElementById("level-container");
	
var imagesLoaded = {};
imagesLoaded.rock = false;
imagesLoaded.paper = false;
imagesLoaded.scissors = false;

var checkImages = function() {
	if (imagesLoaded.rock && imagesLoaded.paper && imagesLoaded.scissors)
		reset();
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

var reset = function() {
	gameManager = new GameManager(Levels[currLevel]);
	graphicsManager = new GraphicsManager(gameManager, rockImage, paperImage, scissorsImage);
	redraw();
};

var startNextGame = function() {
	var tileCompleted = gameManager.getFirstTile();
	
	if (tileCompleted === "R") {
		Levels[currLevel].completed = "R" + Levels[currLevel].completed.substring(1);
	}
	else if (tileCompleted === "P") {
		Levels[currLevel].completed = Levels[currLevel].completed.substring(0, 1) + "P" + Levels[currLevel].completed.substring(2);
	}
	else if (tileCompleted === "S") {
		Levels[currLevel].completed = Levels[currLevel].completed.substring(0, 2) + "S";
	}
	
	if (Levels[currLevel].completed === "RPS") {
		currLevel++;
	}
	
	reset();
};

var redraw = function() {
	completedContainer.innerHTML = Levels[currLevel].completed;
	levelContainer.innerHTML = (currLevel + 1) + " / " + Levels.length;
	graphicsManager.draw(); 
};

window.onresize = function() {
	graphicsManager.resize();
	redraw(); 
};

var makeMove = function(direction) {
	gameManager.makeMove(direction);
	redraw();
	if (gameManager.isSuccess())
		startNextGame();
	else if (gameManager.isFailure())
		reset();
};

var setCookie = function(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
};

var setLevel = function() {
	setCookie("level", currLevel, 1000);
};

var getCookie = function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
};

var getLevel = function() {
	var levelCookie = getCookie("level");
	if (levelCookie == "") {
		return 0;
	}
	else {
		return parseInt(levelCookie);
	}
};