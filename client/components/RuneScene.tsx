import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import * as THREE from 'three';
import { useRef } from 'react';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

const runeOptions = ['1', '2', '3', '4', '5', '6'];

export function RuneScene() {
  const glRef = useRef<any>(null);

  const onContextCreate = async (gl: any) => {
    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000,
    );
    camera.position.z = 5;
    camera.lookAt(0, 0, 0);

    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    const fontLoader = new FontLoader();
    fontLoader.load(
      'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
      (font) => {
        const symbols = runeOptions.sort(() => Math.random() - 0.5).slice(0, 5);

        const columns = 2;
        const spacingX = 2.5;
        const spacingY = 2.5;
        const rows = Math.ceil(symbols.length / columns);

        for (let i = 0; i < symbols.length; i++) {
          const symbol = symbols[i];
          const col = i % columns;
          const row = Math.floor(i / columns);

          const posX = (col - (columns - 1) / 2) * spacingX;
          const posY = ((rows - 1) / 2 - row) * spacingY;

          const box = new THREE.Mesh(
            new THREE.BoxGeometry(1.2, 1.2, 0.3),
            new THREE.MeshStandardMaterial({ color: 0x222222 }),
          );
          box.position.set(posX, posY, 0);
          scene.add(box);

          const textGeo = new TextGeometry(symbol, {
            font,
            size: 0.4,
            depth: 0.05,
          });
          textGeo.center();

          const textMesh = new THREE.Mesh(
            textGeo,
            new THREE.MeshStandardMaterial({ color: 0xffffff }),
          );
          textMesh.position.set(posX, posY, 0.2);
          scene.add(textMesh);
        }

        const animate = () => {
          requestAnimationFrame(animate);
          renderer.render(scene, camera);
          gl.endFrameEXP();
        };
        animate();
      },
    );
  };

  return (
    <GLView
      style={{ flex: 1, backgroundColor: 'transparent' }}
      onContextCreate={onContextCreate}
      ref={glRef}
    />
  );
}
