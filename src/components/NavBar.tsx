import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavbarContainer = styled("nav")`
  height: 50px;
  background-color: #d9dadb;
  display: flex;
`;

const NavbarLink = styled(NavLink)`
  color: black;
  font-size: x-large;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  text-decoration: none;
  padding: 10px;
  margin: 6px 3px 0px 3px;
  &:hover{
    color: #FA6E2D;
  },
  &:focus {
    color: white;
  }
  &.active {
    background-color: #FA6E2D;
    color: white;
    border-radius: 10px 10px 0px 0px;
  }
`;


function NavBarComponent() {
  return (
    <NavbarContainer>
        <NavbarLink className="nav-link" to="/" end>
          Home
        </NavbarLink>
        <NavbarLink className="nav-link" to="/ativos" end>
          Ativos
        </NavbarLink>
        <NavbarLink className="nav-link" to="/sensores" end>
          Sensores
        </NavbarLink>
    </NavbarContainer>
  );
}

export default NavBarComponent;