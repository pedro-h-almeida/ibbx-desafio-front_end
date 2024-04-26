import { useState } from "react";
import styled from "styled-components";

type MyProps = {
  label: string;
};

const Button = styled.button`
  min-height: 37px;
  width: 100%;
  background-color: #FA6E2D;
  color: white;
  font-size: 20px;
  padding: 7px 28px;
  border: 0px;
  border-radius: 7px;
  &:hover {
    background-color: #de5516;
    cursor: pointer;
  }
`;

function ButtonComponent({ label }: MyProps) {


  return (
    <Button>{label}</Button>
  );
}

export default ButtonComponent;