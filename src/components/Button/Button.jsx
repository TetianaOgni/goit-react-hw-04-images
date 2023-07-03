import React from 'react'
import PropTypes from "prop-types";
import {ButtonStyled } from './styled'

function Button({name, onClick}) {
  return (
    <div>
      <ButtonStyled type='button' onClick={onClick}>
        {name}
      </ButtonStyled>
    </div>
  )
}

Button.propTypes = {
 name: PropTypes.string.isRequired,
   onClick: PropTypes.func,
  };
  
export default Button
