import React from 'react';

import { Link } from 'react-router-dom';
import './Single.scss';
import stuffData from '../../../helpers/data/stuffData';

class Single extends React.Component {
  state = {
    item: {},
  }

  componentDidMount() {
    const { itemId } = this.props.match.params;
    stuffData.getSingleItem(itemId)
      .then((response) => this.setState({ item: response.data }))
      .catch((err) => console.error('unable to get single item: ', err));
  }

  render() {
    const { item } = this.state;
    const { itemId } = this.props.match.params;
    const editLink = `/edit/${itemId}`;

    return (
      <div className="SingleItem">
        <h1>{item.itemName}</h1>
        <img src={item.itemImage} alt={item.itemName}/>
        <p>{item.itemDescription}</p>
        <Link className="btn btn-dark" to={editLink}>Edit</Link>
      </div>
    );
  }
}

export default Single;
