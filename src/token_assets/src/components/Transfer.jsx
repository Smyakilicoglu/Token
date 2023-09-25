import React, { useState } from "react";
import { token } from "../../../declarations/token";
import {Principal} from '@dfinity/principal'

function Transfer() {
  
  const [recipiendId, setId] = useState("");
  const [isAmount, setAmount] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isHidden, setHidden] = useState(true);

  async function handleClick() {
    setDisabled(true);
    const recipiend = Principal.fromText(recipiendId);
    const amountToTransfer = Number(isAmount);
    const result = await token.transfer(recipiend, amountToTransfer)
    setFeedback(result);
    setHidden(false);
    setDisabled(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipiendId}
                onChange={(e) => setId(e.target.value) }
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={isAmount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={disabled}>
            Transfer
          </button>
        </p>
        <p hidden={isHidden}>{feedback}</p>
      </div>
    </div>
  );
}

export default Transfer;
