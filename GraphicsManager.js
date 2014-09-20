var GraphicsManager = function(gameManager, rockImage, paperImage, scissorsImage) {
	
	this.setup = function(gameManager, rockImage, paperImage, scissorsImage) {
		this.canvas = document.getElementById("canvas");
		this.context = canvas.getContext("2d");
		this.gameManager = gameManager;
		
		this.rockImage = rockImage;
		this.paperImage = paperImage;
		this.scissorsImage = scissorsImage;
	};
	
	this.resize = function() {
		var ratio = 1.25;
		var maxHeight = window.innerHeight * 0.75;
		var maxWidth = window.innerWidth * 0.8;
		
		if (maxHeight < maxWidth * ratio) {
			this.canvas.height = maxHeight;
			this.canvas.width = maxHeight / ratio;
		}
		else {
			this.canvas.width = maxWidth;
			this.canvas.height = maxWidth * ratio;
		}
		
		this.outerHeight = this.canvas.height / this.gameManager.rows;
		this.outerWidth = this.canvas.width / this.gameManager.columns;
		this.heightPadding = this.outerHeight * 0.05;
		this.widthPadding = this.outerWidth * 0.05;
		this.innerHeight = this.outerHeight - (2 * this.heightPadding);
		this.innerWidth = this.outerWidth - (2 * this.widthPadding);
		
		this.cornerRadius = Math.min(this.innerHeight, this.innerWidth) * 0.10;
	};
	
	this.drawTile = function(tile, column, row) {
		var startingY = (this.outerHeight * row) + this.heightPadding;
		var startingX = (this.outerWidth * column) + this.widthPadding;
		
		var image;
		if (tile === "R")
			image = this.rockImage;
		else if (tile === "P")
			image = this.paperImage;
		else
			image = this.scissorsImage;
			
		this.context.strokeRect(startingX+(this.cornerRadius/2), startingY+(this.cornerRadius/2), this.innerWidth-this.cornerRadius, this.innerHeight-this.cornerRadius);
		this.context.drawImage(image, startingX+(this.cornerRadius/2), startingY+(this.cornerRadius/2), this.innerWidth-this.cornerRadius, this.innerHeight-this.cornerRadius);
	};
	
	this.clearContext = function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		if(STX.isAndroid && !STX.is_chrome) {
			var w=canvas.width;
			canvas.width=1;
			canvas.width=w;
		}
	};

	this.draw = function() {
		this.clearContext();
		this.context.lineJoin = "round";
		this.context.strokeStyle = "black";
		this.context.lineWidth = this.cornerRadius;
		
		for (row = 0; row < this.gameManager.rows; row++)
			for (column = 0; column < this.gameManager.columns; column++)
				this.drawTile(this.gameManager.tiles[row][column], column, row);
		
		this.context.lineWidth = this.cornerRadius / 4;
		this.context.lineJoin = "miter";
		this.context.strokeStyle = "gold";
		
		var startX = this.gameManager.selectedColumn * this.outerWidth + this.widthPadding / 2;
		var startY = this.gameManager.selectedRow * this.outerHeight + this.heightPadding / 2;
		var width = this.outerWidth - this.widthPadding;
		var height = this.outerHeight - this.heightPadding;
		this.context.strokeRect(startX, startY, width, height);
	};
	
	this.setup(gameManager, rockImage, paperImage, scissorsImage);
	this.resize();
};