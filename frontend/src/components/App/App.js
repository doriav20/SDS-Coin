import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Blank from '../../pages/Blank/Blank';
import Home from '../../pages/Home/Home';
import AppNavbar from '../AppNavbar/AppNavbar';
import WalletDetails from '../../pages/WalletDetails/WalletDetails';
import TicTacToe from '../../pages/TicTacToe/TicTacToe';
import Game2 from '../../pages/Game2/Game2';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppNavbar />}>
                    <Route index element={<Home />} />
                    <Route path="/details" element={<WalletDetails />} />
                    <Route path="/tictactoe" element={<TicTacToe />} />
                    <Route path="/game2" element={<Game2 />} />
                    <Route path="*" element={<Blank />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
