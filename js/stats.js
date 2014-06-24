// Functions to collect different stats.
function total($columnClass, $listId){
	$list = $($listId);
	// Find total income
	$totalIncome = 0;
	$list.find($columnClass).each(function(){
		$currentPrice = $(this).val().substring(1, $(this).val().length);
		$totalIncome += parseFloat($currentPrice);
	});

	return $totalIncome;
}

function median($list){
	return total('.lowAmount', $list) + ((total('.highAmount', $list) - total('.lowAmount', $list)) / 2);
}

function lowestIncome(){
	return total('.lowAmount', '#incomes') - total('.highAmount', '#expenses');
};

function highestIncome(){
	return total('.highAmount', '#incomes') - total('.lowAmount', '#expenses');
};