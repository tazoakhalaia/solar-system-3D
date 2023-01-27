import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import starTexture from './img/space.jpg'
import sunTexture from './img/sun.jpg'
import Jupiter from './img/jupiter.jpg'
import Pluto from './img/pluto.jpg'
import Earth from './img/earth.jpg'
import Sat from './img/saturn.png'
import SaturnRing from './img/saturnring.jpg'
import { DoubleSide } from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  innerWidth/innerHeight,
  0.1,
  1000)


const render = new THREE.WebGLRenderer({ antialias: true })
render.setSize(innerWidth,innerHeight)
document.body.appendChild(render.domElement)

const orbit = new OrbitControls(camera, render.domElement)

camera.position.set(-200,140,140)
orbit.update()

scene.background = new THREE.TextureLoader().load(starTexture)

const textureLoader =  new THREE.TextureLoader()

const sunSphere = new THREE.SphereGeometry(24,30,30)
const sunMaterial = new THREE.MeshBasicMaterial({map: textureLoader.load(sunTexture)})
const sun = new THREE.Mesh(sunSphere, sunMaterial)
scene.add(sun)

const jupiterSphere = new THREE.SphereGeometry(12,30,30)
const jupiterMaterial = new THREE.MeshStandardMaterial({map: textureLoader.load(Jupiter)})
const jupiter = new THREE.Mesh(jupiterSphere, jupiterMaterial)
jupiter.position.x = 138
const jupiterObj = new THREE.Object3D()
jupiterObj.add(jupiter)
scene.add(jupiterObj)


const earthSphere = new THREE.SphereGeometry(8,30,30)
const earthMaterial = new THREE.MeshStandardMaterial({map: textureLoader.load(Earth)})
const earth = new THREE.Mesh(earthSphere, earthMaterial)
earth.position.x = 48
const earthObj = new THREE.Object3D()
earthObj.add(earth)
scene.add(earthObj)

const saturnSphere = new THREE.SphereGeometry(10,20,32)
const saturnMaterial = new THREE.MeshStandardMaterial({
  map: textureLoader.load(Sat),
})
const saturn = new THREE.Mesh(saturnSphere, saturnMaterial)
saturn.position.x = 108
const saturnObj = new THREE.Object3D()
saturnObj.add(saturn)
scene.add(saturnObj)

const saturnRing = new THREE.RingGeometry(12,25,32)
const saturnRingMaterial = new THREE.MeshBasicMaterial({
  map: textureLoader.load(SaturnRing), 
  side: DoubleSide
})
const saturnRingMesh = new THREE.Mesh(saturnRing, saturnRingMaterial)
saturnObj.add(saturnRingMesh)
saturnRingMesh.position.x = 108
saturnRingMesh.rotation.x = -0.5 * Math.PI
scene.add(saturnObj)


const plutoSphere = new THREE.SphereGeometry(10,20,32)
const plutoMaterial = new THREE.MeshStandardMaterial({
  map: textureLoader.load(Pluto),
})
const pluto = new THREE.Mesh(plutoSphere, plutoMaterial)
pluto.position.x = 199
const plutoObj = new THREE.Object3D()
plutoObj.add(pluto)
scene.add(plutoObj)



const pointLight = new THREE.PointLight("0xFFFFFF", 2, 600)
scene.add(pointLight)


function animate(){
  requestAnimationFrame(animate)
  render.render(scene, camera)
  sun.rotateY(0.01)
  jupiterObj.rotateY(0.05)
  jupiter.rotateY(0.07)
  earthObj.rotateY(0.03)
  earth.rotateX(0.07)
  saturnObj.rotateY(0.02)
  saturn.rotateY(0.03)
  pluto.rotateX(0.06)
  plutoObj.rotateY(0.02)
}

animate()

window.addEventListener('resize', ()=> {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  render.setSize(window.innerWidth, window.innerHeight)
})

