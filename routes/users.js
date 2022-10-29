import express, { request } from "express";
import FilterMiddleWare from "../middleware/FilterMiddleware.js";

const router = express.Router();

const users = [
  { id: 1, firstName: "b1", lastName: "hello" },
  { id: 2, firstName: "b2", lastName: "mello" },
];

router.post("/", FilterMiddleWare, (request, response) => {
  const newUser = {
    id: users.length + 1,
    firstName: request.firstName,
    lastName: request.lastName,
    email: request.email,
  };

  if (users.filter((user) => user.email === newUser.email).length !== 0) {
    return response.status(400).json({
      error: "email exists",
    });
  }

  users.push(newUser);
  response.status(201).json(newUser);
});

//..........................................................................................express103-task1 and task 2
router.get("/:id", (request, response) => {
  const id = Number(request.params.id); //convert string numeric to number
  const foundID = users.find((user) => user.id === id);

  if (foundID === undefined) {
    response.status(404).json({
      error: "user doesnt exist",
    });
  }
  return response.json(foundID);
});

//..........................................................................................express103-task3

router.patch("/:id", (request, response) => {
  const id = Number(request.params.id);
  const { email } = request.body;

  console.log(request.body);

  const idToBeUpdated = id;
  const newEmail = email;
  const userToBeUpdated = users.find((user) => user.id === idToBeUpdated);

  if (newEmail) {
    userToBeUpdated.email = newEmail;

    return response.status(201).json(newEmail);
  }
});

//..........................................................................................

router.get("/", (request, response) => {
  response.json(users);
});

export default router;
