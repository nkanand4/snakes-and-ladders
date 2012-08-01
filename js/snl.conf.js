function namespace(c,f,b){var e=c.split(f||"."),g=b||window,d,a;for(d=0,a=e.length;d<a;d++){g=g[e[d]]=g[e[d]]||{};}return g;}
namespace('nka.snl.game.base');
nka.snl.game.base = (function() {
	var snakes, ladders, dice,
	cell = -1,
	tr ='<tr class= "classname"> \
				<td></td> \
				<td></td> \
				<td></td> \
				<td></td> \
				<td></td> \
				<td></td> \
				<td></td> \
				<td></td> \
				<td></td> \
				<td></td> \
			</tr>',
	createSnakes = function() {
		snakes = {
		    98: 28,
		    95: 24,
		    92: 51,
		    83: 19,
		    73: 1,
		    69: 33,
		    64: 36,
		    59: 17,
		    55: 7,
		    52: 11,
		    48: 9,
		    46: 5,
		    44: 19
		};
		console.info('Snakes created', snakes);
		return snakes;
	},
	createLadders = function() {
		ladders = {
		    8: 26,
		    21: 82,
		    43: 77,
		    50: 91,
		    54: 93,
		    62: 96,
		    66: 87,
		    80: 100
		};
		console.info('Ladders created', ladders);
		return ladders;
	},
	createBoard = function() {
		for(var string=0,n=0; n<10;n++) {
			string += tr.replace(/classname/g, n % 2 === 0 ? 'odd' : 'even');
		}
		$('tbody').append(string);

		var diff = -1;
		var n = 100;
		$('tr').each(function() {
			var tmp;
			diff = -diff;
			$(this).find('td').each(function(i) {
				tmp = n - (diff * i);
				$(this).attr('id', 'cell-'+tmp);
			});
			n = tmp - 10;
		});
		console.info('Board constructed. ', $('tbody'));
	},
	createPieces = function() {
		return $('svg');
	};
	return {
		createBoard: createBoard,
		createSnakes: createSnakes,
		createLadders: createLadders,
		createPieces: createPieces
	};
}());