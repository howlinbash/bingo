import styled from "styled-components";

const Button = styled.button`
  border: none;
  border-radius: 3px;
  padding: 5px 12px;
  width: auto;
  font: inherit;
  cursor: pointer;
  :focus {
    outline-offset: -2px;
    outline-style: auto;
    outline-width: 5px;
  }
`;

export default Button;
