import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App/App';
import { EthereumProvider } from './hooks/useEthereum';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <EthereumProvider>
            <App />
        </EthereumProvider>
    </React.StrictMode>
);
