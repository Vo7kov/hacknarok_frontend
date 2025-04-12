import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FC, useRef } from 'react';
import { StyleSheet } from 'react-native';

type Props = {
  data: string;
};

export const ARPopup: FC<Props> = ({ data }) => {
  const glRef = useRef(null);

  const parsedData = data.includes('description')
    ? JSON.parse(data.slice(1, -1))
    : {
        id: '1',
        creator_id: '1',
        description: 'Biesiada',
        registered_users: 100,
        password: 'Przynies, wiecej miodu',
        name: 'Biesiada',
        location: 'Valhalla',
        date: '12.12.1410',
        max_users: 150,
      };

  const { id, creator_id, registered_users, max_users, ...dataToRender } =
    parsedData;

  const formattedData = Object.entries(dataToRender)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');

  console.log('formattedData', formattedData);

  const makeRuneShape = (): THREE.Shape => {
    const shape = new THREE.Shape();
    shape.moveTo(-1, -2);
    shape.lineTo(-1.2, 0);
    shape.lineTo(-0.8, 2.3);
    shape.lineTo(0, 2.8);
    shape.lineTo(0.8, 2.5);
    shape.lineTo(1.2, 1.5);
    shape.lineTo(1.1, -1.5);
    shape.lineTo(0.2, -2.3);
    shape.lineTo(-0.5, -2.5);
    shape.lineTo(-1, -2);
    return shape;
  };

  const onContextCreate = async (gl: any) => {
    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    renderer.setClearColor(0x000000, 0); // прозрачный фон

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      50,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 0, 6);
    camera.lookAt(0, 0, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.4);
    backLight.position.set(0, 0, -5);
    scene.add(backLight);

    const sideLight = new THREE.DirectionalLight(0xffffff, 0.3);
    sideLight.position.set(5, 2, 5);
    scene.add(sideLight);

    const group = new THREE.Group();
    group.position.set(0, 0, 0);

    // Камень
    const shape = makeRuneShape();
    const extrudeSettings = { depth: 0.4, bevelEnabled: false };
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshStandardMaterial({
      color: 0x808588,
    });
    const runePlate = new THREE.Mesh(geometry, material);
    group.add(runePlate);

    // Текст
    const fontLoader = new FontLoader();
    fontLoader.load(
      'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
      (font) => {
        const createTextMesh = (text: string) => {
          const geo = new TextGeometry(text, {
            font,
            size: 0.1,
            depth: 0.001,
          });
          geo.computeBoundingBox();
          if (geo.boundingBox) {
            const xOffset = (geo.boundingBox.max.x + geo.boundingBox.min.x) / 2;
            const yOffset = (geo.boundingBox.max.y + geo.boundingBox.min.y) / 2;
            geo.translate(-xOffset, -yOffset, 0);
          }

          const mat = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
          });
          return new THREE.Mesh(geo, mat);
        };

        const frontText = createTextMesh(formattedData);
        frontText.position.set(0, 0, 0.5);
        group.add(frontText);

        const backText = createTextMesh(formattedData);
        backText.position.set(0, 0, -0.1);
        backText.rotation.y = Math.PI;
        group.add(backText);
      },
    );

    scene.add(group);

    const animate = () => {
      requestAnimationFrame(animate);
      group.rotation.y += 0.003;
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };

    animate();
  };

  return (
    <GLView
      style={StyleSheet.absoluteFill}
      onContextCreate={onContextCreate}
      ref={glRef}
    />
  );
};
