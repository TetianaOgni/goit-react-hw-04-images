import React, { useState} from 'react'
import PropTypes from "prop-types";
import { toast } from 'react-toastify';
import {ImSearch} from 'react-icons/im'
import css from './Searchbar.module.css'


const toastConfig = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  };
const Searchbar = ({handleSearch}) => {
  const [value, setValue] = useState('')

const handleChange=(event) => {  
  setValue(event.currentTarget.value.toLowerCase())
}
const handleSubmit=(event)=> {
    event.preventDefault()
    if (value.trim() === '') {
      toast.info('Please enter the text.', toastConfig)
      return;
    }

    handleSearch(value)
    setValue('')
  }
  return (
    <header className={css.searchbar}>
    <form className={css.SearchForm} onSubmit={handleSubmit}>
      <button type="submit" className={css.SearchFormButton}>
        <span className={css.SearchFormButtonLabel}></span>
        <ImSearch/>
      </button>
  
      <input
        className={css.SearchFormInput}
        type="text"
        // autocomplete="off"
        // autofocus
        placeholder="Search images and photos"
        onChange={handleChange}
        value={value}
      />
    </form>
  </header>
  )
}

Searchbar.propTypes = {
 value: PropTypes.string,
};
export default Searchbar
