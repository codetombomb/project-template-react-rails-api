import './App.css';
import React, { useEffect, useState } from 'react'
import { getUsers, addUser, delUser } from './features/users/usersSlice'
import { useDispatch, useSelector } from 'react-redux'
import { PacmanLoader } from "react-spinners"

function App() {
  const { data, loading } = useSelector(({ users }) => users);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const dispatch = useDispatch()
  useEffect(() => dispatch(getUsers()), [dispatch])


  return (
    <div className="App">
      {loading ? 
<PacmanLoader color="#36d7b7" /> :
      <form
      style={{width: "50%", margin: "3%"}}
        onSubmit={(e) => {
          e.preventDefault();
          const newUser = {
            id: data.length + 1,
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            password_confirmation: passwordConfirmation,
          };
          dispatch(addUser(newUser))
        }}
      >
        <label>
          First name
          <input
            type="text"
            name="firstName"
            placeholder="First name..."
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required={true}
          ></input>
        </label>
        <label>
          Last Name
          <input
            type="text"
            name="lastName"
            placeholder="Last name..."
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required={true}
          ></input>
        </label>
        <label>
          Email
          <input
            type="text"
            name="email"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          ></input>
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            placeholder="Enter a password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
          ></input>
        </label>
        <label>
          Password Confirmation
          <input
            type="password"
            name="passwordConfirmation"
            placeholder="Re-enter your password..."
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required={true}
          ></input>
          <input type="submit"></input>
        </label>
      </form>}

      <h1>Users List</h1>

      {data.map((user) => {
        return (
          <div
            style={{ border: "1px solid black", width: "50%" }}
            key={user.id}
          >
            <h2>Full name: {`${user.first_name} ${user.last_name}`}</h2>
            <h2>Email: {user.email}</h2>
            <button onClick={(e) => {
              dispatch(delUser(user))
              }}>🗑</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
