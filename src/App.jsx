import { Container, Navbar } from "react-bootstrap";
import Addtask from "./assets/Components/Addtask";
import Listtask from "./assets/Components/Listtask";

function App() {
  return (
    <>
      <Container fluid className="mainClass">
        <div>
          <Navbar expand="lg" bg="dark" data-bs-theme="dark">
            <Container fluid className="d-flex justify-content-center">
              <Navbar.Brand>
                <h1>React Todo Task</h1>
              </Navbar.Brand>
            </Container>
          </Navbar>
        </div>
        <Addtask />
        <hr />
        <Listtask />
      </Container>
    </>
  );
}

export default App;
