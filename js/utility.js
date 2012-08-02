Array.prototype.intersect = function(array) {
	var tmp = [], shorter, longer;
	if(Object.prototype.toString.call(array) !== '[object Array]') {
		tmp.push(array);
		array = [tmp.pop()];
	}
    shorter = this.length < array.length ? this : array;
    longer = this.length > array.length ? this : array;
    console.log(longer, shorter)
	for(var i = 0; i < longer.length; i++) {
		if(shorter.indexOf(longer[i]) === -1) {
			tmp.push(this[i]);
		}
	}
	console.info('Intersection of arrays %o and %o is %o.', this, array,  tmp);
	return tmp;
};