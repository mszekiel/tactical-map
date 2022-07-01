import styled from "@emotion/styled";
import { MapComponent } from "./components/MapComponent";
import { Units } from "./components/Units";
import { useMap } from "./components/useMap";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`;

const Column = styled.div`
  flex: 1;
  outline: none;

  &:nth-of-type(2) {
    flex: 2;
  }
`;

export function Map() {
  return (
    <Container>
      <Units />
      <MapComponent />
    </Container>
  );
}
