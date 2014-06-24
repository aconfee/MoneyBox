// Functionality for the dashboard.

function closeEditBox(){
	$('.editing').removeClass('editing');
	$('.addItem').html('+ ADD');
	$('.editBox').remove();
	$('#doneEditing').remove();
}

function openEditBox($listAddButton){
	closeOpenItem();
	
	// Add type allows us to know which column is being edited
	$addType = $listAddButton.attr('name');

	// Define templates for creation
	$editBoxTemplate = '<div class="listItem editBox" name="' + $addType + '">' +	
						'<h1>NEW ITEM</h1>' + 
						   	'<input type="text" class="editTitle" value="Title" name="newTitle">' +
							'<input type="text" class="editMoney" value="$ Low" name="lowEndAmount">' +
							'<input type="text" class="editMoney" value="$ High" name="highEndAmount">' +
						'</div>';

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
	$listItemTemplate = '<div class="listItem">' + 
							'<div class="displayTitle">' + $title + '</div>' +
							'<img class="deleteButton" src="../resources/delete.png"></img>' + 
							'<br/><br/>' + 
							'<input class="lowAmount editMoney" value="' + $lowEndAmount + '">' + 
							'<input class="highAmount editMoney" value="' + $highEndAmount + '">' +
							'<img class="acceptButton" src="../resources/accept.png"></img>' + 
						'</div>';

	$editBox.before($listItemTemplate);

	// Close
	closeEditBox();

	// Refresh to display updated amount
	refreshIncome();
};

function closeOpenItem(){
	if($('.editTitle') !== null){
		$openItem = $('.editTitle').parent();
		$openItem.css('height', '25px');
		$title = $openItem.find('.editTitle').val();
		console.log($title);
		$openItem.find('.editTitle').replaceWith('<div class="displayTitle">' + $title + '</div>');
	}
}

function editItem(){
	$originalHeight = '25px';
	$listItem = $(this).parent();
	$displayTitle = $(this);

	// If we are not the edit box
	if($listItem.hasClass('editBox') === false){

		// Close any open edit box
		if($('.editBox')){
			closeEditBox();
		}

		if($listItem.css('height') === $originalHeight){
			// Close all other list items
			closeOpenItem();

			// Open this item
			$listItem.css('height', 'auto');
			$title = $displayTitle.html();
			$displayTitle.replaceWith('<input class="editTitle" value="' + $title + '">');
			$('.editTitle').focus();
		}
	}
};

function deleteItem(){
	$(this).parent().remove();
};

function refreshIncome(){
	$worstIncome = lowestIncome();
	$bestIncome = highestIncome();

	$centerDisplay = $('.centerDisplay');
	$centerDisplay.html('Worst: $' + $worstIncome.toString() + ' Best: $' + $bestIncome);
};