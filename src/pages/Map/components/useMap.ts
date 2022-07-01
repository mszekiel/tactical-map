// @ts-nocheck
import "mapbox-gl/dist/mapbox-gl.css";

import mapboxgl from "mapbox-gl";
import * as THREE from "three";
import { Threebox } from "threebox-plugin";
import { useEffect, useRef, useState } from "react";

const MAPBOX_KEY = `${import.meta.env.VITE_MAPBOX_KEY}`;

export const useMap = () => {
  const containerRef = useRef(null);
  const map = useRef<mapboxgl.Map>();

  useEffect(() => {
    if (!containerRef.current) return;

    map.current = new mapboxgl.Map({
      accessToken: MAPBOX_KEY,
      antialias: true,
      attributionControl: false,
      container: containerRef.current,
      hash: true,
      center: [41, 43],
      zoom: 6,
      style: "mapbox://styles/mszekiel/cl17tt1i1000p14rugg9hspoa",
    });
  });

  useEffect(() => {
    if (!map.current) return;
    map.current.addControl(new mapboxgl.NavigationControl());

    map.current.on("load", () => {
      if (!map.current) return;

      map.current.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });

      map.current.setTerrain({ source: "mapbox-dem", exaggeration: 1 });

      map.current.addLayer({
        id: "custom-layer",
        type: "custom",
        renderingMode: "3d",
        onAdd: (map, gl) => {
          window.tb = new Threebox(map, gl, {
            defaultLights: true,
          });
        },
        render: (gl, matrix) => {
          tb.update();
        },
      });

      const geometry = new THREE.BoxGeometry(80, 80, 120);
      const cube = tb.Object3D({
        obj: new THREE.Mesh(
          geometry,
          new THREE.MeshPhongMaterial({ color: 0xff0000 })
        ),
        unit: "meters",
      });
      cube.setCoords([43, 41, 100]);
      tb.add(cube);

      tb.loadObj(
        {
          obj: "src/assets/models/FixedWing.F-16.obj",
          scale: 5,
          type: "mtl",
          units: "meters",
          rotation: { x: 0, y: 0, z: 0 },
        },
        (model) => {
          model.traverse((child) => {
            if (child.material) {
              child.material.color.setHex(0x0000ff);
            }
          });
          const model1 = model.setCoords([43, 41, 130]);
          tb.add(model1);
        }
      );
    });
  }, [map.current]);

  return {
    map: map.current,
    containerRef,
  };
};
