// Math helpers for dashboard

// Subtract columnX in expenses from columnX in incomes
function subtractColumns($colClassIncome, $colClassExpense){
	$incomeList = $('#incomes');
	$expenseList = $('#expenses');

	// Find total income
	$totalIncome = 0;
	$incomeList.find($colClassIncome).each(function(){
		$currentPrice = $(this).val().substring(1, $(this).val().length);
		console.log($currentPrice);
		$totalIncome += parseFloat($currentPrice);
	});

	// Find total expenses
	$totalExpense = 0;
	$expenseList.find($colClassExpense).each(function(){
		$currentPrice = $(this).val().substring(1, $(this).val().length);
		$totalExpense += parseFloat($currentPrice);
	});

	return $totalIncome - $totalExpense;
};