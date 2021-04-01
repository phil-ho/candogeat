import React from 'react';
import SearchBar from '../SearchBar';
import VoteControl from '../VoteControl';
import ItemDetail from '../ItemDetail';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAnimal: 0,
      items: [],
      search: '',
    }

    this.animals = ['Dogs', 'Cats', 'Birds'];
    this.fetchIndex = 0;

    this.fetchResults = this.fetchResults.bind(this);
    this.castVote = this.castVote.bind(this);
  }

  fetchResults(queryString) {
    const currentFetchIndex = ++this.fetchIndex;

    const url = `/api/search?search=${encodeURIComponent(queryString)}`;

    fetch(url)
      .then((response) => response.json())
      .then(items => {
        if (this.fetchIndex !== currentFetchIndex) {
          return; // outdated response
        }

        this.setState({
          items,
        });
      })
      .catch(console.err);
  }

  castVote(itemId, vote) {
    console.log(itemId, vote);
    const url = `/api/items/${encodeURIComponent(itemId)}/vote`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        vote,
      }),
    })
  }

  render() {
    const {
      item,
      items,
      search,
      selectedAnimal,
    } = this.state;

    const nextAnimal = (selectedAnimal + 1 < this.animals.length) ? selectedAnimal + 1 : 0;

    return (
      <div className='app'>
        <div className='app__search-container'>
          <h1 className='app__title'>
            <div>can</div>
            <button
              className="app__animal-selector"
              onClick={() => this.setState({ selectedAnimal: nextAnimal })}
              type='button'
            >
              {this.animals[selectedAnimal]}
            </button>
            <div>eat?</div>
          </h1>
          <main className='app__main'>
            <SearchBar onSelect={(item) => this.setState({ item })} />
            <ItemDetail item={item} />
          </main>
        </div>
      </div>
    );
  }
};

export default App;


