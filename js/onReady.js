
$(document).ready(function(){

	(function dashboard_main(){
		var incomesList = new List('#incomes');
		var expenseList = new List('#expenses');
		var mainDisplay = new MainDisplay(incomesList, expenseList);

		incomesList.refreshTotalDisplay();
		expenseList.refreshTotalDisplay();
		mainDisplay.refreshIncome();


	})();
});
