import { StoreProvider } from 'easy-peasy';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import store from './store/index.ts';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </BrowserRouter>
);
