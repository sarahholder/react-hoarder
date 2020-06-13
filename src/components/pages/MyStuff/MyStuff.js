import React from 'react';

import './MyStuff.scss';

import authData from '../../../helpers/data/authData';
import stuffData from '../../../helpers/data/stuffData';
import StuffCards from '../../shared/StuffCards/StuffCards';

class MyStuff extends React.Component {
  state = {
    stuff: [],
  }

  getStuff = () => {
    const uid = authData.getUid();
    stuffData.getStuffByUid(uid)
      .then((items) => this.setState({ items }))
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

    const buildStuff = stuff.map((item) => <StuffCards key={item.id} item={item} removeItem={this.removeItem} />);

    return (
      <div className="MyStuff">
      <h1>My Stuff</h1>
        <div className="d-flex flex-wrap">
        {buildStuff}
        </div>
      </div>
    );
  }
}

export default MyStuff;
