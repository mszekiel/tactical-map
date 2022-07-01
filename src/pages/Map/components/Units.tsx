import { InputGroup, Text } from "@blueprintjs/core";
import styled from "@emotion/styled";
import { Tile } from "../../../components/Tile";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const Units = () => {
  return (
    <Container>
      <Tile>
        <Text>Search units</Text>
        <div>
          <InputGroup leftIcon="search" fill />
        </div>
      </Tile>
    </Container>
  );
};
