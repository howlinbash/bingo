import styled from "styled-components";

interface CellProps {
  area?: string;
  background?: any;
  center?: boolean;
  flex?: string;
  height?: string;
  padding?: string;
  row?: boolean;
  width?: string;
  between?: boolean;
}

const Cell = styled.div<CellProps>`
  display: flex;
  min-height: 0;
  min-width: 0;
  ${(props) => props.area && `grid-area: ${props.area};`};
  ${(props) => props.background && `background: ${props.background};`};
  ${(props) =>
    props.center &&
    `
      justify-content: center;
      align-items: center;
    `};
  ${(props) => props.flex && `flex: ${props.flex};`};
  ${(props) => props.between && "justify-content: space-between;"};
  ${(props) => props.height && `height: ${props.height};`};
  ${(props) => props.padding && `padding: ${props.padding};`};
  ${(props) => props.row && "flex-direction: column;"};
  ${(props) => props.width && `width: ${props.width};`};
`;

export default Cell;
