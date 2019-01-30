import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDricmUtuNyc0g04NF_iBBZ20WsmYKZNhM',
  authDomain: 'my-extra-super-ultra-project.firebaseapp.com',
  databaseURL: 'https://my-extra-super-ultra-project.firebaseio.com',
  projectId: 'my-extra-super-ultra-project',
  storageBucket: 'my-extra-super-ultra-project.appspot.com',
  messagingSenderId: '810859542376',
};
firebase.initializeApp(config);

export default firebase;
