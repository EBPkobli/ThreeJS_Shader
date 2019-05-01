$(document).ready(function () {
    var camera, scene, renderer;
    var uniforms;
    var newCube, cube , cubeVertex;
    var material, material2;

    init();
    animate();

    function init() {
        camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 100;
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);

        scene = new THREE.Scene();
        uniforms = {
            time: { type: "f", value: 1.0 },
            resolution: { type: "v2", value: new THREE.Vector2() },
            mouse: { type: "v2", value: new THREE.Vector2() }
        };

        uniforms2 = {
            time: { type: "f", value: 1.0 },
            resolution: { type: "v2", value: new THREE.Vector2() },
            mouse: { type: "v2", value: new THREE.Vector2() },
            tExplosion: {
                type: "t",
                value: THREE.ImageUtils.loadTexture( 'explosion.png' )
              }
        };
        material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: document.getElementById('vertexShader').textContent,
            fragmentShader: document.getElementById('fragmentShader1').textContent
        });

        material2 = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: document.getElementById('vertexShader').textContent,
            fragmentShader: document.getElementById('fragmentShader2').textContent
        });

        material3 = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: document.getElementById('vertexShader').textContent,
            fragmentShader: document.getElementById('fragmentShader3').textContent
        });

        material4 = new THREE.ShaderMaterial({
            uniforms: uniforms2,
            vertexShader: document.getElementById('vertexShader2').textContent,
            fragmentShader: document.getElementById('fragmentShader4').textContent
        });

        mesh = new THREE.Mesh(geometry, material);
        //scene.add(mesh);

        var geometryf = new THREE.BoxGeometry(30, 30, 30);
        for (var i = 0; i < geometryf.faces.length; i++) {
            geometryf.faces[i].color.setHex(Math.random() * 0xffffff);
        }

        var materialf = new THREE.MeshBasicMaterial({ color: 0xffffff, vertexColors: THREE.FaceColors });
        newCube = new THREE.Mesh(geometryf,materialf);
        newCube.position.x = -150.0;
        scene.add(newCube);


        var geometry = new THREE.BoxBufferGeometry(50, 30, 40);
        var geo = new THREE.EdgesGeometry(geometry); // or WireframeGeometry( geometry )

        var mat = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 5 });

        var wireframe = new THREE.LineSegments(geo, mat);
        cube = new THREE.Mesh(geometry, material);
        cube.add(wireframe);
        scene.add(cube);

        //var geometryV = new THREE.BoxBufferGeometry(3, 3, 3);
        cubeVertex =  new THREE.Mesh(
            new THREE.IcosahedronGeometry(20, 4 ),
            material4
        );
        cubeVertex.material.depthTest = true;
        cubeVertex.position.x = 150.0
        scene.add(cubeVertex);


        renderer.setPixelRatio(window.devicePixelRatio);

        document.body.appendChild(renderer.domElement);

        onWindowResize();
        window.addEventListener('resize', onWindowResize, false);

        document.onmousemove = function (e) {
            uniforms.mouse.value.x = e.pageX
            uniforms.mouse.value.y = e.pageY
        }
    }

    function onWindowResize(event) {
        renderer.setSize(window.innerWidth, window.innerHeight);
        uniforms.resolution.value.x = renderer.domElement.width;
        uniforms.resolution.value.y = renderer.domElement.height;
    }

    function animate() {
        requestAnimationFrame(animate);
        render();
    }

    function render() {
        uniforms.time.value += 0.05;
        uniforms2.time.value += 0.005;
        //uniforms.time.value = ((uniforms.time.value == 0.5) ? 0 : uniforms.time.value);
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.005;
        cube.rotation.z += 0.01;

        newCube.rotation.x += 0.03;
        newCube.rotation.y += 0.015;
        newCube.rotation.z -= 0.01;

        /*cubeVertex.rotation.x += 0.0003;
        cubeVertex.rotation.y += 0.0015;
        cubeVertex.rotation.z -= 0.001;
            */
        renderer.render(scene, camera);
    }
    var ii = 0;
    $("canvas").click(function () {
        switch (ii) {
            case 0:
                cube.material = material2
                ii++;
                break;
            case 1:
                cube.material = material3
                ii++;
                break;
            case 2:
                cube.material = material
                ii = 0;
                break;
        }
    });
});