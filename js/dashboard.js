function MainDisplay(incomeList, expenseList){
	var self = this;

	self.refreshIncome = function(){
		var worstIncome = incomeList.lowAmount() - expenseList.lowAmount();

		$centerDisplay = $('.centerDisplay');
		$centerDisplay.html('$' + worstIncome.toString());
	};
};