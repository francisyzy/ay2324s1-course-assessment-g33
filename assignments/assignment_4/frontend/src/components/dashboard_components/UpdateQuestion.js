import React, { useState } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";

export default function UpdateQuestion({
  question,
  allQuestions,
  currQuestion,
  onValChange,
  onCategoryValChange,
  onUpdateQuestion,
  clearCurrQuestion,
  updateCurrQuestion,
}) {
  const categories = [
    "Algorithms",
    "Arrays",
    "Bit Manipulation",
    "Brainteaser",
    "Databases",
    "Data Structures",
    "Strings",
  ];

  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleClose = () => {
    setErrors([]);
    setShow(false);
    //clearCurrQuestion();
  };

  const handleShow = () => {
    setShow(true);
    updateCurrQuestion(question);
  };

  const handleFormCheck = () => {
    var newErrors = [];
    console.log(currQuestion);
    let i = 0;
    while (i < allQuestions.length) {
      if (allQuestions[i].id === currQuestion.id && allQuestions[i].title !== currQuestion.title) {
        newErrors.push("Duplicate question ID, please enter another");
        break;
      }
      i++;
    }
    if (!Number.isInteger(currQuestion.id) || currQuestion.id < 0) {
      newErrors.push("Please enter a valid numerical ID");
    }
    if (currQuestion.title === "") {
      newErrors.push("Please enter a title");
    }
    if (currQuestion.description === "") {
      newErrors.push("Please enter a description");
    }
    if (currQuestion.categories.length === 0) {
      newErrors.push("Please choose at least one category");
    }
    setErrors(newErrors);
    if (newErrors.length === 0) {
      onUpdateQuestion(question.id);
      handleClose();
    }
  };

  return (
    <div>
      <Button variant="success" onClick={handleShow}>
        Update
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>ID</Form.Label>
              <Form.Control
                name="id"
                type="number"
                value={currQuestion.id}
                onChange={onValChange}
                placeholder="Enter an ID for the question"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                type="text"
                value={currQuestion.title}
                onChange={onValChange}
                placeholder="Enter a title for the question"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                as="textarea"
                rows="8"
                type="text"
                value={currQuestion.description}
                onChange={onValChange}
                placeholder="Enter a description for the question"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              {categories.map((category) => (
                <Form.Check
                  type="checkbox"
                  value={category}
                  label={category}
                  onChange={onCategoryValChange}
                  defaultChecked={currQuestion.categories.includes(category)}
                />
              ))}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Complexity</Form.Label>
              <Form.Control
                name="complexity"
                as="select"
                defaultValue={question.complexity}
                onChange={onValChange}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </Form.Control>
            </Form.Group>
          </Form>
          {errors.length > 0 && (
            <Alert variant="danger">
              <ul>
                {errors.map((error) => (
                  <li>{error}</li>
                ))}
              </ul>
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFormCheck}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
