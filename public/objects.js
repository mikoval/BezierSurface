function surface(p1, p2, p3, p4){
	this.curves = [];

	for(var i = 0; i < 4; i++){
		var t = i /3;
		var t0 = 1-t;
		var startx = p1.x * t + p2.x * t0; 
		var starty = p1.y * t + p2.y * t0; 
		var startz = p1.z * t + p2.z * t0; 
		var endx = p3.x * t + p4.x * t0; 
		var endy = p3.y * t + p4.y * t0; 
		var endz = p3.z * t + p4.z * t0; 

		var start = {x:startx, y:starty, z:startz};
		var end = {x:endx, y:endy, z:endz};

		var c = new curve(start, end);
		this.curves.push(c);

	}
	this.show = function(){
		var objs  = this.curves;
		for(var i =0 ; i < objs.length; i++){
			objs[i].show();
		}
	}
	this.hide = function(){
		var objs  = this.curves;
		for(var i =0 ; i < objs.length; i++){
			objs[i].hide();
		}
	}
	this.getPoints = function(){
		var arr = [];
		for(var i = 0; i < this.curves.length; i++){
			arr = arr.concat(this.curves[i].objs)
		}
		return arr;
	}
	this.getCurves = function(){
		var curves = [];
		for(var i = 0; i < this.curves.length; i++){
			curves.push(this.curves[i].points);
		}
		return curves;
	}
	this.setCurves = function(points){
		for(var i = 0; i < this.curves.length; i++){
			this.curves[i].points = points[i];
			this.curves[i].resetPoints();
		}
	}
}
function curve(start, end){
	this.points = []
	this.objs = []

	for(var i = 0; i < 4; i++){
		var t = i /3;
		var t0 = 1-t;

		var px = start.x * t + end.x * t0; 
		var py = start.y * t + end.y * t0; 
		var pz = start.z * t + end.z * t0; 
		var pr = startColor.r;
		var pg = startColor.g;
		var pb = startColor.b;
		var p = {x:px, y:py, z:pz, r:pr, g: pg, b:pb};

		var sphere = new THREE.Mesh(controlGeo, controlMat)
		sphere.position.x = px;
		sphere.position.y = py;
		sphere.position.z = pz;


		sphere.target = p;
		scene.add(sphere);
		sphere.visible = false;
		this.objs.push(sphere);
		this.points.push(p);
	}
	this.show = function(){
		var objs  = this.objs;
		for(var i =0 ; i < objs.length; i++){
			objs[i].visible = true;
		}
	}
	this.hide = function(){
		var objs  = this.objs;
		for(var i =0 ; i < objs.length; i++){
			objs[i].visible = false;
		}
	}
	this.resetPoints = function(){
		for(var i = 0; i < this.objs.length; i++){
			var target = this.points[i];
			this.objs[i].target = target;
			this.objs[i].position.x = this.points[i].x;
			this.objs[i].position.y	= this.points[i].y;
			this.objs[i].position.z = this.points[i].z;
			this.objs[i].material = new THREE.MeshPhongMaterial({color:new THREE.Color(target.r, target.g, target.b)})

		}
	}

}