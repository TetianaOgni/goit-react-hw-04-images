import React, {Component} from 'react'
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


class Searchbar extends Component{
  state = {
    value: '',
  }

handleChange=(event) => {  
  this.setState({value: event.currentTarget.value.toLowerCase()})
}

  handleSubmit=(event)=> {
    event.preventDefault()
    if (this.state.value.trim() === '') {
    
        toast.info('Please enter the text.', toastConfig)
     
      return;
    }
    this.props.handleSearch(this.state.value)
    this.setState({value: ''})
  }

  render() {
    return (
      <header className={css.searchbar}>
      <form className={css.SearchForm} onSubmit={this.handleSubmit}>
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
          onChange={this.handleChange}
          value={this.state.value}
        />
      </form>
    </header>
    )
  }

}
Searchbar.propTypes = {
 value: PropTypes.string,
};

export default Searchbar
