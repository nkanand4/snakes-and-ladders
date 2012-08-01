$(document).ready(function() {
	var ns = namespace('nka.snl.game.communication');
	var chat, //main handle
		json = JSON.stringify,		
		socket = new io.connect('http://localhost');

		socket.on('nick', function(info) {
			console.info('You are ', info);
			console.warn(match);
			match.me = info.nick;
		});

		socket.on('users', function(data){
			console.log(data.users, ' in the room.');
			if(!match.started) {
				$(data.users).each(function(i, session_id) {
					match.addUsers(session_id);
				});
			}
		});

		ns.communicate = function(info) {
			info = info || {msg: {action: 'maa', camera: 'lights'}};
			socket.emit('chat', info);
		}

		socket.on('chat', function(data) {
			var action = data.msg;
			switch(action) {
				case 'color':
					break;
				case 'movement':
					break;
				default:
					break;
			}
		})
});