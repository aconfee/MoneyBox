// Functions to collect different stats.

function lowestIncome(){
	return subtractColumns('.lowAmount', '.highAmount');
};

function highestIncome(){
	return subtractColumns('.highAmount', '.lowAmount');
};