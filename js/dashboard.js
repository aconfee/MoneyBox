/*
function EditBox(){
	this.$element = null;

	// Return the web element
	this.getElement = function(){
		if(this.$element === null){
			this.$element = $('.editBox');
		}
		
		return this.$element;
	};

	this.open = function(id){
		this.getElement().css('display', 'block');
		this.getElement().css('position', 'relative');
	};

	this.close = function(id){
	
	};
};
*/
Array.prototype.remove = function(index){
	this.splice(index, 1);
};

function List(id){
	var self = this;
	var total = 0;
	var listItems = new Array();
	var id = id; //#incomes or #expenses

	// Initialize list's web elements.
	var $element = $(id);
	var $addButton = $element.find('.addButton');
	var $cancelButton = $element.find('.cancelButton');
	var $saveButton = $element.find('.saveButton');

	// Attach events
	$addButton.click(function(){
		self.newListItem();
	});

	$cancelButton.click(function(){
		self.cancelNewItem();
	});


	$saveButton.click(function(){
		self.saveListItem();
	});



	self.getAddButton = function(){
		return $addButton;
	};

	self.getCancelButton = function(){
		return $cancelButton;
	};

	self.getSaveButton = function(){
		return $saveButton;
	};

	self.getElement = function(){
		return $element;
	};

	self.getId = function(){
		return id;
	};

	self.newListItem = function(){
		//closeOpenItem();

		// Define templates for creation
		// TEMPORARY having to specify display=inline block is bad. the edit box should be separate and the css needs 
		// to be modularized. 
		$editBoxTemplate = '<div class="editBox">' +	
							'<h1>NEW ITEM</h1>' + 
							   	'<input type="text" class="editTitle" style="display:inline-block" value="Title" name="newTitle">' +
								'<input type="text" class="editMoney" value="$ Low" name="lowEndAmount">' +
								'<input type="text" class="editMoney" value="$ High" name="highEndAmount">' +
							'</div>';

		// Create the edit box
		$addButton.before($editBoxTemplate);
		$addButton.css('display', 'none');
		$cancelButton.css('display', 'inline-block');
		$saveButton.css('display', 'inline-block');
	};

	self.saveListItem = function(){
		// Edit box with new info
		$editBox = $('.editBox');

		// New info from the edit box
		var title = $('input[name=newTitle]').val();
		var low = $('input[name=lowEndAmount]').val();
		var high = $('input[name=highEndAmount]').val();

		// Create the list item
		var newItem = new ListItem(self, listItems.length, $editBox, title, low, high);
		listItems.push(newItem);

		// Close
		// TEMPORARY!!!!!!!! USE EDIT BOX ITEM
		self.cancelNewItem();

		// Refresh to display updated amount
		refreshIncome();
	};

	self.cancelNewItem = function(){
		$('.editBox').remove();
		$addButton.css('display', 'inline-block');
		$cancelButton.css('display', 'none');
		$saveButton.css('display', 'none');
	};

	this.deleteItem = function(index){
		listItems.remove(index);
	};
};

function ListItem(listObject, index, $beforeElement, listTitle, low, high){
	var self = this;
	var listIndex = index;
	var originalHeight = '25px'; // Used for animating.

	var parentList = listObject;
	var title = listTitle;
	var lowAmount = low;
	var highAmount = high;
	var template = '<div class="listItem">' + 
						'<div class="displayTitle">' + title + '</div>' +
						'<input class="editTitle" value="' + title + '">' +
						'<img class="deleteButton" src="../resources/delete.png"></img>' + 
						'<br/><br/>' + 
						'<input class="lowAmount editMoney" value="' + low + '">' + 
						'<input class="highAmount editMoney" value="' + high + '">' +
						'<img class="acceptButton" src="../resources/accept.png"></img>' + 
					'</div>';

	// Create html when initialized. 
	$beforeElement.before(template);

	// Get the elements now that they exist on the DOM.
	var $element = parentList.getElement().find('.listItem').last();
	var $deleteButton = $element.find('.deleteButton');
	var $acceptButton = $element.find('.acceptButton');
	var $displayTitle = $element.find('.displayTitle');
	var $editTitle = $element.find('.editTitle');

	// Attach event
	$deleteButton.click(function(){
		self.deleteItem();
	});

	$deleteButton.mouseover(function(){
		$(this).attr('src', '../resources/deleteHover.png');
	});

	$deleteButton.mouseout(function(){
		$(this).attr('src', '../resources/delete.png');
	});

	$displayTitle.click(function(){
		self.openItem();
	});

	$acceptButton.click(function(){
		self.closeItem();
		refreshIncome();
	});

	$acceptButton.mouseover(function(){
		$(this).attr('src', '../resources/acceptHover.png');
	});

	$acceptButton.mouseout(function(){
		$(this).attr('src', '../resources/accept.png');
	});

	self.deleteItem = function(){
		parentList.deleteItem(listIndex);
		$element.remove();
		refreshIncome();
	};

	self.closeItem = function(){
		// If our edit box is open, we can close it.
		if($editTitle){
			$element.animate({height: originalHeight}, 200);

			if(parentList.getId() === '#incomes'){
				$element.animate({'margin-left': '20px'}, 200);
			}
			else{
				$element.animate({'margin-right': '20px'}, 200);
			}

			title = $editTitle.val();
			$editTitle.css('display', 'none');
			$displayTitle.css('display', 'inline-block');
			$displayTitle.html(title);
		}
	};

	self.openItem = function(){
		// If we are not the edit box
		if($element.hasClass('editBox') === false){

			// Close any open edit box
			if($('.editBox')){
				//closeEditBox();
			}

			if($element.css('height') === originalHeight){
				// Close all other list items
				//closeOpenItem();

				// Open this item
				$element.animate({height: '90px'}, 200);

				if(parentList.getId() === '#incomes'){
					$element.animate({'margin-left': '100px'}, 200);
				}
				else{
					$element.animate({'margin-right': '100px'}, 200);
				}

				$displayTitle.css('display', 'none');
				$editTitle.css('display', 'inline-block');
				$editTitle.focus();
			}
		}
	};
};

function refreshIncome(){
	$('#incomeTotal').html('$' + median('#incomes').toString());
	$('#expenseTotal').html('$' + median('#expenses').toString());

	$worstIncome = lowestIncome();
	$bestIncome = highestIncome();

	$centerDisplay = $('.centerDisplay');
	//$centerDisplay.html('Worst: $' + $worstIncome.toString() + ' Best: $' + $bestIncome);
	$centerDisplay.html('$' + $worstIncome.toString());
};