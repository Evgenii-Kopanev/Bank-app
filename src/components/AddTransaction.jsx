import React, { useState } from 'react';

export default function AddTransaction(props) {
    const [amount, setAmount] = useState(0);
    const [company, setCompany] = useState('');
    return (
        <div>
            <input type="number" onInput={(ev) => setAmount(Number(ev.target.value))} />
            <input type="text" onInput={(ev) => setCompany(ev.target.value)} />
            <button
                onClick={() => {
                    const newTransaction = {
                        amount,
                        company,
                    };
                    props.addTransaction(newTransaction);
                }}
            >
                +
            </button>
        </div>
    );
}
