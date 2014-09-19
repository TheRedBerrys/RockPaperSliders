GameManager = function(rows, columns, seed) {
	Math.seedrandom(seed);
	
	this.getRandomInteger = function(exclusiveEnd) {
		return Math.floor((Math.random() * exclusiveEnd));
	};
	
	this.isSuccess = function() {
		var tile = this.tiles[0][0];
		
		for (row = 0; row < this.rows; row++)
			for (column = 0; column < this.columns; column++)
				if (this.tiles[row][column] !== tile)
					return false;
		
		return true;
	};
	
	this.isFailure = function() {
		var tile = this.tiles[this.selectedRow][this.selectedColumn];
		
		var touchingTiles = [];
		if (this.selectedRow > 0)
			touchingTiles.push(this.tiles[this.selectedRow - 1][this.selectedColumn]);
		if (this.selectedRow < this.rows - 1)
			touchingTiles.push(this.tiles[this.selectedRow + 1][this.selectedColumn]);
		if (this.selectedColumn > 0)
			touchingTiles.push(this.tiles[this.selectedRow][this.selectedColumn - 1]);
		if (this.selectedColumn < this.columns - 1)
			touchingTiles.push(this.tiles[this.selectedRow][this.selectedColumn + 1]);
		
		for (curr in touchingTiles)
			if (touchingTiles[curr] !== tile)
				return false;
	
		return true;
	};
	
	this.getNextTile = function() {
		var rand = this.getRandomInteger(3);
		if (rand === 0)
			return "R";
		else if (rand === 1)
			return "P";
		else
			return "S";
	};
	
	this.getTiles = function() {
		var newTiles = [];
		for (row = 0; row < this.rows; row++)
		{
			var currTiles = [];
			for (column = 0; column < this.columns; column++)
			{
				currTiles.push(this.getNextTile());
			}
			newTiles.push(currTiles);
		}
		return newTiles;
	};
	
	this.makeMove = function(moveType) {
		var newRow = this.selectedRow;
		var newColumn = this.selectedColumn;
		
		if (moveType === "up") {
			newRow--;
		}
		else if (moveType == "down") {
			newRow++;
		}
		else if (moveType == "left") {
			newColumn--;
		}
		else if (moveType == "right") {
			newColumn++;
		}
		
		var oldTile = this.tiles[this.selectedRow][this.selectedColumn];
		var newTile = this.tiles[newRow][newColumn];
		if (!newTile || oldTile === newTile)
			return;
		
		this.tiles[newRow][newColumn] = this.getWinner(oldTile, newTile);
		this.selectedRow = newRow;
		this.selectedColumn = newColumn;
	};
	
	this.getWinner = function(oldTile, newTile) {
		var currTiles = [oldTile, newTile];
		if (currTiles.indexOf("R") > -1 && currTiles.indexOf("P") > -1)
			return "P";
		else if (currTiles.indexOf("R") > -1 && currTiles.indexOf("S") > -1)
			return "R";
		else if (currTiles.indexOf("P") > -1 && currTiles.indexOf("S") > -1)
			return "S";
		
		return "BAD";
	};
	
	this.rows = rows;
	this.columns = columns;
	this.tiles = this.getTiles();
	this.selectedRow = this.getRandomInteger(this.rows);
	this.selectedColumn = this.getRandomInteger(this.columns);
};