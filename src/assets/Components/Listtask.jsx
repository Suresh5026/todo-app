import { Container, Row, Col, Form, Card, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    addTodo,
  deleteTodo,
  statusFilter,
  updateTodoStatus,
} from "../../Redux/Reducer/Taskreducer";
import { useEffect, useState } from "react";


export default function Listtask() {
  const todos = useSelector((state) => state.todos.items);
  const filter = useSelector((state) => state.todos.filter);
  const [initialized, setInitialized] = useState(false);
  const dispatch = useDispatch();

  const filterTodos = todos.filter((item) => {
    if (filter === "Completed") return item.status === "Completed";
    if (filter === "Not Completed") return item.status === "Not Completed";
    return true; //It show All both completed and not completed
  });

  const handleStatusChange = (index, status) => {
    dispatch(updateTodoStatus({ index, status }));
  };

  const handleFilter = (e) => {
    dispatch(statusFilter(e.target.value));
  };

  useEffect(() => {
    if (!initialized) {
      const savedTodos = localStorage.getItem('todos');
      const savedFilter = localStorage.getItem('filter');
      const parsedTodos = savedTodos ? JSON.parse(savedTodos) : [];
      
      if (parsedTodos.length > 0) {
        parsedTodos.forEach(todo => {
          if (!todos.some(t => t.id === todo.id)) {
            dispatch(addTodo(todo));
          }
        });
      }
      if (savedFilter) {
        dispatch(statusFilter(savedFilter));
      }
      setInitialized(true);
    }
  }, [dispatch, todos, initialized]);

  useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(todos));
    localStorage.setItem('filter',filter);
  },[todos,filter])

  

  return (
    <>
      <Container>
        <Row>
          <Col sm={8}>
            <h1>Task List</h1>
          </Col>
          <Col sm={4}>
            <Form.Select size="lg" onChange={handleFilter}>
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Not Completed">Not Completed</option>
            </Form.Select>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mt-3">
          {filterTodos.map((item, index) => (
            <Card
              style={{ width: "18rem", background: "lightgreen" }}
              className="m-2"
              key={`${item.name}-${index}`}
            >
              <Card.Body>
                <Card.Title className="mb-2">
                  Task Name : {item.taskName}
                </Card.Title>
                <h4 className="mb-1">Name : {item.name}</h4>
                <h4 className="mb-3">Date : {item.date}</h4>
                <Form className="mb-3">
                  <Form.Check
                    type="checkbox"
                    id={`completed-${index}`}
                    label="Completed"
                    checked={item.status === "Completed"}
                    onChange={() =>
                      handleStatusChange(
                        index,
                        item.status === "Completed"
                          ? "Not Completed"
                          : "Completed"
                      )
                    }
                  />
                  <Form.Check
                    type="checkbox"
                    id={`notCompleted-${index}`}
                    label="Not Completed"
                    checked={item.status === "Not Completed"}
                    onChange={() =>
                      handleStatusChange(
                        index,
                        item.status === "Not Completed"
                          ? "Completed"
                          : "Not Completed"
                      )
                    }
                  />
                </Form>
                <Button
                  variant="danger"
                  className="me-2"
                  onClick={() => dispatch(deleteTodo(index))}
                >
                  Delete Task
                </Button>
                
              </Card.Body>
            </Card>
          ))}
        </Row>
       
      </Container>
    </>
  );
}
