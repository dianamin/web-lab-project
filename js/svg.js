var MIN_NODES_COUNT = 15;
var MAX_NODES_COUNT = 20;
var EDGES_DENSITY = 0.25;

var svg = document.querySelector('#fancy-svg');
var circles;
var edges;



var shouldHaveEdge = function() {
	return Math.random() < EDGES_DENSITY;
}

var getRandom = function(min, max) {
	return min + Math.floor(Math.random() * (max - min));
}


var Circle = function() {
	this.x = getRandom(50, svg.clientWidth);
	this.y = getRandom(50, svg.clientHeight);
	this.element = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

	this.updatePosition();
}

Circle.prototype.updatePosition = function() {
	this.element.setAttribute('cx', this.x);
	this.element.setAttribute('cy', this.y);
}

var Edge = function(source, target) {
	this.source = source;
	this.target = target;
	this.element = document.createElementNS('http://www.w3.org/2000/svg', 'line');

	this.updatePosition();
}

Edge.prototype.updatePosition = function() {
	this.element.setAttribute('x1', this.source.x);
	this.element.setAttribute('y1', this.source.y);

	this.element.setAttribute('x2', this.target.x);
	this.element.setAttribute('y2', this.target.y);
}


var initGraph = function() {
	var circlesCount = getRandom(MIN_NODES_COUNT, MAX_NODES_COUNT);
	circles = [];
	edges = [];

	for (var i = 0; i < circlesCount; i++) {
		var circle = new Circle();
		circles.push(circle);
		svg.appendChild(circle.element);
	}

	for (var i = 0; i < circlesCount; i++)
		for (var j = i + 1; j < circlesCount; j++) {
			if (!shouldHaveEdge()) continue;
			var edge = new Edge(circles[i], circles[j]);
			edges.push(edge);
			svg.appendChild(edge.element);
		}
}

initGraph();