import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddTransaction from '../components/AddTransaction';

export default function CustomerPage(props) {
    const [isAddTransaction, setIsAddTransaction] = useState(false);
    const navigate = useNavigate();
    return (
        <div>
            <h1>Welcome {props.currentUser.userName}</h1>
            <button
                onClick={() => {
                    alert(props.currentUser.money);
                }}
            >
                Balance
            </button>
            <button
                onClick={() => {
                    setIsAddTransaction((prevIsAddTransaction) => !prevIsAddTransaction);
                }}
            >
                Action
            </button>
            <button
                onClick={() => {
                    navigate('/edit');
                }}
            >
                Edit
            </button>
            <button
                onClick={() => {
                    props.logout();
                    navigate('/');
                }}
            >
                Exit
            </button>
            {isAddTransaction ? <AddTransaction addTransaction={props.addTransaction} /> : <></>}
        </div>
    );
}
