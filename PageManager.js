var gameManager, graphicsManager;

var rows = 4;
var columns = 4;
var seed = 2;
	
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
	gameManager = new GameManager(rows, columns, seed);
	graphicsManager = new GraphicsManager(gameManager, rockImage, paperImage, scissorsImage);
	redraw();
};

var startNextGame = function() {
	seed++;
	reset();
};

var redraw = function() { 
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