import React from 'react';
// import axios from 'axios';
import SearchBar from '../SearchBar';
import VoteControl from '../VoteControl';
import ItemDetail from '../ItemDetail';

import styles from './App.css';

// import setupPretender from '../setup-pretender';
// setupPretender();

const ItemsTable = ({ items, onVote }) => {
  const rows = items.map((item) => {
    const ratingStyle = item.rating < 0 ? 'app__table-rating--unsafe' : 'app__table-rating--safe'
    return (
      <tr key={item.id}>
        <td className='app__image'>
          <img src={item.image} />
        </td>
        <td className='app__food'>{item.name}</td>
        <td className={`app__table-rating ${ratingStyle}`}>{item.rating < 0 ? 'toxic' : 'safe'}</td>
        <td>
          <VoteControl onVote={(newVote) => onVote(item.id, newVote)} />
        </td>
      </tr>
    )
  });

  return (
    <table>
      <thead className='a11y-hidden'>
        <tr>
          <th>image</th>
          <th>name</th>
          <th>rating</th>
          <th>vote</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
};


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      search: '',
    }

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
      .catch(err => {
        console.log(err);
        // error handling
      });
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
      items,
      search,
      item,
    } = this.state;

    return (
      <div className='app'>
        <div className='app__search-container'>
          <h1 className='app__title'>
            <div>can</div>
            <div className="app__animal-selector">Dogs</div>
            <div>eat?</div>
          </h1>
          <main className='app__main'>
            <SearchBar onSelect={(item) => this.setState({ item })} />
            <ItemDetail item={item} />
          </main>
        </div>

        <ItemsTable items={items} onVote={this.castVote}/>
      </div>
    );
  }
};

export default App;
