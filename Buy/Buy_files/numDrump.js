function numDrump(id,fromNum,toNum,decimal,timeNum){
	var options = {
		useEasing : true,
		useGrouping : true,
		separator : ',',
		decimal : '.',
		prefix : '',
		suffix : ''
	};
	var numDrumpTo = new CountUp(id, fromNum, toNum, decimal, timeNum, options);
	numDrumpTo.start();
}