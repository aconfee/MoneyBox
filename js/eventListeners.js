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
};

function editItemListener(){
	// Expand the list item to edit its info on click. 
	$(document).on('click', '.displayTitle', editItem);
};

function deleteItemListener(){
	// Delete a list item
	$(document).on('click', '.deleteButton', deleteItem);

	$(document).on('mouseover', '.deleteButton', function(){
		$(this).attr('src', '../resources/deleteHover.png');
	});

	$(document).on('mouseout', '.deleteButton', function(){
		$(this).attr('src', '../resources/delete.png');
	});
}

function acceptItemListener(){
	// Delete a list item
	$(document).on('click', '.acceptButton', function(){
		closeOpenItem();
		refreshIncome();
	});

	$(document).on('mouseover', '.acceptButton', function(){
		$(this).attr('src', '../resources/acceptHover.png');
	});

	$(document).on('mouseout', '.acceptButton', function(){
		$(this).attr('src', '../resources/accept.png');
	});
}