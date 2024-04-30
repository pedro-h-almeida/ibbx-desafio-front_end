import styled from "styled-components";

export const Container = styled.div`
  padding-right: 15px;
  padding-left: 15px;
  box-sizing: border-box;
  &:before,
  &:after {
    content: " ";
    display: table;
  }
  &:after {
    clear: both;
  }
`;

export const Row = styled.div`
  width: 100%;
  height: auto;
  float: left;
  box-sizing: border-box;
  &:before,
  &:after {
    content: " ";
    display: table;
  }
  &:after {
    clear: both;
  }
  &.justify-end{
    display: flex;
    justify-content: end;
  }
`;

function getWidthGrid(val: number) {
  if (!val) return;

  return `width: ${val / 12 * 100}%`;
}

export const Col = styled.div<{ $sm?: number, $md?: number, $lg?: number; }>`
  float: left;
  min-height: 1px;
  box-sizing: border-box;

  @media only screen and (max-width: 768px){
    ${props => props.$sm && getWidthGrid(props.$sm)}
  }
  @media only screen and (min-width: 768px){
    ${props => props.$md && getWidthGrid(props.$md)}
  }
  @media only screen and (min-width: 1000px){
    ${props => props.$lg && getWidthGrid(props.$lg)}
  }
`;