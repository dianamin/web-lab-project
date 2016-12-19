var addDescription = function(data) {
	var article = document.createElement('article');
	var articleTitle = document.createElement('h3');
	articleTitle.innerText = 'Ce știe să facă?';
	article.appendChild(articleTitle);

	var paragraphs = data.description;
	paragraphs.forEach(function (paragraphText) {
		var paragraph = document.createElement('p');
		paragraph.innerHTML = paragraphText;
		article.appendChild(paragraph);
	}.bind(this));

	var paragraph = document.createElement('p');
	paragraph.innerHTML = 'Mai multe detalii <a href="' + data.url + '">aici</a>.';

	article.appendChild(paragraph);
	return article;
}

var addExamples = function(data) {
	var article = document.createElement('article');
	var articleTitle = document.createElement('h3');
	articleTitle.innerHTML = 'Site-uri care folosesc ' + data.name;
	article.appendChild(articleTitle);
	var flexContainer = document.createElement('div');
	flexContainer.classList.add('flex-container');
	flexContainer.classList.add('centered');
	var examplesContainer = document.createElement('div');
	examplesContainer.classList.add('site-examples-container');
	flexContainer.appendChild(examplesContainer);

	data.examples.forEach(function(example) {
		var exampleContainer = document.createElement('div');
		exampleContainer.classList.add('site-example');
		var exampleImg = document.createElement('img');
		exampleImg.alt = example.name;
		exampleImg.src = "../images/" + example.imageName;
		exampleContainer.appendChild(exampleImg);
		var exampleLink = document.createElement('a');
		exampleLink.href = example.url;
		exampleLink.innerText = example.name;
		exampleContainer.appendChild(exampleLink);
		examplesContainer.appendChild(exampleContainer);
	})

	article.appendChild(flexContainer);
	return article;
}

var sectionHandler = function(data) {
	var section = document.createElement('section');
	section.id = data.id;

	sectionContainer = document.createElement('div');
	section.appendChild(sectionContainer);

	var sectionTitle = document.createElement('h2');
	sectionTitle.innerHTML = data.name;
	sectionContainer.appendChild(sectionTitle);

	
	sectionContainer.appendChild(addDescription(data));
	sectionContainer.appendChild(addExamples(data));
	return section;
}

var dataHandler = function(data) {
	var footer = document.querySelector('footer');
	var parent = document.querySelector('body');
	data.forEach(function(section) {
		parent.insertBefore(sectionHandler(section), footer);
	});
}