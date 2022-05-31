import React from "react";
import styled from "styled-components";
import { Button, Cell, Grid, Tile } from "../design";
import BingoCard from "./bingo-card";
import Login from "./login";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  AppState,
  draw,
  selectUsername,
  selectAppState,
  transition,
} from "../app/appSlice";
import { selectBall } from "../app/ballsSlice";

const Container = styled(Grid)`
  min-height: 100vh;
  height: 100vh;
  grid-gap: 1.5vh;
  grid-template-rows: auto 3fr 6fr 4fr;
`;

const BallCell = styled(Cell)`
  font-size: 1.5em;
  font-weight: bold;
`;

const Home = () => {
  const appState = useAppSelector(selectAppState);
  const ball = useAppSelector(selectBall);
  const username = useAppSelector(selectUsername);
  const dispatch = useAppDispatch();
  const isPlaying = appState === AppState.Playing;

  const onClick = () => {
    if (appState === AppState.Ready) {
      dispatch(transition(AppState.Playing));
    } else if (appState === AppState.Bingo) {
      dispatch(transition(AppState.Ready));
    } else {
      dispatch(draw());
    }
  };

  if (appState === AppState.Login) return <Login />;

  return (
    <Container>
      <Cell background="#464d59" between height="3vh" padding="3vmin">
        <Cell />
        <BallCell>{appState === AppState.Bingo && "BINGO!"}</BallCell>
        <Cell>{username}</Cell>
      </Cell>
      <BallCell row center>
        <Tile background="#77dd77" height="55px" width="55px" center>
          {ball}
        </Tile>
      </BallCell>
      <Cell center>
        <BingoCard />
      </Cell>
      <Cell center>
        <Button onClick={onClick}>{isPlaying ? "Draw Ball" : "Start"}</Button>
      </Cell>
    </Container>
  );
};

export default Home;
