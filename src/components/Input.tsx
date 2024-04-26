import { useState } from "react";
import styled from "styled-components";

const InputContainer = styled.div<{ $calc1?: number; }>`
    display: flex;
    flex-direction: column;
    position: relative;
    &:focus-within label {
      transform: translate(0, ${props => props.$calc1}px) scale(0.75);
    }
`;

const Input = styled.input<{ $width?: number, $height?: number; }>`
    width: ${props => props.$width}px;
    height: ${props => props.$height}px;
    padding: 14px 16px 0 10px;
    outline: 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: #fff;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
`;

const InputLabel = styled.label<{ $calc1?: number, $calc2?: number; }>`
    font-size: 16px;
    font-family: Arial, Helvetica, sans-serif;
    padding: 0 12px;
    color: #999;
    pointer-events: none;
    position: absolute;
    transform: translate(0, ${props => props.$calc2}px) scale(1);
    transform-origin: top left;
    transition: all 0.2s ease-out;
    &.Active {
      transform: translate(0, ${props => props.$calc1}px) scale(0.75);
  }
`;


type MyProps = {
  height: number;
  width: number;
  label: string;
  value: string;
  onValueChange: Function;
};


function InputComponent({ height, width, label, value, onValueChange }: MyProps) {

  const calc1 = height * 0.21428571428571427
  const calc2 = height * 0.4642857142857143

  const [isActive, setIsActive] = useState(false);

  function handleTextChange(text: string) {
    onValueChange(text);

    if (text !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }

  return (
    <InputContainer $calc1={calc1}>
      <InputLabel className={isActive ? "Active" : ""} $calc1={calc1} $calc2={calc2}>
        {label}
      </InputLabel>
      <Input value={value} onChange={(e) => handleTextChange(e.target.value)} $height={height} $width={width}/>
    </InputContainer>
  );
}

export default InputComponent;
