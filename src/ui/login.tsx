import React, { useState } from "react";
import { Button, Cell, Input } from "../design";
import { useAppDispatch } from "../app/hooks";
import { AppState, login, transition } from "../app/appSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const dispatch = useAppDispatch();
  const onChange = (e: any) => {
    setUsername(e.target.value);
  };

  const onClick = () => {
    dispatch(login(username));
    dispatch(transition(AppState.Ready));
  };

  return (
    <Cell row center height="100vh">
      <Cell row flex="1" center>
        <h1>LET'S PLAY BINGO</h1>
      </Cell>
      <Cell row center>
        <Cell row center padding="1rem" width="100%"></Cell>
        <Cell row center padding="1rem" width="100%">
          <Input placeholder="username" value={username} onChange={onChange} />
        </Cell>
        <Cell row center padding="1rem" width="100%">
          <Button onClick={onClick}>Login</Button>
        </Cell>
      </Cell>
      <Cell row flex="1"></Cell>
    </Cell>
  );
};

export default Login;
