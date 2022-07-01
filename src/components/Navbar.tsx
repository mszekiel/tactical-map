import styled from "@emotion/styled";
import { Button, Navbar as _Navbar } from "@blueprintjs/core";
import { useNavigate } from "react-router-dom";

const Logo = styled(_Navbar.Heading)`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    filter: drop-shadow(0 0 10px rgb(0, 0, 0, 0.6))
      drop-shadow(0 0 3px rgb(0, 0, 0, 0.6));
  }

  img {
    height: 25px;
    width: 25px;
    margin-right: 10px;
  }
`;

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <_Navbar style={{ boxShadow: "0 0 5px black, 0 0 20px black" }}>
      <_Navbar.Group>
        <Logo onClick={() => navigate("/")}>Tactical Map</Logo>
        <_Navbar.Divider />
        <Button
          minimal
          icon="map"
          text="Map"
          onClick={() => navigate("/map")}
        />
      </_Navbar.Group>
      <_Navbar.Group align="right">
        <Button
          minimal
          icon="settings"
          text="Settings"
          onClick={() => navigate("/settings")}
        />
      </_Navbar.Group>
    </_Navbar>
  );
}
