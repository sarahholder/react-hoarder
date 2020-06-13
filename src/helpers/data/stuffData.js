import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getStuffByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/items.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const fbStuff = response.data;
      const items = [];
      if (fbStuff) {
        Object.keys(fbStuff).forEach((itemId) => {
          fbStuff[itemId].id = itemId;
          items.push(fbStuff[itemId]);
        });
      }
      resolve(items);
    })
    .catch((error) => reject(error));
});

const getSingleItem = (itemId) => axios.get(`${baseUrl}/stuff/${itemId}.json`);

const addItem = (newItem) => axios.post(`${baseUrl}/stuff.json`, newItem);

const deleteItem = (itemId) => axios.delete(`${baseUrl}/stuff/${itemId}.json`);

export default {
  getStuffByUid,
  getSingleItem,
  addItem,
  deleteItem,
};
