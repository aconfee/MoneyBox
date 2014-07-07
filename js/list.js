(function(){
	Array.prototype.remove = function(index){
		this.splice(index, 1);
	};
})();

function ListController($scope){
	var self = this;
	$scope.createMode = false;
	$scope.total = 0;

	$scope.newItem = {title: 'Title', price: 0};

	//var id = id; //#incomes or #expenses
	$scope.listItems = [
		{title: 'PaperG', price: 1500},
		{title: 'GangsterG', price: 1500},
		{title: 'OriginalG', price: 1500}
	];

	$scope.toggleCreateMode = function(){
		$scope.createMode = !$scope.createMode;

		// Reset if just entering create mode
		if($scope.createMode){
			$scope.newItem = {title: 'Title', price: 0};
		}
	};

	$scope.saveListItem = function(){
		$scope.listItems.push($scope.newItem);
		$scope.newItem = {title: 'Title', price: 0};
	};

	$scope.deleteItem = function(index){
		$scope.listItems.remove(index);
	};

	$scope.calculateTotal = function(){
		$scope.total = 0;
		for(var i = 0; i < $scope.listItems.length; ++i){
			$scope.total += parseFloat($scope.listItems[i].price);
		}
	};

	$scope.$watch('listItems', $scope.calculateTotal);
};

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
		$element = $('.listItem').eq(index);
		$element.animate({height: '90px'}, 200);
		$element.animate({'margin-left': '100px'}, 200);
	};

	self.animateClose = function(index){
		$element.animate({height: '25px'}, 200);
		$element.animate({'margin-left': '20px'}, 200);
	};
};
