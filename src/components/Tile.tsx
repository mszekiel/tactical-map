import styled from "@emotion/styled";
import React from "react";

export const Tile = styled.div`
  display: inline-flex;
  flex-direction: column;

  padding: 5px;
  border: 1px solid #252a31;
  background-color: #383e47;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.5);

  div:first-of-type {
    margin-bottom: 5px;
  }
`;
