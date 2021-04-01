import React from 'react';
import './ItemDetail.css';

const COLLAPSED = 0;
const EXPANDING = 1;
const SHOW = 2;

class ItemDetail extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();

    this.state = {
      view: COLLAPSED,
      height: 0,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.view === COLLAPSED && this.props.item) {
      const boundingBox = this.myRef.current.getBoundingClientRect();

      this.setState({
        height: boundingBox.height,
        view: EXPANDING,
      });
    }
  }

  render() {
    const {
      height,
      view,
    } = this.state;

    const { item } = this.props;

    const style = {};
    let itemClasses = ['item-detail'];

    if (view === EXPANDING) {
      style.height = `${height}px`;
      itemClasses.push('item-detail--expanding');
    } else if (view === SHOW) {
      itemClasses.push('item-detail--show');
    }

    let name;
    let rating;

    if (item) {
      name = (<h1 className='item-detail__name'>{item.name}</h1>);

      if (!!item.toxic) {
        rating = (<h1 className={`item-detail__rating item-detail__rating--toxic`}>NO</h1>);
      } else {
        rating = (<h1 className='item-detail__rating item-detail__rating--nontoxic'>YES</h1>);
      }
    }

    return (
      <div className={itemClasses.join(' ')} style={style} onTransitionEnd={() => this.setState({ view: SHOW })}>
        <div ref={this.myRef}>
          {name}
          {rating}
          <p>Yes, Because they're delicious! :)  by User1</p>
          <p>No, Because they're delicious... :(  by User2</p>
          <p>Explanation of why...</p>
        </div>
      </div>
    );
  }
}

export default ItemDetail;
