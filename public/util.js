function rotatePlane(plane){
	var vertices = plane.geometry.vertices;
	for(var i = 0; i < vertices.length; i++){
		var tmp  = vertices[i].z;
		vertices[i].z = - vertices[i].y;
		vertices[i].y = tmp;
	}
}

function arrayToGrid(arr){
	var dim = Math.sqrt(arr.length);
	var grid = new Array(dim);
	for(var i = 0 ; i < grid.length; i++){
		grid[i] = new Array(dim);
	}

	for(var i = 0; i < arr.length; i++){
		var x = i%dim;
		var y = Math.floor(i/dim)
		grid[x][y] = arr[i];
	}
	return grid;

}
function setFromGrid(obj, grid){
	var geo = obj.geometry
	var vertices = geo.vertices;
	geo.colors = new Array(vertices.length);
	var colors = geo.colors;
	
	var dim = Math.sqrt(vertices.length);
	// faces are indexed using characters
	var faceIndices = [ 'a', 'b', 'c', 'd' ];

	for(var i = 0; i < vertices.length; i++ ){
		var x = i%dim;
		var y = Math.floor(i/dim)
		vertices[i].x = grid[x][y].x;
		vertices[i].y = grid[x][y].y;
		vertices[i].z = grid[x][y].z;
		var c = new THREE.Color(grid[x][y].r, grid[x][y].g, grid[x][y].b)
		colors[i] = c;
		
	}


	for ( var i = 0; i < geo.faces.length; i++ ) 
	{
	    face = geo.faces[ i ];
	    numberOfSides = ( face instanceof THREE.Face3 ) ? 3 : 4;
	    for( var j = 0; j < numberOfSides; j++ ) 
	    {
	        vertexIndex = face[ faceIndices[ j ] ];
	        face.vertexColors[ j ] = geo.colors[ vertexIndex ];

	    }
	}


	

	obj.geometry.computeVertexNormals();
	obj.geometry.elementsNeedUpdate = true;
}

function createSurfaces(){

	surfaces = [];
	for(var i = 0; i < 4 ; i++){
		var p1 = grid[0][0];
		var p2 = grid[0][grid[0].length-1];
		var p3 = grid[grid.length-1][0];
		var p4 = grid[grid.length-1][grid[0].length-1];
		var s = new surface(p1, p2, p3, p4);
		surfaces.push(s);
	}
}

function computeSurface(){
	var pts = getControlPoints();
	
	for(var i = 0; i < grid.length; i++){
		for(var j = 0; j < grid[0].length; j++){
			var t = i / (grid.length -1 );
			var t0 = j / (grid.length -1 );

			var p0 = getBezier(pts[0][0], pts[1][0], pts[2][0], pts[3][0], t);
			var p1 = getBezier(pts[0][1], pts[1][1], pts[2][1], pts[3][1], t);
			var p2 = getBezier(pts[0][2], pts[1][2], pts[2][2], pts[3][2], t);
			var p3 = getBezier(pts[0][3], pts[1][3], pts[2][3], pts[3][3], t);

			var point = getBezier(p0, p1, p2, p3, t0);


			grid[i][j] = point;
		
		}
	}

	setFromGrid(plane, grid);
}
function getBezier(p1, p2, p3, p4, t){

	var x = p1.x * Math.pow((1-t),3)+3 * p2.x * Math.pow((1-t),2) * t + 3 * p3.x * (1-t)* t*t+ p4.x * t*t*t;
	var y = p1.y * Math.pow((1-t),3)+3 * p2.y * Math.pow((1-t),2) * t + 3 * p3.y * (1-t)* t*t+ p4.y * t*t*t;
	var z = p1.z * Math.pow((1-t),3)+3 * p2.z * Math.pow((1-t),2) * t + 3 * p3.z * (1-t)* t*t+ p4.z * t*t*t;

	var r = p1.r * Math.pow((1-t),3)+3 * p2.r * Math.pow((1-t),2) * t + 3 * p3.r * (1-t)* t*t+ p4.r * t*t*t;
	var g = p1.g * Math.pow((1-t),3)+3 * p2.g * Math.pow((1-t),2) * t + 3 * p3.g * (1-t)* t*t+ p4.g * t*t*t;
	var b = p1.b * Math.pow((1-t),3)+3 * p2.b * Math.pow((1-t),2) * t + 3 * p3.b * (1-t)* t*t+ p4.b * t*t*t;
	return {x:x, y:y, z:z, r:r, g:g, b:b};
}
function getControlPoints(){
	if(!playing){
		var arr = [];
		var curves = currentSurface.curves;
		for(var i = 0; i < curves.length; i++){
			arr.push(curves[i].points)
		}
		return arr;
	}
	else{
		var t;
		if(timeFunction =="cos"){
			t = (Math.cos(time - 3.14) + 1 )/2
		}
		else if(timeFunction =="modulo"){
			t = (time %6 )/6;
		}
		var c1 = surfaces[0].curves;
		var c2 = surfaces[1].curves;
		var c3 = surfaces[2].curves;
		var c4 = surfaces[3].curves;
		var curves = createGrid(4,4);
	
		for(var i = 0 ; i < curves.length; i++){
			for(var j = 0 ; j < curves.length; j++){
				var p1 = c1[i].points[j];
				var p2 = c2[i].points[j];
				var p3 = c3[i].points[j];
				var p4 = c4[i].points[j];
				curves[i][j] = getBezier(p1, p2, p3, p4, t);

			}
		}
		return curves;
	}
}
function createGrid(width, height){
	var arr = new Array(width);
	for(var i =0 ;i < arr.length; i++){
		arr[i] = new Array(height);
	}
	return arr;
}