import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    border: 0;
    box-sizing: border-box;
    color: inherit;
    font: inherit;
    margin: 0;
    padding: 0;
  }

  html{
    height: 100vh;
  }

  body {
    background-color: #111111;
    color: #ffffff;
    font-family: 'Montserrat', sans-serif;
    font-size: 24px;
    font-weight: 500;
    height: 100vh;
    text-rendering: optimizelegibility;
    width: 100vw;
    -webkit-font-smoothing: antialiased;
  }

  #root{
    align-items: center;
    display: flex;
    justify-content: center;
    min-height: 100vh;
    padding: 16px;
  }
`;

export { GlobalStyles };
