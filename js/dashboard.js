// Functionality for the dashboard.

function closeEditBox(){
	$('.editing').removeClass('editing');
	$('.addItem').html('+ ADD');
	$('.editBox').remove();
	$('#doneEditing').remove();
}

function openEditBox($listAddButton){
	// Add type allows us to know which column is being edited
	$addType = $listAddButton.attr('name');

	// Define templates for creation
	$editBoxTemplate = '<div class="listItem editBox" name="' + $addType + '">NEW ITEM<input type="text" value="Title" name="newTitle"><input type="text" value="$0.00" name="lowEndAmount"><input type="text" value="$0.00" name="highEndAmount"></div>'
	$doneButtonTemplate = '<div id="doneEditing">SAVE</div>';

	// Create the edit box
	$listAddButton.addClass('editing');
	$listAddButton.html('CANCEL');
	$listAddButton.before($editBoxTemplate);
	$listAddButton.after($doneButtonTemplate);
}

function toggleEditBox($listAddButton){
	// If we're not yet editing, open an edit box
	if($listAddButton.hasClass('editing') === false)
	{
		// If another edit box is open, close it
		if($('.editBox').length){
			closeEditBox();
		}
		openEditBox($listAddButton);
	}
	// If ours was already open, close (cancel) it.
	else{
		closeEditBox();
	}
}

function addItem(){
	// Edit box with new info
	$editBox = $('.editBox');

	// New info from the edit box
	$title = $('input[name=newTitle]').val();
	$lowEndAmount = $('input[name=lowEndAmount]').val();
	$highEndAmount = $('input[name=highEndAmount]').val();

	// Create the list item
	$editBox.before('<div class="listItem">' + $title + '<p class="lowAmount">' + $lowEndAmount + '</p><p class="highAmount">' + $highEndAmount + '</p></div>');

	// Close
	closeEditBox();

	// Refresh to display updated amount
	refreshIncome();
};

function lowestIncome(){
	return subtractColumns('.lowAmount', '.highAmount');
};

function highestIncome(){
	return subtractColumns('.highAmount', '.lowAmount');
};

function refreshIncome(){
	$worstIncome = lowestIncome();
	$bestIncome = highestIncome();

	$centerDisplay = $('.centerDisplay');
	$centerDisplay.html('Worst: $' + $worstIncome.toString() + 'Best: $' + $bestIncome);
};