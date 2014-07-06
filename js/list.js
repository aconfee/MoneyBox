(function(){
	Array.prototype.remove = function(index){
		this.splice(index, 1);
	};
})();

function List(id){
	var self = this;
	var total = 0;
	var listItems = new Array();
	var id = id; //#incomes or #expenses
	self.values = {}; // Store all information

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
		editBox.open();
		$addButton.css('display', 'none');
		$cancelButton.css('display', 'inline-block');
		$saveButton.css('display', 'inline-block');
	};

	self.saveListItem = function(){
		if(!editBox.sanitize()){
			return;
		}

		var newTitle = editBox.getTitle();
		var newLow = editBox.getLowAmount();
		var newHigh = editBox.getHighAmount();

		if(!self.addValue(newTitle, newLow, newHigh)){
			return false;
		}

		// Create the list item
		var newItem = new ListItem(self, listItems.length, editBox.getElement(), editBox.getTitle(), editBox.getLowAmount(), editBox.getHighAmount());
		listItems.push(newItem);

		self.closeEditBox();
		self.refreshTotalDisplay();
	};

	self.closeEditBox = function(){
		editBox.close();
		$addButton.css('display', 'inline-block');
		$cancelButton.css('display', 'none');
		$saveButton.css('display', 'none');
	};

	self.deleteItem = function(index){
		listItems.remove(index);
	};

	self.addValue = function(newTitle, newLow, newHigh){
		if(self.values[newTitle]){
			console.log('no duplicates allowed');
			return false;
		}

		self.values[newTitle] = [parseInt(newLow.substring(1, newLow.length)), parseInt(newHigh.substring(1, newHigh.length))];
		return true;
	};

	self.updateValue = function(newTitle, newLow, newHigh){
		self.values[newTitle] = [parseInt(newLow.substring(1, newLow.length)), parseInt(newHigh.substring(1, newHigh.length))];
	};

	self.deleteValue = function(title){
		delete self.values[title];
	};

	self.lowAmount = function(){
		var lowAmountTotal = 0;
		for(var index in self.values){
			lowAmountTotal += self.values[index][0];
		}

		return lowAmountTotal;
	}

	self.highAmount = function(){
		var highAmountTotal = 0;
		for(var index in self.values){
			highAmountTotal += self.values[index][0];
		}

		return highAmountTotal;
	}

	self.refreshTotalDisplay = function(){
		$element.find('.listTotal').html('$' + self.lowAmount().toString());
	}
};
