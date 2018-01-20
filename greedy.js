/* Greedy Algorithm - Nearest Neighbour */
var cities = []; // this array is to keep track of cities visited
var citiesForNodes = []; // this array is our list of cities
var totalCities = 20;

var greedyArray = [];
var computed = false;

function setup() {
  createCanvas(800, 600);
  
  // create the city array, with random x,y coordinates
  for (var i = 0; i < totalCities; i++) {
    var v = createVector(random(width), random(height));
    cities[i] = v; 
	citiesForNodes[i] = v
  }
  
  frameRate(5); // this is to slow down intentionally to see the path converging
}

function draw() {	

	// compute this just once for first time, and mark the first city in array as visited
	if(!computed){
			
		background(0);
		fill(255);
		console.log(cities);
		greedyArray[0] = cities[0];
		cities.splice(0, 1);
		computed = true;
	}
	
	// draw the city array
	for (var i = 0; i < citiesForNodes.length; i++) {
		ellipse(citiesForNodes[i].x, citiesForNodes[i].y, 8, 8);
	} 
	
	// compute this till all the cites have finished visiting
	if(greedyArray.length != totalCities){	
		background(0);
		fill(255);
		var greedyDistance = null;
		var indexMatch = null;
		var onGoingComputationPathArray = []; // this array is to add nodes for current computation
		
		for(var j = 0; j < cities.length; j++){
			onGoingComputationPathArray[0] = greedyArray[greedyArray.length-1];
			onGoingComputationPathArray[1] = cities[j];
			
			stroke(255);
			strokeWeight(1);
			noFill();
			beginShape();
			
			// draw vertices for the current computation
			for (var m = 0; m < onGoingComputationPathArray.length; m++) {
				vertex(onGoingComputationPathArray[m].x, onGoingComputationPathArray[m].y);
			}
			endShape();
			
			// calculate te distance and if it is less than the rest of the cities so far for the given root node
			// then track the index
			var testDistance = calcDistance(onGoingComputationPathArray);
			if(greedyDistance == null || testDistance < greedyDistance){
				greedyDistance = testDistance;
				indexMatch = j;
			}
		}
		
		// using the tracked index update the nodes visited so far
		if(indexMatch != null){
			var city = cities[indexMatch];
			cities.splice(indexMatch, 1);
			greedyArray.push(city);
		}
		
		stroke(255, 0, 255);
		strokeWeight(4);
		noFill();
		beginShape();
		
		// drwa the route found so far according to greedy algorithm
		for (var k = 0; k < greedyArray.length; k++) {
			vertex(greedyArray[k].x, greedyArray[k].y);
		}
		endShape();
	}
	computed = true;
	console.log(greedyArray);
  
}

// calulcate distance
function calcDistance(points) {
  var sum = 0;
  for (var i = 0; i < points.length - 1; i++) {
    var d = dist(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
    sum += d;
  }
  return sum;
}
