import React from 'react';

import './Edit.scss';
import stuffData from '../../../helpers/data/stuffData';
import authData from '../../../helpers/data/authData';

class Edit extends React.Component {
  state = {
    itemName: '',
    itemImage: '',
    itemDescription: '',
  }

  componentDidMount() {
    const editId = this.props.match.params.itemId;
    stuffData.getSingleItem(editId)
      .then((response) => {
        const item = response.data;
        this.setState({
          itemName: item.itemName,
          itemImage: item.itemImage,
          itemDescription: item.itemDescription,
        });
      })
      .catch((err) => console.error('Unable to get item to edit: ', err));
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ itemName: e.target.value });
  }

  imageChange = (e) => {
    e.preventDefault();
    this.setState({ itemImage: e.target.value });
  }

  descriptionChange = (e) => {
    e.preventDefault();
    this.setState({ itemDescription: e.target.value });
  }

  updateItem = (e) => {
    e.preventDefault();
    const { itemId } = this.props.match.params;
    const {
      itemName,
      itemImage,
      itemDescription,
    } = this.state;

    const updatedItem = {
      itemName,
      itemImage,
      itemDescription,
      uid: authData.getUid(),
    };
    stuffData.putItem(itemId, updatedItem)
      .then(() => this.props.history.push('/stuffgit sta'))
      .catch((err) => console.error('unable to save item: ', err));
  }

  render() {
    const { itemId } = this.props.match.params;
    const {
      itemName,
      itemImage,
      itemDescription,
    } = this.state;

    return (
    <div className="EditThings">
    <h1>Edit Item {itemId}</h1>
            <form className="col-6 offset-3 text-left">
          <div className="form-group">
            <label htmlFor="item-name">Name</label>
            <input
              type="text"
              className="form-group"
              id="item-name"
              value={itemName}
              onChange={this.nameChange}
              />
          </div>
         <div className="form-group">
            <label htmlFor="item-image">Image</label>
            <input
              type="text"
              className="form-group"
              id="item-image"
              value={itemImage}
              onChange={this.imageChange}
              />
          </div>
           <div className="form-group">
            <label htmlFor="item-description">Description</label>
            <input
              type="text"
              className="form-group"
              id="item-description"
              value={itemDescription}
              onChange={this.descriptionChange}
              />
              <button className="btn btn-primary" onClick={this.updateItem}>Update Item</button>
          </div>
        </form>
    </div>
    );
  }
}

export default Edit;
