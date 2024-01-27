import { useState } from "react";
import "./App.css";
import Login from "./views/Login";
import BankPage from "./views/BankPage";
import Register from "./views/Register";
import CustomerPage from "./views/CustomerPage";
import { Routes, Route } from "react-router-dom";

const initialUsers = [
  {
    userName: "Evgenii",
    password: "123",
    id: "123456789",
    money: "1000",
    transactions: [],
  },
];
function App() {
  const [users, setUsers] = useState(initialUsers);
  const [currentUser, setCurrentUser] = useState(null);

  const editUser = (editedUser) => {
    setCurrentUser(editedUser);

    const usersCopy = structuredClone(users);
    const userIndex = usersCopy.findIndex((u) => u.id === currentUser.id);
    usersCopy[userIndex] = editedUser;
    setUsers(usersCopy);
  };

  const addTransaction = (newTransaction) => {
    // add transaction to current user
    const currentUserCopy = structuredClone(currentUser);
    currentUserCopy.transactions.push(newTransaction);
    setCurrentUser(currentUserCopy);

    // add transaction to users
    const usersCopy = structuredClone(users);
    const userIndex = usersCopy.findIndex((user) => user.id === currentUser.id);
    usersCopy[userIndex].transactions.push(newTransaction);
    setUsers(usersCopy);
  };

  const setUser = (user) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const getUser = (userName, password) => {
    const user = users.find(
      (u) => u.userName === userName && u.password === password
    );
    return user;
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Login setUser={setUser} getUser={getUser} />}
        />
        <Route path="/register" element={<Register addUser={addUser} />} />
        <Route
          path="/edit"
          element={<Register editUser={editUser} currentUser={currentUser} />}
        />
        <Route path="/bankpage" element={<BankPage />} />
        <Route
          path="/:customerName"
          element={
            <CustomerPage
              currentUser={currentUser}
              logout={logout}
              addTransaction={addTransaction}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;

// const rooms = [
//     {
//         id: 1,
//         devices: [{ id: 20, name: 'boiler', isOn: false }],
//     },
// ];

// const toggleIsOn = (roomId, deviceId) => {
//     const roomsCopy = structuredClone(rooms);
//     const room = roomsCopy.find((r) => r.id === roomId);
//     const device = room.find((d) => d.id === deviceId);
//     device.isOn = !device.isOn;

//     setRooms(roomsCopy);
// };
