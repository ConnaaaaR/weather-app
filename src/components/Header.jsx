import { useState } from "react";

const Header = (props) => {
  return (
    <h1>{props.greeting}, {props.name}</h1>
  )
}

export default Header