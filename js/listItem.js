function ListItemController($scope){
	var self = this;
	$scope.editMode = false;

	$scope.toggleEditMode = function(index){
		$scope.editMode = !$scope.editMode;

		if($scope.editMode){
			self.animateOpen(index);
		} else{
			self.animateClose(index);
		}
	};

	self.animateOpen = function(index){
		var $element = $('.listItem').eq(index);
		$element.animate({height: '90px'}, 200);
		$element.animate({'margin-left': '100px'}, 200);
	};

	self.animateClose = function(index){
		var $element = $('.listItem').eq(index);
		$element.animate({height: '25px'}, 200);
		$element.animate({'margin-left': '20px'}, 200);
	};
};
