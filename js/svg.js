var MIN_NODES_COUNT = 15;
var MAX_NODES_COUNT = 20;
var EDGES_DENSITY = 0.25;

var SPEED = 1;


var svg = document.querySelector('#fancy-svg');

var BORDER_TOP = 100;
var BORDER_LEFT = 100;
var BORDER_BOTTOM = svg.clientHeight - 100;
var BORDER_RIGHT = svg.clientWidth - 100;

var circles;
var edges;

var shouldHaveEdge = function() {
	return Math.random() < EDGES_DENSITY;
}

var getRandom = function(min, max) {
	return min + Math.floor(Math.random() * (max - min));
}

var Circle = function() {
	this.x = getRandom(BORDER_LEFT, BORDER_RIGHT);
	this.y = getRandom(BORDER_TOP, BORDER_BOTTOM);
	this.element = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
	this.speed = SPEED;

	this.directionX;
	this.directionY;

	this.edges = [];

	this._setDirection();
	this.updatePosition();
	
	setInterval(this._move.bind(this), 200);

}

Circle.prototype.addEdge = function(edge) {
	this.edges.push(edge);
}

Circle.prototype.updatePosition = function() {
	this.element.setAttribute('cx', this.x);
	this.element.setAttribute('cy', this.y);
	this.edges.forEach(function(edge) {
		edge.updatePosition();
	});
}

Circle.prototype._setDirection = function() {
	// ax + by, a * a + b * b = 1

	var signA = Math.random() < 0.5 ? +1 : -1;
	var signB = Math.random() < 0.5 ? +1 : -1;

	this.directionX = signA * Math.random();
	this.directionY = signB * Math.sqrt(1 - this.directionX * this.directionX);
};

Circle.prototype._move = function() {
	this.x += this.directionX * this.speed;
	this.y += this.directionY * this.speed;

	if (this.x >= BORDER_RIGHT || this.x <= BORDER_LEFT)
		this.directionX *= -1;
	if (this.y >= BORDER_BOTTOM || this.y <= BORDER_TOP)
		this.directionY *= -1;
	this.updatePosition();
}

var Edge = function(source, target) {
	this.source = source;
	this.target = target;
	this.element = document.createElementNS('http://www.w3.org/2000/svg', 'line');

	this.updatePosition();
}

Edge.prototype.updatePosition = function() {
	this.element.setAttribute('x1', this.source.element.getAttribute('cx'));
	this.element.setAttribute('y1', this.source.element.getAttribute('cy'));

	this.element.setAttribute('x2', this.target.element.getAttribute('cx'));
	this.element.setAttribute('y2', this.target.element.getAttribute('cy'));

}

var initGraph = function() {
	var circlesCount = getRandom(MIN_NODES_COUNT, MAX_NODES_COUNT);
	circles = [];

	for (var i = 0; i < circlesCount; i++) {
		var circle = new Circle();
		circles.push(circle);
		svg.appendChild(circle.element);
	}

	for (var i = 0; i < circlesCount; i++)
		for (var j = i + 1; j < circlesCount; j++) {
			if (!shouldHaveEdge()) continue;
			var edge = new Edge(circles[i], circles[j]);
			circles[i].addEdge(edge);
			circles[j].addEdge(edge);
			svg.appendChild(edge.element);
		}
}

initGraph();