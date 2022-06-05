import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {AuthContextProvider} from './components/store/auth-context';//used named import since direct use is not alllowed
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </AuthContextProvider>
);
