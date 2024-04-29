import styled from "styled-components";

type MyProps = {
  label: string;
  color: string;
  onClickAction: Function;
  isDisabled: boolean;
};

const Button = styled.button`
  min-height: 37px;
  width: 100%;
  background-color: ${props => props.color};
  color: white;
  font-size: 20px;
  padding: 5px 28px;
  border: 0px;
  border-radius: 7px;
  &:hover {
    background-color: #de5516;
    cursor: pointer;
  }
`;

function ButtonComponent({ label, color, onClickAction, isDisabled }: MyProps) {

  return (
    <Button onClick={(e) => onClickAction(e)} color={color} disabled={isDisabled}>{label}</Button>
  );
}

export default ButtonComponent;