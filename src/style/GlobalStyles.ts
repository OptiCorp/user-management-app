import { createGlobalStyle } from 'styled-components'

export const TEXT_SHADOW = '2px 1px 1px rgba(0, 0, 0, 0.5)'

export const COLORS = {
    white: '#FFF',
    black: '#000',
    gray: '#BEBEBE',
    lightGray: '#CCC',
    silverGray: '#DCDCDC',
    paleGray: '#EAEAEA',
    frostyGray: '#F0F3F3',
    lightSteelBlue: '#DEEDEE',
    crimson: '#B30D2F',
    primary: '#007079',
    secondary: '#243746',
    cautionaryYellow: '#FBCA36',
    warningOrange: '#ED8936',
    dangerRed: '#EB0000',
    whiteSmoke: '#f5f5f5',
}

const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        width: 100%;
        font-family: equinor;
        height: 100%;
        font-size: 13px;
        background-color: ${COLORS.frostyGray};
    }
    .wrapper {
    display: grid;
    height: 100vh;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    overflow-x: hidden;
  }

  
body::-webkit-scrollbar {
    display: none;
}

.wrapper::-webkit-scrollbar {
    display: none;
}

::-webkit-scrollbar {
    display: none;
}
`

export default GlobalStyles
