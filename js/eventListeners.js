// Dashboard event listeners.

function saveListItemListener(){
	// Add the new list item when 'DONE' is clicked
	$(document).on('click', '#doneEditing', addItem);
};

function toggleEditBoxListener(){
	// Toggle edit box for incomes and expenses lists.
	$addIncome = $('div[name=addIncome]');
	$addExpense = $('div[name=addExpense]');
	
	$addIncome.click(function(){
		toggleEditBox($(this));
	});

	$addExpense.click(function(){
		toggleEditBox($(this));
	});
}