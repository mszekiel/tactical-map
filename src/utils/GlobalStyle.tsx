import { css, Global } from "@emotion/react";

export const GlobalStyle = () => (
  <>
    <Global
      styles={css`
        #root {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 0;
          margin: 0;
          background-color: #182026;
          color: #e1e8ed;
          display: flex;
          flex-direction: column;
        }
      `}
    />
  </>
);
