import React from 'react';
import PropTypes from 'prop-types';

import styles from './SearchBar.css';

const debounce = function(func, delay) {
  let timerId;
  return function(...args) {
    if (timerId) {
      clearTimeout(timerId)
    }
    timerId = setTimeout(() => func.apply(this, args), delay);
  };
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      suggestions: [],
    };

    this.fetchSuggestions = debounce(this.fetchSuggestions, 250);
  }

  fetchSuggestions() {
    fetch(`/api/suggestions?q=${encodeURIComponent(this.state.search)}`)
      .then(response => response.json())
      .then(suggestions => this.setState({ suggestions }))
      .catch(console.err);
  }

  handleChange(e) {
    const {
      value,
    } = e.target;

    this.setState({
      search: value,
    });

    this.fetchSuggestions(value);
  }

  handleSelect(suggestion) {
    const {
      onSelect
    } = this.props;

    onSelect(suggestion);

    this.setState({
      search: suggestion.name,
      suggestions: [],
    });
  }

  render() {
    const {
      search,
      suggestions,
    } = this.state;

    const { onSelect } = this.props;

    const suggestionItems = suggestions.map((suggestion) => (
      <li key={suggestion.id}>
        <button
          className='search-bar__suggestion'
          onClick={() => this.handleSelect(suggestion)}
          type='button'
        >
          {suggestion.name}
        </button>
      </li>
    ));

    const suggestionList = !!suggestions.length && (
      <ul className='search-bar__suggestion-list'>
        {suggestionItems}
      </ul>
    );

    return (
      <form className='search-bar'>
        <input
          autoComplete='false'
          autoFocus
          className='search-bar__input'
          type="text"
          value={search}
          onChange={(e) => this.handleChange(e)}
        />
        {suggestionList}
      </form>
    );
  }
}

SearchBar.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default SearchBar;
