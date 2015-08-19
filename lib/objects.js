(function(window){
	var Sprites = {
			Jake: 'images/sprites/sprite-jake.png',
			Rose: 'images/sprites/sprite-rose.png',
			Kaboom: 'images/sprites/kaboom.png'
		};

	var Enemy = function(x, y, maxX, maxY){
		this.x = x;
		this.y = y;
		this.max = {x: maxX, y: maxY};
		this.sprite = new Image();
		this.sprite.src = Sprites.Rose;
	};

	Enemy.prototype.Move = function(){
		if(this.x > this.max.x)
		{
			this.y += 30;
			this.x = 0;
		}
		this.x += 1;
	};

	var GoodGuy = function(x,y){
		this.x = x;
		this.y = y;
		this.sprite = new Image();
		this.sprite.src = Sprites.Jake;
	};
	GoodGuy.prototype.Move = function(x,y){
	};

	window.Enemy = Enemy;
	window.GoodGuy = GoodGuy;
})(window);