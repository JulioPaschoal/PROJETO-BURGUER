import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Login } from './containers/login/index.jsx';
import GlobalStyle from './styles/globalStyles.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyle />
    <Login />
  </StrictMode>,
);
