import { createGlobalStyle } from "styled-components";

// TODO:Edit Global Theme
export interface ITheme {
  niceBlack: string;
}

export interface IThemeWrapper {
  theme: ITheme;
}

export const theme: ITheme = {
  niceBlack: "#001F3F"
};

export const GlobalStyle = createGlobalStyle<IThemeWrapper>`

  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,800;1,500&display=swap');

  body {
    font-family: 'Montserrat', sans-serif;
    margin: 0 auto;
    color: ${props => props.theme.niceBlack}; 
    height: 100%;
  }

  * {
    margin: 0;
    padding: 0;
  }

  fieldset {
    min-width: 0;
  }

  li {
    list-style: none;
  }
`;
