function ListItem(listObject, index, $beforeElement, listItemTitle, low, high){
	var self = this;
	var listIndex = index;
	var originalHeight = '25px'; // Used for animating.

	var parentList = listObject;
	var title = listItemTitle;
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
		// Store new info
		self.closeItem();
		parentList.updateValue(title, lowAmount, highAmount);
		parentList.refreshTotalDisplay();
	});

	$acceptButton.mouseover(function(){
		$(this).attr('src', '../resources/acceptHover.png');
	});

	$acceptButton.mouseout(function(){
		$(this).attr('src', '../resources/accept.png');
	});

	self.deleteItem = function(){
		parentList.deleteItem(listIndex);
		parentList.deleteValue();
		$element.remove();
		parentList.refreshTotalDisplay();
	};

	self.closeItem = function(){
		if(!self.sanitize()){
			return false;
		}

		// If our edit box is open, we can close it.
		if($editTitle){
			// If title was changed, but is a duplicate
			if($editTitle.val() != title){
				if(parentList.values[$editTitle.val()]){
					$editTitle.css('border', '2px solid #ef6d76');
					return false;
				} else{
					$editTitle.css('border', '0');

					// Since the title changed, we delete the old value and add a new one. 
					parentList.deleteValue(title);
				}
			}

			$element.animate({height: originalHeight}, 200);

			if(parentList.getId() === '#incomes'){
				$element.animate({'margin-left': '20px'}, 200);
			}
			else{
				$element.animate({'margin-right': '20px'}, 200);
			}

			title = $editTitle.val();
			lowAmount = $element.find('.lowAmount').val();
			highAmount = $element.find('.highAmount').val();
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

	self.sanitize = function(){
		var errorFree = true;
		var $lowAmount = $element.find('.lowAmount');
		var $highAmount = $element.find('.highAmount');

		if(sanitizeTitle($editTitle.val())){
			$editTitle.css('border', '0');
		}
		else{
			$editTitle.css('border', '2px solid #ef6d76'); // red border
			errorFree = false;
		}

		var value = sanitizeCurrency($lowAmount.val());
		if(value !== null){
			$lowAmount.val(value);
			$lowAmount.css('border', '0');
		}
		else{
			$lowAmount.css('border', '2px solid #ef6d76'); // red border
			errorFree = false;
		}

		value = sanitizeCurrency($highAmount.val());
		if(value !== null){
			$highAmount.val(value);
			$highAmount.css('border', '0');
		}
		else{
			$highAmount.css('border', '2px solid #ef6d76'); // red border
			errorFree = false;
		}

		return errorFree;
	}
};