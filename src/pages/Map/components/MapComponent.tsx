import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useMemo } from "react";

import styled from "@emotion/styled";
import DeckGL from "@deck.gl/react";
import { TerrainLayer } from "@deck.gl/geo-layers";
import { OBJLoader } from "@loaders.gl/obj";
import { SimpleMeshLayer, ScenegraphLayer } from "@deck.gl/mesh-layers";
import { PathLayer } from "@deck.gl/layers";

const Container = styled.div`
  position: relative;
  flex: 2;
  display: flex;
  flex-direction: row;
`;

const MapElement = styled.div`
  flex: 1;
  outline: none;
`;

const Vignette = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: inset 0 0 100px black, inset 0 0 20px black;
  pointer-events: none;
`;

const MAPBOX_TOKEN = `${import.meta.env.VITE_MAPBOX_KEY}`;
const TERRAIN_IMAGE = `https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.png?access_token=${MAPBOX_TOKEN}`;
const SURFACE_IMAGE = `https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.png?access_token=${MAPBOX_TOKEN}`;
const GLTF_URL =
  "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF-Binary/Avocado.glb";

const INITIAL_VIEW = {
  latitude: 42,
  longitude: 43,
  zoom: 6,
  bearing: 0,
  maxPitch: 90,
};

const ELEVATION_DECODER = {
  rScaler: 6553.6,
  gScaler: 25.6,
  bScaler: 0.1,
  offset: -10000,
};

interface MapComponentProps {
  initialView: any;
}

export const MapComponent = ({
  initialView = INITIAL_VIEW,
}: MapComponentProps) => {
  const terrain = useMemo(
    () =>
      new TerrainLayer({
        id: "terrain",
        minZoom: 0,
        maxZoom: 23,
        elevationDecoder: ELEVATION_DECODER,
        elevationData: TERRAIN_IMAGE,
        texture: SURFACE_IMAGE,
        color: [255, 255, 255],
      }),
    []
  );

  const mesh = useMemo(
    () =>
      new SimpleMeshLayer({
        id: "scene",
        // @ts-ignore
        mesh: "/src/assets/models/FixedWing.F-16.obj",
        loaders: [OBJLoader],
        data: [{ coordinates: [42.001, 43.003, 1500], color: [0, 140, 255] }],
        // @ts-ignore
        getPosition: (f) => f.coordinates,
        // @ts-ignore
        getColor: (f) => f.color,
        sizeScale: 100,
        getOrientation: [0, 250, 90],
        getTranslation: [0, 0, 2500],
        getScale: [1, 1, 1],
      }),
    []
  );

  const path = useMemo(
    () =>
      new PathLayer({
        id: "paths",
        data: [
          {
            path: [
              [41.0, 43.029, 4000],
              [41.9, 43.029, 4000],
              [41.999, 43.0035, 4000],
            ],
            color: [0, 140, 255],
          },
        ],
        widthScale: 200,
        capRounded: true,
        opacity: 0.6,
        // @ts-ignore
        getColor: () => [0, 140, 255],
      }),
    []
  );

  return (
    <Container>
      <DeckGL
        initialViewState={initialView}
        layers={[mesh, terrain, path]}
        controller
      ></DeckGL>
      <Vignette />
    </Container>
  );
};
