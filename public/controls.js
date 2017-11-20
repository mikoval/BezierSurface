document.addEventListener('mousedown', onMouseDown, false);
document.addEventListener('keydown', onKeyDown, false);

function onMouseDown(event) {
    var points = currentSurface.getPoints();
    var mouse = new THREE.Vector2();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

   raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects(points);
    if ( intersects.length > 0 ) {
        select(intersects[0].object);
    }
   
}
function select(obj){
    for(var i = 0; i < selected.length; i++){
        if(selected[i] == obj){
            target = obj.target;
            obj.material = new THREE.MeshPhongMaterial({color:new THREE.Color(target.r, target.g, target.b)})
            selected.splice(i, 1);
            updatePointsUI();
            return;
        }
    }
    selected.push(obj);
    obj.material = new THREE.MeshPhongMaterial({color: 0xFFFFFF})
    updatePointsUI();
}
function onKeyDown(event){
    if(event.target.tagName.toLowerCase() == 'input'){
        return
    }
    var key = event.key;
    if(key == "w"){
        moveUp();
    }
    if(key == "s"){
        moveDown()
    }
    if(key == "e"){
        moveRight();
    }
    if(key == "d"){
        moveLeft()
    }
    if(key == "r"){
        moveForward();
    }
    if(key == "f"){
        moveBack()
    }
    if(key == "q"){
        expand()
    }
    if(key == "a"){
        collapse()
    }
    if(key == "."){
        deselectAll()
    }
    if(key == ","){
        selectAll()
    }

    if(key == "1"){
        changeSurface(0);
    }
    if(key == "2"){
        changeSurface(1);
    }
    if(key == "3"){
        changeSurface(2);
    }
    if(key == "4"){
        changeSurface(3);
    }
    if(key == "0"){
        replicate();
    }
    if(key == "p"){
        togglePlaying();
    }

    computeSurface();
}
function moveUp(){
    for(var i = 0; i < selected.length; i++){
        var obj = selected[i];
        obj.position.y += 0.1;
        obj.target.y += 0.1;
    }
}
function moveDown(){
    for(var i = 0; i < selected.length; i++){
        var obj = selected[i];
        obj.position.y -= 0.1;
        obj.target.y -= 0.1;
    }
}
function moveLeft(){
    for(var i = 0; i < selected.length; i++){
        var obj = selected[i];
        obj.position.x -= 0.1;
        obj.target.x -= 0.1;
    }
}
function moveRight(){
    for(var i = 0; i < selected.length; i++){
        var obj = selected[i];
        obj.position.x += 0.1;
        obj.target.x += 0.1;
    }
}
function moveForward(){
    for(var i = 0; i < selected.length; i++){
        var obj = selected[i];
        obj.position.z += 0.1;
        obj.target.z += 0.1;
    }
}
function moveBack(){
    for(var i = 0; i < selected.length; i++){
        var obj = selected[i];
        obj.position.z -= 0.1;
        obj.target.z -= 0.1;
    }
}
function expand(){
    for(var i = 0; i < selected.length; i++){
        var obj = selected[i];
        obj.position.x *= 1.1;
        obj.target.x *= 1.1;
        obj.position.y *= 1.1;
        obj.target.y *= 1.1;
        obj.position.z *= 1.1;
        obj.target.z *= 1.1;
    }
}
function collapse(){
    for(var i = 0; i < selected.length; i++){
        var obj = selected[i];
        obj.position.x *= 0.9;
        obj.target.x *= 0.9;
        obj.position.y *= 0.9;
        obj.target.y *=  0.9;
        obj.position.z *=  0.9;
        obj.target.z *= 0.9;
    }
}

function selectAll(){
    deselectAll()
    var points = currentSurface.getPoints();
    for(var i = 0; i < points.length; i++){
        select(points[i]);
    }
}
function deselectAll(){
    for(var i = 0; i < selected.length; i++){
        var obj = selected[i];
        var target = obj.target;
        obj.material = new THREE.MeshPhongMaterial({color:new THREE.Color(target.r, target.g, target.b)})
        
    }
    selected = [];
    updatePointsUI();
}
function changeSurface(ind){
    deselectAll();
    for(var i =0; i < surfaces.length; i++){
        surfaces[i].hide();
    }
    currentSurface = surfaces[ind];
    currentSurface.show();
    deselectAll();
}

function togglePlaying(){
    time = 0;
    if(playing){
        changeSurface(0);
        playing = !playing
    }
    else{
        for(var i =0; i < surfaces.length; i++){
            surfaces[i].hide();
        }
        playing = !playing;
    }
}


