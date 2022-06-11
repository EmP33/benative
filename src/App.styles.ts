import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root{
        --color-primary-light:#6d62ff;
        --color-primary:#5b52d7; 
        --color-primary-dark:#4942ac;

        --color-secondary-light:#2e2f32;
        --color-secondary: #26272a;
        --color-secondary-dark:#1e1f22;

        --color-tertiary-light:#2fd173;
        --color-tertiary:#27ae60;
        --color-tertiary-dark:#1f8b4d;

        --color-base-light:#232224;
        --color-base:#1d1c1e;
        --color-base-dark:#171618;

        --color-white: #fff;
    }

    body {
        margin:0;
        padding:0;
        background: var(--color-primary-dark);
        color:var(--color-white);
        font-family: 'Lato', sans-serif;
    }
    *{
        box-sizing: border-box;
    }
`;

export default GlobalStyle;
