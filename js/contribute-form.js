var title = document.querySelector('#new-framework-title');
var page = document.querySelector('#new-framework-page');
var description = document.querySelector('#new-framework-description');
var url = document.querySelector('#new-framework-url');

var examples = document.querySelectorAll('.new-framework-example');

var addExamplesButton = document.querySelector('#new-framework-more-examples');

var submitButton = document.querySelector('#new-framework-submit');

var submitted = document.querySelector('#submitted');

var addExample = function() {
	var newExampleInput = document.createElement('input');
	newExampleInput.classList.add('new-framework-example');
	newExampleInput.type = 'url';
	newExampleInput.placeholder = 'Exemplu';
	document.querySelector('form').insertBefore(newExampleInput, addExamplesButton);

	examples = document.querySelectorAll('.new-framework-example');
}

var giveFeedback = function(input, isValid) {
	if (isValid) input.classList.add('valid');
	else input.classList.add('not-valid');
}

var checkInput = function(input) {
	if (input.value == '') {
		giveFeedback(input, false);
		return false;
	}
	giveFeedback(input, true);
	return true;
}

var check = function() {
	var titleIsValid = checkInput(title);
	var pageIsValid = checkInput(page);
	var descriptionIsValid = checkInput(description);
	var urlIsValid = checkInput(url);
	return titleIsValid && pageIsValid && descriptionIsValid && urlIsValid;	
}

var resetInput = function(input) {
	input.classList.remove('valid');
	input.classList.remove('not-valid');

	input.value = '';
}

var reset = function() {
	resetInput(title);
	resetInput(page);
	resetInput(description);
	resetInput(url);

	examples.forEach(function(example) {
		resetInput(example);
	});
}

var submit = function() {
	if (!check()) {
		submitted.style.opacity = 0;
		return;
	}

	var newFramework = {};
	newFramework.title = title.value;
	newFramework.page = page.value;
	newFramework.description = description.value;
	newFramework.url = url.value;
	newFramework.examples = [];


	examples.forEach(function(example) {
		if (example.value != '') {
			newFramework.examples.push(example.value);
		}
	});

	setTimeout(reset, 2000);
	submitted.style.opacity = 1;

	var newFrameworkJSON = JSON.stringify(newFramework);
	console.log(newFrameworkJSON);
}

addExamplesButton.onclick = addExample;
submitButton.onclick = submit;