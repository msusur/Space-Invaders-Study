(function (document) {
	var ctx = document.getElementById("canvas").getContext("2d"),
		Sprites = {
			Player: 'images/sprites/player.png',
			Kaboom: 'images/sprites/kaboom.png',
			Missle: 'images/sprites/sprite-jake.png',
			Alien3: 'images/sprites/alien_3.png'
		},
		Elements = {
			Player: {
				X: 0,
				Y: 0,
				width: 100,
				height: 50,
				Sprite: null,
				MissileReady: true
			},
			Alien: {
				X: 0,
				Y: 0,
				width: 50,
				height: 50,
				DrawState: 0,
				Direction: true,
				Sprite: null
			}
		},
		gameState = new GameState(),
		KeyCodes = {
			Enter: 13,
			Esc: 90,
			Space: 32,
			UpArrow: 38,
			DownArrow: 40,
			RightArrow: 39,
			LeftArrow: 37
		};
		Operations = {
		Enter: function () { alert('Pew!'); },
		Esc: function () { alert('Escape!'); },
		Space: function () {
			if (Elements.Player.MissileReady) {
				Elements.Missile = {
					X: Elements.Player.X + 25,
					Y: Elements.Player.Y,
					width: 12,
					height: 24,
					DrawState: 0,
					Sprite: createSprite("Missle"),
					Speed: 2
				};
			}
			Elements.Player.MissileReady = false;
		},
		RightArrow: function () { Elements.Jake.X += STEP; },
		LeftArrow: function () { Elements.Jake.X -= STEP; },
		UpArrow: function () { Elements.Jake.Y -= STEP; },
		DownArrow: function () { Elements.Jake.Y += STEP; },
		RightArrowDown: function () { KeyStates.RightArrow = true; },
		UpArrowDown: function () { KeyStates.UpArrow = true; },
		DownArrowDown: function () { KeyStates.DownArrow = true; },
		LeftArrowDown: function () { KeyStates.LeftArrow = true; },
		RightArrowUp: function () { KeyStates.RightArrow = false; },
		UpArrowUp: function () { KeyStates.UpArrow = false; },
		DownArrowUp: function () { KeyStates.DownArrow = false; },
		LeftArrowUp: function () { KeyStates.LeftArrow = false; }
		},
		keyStates = {
			Enter: false,
			Esc: false,
			Space: false,
			UpArrow: false,
			DownArrow: false,
			RightArrow: false,
			LeftArrow: false
		},
		Operations = {
			RightArrowDown: function () { keyStates.RightArrow = true; },
			UpArrowDown: function () { keyStates.UpArrow = true; },
			DownArrowDown: function () { keyStates.DownArrow = true; },
			LeftArrowDown: function () { keyStates.LeftArrow = true; },
			RightArrowUp: function () { keyStates.RightArrow = false; },
			UpArrowUp: function () { keyStates.UpArrow = false; },
			DownArrowUp: function () { keyStates.DownArrow = false; },
			LeftArrowUp: function () { keyStates.LeftArrow = false; }
		};

	// Register keyboard operations and map with key codes
	Keyboard.register(KeyCodes.Enter, Operations.Enter, function () { });
	Keyboard.register(KeyCodes.Esc, Operations.Esc, function () { });
	Keyboard.register(KeyCodes.RightArrow, Operations.RightArrowDown, Operations.RightArrowUp);
	Keyboard.register(KeyCodes.LeftArrow, Operations.LeftArrowDown, Operations.LeftArrowUp);
	Keyboard.register(KeyCodes.Space, Operations.Space, function () { });
	//Keyboard.register(KeyCodes.DownArrow, Operations.DownArrowDown, Operations.DownArrowUp);
	//Keyboard.register(KeyCodes.UpArrow, Operations.UpArrowDown, Operations.UpArrowUp);

	// create the elements and add them to rendering list
	Elements.Player.Sprite = createSprite("Player");
	Elements.Alien.Sprite = createSprite("Alien3");
	// set initial locations
	Elements.Player.X = 350;
	Elements.Player.Y = 550;
	Elements.Alien.X = 300;
	Elements.Alien.Y = 50;

	Keyboard.register(KeyCodes.DownArrow, Operations.RightArrowDown, Operations.RightArrowUp);
	Keyboard.register(KeyCodes.UpArrow, Operations.LeftArrowDown, Operations.LeftArrowUp);

	gameState.addElement(new GoodGuy(ctx.canvas.width / 2, ctx.canvas.height - 60));

	var x = 30, y = 30;
	for (var count = 0; count < 10; count += 1) {
		x += 40;
		gameState.addElement(new Enemy(x, y, ctx.canvas.width, ctx.canvas.height));
	}

	var scr = new Screen(ctx, gameState);
	scr.render();

	var gameLogic = new GameLogic(gameState, keyStates);
	gameLogic.StartLoop();

})(document);