import React from 'react';

import './MyStuff.scss';

import authData from '../../../helpers/data/authData';
import stuffData from '../../../helpers/data/stuffData';
import ItemCards from '../../shared/ItemCards/ItemCards';

class MyStuff extends React.Component {
  state = {
    stuff: [],
  }

  getStuff = () => {
    const uid = authData.getUid();
    stuffData.getStuffByUid(uid)
      .then((stuff) => this.setState({ stuff }))
      .catch((error) => console.error('Could not get stuff: ', error));
  }

  componentDidMount() {
    this.getStuff();
  }

  removeItem = (itemId) => {
    stuffData.deleteItem(itemId)
      .then(() => this.getStuff())
      .catch((error) => console.error('Could not delete item: ', error));
  }

  render() {
    const { stuff } = this.state;

    const buildItems = stuff.map((item) => <ItemCards key={item.id} item={item} removeItem={this.removeItem} />);

    return (
      <div className="MyStuff">
      <h1>My Stuff</h1>
        <div className="d-flex flex-wrap">
        {buildItems}
        </div>
      </div>
    );
  }
}

export default MyStuff;
