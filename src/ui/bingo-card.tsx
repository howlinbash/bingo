import React from "react";
import styled from "styled-components";
import { Grid, Tile } from "../design";
import { selectTile, Vector } from "../app/tilesSlice";
import { selectVisibleCard } from "../app/cardSlice";
import { useAppSelector } from "../app/hooks";

type CardCellProps = {
  number: number;
  vector: Vector;
};

const Container = styled(Grid)`
  grid-gap: 1.2vh;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  height: 300px;
  width: 300px;
  font-size: 1.5em;
  font-weight: bold;
`;

const CardCell: React.FC<CardCellProps> = ({ number, vector }) => {
  const tile = useAppSelector((state) => selectTile(state, vector));
  return (
    <Tile background={tile && "dodgerblue"} center>
      {number}
    </Tile>
  );
};

const BingoCard = () => {
  const card = useAppSelector(selectVisibleCard);
  return (
    <Container>
      {card.map((row, i) =>
        row.map((n, j) =>
          i === 2 && j === 2 ? (
            <Tile background="dodgerblue" key={`card-${i}-${j}`} center>
              FREE
            </Tile>
          ) : (
            <CardCell key={`card-${i}-${j}`} number={n} vector={[i, j]} />
          )
        )
      )}
    </Container>
  );
};

export default BingoCard;
