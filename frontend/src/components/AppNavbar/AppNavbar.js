import { Container, Nav, Navbar } from 'react-bootstrap';

export default function AppNavbar() {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/">SDS Token</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/details">Wallet Details</Nav.Link>

                    {/*TODO: Replace this after Game 1 is added*/}
                    <Nav.Link href="/game1">Game 1</Nav.Link>

                    {/*TODO: Replace this after Game 2 is added*/}
                    <Nav.Link href="/game2">Game 2</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}
