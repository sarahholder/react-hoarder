import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import itemShape from '../../../helpers/propz/itemShape';

class StuffCards extends React.Component {
  static propTypes = {
    item: itemShape.itemShape,
    removeItem: PropTypes.func.isRequired,
  }

  render() {
    const { item, removeItem } = this.props;
    const singleLink = `/items/${item.id}`;
    const editLink = `/edit/${item.id}`;

    return (
        <div className="StuffCards col-3">
            <div className="card m-3">
            <img src={item.itemImage} alt={item.itemName} className="card-img-top"/>
              <div className="card-body">
                <h3>{item.itemName}</h3>
                <Link className="btn btn-dark" to={editLink}>Edit</Link>
                <Link className="btn btn-light" to={singleLink}>View</Link>
                <button className="btn btn-danger" onClick={() => removeItem(item.id)}>Delete</button>
              </div>
            </div>
          </div>
    );
  }
}

export default StuffCards;
