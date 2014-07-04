Array.prototype.remove = function(index){
	this.splice(index, 1);
};

function EditBox(listObject){
	var self = this;
	var parentList = listObject;
	var $element = listObject.getElement().find('.editBox');

	var $title = $element.find('input[name=newTitle]');
	var $lowAmount = $element.find('input[name=lowEndAmount]');
	var $highAmount = $element.find('input[name=highEndAmount]');

	self.getTitle = function(){
		return $title.val();
	};

	self.getLowAmount = function(){
		return $lowAmount.val();
	};

	self.getHighAmount = function(){
		return $highAmount.val();
	};

	self.clear = function(){
		$title.val('Title');
		$lowAmount.val('$ Low');
		$highAmount.val('$ High');
	};

	// Return the web element
	self.getElement = function(){		
		return $element;
	};

	self.open = function(id){
		$element.css('display', 'block');
	};

	self.close = function(id){
		self.clear();
		$element.css('display', 'none');
	};
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

	// The list's getId needs to be defined for this constructor
	var editBox = new EditBox(self);

	// Attach events
	$addButton.click(function(){
		self.newListItem();
	});

	$cancelButton.click(function(){
		self.closeEditBox();
	});


	$saveButton.click(function(){
		self.saveListItem();
	});

	self.newListItem = function(){
		//closeOpenItem();

		// Create the edit box
		editBox.open();
		$addButton.css('display', 'none');
		$cancelButton.css('display', 'inline-block');
		$saveButton.css('display', 'inline-block');
	};

	self.saveListItem = function(){
		// Create the list item
		var newItem = new ListItem(self, listItems.length, editBox.getElement(), editBox.getTitle(), editBox.getLowAmount(), editBox.getHighAmount());
		listItems.push(newItem);

		// Close
		self.closeEditBox();

		// Refresh to display updated amount
		refreshIncome();
	};

	self.closeEditBox = function(){
		editBox.close();
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