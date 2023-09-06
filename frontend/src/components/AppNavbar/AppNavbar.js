import { Container, Nav, Navbar } from 'react-bootstrap';
import { Outlet, useLocation } from 'react-router-dom';
import BalanceDisplay from '../EthereumAccountDetails/BalanceDisplay';

function ActiveNavLink({ children, href, ...props }) {
    const location = useLocation();

    const isActive = location.pathname === href;

    return (
        <Nav.Link
            href={href}
            style={{
                fontWeight: isActive ? 'bold' : 'normal',
                ...props.style,
            }}
            {...props}
        >
            {children}
        </Nav.Link>
    );
}
function MainNavbar({ children }) {
    return (
        <div className="App">
            <header>
                <Navbar bg="dark" data-bs-theme="dark">
                    <Container className="me-auto ms-3" style={{ margin: 'inherit' }}>
                        <Navbar.Brand href="/">SDS Token</Navbar.Brand>
                        <Nav className="me-auto">
                            <ActiveNavLink href="/details">Wallet Details</ActiveNavLink>

                            {/*TODO: Replace this after Game 1 is added*/}
                            <ActiveNavLink href="/game1">Game 1</ActiveNavLink>

                            {/*TODO: Replace this after Game 2 is added*/}
                            <ActiveNavLink href="/game2">Game 2</ActiveNavLink>
                        </Nav>
                    </Container>
                    {children}
                </Navbar>
            </header>
        </div>
    );
}

export default function AppNavbar() {
    return (
        <>
            <MainNavbar>
                <BalanceDisplay currency={'SDS'} className="text-light me-3 fs-5" />
            </MainNavbar>
            <Outlet />
        </>
    );
}
