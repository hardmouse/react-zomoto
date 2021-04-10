import React, { Component } from "react";
// import ReactDOM from "react-dom";
import * as THREE from "three";
import * as dat from "dat.gui";
class Scene extends Component {
  constructor(props) {
    super(props);

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
  }
  addGUI() {
    var options = {
      velx: 0,
      vely: 0,
      camera: {
        speed: 0.0001,
      },
      middleCubeY: 0,
    };
    const gui = new dat.GUI();
    // this.gui = gui;
    this.options = options;

    var cam = gui.addFolder("Camera");
    cam.add(options.camera, "speed", 0, 0.001).listen();
    cam.add(this.camera.position, "z", 0, 10).listen();
    cam.add(this.camera.position, "y", -3, 3).listen();
    cam.open();
    var velocity = gui.addFolder("Velocity");
    velocity.add(options, "velx", -0.1, 0.2).name("X").listen();
    velocity.add(options, "vely", -0.2, 0.2).name("Y").listen();
    velocity.open();

    var MiddleCube = gui.addFolder("Y Pos");
    MiddleCube.add(options, "middleCubeY", -3, 3).name("Y").listen();
    MiddleCube.open();
  }

  makeInstance(_scene, geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({ color });
    const cube = new THREE.Mesh(geometry, material);
    _scene.add(cube);
    cube.position.x = x;
    return cube;
  }

  light(_scene, _type, _color, _intensity, _x, _y, _z) {
    let _light;
    switch (_type) {
      case "DirectionalLight":
        _light = new THREE.DirectionalLight(_color, _intensity);
        break;
      case "PointLight":
        _light = new THREE.PointLight(_color, _intensity);
        break;
      default:
        _light = new THREE.DirectionalLight(_color, _intensity);
        break;
    }
    _light.position.set(_x, _y, _z);

    _scene.add(_light);
    return _light;
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
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: "#433F81" });
    //   const material = new THREE.MeshBasicMaterial({ color: '#433F81' })
    const cube = new THREE.Mesh(geometry, material);

    const lights = [
      this.light(scene, "DirectionalLight", 0xffffff, 1, -1, 2, 4),
      this.light(scene, "PointLight", 0xff99aa, 1, -1, 2, 4),
    ];
    const cubes = [
      this.makeInstance(scene, geometry, 0x44aa88, 0),
      this.makeInstance(scene, geometry, 0x8844aa, -2),
      this.makeInstance(scene, geometry, 0xaa8844, 2),
      this.makeInstance(scene, geometry, 0xff0044, 4),
      this.makeInstance(scene, geometry, 0x0000ff, -4),
    ];
    camera.position.z = 4;
    scene.add(cube);
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);
    this.a = 0;
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.material = material;
    this.cube = cube;
    this.cubes = cubes;
    this.lights = lights;

    this.time = 0.001;

    this.mount.appendChild(this.renderer.domElement);
    this.start();

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

    this.a = (this.a + Math.PI / 360) % (Math.PI * 2);
    this.cube.position.x = 1.2 * Math.cos(this.a);
    // this.cube.position.y = -1.2 * Math.cos(this.a);
    this.cube.position.z = -1.2 * Math.cos(this.a);
    // console.log(this.options.velx)
    this.cubes.forEach((cube, ndx) => {
      this.time += 0.001;
      const speed = 1 + ndx * 0.1;
      const rot = this.time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
      cube.position.y = 1 + ndx * Math.cos(this.a);
    });
    this.lights.forEach((lite, ndx) => { 
      this.time += 0.001;
      lite.position.z = 5 + ndx * Math.cos(this.a);
    });
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);

    let _c = document.getElementById("threeBox");
    this.renderer.setSize(_c.offsetWidth, _c.offsetWidth*0.8);
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div
        style={{ width: "500px", height: "500px" }}
        ref={(mounts) => {
          this.mount = mounts;
        }}
      />
    );
  }
}

export default Scene;
