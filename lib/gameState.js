(function(window){
	var gameState = window.GameState = function(){
		this.elements = [];
		this.goodGuy = null;
	};
	gameState.prototype.addElement = function(element){
		if(element instanceof GoodGuy){
			this.goodGuy = element;
		}
		this.elements.push(element);
	};
	gameState.prototype.getElements = function(){
		return this.elements;
	};
	gameState.prototype.remove = function(index){
		this.elements.splice(index, 1);
	};
	gameState.prototype.getGoodGuy = function(){
		return this.goodGuy;
	};
	gameState.prototype.moveBadGuys = function(){
	};
})(window);