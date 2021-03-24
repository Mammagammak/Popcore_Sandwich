const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });

const fov = 75;
const aspect = 2; // the canvas default
const near = 0.1;
const far = 5;
var camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 1000);
let isLevelComplete = false;

camera.position.z = 3;
renderer.setClearColor("#ffffff");
renderer.setSize(window.innerWidth, window.innerHeight);

var light = new THREE.PointLight(0xFFFFFF, 1, 500);
light.position.set(10, 0, 25);
scene.add(light);
clock = new THREE.Clock(true)
var tick;

document.body.appendChild(renderer.domElement);
// Update
var render = function() {
    requestAnimationFrame(render);

    renderer.render(scene, camera);
}
const loader = new THREE.TextureLoader();
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})

const gltfLoader = new THREE.GLTFLoader();

var positionArray = [];

var bread, breadBite1, breadBite2;
var cheese, cheeseBite1, cheeseBite2;
var tomato, tomatoBite1, tomatoBite2;
var lettuce, lettuceBite1, lettuceBite2;
var onion, onionBite1, onionBite2;
var egg, eggBite1, eggBite2;
var salmon, salmonBite1, salmonBite2

var objectsList = [];
var objectsBite1List = [];
var objectsBite2List = [];
var stackOfObjects = [];
var objectsInScene = [];
var colors = [0xf0d1a0, 0xffd34d, 0xff6347, 0x34a62f, 0xece2d4];



var indexesOfLevel1 = [4, 1, 4, 2, 3];
var indexesOfLevel2 = [1, 5, 2, 3, 4, 4];
var indexesOfLevel3 = [];


indexesOfLevels = [indexesOfLevel1, indexesOfLevel2, indexesOfLevel3]
let currentLevel = 0;

var textureLoader = new THREE.TextureLoader();
var map;

handleLevels(currentLevel);

/*var particleSystem = new THREE.GPUParticleSystem({
    maxParticles: 250000
});
scene.add(particleSystem);

	// options passed during each spawned
	var options = {
		position: new THREE.Vector3(0,0,0),
		positionRandomness: 3,
		velocity: new THREE.Vector3(),
		velocityRandomness: 5,
		color: 0xaa88ff,
		colorRandomness: 10,
		turbulence: 10,
		lifetime: 10,
		size: 2,
		sizeRandomness: 10
	};

	var spawnerOptions = {
		spawnRate: 3260,
		timeScale: 1
	}*/

function loadGameLevel(positionArray) {
    objectsInScene = [];
    objectsList = [];
    stackOfObjects = [];
    isLevelComplete = false;


    gltfLoader.load('Assets/GenericSkins.glb', function(gltf) {
        var loadedMesh = gltf.scene.children.find((child) => child.name === "Skin01");
        onion = loadedMesh;
        onion.userData.index = 0;
        objectsList.push(onion);
        objectsList[0].material = new THREE.MeshBasicMaterial({
            map: textureLoader.load('Assets/redonion_texture.jpg'),
        });

        loadedMesh = gltf.scene.children.find((child) => child.name === "Skin02");
        cheese = loadedMesh;
        cheese.userData.index = 1;
        objectsList.push(cheese);
        objectsList[1].material = new THREE.MeshBasicMaterial({
            map: textureLoader.load('Assets/cheese_texture.jpg'),
        });

        loadedMesh = gltf.scene.children.find((child) => child.name === "Skin03");
        tomato = loadedMesh;
        tomato.userData.index = 2;
        objectsList.push(tomato);
        objectsList[2].material = new THREE.MeshBasicMaterial({
            map: textureLoader.load('Assets/tomato_texture.png'),
        })

        loadedMesh = gltf.scene.children.find((child) => child.name === "Skin04");
        lettuce = loadedMesh;
        lettuce.userData.index = 3;
        objectsList.push(lettuce);
        objectsList[3].material = new THREE.MeshBasicMaterial({
            map: textureLoader.load('Assets/lettuce_texture.jpg'),
        });

        loadedMesh = gltf.scene.children.find((child) => child.name === "Skin05");
        bread = loadedMesh;
        bread.userData.index = 4;
        objectsList.push(bread);
        objectsList[4].material = new THREE.MeshBasicMaterial({
            map: textureLoader.load('Assets/bread_texture.png'),
        });


        loadedMesh = gltf.scene.children.find((child) => child.name === "Skin05");
        egg = loadedMesh;
        egg.userData.index = 5;
        objectsList.push(egg);
        objectsList[5].material = new THREE.MeshBasicMaterial({
            map: textureLoader.load('Assets/bread_texture.png'),
        });

        loadedMesh = gltf.scene.children.find((child) => child.name === "Skin05");
        salmon = loadedMesh;
        salmon.userData.index = 6;
        objectsList.push(salmon);
        objectsList[6].material = new THREE.MeshBasicMaterial({
            map: textureLoader.load('Assets/bread_texture.png'),
        });


        for (let i = 0; i < positionArray.length; i++) {
            var obj = objectsList[indexesOfLevel1[i]].clone(true);
            obj.position.set(positionArray[i].x, positionArray[i].y);
            objectsInScene.push(obj);
            scene.add(obj);
        }
    })

    //Adding Bite1 ingredients

    gltfLoader.load('Assets/GenericSkinsBite01.glb', function(gltf) {
        var loadedMesh = gltf.scene.children.find((child) => child.name === "Skin01Bite01");
        onionBite1 = loadedMesh;
        onionBite1.userData.index = 0;
        objectsBite1List.push(onionBite1);
        objectsBite1List[0].material = new THREE.MeshBasicMaterial({
            map: textureLoader.load('Assets/redonion_texture.jpg'),
        });

        loadedMesh = gltf.scene.children.find((child) => child.name === "Skin02Bite01");
        cheeseBite1 = loadedMesh;
        cheeseBite1.userData.index = 1;
        objectsBite1List.push(cheeseBite1);
        objectsBite1List[1].material = new THREE.MeshBasicMaterial({
            map: textureLoader.load('Assets/cheese_texture.jpg'),
        });


        loadedMesh = gltf.scene.children.find((child) => child.name === "Skin03Bite01");
        tomatoBite1 = loadedMesh;
        tomatoBite1.userData.index = 2;
        objectsBite1List.push(tomatoBite1);
        objectsBite1List[2].material = new THREE.MeshBasicMaterial({
            map: textureLoader.load('Assets/tomato_texture.jpg'),
        });

        loadedMesh = gltf.scene.children.find((child) => child.name === "Skin04Bite01");
        lettuceBite1 = loadedMesh;
        lettuceBite1.userData.index = 3;
        objectsBite1List.push(lettuceBite1);
        objectsBite1List[3].material = new THREE.MeshBasicMaterial({
            map: textureLoader.load('Assets/lettuce_texture.jpg'),
        });

        loadedMesh = gltf.scene.children.find((child) => child.name === "Skin05Bite01");
        breadBite1 = loadedMesh;
        breadBite1.userData.index = 4;
        objectsBite1List.push(breadBite1);
        objectsBite1List[4].material = new THREE.MeshBasicMaterial({
            map: textureLoader.load('Assets/bread_texture.png'),
        });

        loadedMesh = gltf.scene.children.find((child) => child.name === "Skin05Bite01");
        eggBite1 = loadedMesh;
        eggBite1.userData.index = 5;
        objectsBite1List.push(eggBite1);
        objectsBite1List[5].material = new THREE.MeshBasicMaterial({
            map: textureLoader.load('Assets/bread_texture.png'),
        });

        loadedMesh = gltf.scene.children.find((child) => child.name === "Skin05Bite01");
        salmonBite1 = loadedMesh;
        salmonBite1.userData.index = 6;
        objectsBite1List.push(salmonBite1);
        objectsBite1List[6].material = new THREE.MeshBasicMaterial({
            map: textureLoader.load('Assets/bread_texture.png'),
        });
    });


    gltfLoader.load('Assets/GenericSkinsBite02.glb', function(gltf) {

        var loadedMesh = gltf.scene.children.find((child) => child.name === "Skin01Bite02");
        onionBite2 = loadedMesh;
        onionBite2.userData.index = 0;
        objectsBite2List.push(onionBite2);
        objectsBite2List[0].material = new THREE.MeshBasicMaterial({
            map: textureLoader.load('Assets/redonion_texture.jpg'),
        });

        loadedMesh = gltf.scene.children.find((child) => child.name === "Skin02Bite02");
        cheeseBite2 = loadedMesh;
        cheeseBite2.userData.index = 1;
        objectsBite2List.push(cheeseBite2);
        objectsBite2List[1].material = new THREE.MeshBasicMaterial({
            map: textureLoader.load('Assets/cheese_texture.jpg'),
        });

        loadedMesh = gltf.scene.children.find((child) => child.name === "Skin03Bite02");
        tomatoBite2 = loadedMesh;
        tomatoBite2.userData.index = 2;
        objectsBite2List.push(tomatoBite2);
        objectsBite2List[2].material = new THREE.MeshBasicMaterial({
            map: textureLoader.load('Assets/tomato_texture.jpg'),
        });

        loadedMesh = gltf.scene.children.find((child) => child.name === "Skin04Bite02");
        lettuceBite2 = loadedMesh;
        lettuceBite2.userData.index = 3;
        objectsBite2List.push(lettuceBite2);
        objectsBite2List[3].material = new THREE.MeshBasicMaterial({
            map: textureLoader.load('Assets/lettuce_texture.jpg'),
        });

        loadedMesh = gltf.scene.children.find((child) => child.name === "Skin05Bite02");
        breadBite2 = loadedMesh;
        breadBite2.userData.index = 4;
        objectsBite2List.push(breadBite2);
        objectsBite2List[4].material = new THREE.MeshBasicMaterial({
            map: textureLoader.load('Assets/bread_texture.png'),
        });

        loadedMesh = gltf.scene.children.find((child) => child.name === "Skin05Bite02");
        eggBite2 = loadedMesh;
        eggBite2.userData.index = 5;
        objectsBite2List.push(eggBite2);
        objectsBite2List[5].material = new THREE.MeshBasicMaterial({
            map: textureLoader.load('Assets/bread_texture.png'),
        });

        loadedMesh = gltf.scene.children.find((child) => child.name === "Skin05Bite02");
        salmonBite2 = loadedMesh;
        salmonBite2.userData.index = 6;
        objectsBite2List.push(salmonBite2);
        objectsBite2List[6].material = new THREE.MeshBasicMaterial({
            map: textureLoader.load('Assets/bread_texture.png'),
        });
    })
};



let touchStart = new THREE.Vector2(0, 0);
let touchEnd = new THREE.Vector2(0, 0);

let firstTouch = null;

function getTouches(event) {
    return event.touches || (event.originalEvent && event.originalEvent.touches);
}



//checking if there is an object at the location that the new object is gonna be sent
var objectBase = 0;

function getObjectOnPosition(newPosition) {
    for (i = 0; i < objectsInScene.length; i++) {
        var isCloseEnough = manhattanDistanceTo(objectsInScene[i].position, newPosition)
        if (isCloseEnough <= 0.25) {
            return objectsInScene[i];
        }
    }

    return null;
}


var selectedObject = null;

function handleTouchStart(event) {
    const touches = getTouches(event);
    firstTouch = touches ? touches[0] : event;

    mouse.x = (firstTouch.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(firstTouch.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length) {
        selectedObject = intersects[0].object;
    }
};

function handleTouchMove(event) // touchi koordinatlarini aliyor, directioni buluyor
{
    if (!firstTouch || selectedObject == null) return;

    var selectedObjectPosition = selectedObject.position;
    var newPosition = selectedObjectPosition;
    const touches = getTouches(event);
    const currentTouch = touches ? touches[0] : event;

    var xDiff = firstTouch.clientX - currentTouch.clientX;
    var yDiff = firstTouch.clientY - currentTouch.clientY;

    var targetRotationX = selectedObject.rotation.x;
    var targetRotationY = selectedObject.rotation.y;
    var targetRotationZ = selectedObject.rotation.z;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            newPosition = new THREE.Vector3(selectedObjectPosition.x - 1, selectedObjectPosition.y, selectedObjectPosition.z);
            targetRotationY = -3;
        } else {
            newPosition = new THREE.Vector3(selectedObjectPosition.x + 1, selectedObjectPosition.y, selectedObjectPosition.z);
            targetRotationY = 3;
        }
    } else {
        if (yDiff > 0) {
            newPosition = new THREE.Vector3(selectedObjectPosition.x, selectedObjectPosition.y + 1, selectedObjectPosition.z);
            targetRotationX = -3;
        } else {
            newPosition = new THREE.Vector3(selectedObjectPosition.x, selectedObjectPosition.y - 1, selectedObjectPosition.z);
            targetRotationX = 3;
        }

    }

    var objectOnPosition = getObjectOnPosition(newPosition);
    if (objectOnPosition != null) // smooth motion animation to the new position
    {
        box = new THREE.Box3().setFromObject(objectOnPosition); //box around selected object
        if (stackOfObjects.indexOf(selectedObject) < 0) 
        {
            stackOfObjects.push(objectOnPosition);
            this.tl = new TimelineMax({onComplete:levelComplete});
            this.tl.to(selectedObject.rotation, .5, { x:targetRotationX, y:targetRotationY, z: targetRotationZ, ease: Expo.linear });
            this.tl.to(selectedObject.position, .5, { x: newPosition.x, y:newPosition.y, z: newPosition.z + box.max.z, ease: Expo.easeOut }, '-=.5');
            stackOfObjects.push(selectedObject);
        }
        else 
        {
            for (i = stackOfObjects.length - 1; i >= 0; i--) {
                this.tl = new TimelineMax({onComplete:levelComplete});
                this.tl.to(stackOfObjects[i].rotation, .5, { x:targetRotationX, y:targetRotationY, z: targetRotationZ, ease: Expo.linear });
                this.tl.to(stackOfObjects[i].position, .5, { x: newPosition.x, y:newPosition.y, z: newPosition.z + box.max.z, ease: Expo.easeOut }, '-=.5');
                newPosition.z = newPosition.z + box.max.z;
            }

            stackOfObjects.splice(0, 0, objectOnPosition);
        }

    }
    firstTouch = null;
};

function handleLevels(currentLevel) 
{
    if (currentLevel == 0) {
        positionArray = [
            new THREE.Vector3(0, 1, 0),
            new THREE.Vector3(-1, 0, 0),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(1, 0, 0),
            new THREE.Vector3(0, -1, 0),
        ]
    } else if (currentLevel == 1) {
        positionArray = [
            new THREE.Vector3(0, 1, 0),
            new THREE.Vector3(-1, 0, 0),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(1, 0, 0),
            new THREE.Vector3(0, -1, 0),
        ]
    } else if (currentLevel == 2) {
        positionArray = [
            new THREE.Vector3(0, 1, 0),
            new THREE.Vector3(-1, 0, 0),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(1, 0, 0),
            new THREE.Vector3(0, -1, 0),
        ]
    }

    loadGameLevel(positionArray)
};

function clearThree(obj) {
    while (obj.children.length > 0) {
        clearThree(obj.children[0])
        obj.remove(obj.children[0]);
    }
    if (obj.geometry) obj.geometry.dispose()

    if (obj.material) {
        //in case of map, bumpMap, normalMap, envMap ...
        Object.keys(obj.material).forEach(prop => {
            if (!obj.material[prop])
                return
            if (obj.material[prop] !== null && typeof obj.material[prop].dispose === 'function')
                obj.material[prop].dispose()
        })
        obj.material.dispose()
    }
}
THREE.Object3D.prototype.rotateAroundWorldAxis = function() {

    // rotate object around axis in world space (the axis passes through point)
    // axis is assumed to be normalized
    // assumes object does not have a rotated parent

    var q = new THREE.Quaternion();

    return function rotateAroundWorldAxis(point, axis, angle) {

        q.setFromAxisAngle(axis, angle);

        this.applyQuaternion(q);

        this.position.sub(point);
        this.position.applyQuaternion(q);
        this.position.add(point);

        return this;

    }
}();

function levelComplete()
{
    if(stackOfObjects.length >= objectsInScene.length + 3)
    {
        isLevelComplete = true;
    }
}

var bite = 0;

function handleBite(event) 
{
    if(!isLevelComplete) return;

    if(bite >= 3)
    {
        currentLevel = (currentLevel + 1) % 3;
        handleLevels(currentLevel);
        return;
    }
    else if(bite == 2)
    {
        for(i = 0; i < objectsInScene.length; i++)
        {
            scene.remove(objectsInScene[i]);
        }
    }
    else
    {
        for(i = 0; i < objectsInScene.length; i++)
        {
            var index = objectsInScene[i].userData.index;
            if(bite == 0)
            {
                var obj = objectsBite1List[index].clone(true);
            }
            else if(bite == 1)
            {
                var obj = objectsBite2List[index].clone(true);
            }
    
            obj.position.set(objectsInScene[i].position.x, objectsInScene[i].position.y,objectsInScene[i].position.z);
            obj.rotation.x = 45;
            scene.remove(objectsInScene[i]);
            scene.add(obj);
            objectsInScene[i] = obj;
        }
        bite++;
    }
};     



window.addEventListener('mousedown', handleBite, false);
//window.addEventListener('touchmove', handleLevels, false);
//window.addEventListener('mousemove', handleTouchMove, false);
window.addEventListener('touchstart', handleTouchStart, false);
window.addEventListener('touchmove', handleTouchMove, false);
render();


// comparison of the given two vectors, to determine if the new position of the selected object overlaps with any other object position
function manhattanDistanceTo(v1, v2) {
    return Math.abs(v1.x - v2.x) + Math.abs(v1.y - v2.y);
}