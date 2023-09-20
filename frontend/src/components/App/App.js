import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Blank from '../../pages/Blank/Blank';
import Home from '../../pages/Home/Home';
import AppNavbar from '../AppNavbar/AppNavbar';
import WalletDetails from '../../pages/WalletDetails/WalletDetails';
import TicTacToe from '../../pages/TicTacToe/TicTacToe';
import Roulette from '../../pages/Roulette/Roulette';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppNavbar />}>
                    <Route index element={<Home />} />
                    <Route path="/details" element={<WalletDetails />} />
                    <Route path="/tictactoe" element={<TicTacToe />} />
                    <Route path="/roulette" element={<Roulette />} />
                    <Route path="*" element={<Blank />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
