function initScene(){
	WIDTH = $(window).width();
	HEIGHT = $(window).height();

	// Set some camera attributes.
	const VIEW_ANGLE = 45;
	const ASPECT = WIDTH / HEIGHT;
	const NEAR = 0.01;
	const FAR = 100000;



	resX = 20;
	resY = 20;
	planeWidth = 10;
	planeHeight = 10;
	selected = [];
	playing = false;
	if(timeFunction == undefined){
		timeFunction = "cos"
	}
	
	time = 0;
	dt = 0.03;

	startColor = new  THREE.Color(0.2, 0.2, 0.8);

	// Get the DOM element to attach to


	// Create a WebGL renderer, camera
	// and a scene
	raycaster = new THREE.Raycaster();
	renderer = new THREE.WebGLRenderer();
	camera =
	    new THREE.PerspectiveCamera(
	        VIEW_ANGLE,
	        ASPECT,
	        NEAR,
	        FAR
	    );

	

	// Start the renderer.
	renderer.setSize(WIDTH, HEIGHT);

	document.body.appendChild( renderer.domElement );
	var element = renderer.domElement;
	

	scene = new THREE.Scene();

	controlGeo = new THREE.SphereGeometry( 0.3, 16, 16 );
	controlMat = new THREE.MeshPhongMaterial({color: startColor});


	planeGeo = new THREE.PlaneGeometry( planeWidth, planeHeight, resX, resY );
	planeMat = new THREE.MeshPhongMaterial( { vertexColors: THREE.VertexColors } );
	plane = new THREE.Mesh(planeGeo, planeMat);
	plane.material.side = THREE.DoubleSide;

	plane.visible = true;

	planeGeo2 = new THREE.PlaneGeometry( planeWidth*10, planeHeight * 10, 10, 10 );
	planeMat2 = new THREE.MeshPhongMaterial({color:0xAADDDD });
	plane2 = new THREE.Mesh(planeGeo2, planeMat2);
	plane2.material.side = THREE.DoubleSide;
	plane2.position.y = -10;
	plane.position.z = 0;
	plane.castShadow = true; //default is false
	//plane.receiveShadow = true; //default
	plane2.receiveShadow = true; //default

	rotatePlane(plane)
	rotatePlane(plane2)
	scene.add(plane);
	scene.add(plane2);

	var light = new THREE.AmbientLight( 0x404040 ); // soft white light
	scene.add( light );
	var plight = new THREE.PointLight( 0xAAAAAA );
	plight.position.set( 20, 40, 10 );
	plight.castShadow = true
	
	plight.shadowBias = 0.0001;
	plight.shadowDarkness = 0.2;
	plight.shadowMapWidth = 2048;
	plight.shadowMapHeight = 2048;
	scene.add( plight );
	camera.position.set(20,20,30);
	camera.lookAt(new THREE.Vector3(0,0,0));

	plane.geometry.computeVertexNormals();
	plane2.geometry.computeVertexNormals();

	plane.geometry.verticesNeedUpdate = true;
	plane.geometry.normalsNeedUpdate = true;
	plane2.geometry.verticesNeedUpdate = true;
	plane2.geometry.normalsNeedUpdate = true;
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.renderSingleSided = false; // default is true
	renderer.shadowMapSoft = true;
	renderer.shadowMapType = THREE.PCFShadowMap;

	controls = new THREE.OrbitControls( camera );
	//controls.addEventListener( 'change', render );

	grid = arrayToGrid(plane.geometry.vertices);
	
	
	createSurfaces();
	
	if(points != undefined){
		for(var i = 0; i < surfaces.length; i++){
			surfaces[i].setCurves(points[i]);
		}
		console.log(surfaces);
	}
	currentSurface = surfaces[0];
	currentSurface.show();
	computeSurface();
	animationLoop();

}

function render(){

	renderer.render(scene, camera);
}

function animationLoop(){
	time += dt;
	if(playing){
		computeSurface();
	}
	plane.material.vertexColors = THREE.VertexColors;
	renderer.render(scene, camera);
	setTimeout(animationLoop, 30);
}

initScene();

