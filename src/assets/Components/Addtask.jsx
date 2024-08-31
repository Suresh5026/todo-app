import { Button, Container, Form } from "react-bootstrap";
import { addTodo } from "../../Redux/Reducer/Taskreducer";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function Addtask() {
  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + 1);
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 5);

  const getFormattedDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const formattedMinDate = getFormattedDate(minDate);
  const formattedMaxDate = getFormattedDate(maxDate);

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState("");

  const addTodos = () => {
    if (name.trim() === "" || taskName.trim() === "") return;
    dispatch(addTodo({ name, taskName, date }));
    // setName("");
    // setTaskName("")
    // setDate("")
    clearForm();
  };

  const clearForm = () => {
    setName("");
    setTaskName("");
    setDate("");
  };

  return (
    <>
      <Container className="my-3">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>
              <b>Enter Name</b>
            </Form.Label>
            <Form.Control
              type="text"
              value={name}
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <b>Enter Task Name</b>
            </Form.Label>
            <Form.Control
              type="text"
              value={taskName}
              placeholder="Enter Task Name"
              onChange={(e) => setTaskName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <b>Task Finish Date</b>
            </Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={formattedMinDate}
              max={formattedMaxDate}
            />
          </Form.Group>

          <Button variant="primary" className="me-2" onClick={addTodos}>
            Add Task
          </Button>
          <Button variant="secondary" onClick={clearForm}>
            Cancel
          </Button>
        </Form>
      </Container>
    </>
  );
}
