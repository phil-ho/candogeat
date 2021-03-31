import React from 'react';
import axios from 'axios';

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
    };

    this.fetchIndex = 0;

    this.fetchResults = debounce(this.fetchResults, 250);
  }

  handleChange(e) {
    const {
      name,
      value,
    } = e.target;

    this.fetchResults(value);

    this.setState({
      [name]: value,
    });
  }

  fetchResults(q) {
    console.log('send query: ', q, this.state);
    return;

    const currentFetchIndex = ++this.fetchIndex;

    axios.get(url)
      .then(response => {
        if (this.fetchIndex !== currentFetchIndex) {
          return; // outdated response
        }
        let results;
        this.setState({
          results,
        });
      })
      .catch(err => {
        // error handling
      });
  }

  render() {
    const {
      search,
    } = this.state;

    return (
      <form>
        <input
          type="search"
          id="search"
          name="search"
          value={search}
          onChange={(e) => this.handleChange(e)}
        />
      </form>
    );
  }
}

export default SearchBar;
