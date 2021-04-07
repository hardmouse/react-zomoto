import React, { Component } from "react";
// import ReactDOM from "react-dom";
import * as THREE from "three";
import * as dat from 'dat.gui';
class Scene extends Component {
  constructor(props) {
    super(props);

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
  }
  addGUI(){
    var options = {
        velx: 0,
        vely: 0,
        camera: {
          speed: 0.0001
        },
        middleCubeY: 0
    }
    const gui = new dat.GUI();
    // this.gui = gui;
    this.options = options;

    var cam = gui.addFolder('Camera');
    cam.add(options.camera, 'speed', 0, 0.0010).listen();
    cam.add(this.camera.position, 'z', 0, 10).listen();
    cam.add(this.camera.position, 'y', -3, 3).listen();
    cam.open();
    var velocity = gui.addFolder('Velocity');
    velocity.add(options, 'velx', -0.2, 0.2).name('X').listen();
    velocity.add(options, 'vely', -0.2, 0.2).name('Y').listen();
    velocity.open();
    
    var MiddleCube = gui.addFolder('Y Pos');
    MiddleCube.add(options, 'middleCubeY', -3, 3).name('Y').listen();
    MiddleCube.open();
  }
  componentDidMount() {
	// document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	// // document.addEventListener( 'mousedown', onDocumentMouseDown, false );    

    // var raycaster = new THREE.Raycaster();
    // var mouse = new THREE.Vector2();

    // function onDocumentMouseMove(_e){
    //     console.log(raycaster, mouse)
    // }
    
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: "#433F81" });
    //   const material = new THREE.MeshBasicMaterial({ color: '#433F81' })
    const cube = new THREE.Mesh(geometry, material);
    {
      const color = 0xffffff;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(-1, 2, 4);
      scene.add(light);
    }
    
    const cubes = [
        makeInstance(geometry, 0x44aa88,  0),
        makeInstance(geometry, 0x8844aa, -2),
        makeInstance(geometry, 0xaa8844,  2),
    ];

    camera.position.z = 4;
    scene.add(cube);
    renderer.setClearColor("#000000");
    renderer.setSize(width, height);

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.material = material;
    this.cube = cube;
    this.cubes = cubes;

    this.time = 0.001;

    this.mount.appendChild(this.renderer.domElement);
    this.start();

    function makeInstance(geometry, color, x) {
      const material = new THREE.MeshPhongMaterial({ color });

      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      cube.position.x = x;

      return cube;
    }


    this.addGUI();
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId);
  }

  animate() {
    this.cube.rotation.x -= this.options.velx;
    this.cube.rotation.y -= this.options.vely;
    this.cube.position.y = this.options.middleCubeY;
    // console.log(this.options.velx)
    this.cubes.forEach((cube, ndx) => {
        this.time += 0.001;
        const speed = 1 + ndx * .1;
        const rot = this.time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
      });
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div
        style={{ width: "800px", height: "800px" }}
        ref={(mounts) => {
          this.mount = mounts;
        }}
      />
    );
  }
}

export default Scene;
