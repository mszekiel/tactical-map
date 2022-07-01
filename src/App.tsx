import styled from "@emotion/styled";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import Navbar from "./components/Navbar";

import { Map } from "./pages/Map/Map";
import { Home } from "./pages/Home/Home";
import { Settings } from "./pages/Settings/Settings";

import { store } from "./redux/store";

const Content = styled.div`
  display: flex;
  flex: 1;
`;

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <Content>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Content>
    </Provider>
  );
}

export default App;
