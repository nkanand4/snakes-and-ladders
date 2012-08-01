function Game() {
	this.board = $('#board');
	this.dice;
	this.started = false;
	this.start = 0;
	this.me;
	this.coins = [
		// {
		// 	session_id: {
		// 		color: 'red',
		// 		location: '27'
		// 	},
		// 	session_id2: 'green',
		// 	location: '22'
		// }
	];
	this.players = [];
	this.viewers = [];

	this.colorCorrection = function(info) {
		$(this.coins).each(function(i, j) {
			// DO IT HERE WITH info
		});
	}
};

Game.prototype.addUsers = function(session_id) {
	console.info('Request to add user with session_id', session_id);
	//TODO: Remove abandoned users;
	if($.inArray(session_id, this.players) === -1 && !this.started) {
		var usedColors = [], coin = {}, at = this.start;
		
		function newcoins() {
			var color = '#'+Math.floor(Math.random()*16777215).toString(16);
			return {
				color: color, //TODO: check if color is already alloted
				location: -1,
				coin: '<svg style="position:absolute; top: 740px; left:'+at+'px;" version="1.1" xmlns="http://www.w3.org/2000/svg">\
						<circle fill="green" stroke-width="2" stroke="black" r="27" cy="37" cx="35"/>\
						</svg>'
			}
		}

		coin[session_id] = newcoins();
		this.coins.push(coin);
		this.start += 75;
		this.board.append(coin[session_id].coin);
		this.players.push(session_id);
		console.info('User added with following info: ', coin);
	}else {
		console.log('Status ', $.inArray(session_id, this.players));
		console.info('Denied adding %s as user either already added or game is already begun', session_id);
	}
	
};