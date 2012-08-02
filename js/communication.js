$(document).ready(function() {
	var ns = namespace('nka.snl.game.communication');
	var chat, //main handle
		json = JSON.stringify,		
		socket = new io.connect('http://localhost');

		socket.on('nick', function(info) {
			console.info('You are ', info);
			console.warn(match);
			match.addUsers([info.nick], true);
		});

		socket.on('users', function(data){
			console.log(data.users, ' in the room.');
			match.addOthers(data.users);
		});

		ns.communicate = function(act, args) {
			console.log('Channel received %s' + (args ? ' with %o' : ''), act, args);
			var info = {
				msg: {
					action: act,
					args: args
				}
			};
			socket.emit('chat', info);
		}

		


		socket.on('chat', function(data) {
			var action = data.msg ? data.msg.action : '',
				args = data.msg ? data.msg.args : [];
			console.info('Recieved %s action', action, data);
			try {
				match[action](args);
			} catch(e) {
				console.info('Encountered error with %s & %o', action, args);
				console.error(e);
			}
		});
});