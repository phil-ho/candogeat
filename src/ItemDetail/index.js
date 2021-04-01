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
      console.log(boundingBox);
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

    const style = {};
    let itemClasses = ['item-detail'];

    if (view === EXPANDING) {
      style.height = `${height}px`;
      itemClasses.push('item-detail--expanding');
    } else if (view === SHOW) {
      itemClasses.push('item-detail--show');
    }

    return (
      <div className={itemClasses.join(' ')} style={style} onTransitionEnd={() => this.setState({ view: SHOW })}>
        <div ref={this.myRef}>
          <h1>item detail</h1>
          <h1>item detail</h1>
          <h1>item detail</h1>
          <h1>item detail</h1>
          <h1>item detail</h1>
        </div>
      </div>
    );
  }
}

export default ItemDetail;
