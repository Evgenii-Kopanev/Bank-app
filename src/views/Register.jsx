import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledInput } from "../components/styledComponents/input";
import styles from "../styles/register.module.css";

export default function Register(props) {
  const [id, setId] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [money, setMoney] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.currentUser) {
      setIsEdit(true);
      setId(props.currentUser.id);
      setUserName(props.currentUser.userName);
      setPassword(props.currentUser.password);
      setMoney(props.currentUser.money);
    }
  }, []);

  const handleSave = () => {
    if (id.length !== 9 || isNaN(id) === true) {
      alert("id is wrong");
      return;
    } else if (password !== confirmPass) {
      alert("password doesnt match");
      return;
    }

    if (isEdit) {
      const editedUser = {
        id,
        userName,
        password,
        money,
        transactions: structuredClone(props.currentUser.transactions),
      };
      props.editUser(editedUser);
      navigate("/customerpage");
    } else {
      const newUser = {
        id,
        userName,
        password,
        money,
        transactions: [],
      };
      props.addUser(newUser);
      navigate("/");
    }
  };

  return (
    <div className={styles.mainContainer}>
      <h1>{isEdit ? "Edit" : "Register"}</h1>
      <StyledInput
        type="text"
        value={id}
        placeholder="Enter ID"
        onInput={(ev) => setId(ev.target.value)}
      />
      <StyledInput
        type="text"
        value={userName}
        placeholder="Enter UserName"
        onInput={(ev) => setUserName(ev.target.value)}
      />
      <StyledInput
        type="text"
        value={password}
        placeholder="Enter Password"
        onInput={(ev) => setPassword(ev.target.value)}
      />
      <StyledInput
        type="text"
        value={confirmPass}
        placeholder="Enter Confirm Password"
        onInput={(ev) => setConfirmPass(ev.target.value)}
      />
      <StyledInput
        type="text"
        value={money}
        placeholder="Enter Money Amount"
        onInput={(ev) => setMoney(ev.target.value)}
      />
      <button
        onClick={() => {
          handleSave();
        }}
      >
        {isEdit ? "SAVE" : "CREATE"}
      </button>
    </div>
  );
}
