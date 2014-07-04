function sanitizeTitle(input){
	// TODO: confirm input is a string
	return input.length > 0 && input !== 'Title';
};

function sanitizeCurrency(input){
	// If dollar sign not present at start of string
	if(!/^\$/.test(input)){
		input = '$' + input;
	}

	// If one decimal value provided, add '0'
	if(/.+\.\d{1}$/.test(input)){
		input = input + '0';
	}

	// If no decimal provided, add.
	if(/^\$(\d+)$/.test(input)){
		input += '.00';
	}

	// $ any number . one or two numbers
	if(!/^\$(\d+)\.\d{2}$/.test(input)){
		return null;
	}

	return input;
};