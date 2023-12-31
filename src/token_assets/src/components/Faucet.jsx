import React, { useState } from "react";
import { token } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";
import { canisterId, createActor} from "../../../declarations/token/index"

function Faucet() {

  const [isDisabled, setDisabled] = useState(false) //koda zarar vermesin diye butonu basıldıktan sonra devre dışı bırakıp tekar aktıf etmek.
  const [buttonText, setText] = useState("Gimme gimme"); //buton yazı değişimi.

  async function handleClick(event) {
    setDisabled(true);
    
    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    const result = await authenticatedCanister.payOut();

    setText(result);
    //setDisabled(false);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DSum tokens here! Claim 10,000 TSD token to your account.</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisabled}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
