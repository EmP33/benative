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

        --color-base-light:#22222f;
        --color-base:#1C1C27;
        --color-base-dark:#16161f;

        --color-white: #fff;
        --color-danger: #f44336;
        --color-grey-1: #86868f
    }

    body {
        margin:0;
        padding:0;
        background: rgb(115,66,172);
        background: linear-gradient(0deg, rgba(115,66,172,1) 0%, rgba(73,66,172,1) 50%);
        color:var(--color-white);
        font-family: 'Lato', sans-serif;
    }
    *{
        box-sizing: border-box;
    }
`;

export default GlobalStyle;
