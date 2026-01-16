import { Navbar, Container, Nav } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

const MainLayout=()=> {
  return (
    <>
      
      <Container className="mt-4">
        <Outlet />
      </Container>
    </>
  );
}
export default MainLayout;
