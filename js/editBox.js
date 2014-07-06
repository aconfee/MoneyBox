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
		$title.css('border', '0');
		$lowAmount.css('border', '0');
		$highAmount.css('border', '0');
	};

	self.sanitize = function(){
		var errorFree = true;
		if(sanitizeTitle(self.getTitle())){
			$title.css('border', '0');
		}
		else{
			$title.css('border', '2px solid #ef6d76'); // red border
			errorFree = false;
		}

		var value = sanitizeCurrency(self.getLowAmount());
		if(value !== null){
			$lowAmount.val(value);
			$lowAmount.css('border', '0');
		}
		else{
			$lowAmount.css('border', '2px solid #ef6d76'); // red border
			errorFree = false;
		}

		value = sanitizeCurrency(self.getHighAmount());
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