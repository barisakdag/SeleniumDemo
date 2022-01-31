//import React from 'react';
// This import is no longer needed anymore, was a must for each component

import PropTypes from "prop-types";
//import { Component } from 'react';
//this will import proptypes
import { useLocation } from 'react-router-dom'

import Button from "./Button";

const Header = ({ title, onAdd, showAdd }) => {
    const location = useLocation()

    return (
        <header className='header'>
          <h1>{title}</h1>
          {location.pathname === '/' && (
            <Button
              color={showAdd ? 'red' : 'green'}
              text={showAdd ? 'Close' : 'Add'}
              onClick={onAdd}
            />
          )}
        </header>
      )
};

/* CSS example in JS */
const headingStyle = {
  color: "black",
  backgroundColor: "white",
};

/* This is a default prop */
Header.defaultProps = {
  title: "TaskTracker",
};

/* This adds a proptype to the prop, which warns when we try to pass something that isnt a string in this case */
Header.propTypes = {
  title: PropTypes.string.isRequired,
  // Can also add .isRequired if its a must have prop
};
export default Header;

/* Props

*/
