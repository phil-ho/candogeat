import React from 'react';

import styles from './VoteControl.css';

const UPVOTE = 1;
const DOWNVOTE = -1;
const UNVOTED = 0;

class VoteControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vote: UNVOTED,
    };

    this.castVote = this.castVote.bind(this);
  }

  castVote(value) {
    const { vote } = this.state;
    const { onVote } = this.props;

    const newVote = vote === value ? UNVOTED : value;

    this.setState({
      vote: newVote,
    });

    onVote(newVote);
  }

  render() {
    const { vote } = this.state;
    const controlStyleModifier = vote === UPVOTE ? 'vote-control--upvoted' :
      (vote === DOWNVOTE ? 'vote-control--downvoted' : '');

    return (
      <div className={`vote-control ${controlStyleModifier}`}>
        <button className='vote-control__button vote-control__upvote' onClick={() => this.castVote(UPVOTE)}>
          👍<span className='a11y-hidden'>upvote</span>
        </button>
        <button className='vote-control__button vote-control__downvote' onClick={() => this.castVote(DOWNVOTE)}>
          👎<span className='a11y-hidden'>downvote</span>
        </button>
      </div>
    );
  }
}

export default VoteControl;