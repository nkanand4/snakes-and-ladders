function Game() {
	var channel;
	this.board = $('#board');
	this.dice;
	this.started = false;
	this.start = 0;
	this.me;
	this.coins = {};
	this.players = [];
	this.viewers = [];
	this.channel = channel = nka.snl.game.communication;

	//TODO: move this to utility
	var generateRandomColor = function() {
		return '#'+(
				parseInt(Math.random()*8).toString(16) + 
				parseInt(Math.random()*16).toString(16) +
				parseInt(Math.random()*16).toString(16)
		);
	}

	this.colorCorrection = function(info) {
		$('#user-'+ info.session_id).find('circle').attr('fill', info.color);
		console.info('Setting the color of %s to %s', info.session_id, info.color);
	}

	this.abandon = function(users) {
		console.info('Removing users ', users);
		$(users).each(function(i) {
			//TODO: remove coin object
			$('#user-'+users[i]).remove();
		});	
	}

	this.addOthers = function(users) {
		var others;
		if(this.players.length > users.length) {
			this.abandon(this.players.intersect(users));
		}
		others = users.intersect(this.me.session_id);
		console.log('Will add other users ', others);
		this.addUsers(others);
		channel.communicate('colorOthers');
	}

	this.colorOthers = function(coin) {
		var info = {};
		console.info('Coloring others with arguments', arguments);
		if(typeof coin === 'undefined') {
			console.debug(match.me);
			channel.communicate('colorOthers', match.me);
		} else {
			this.colorCorrection(coin);
		}
	}

	this.addUsers = function(users, isMe) {
		var _this = this, abandoned, channel = this.channel;
		if(!_this.started) {
			$(users).each(function(i, session_id) {
				console.info('Request to add user with session_id', session_id);
				if($.inArray(session_id, _this.players) === -1 && !_this.started) {
					var usedColors = [], coin = {}, at = _this.start;
					
					function newcoins() {
						var color = isMe ? generateRandomColor() : '#fff';
						if(color.length < 7) {

						}
						return {
							color: color, //TODO: check if color is already alloted
							location: -1,
							session_id: session_id,
							coin: '<svg id="user-'+session_id+'" style="width: 70px;" version="1.1" xmlns="http://www.w3.org/2000/svg">\
									<circle fill="'+color+'" stroke-width="2" stroke="black" r="27" cy="37" cx="35"/>\
									<text fill="#fff" class="username" x="22" y="42">'+(isMe ? 'You' : '')+'</text>\
									</svg>'
						}
					}

					_this.coins[session_id] = newcoins();
					if(isMe) {
						console.debug('i am ', _this.coins[session_id]);
						_this.me = _this.coins[session_id];
						_this.me['session_id'] = session_id;
					}
					_this.start += 75;
					_this.board.append(_this.coins[session_id].coin);
					_this.players.push(session_id);
					console.info('User added with following info: ', _this.coins[session_id]);
				}else {
					if(this.started) {
						console.info('Denied as game already in progress.');
					} else {
						console.info('Denied adding %s as user is already added.', session_id);
					}
				}
			});
		} else {
			console.info('Game already in progress. Cannot add new users. Wait until game is over.');
		}
	};
};