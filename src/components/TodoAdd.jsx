import React, { useRef, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";

const TodoModal = (props) => {
  const { className } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const titleRef = useRef();
  const placeRef = useRef();
  const descriptionRef = useRef();
  const imageRef = useRef();
  const { currentUser } = useAuth();

  const addTodo = async (todoObj) => {
    await db.collection("todos").doc().set(todoObj);
  };

  const getUserGroup = async (currentUser) => {
    return db
      .collection("users")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        return doc.data().groupID;
      });
  };

  const handleSubmit = (e) => {
    const todoObj = {
      title: titleRef.current.value,
      place: placeRef.current.value,
      description: descriptionRef.current.value,
      imageURL: imageRef.current.value,
    };
    e.preventDefault();
    addTodo(todoObj);
    console.log("added todo");
    console.log(getUserGroup(currentUser));
  };

  return (
    <div>
      <Button color="primary" onClick={toggle}>
        Add to-do
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <Form>
          <ModalHeader toggle={toggle}>Add To-Do</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="exampleEmail">Title</Label>
              <Input
                type="todoTitle"
                name="todoTitle"
                id="todoTitle"
                placeholder="To-Do title"
                innerRef={titleRef}
              />
            </FormGroup>
            <FormGroup>
              <Label for="todoPlace">Place</Label>
              <Input
                type="todoPlace"
                name="todoPlace"
                id="todoPlace"
                placeholder="todoPlace"
                innerRef={placeRef}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="description"
                name="description"
                id="description"
                innerRef={descriptionRef}
              />
            </FormGroup>
            <FormGroup>
              <Label for="imageURL">Image URL:</Label>
              <Input
                type="imageURL"
                name="imageURL"
                id="imageURL"
                placeholder="image URL"
                innerRef={imageRef}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleSubmit}>
              Submit
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default TodoModal;
