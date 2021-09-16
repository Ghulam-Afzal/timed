import React, { useState } from "react";
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from "./NavStyles";


export default function Navbar(props) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Nav>
        <NavLink to="/" activeStyle>
          TIMED
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/countdown" activeStyle>
            Countdown
          </NavLink>
          <NavLink to="/animedoro" activeStyle>
            Animedoro
          </NavLink>
          <NavLink to="/stopwatch" activeStyle>
            Stopwatch
          </NavLink>
          <NavLink to="/signup" activeStyle>
            Sign Up
          </NavLink>
        </NavMenu>
      </Nav>
    </div>
    
  );
}
