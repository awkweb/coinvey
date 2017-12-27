import firebase from 'firebase';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: process.env.firebase.apiKey,
  authDomain: process.env.firebase.authDomain,
  projectId: process.env.firebase.projectId,
});
const db = firebase.firestore();
const customersRef = db.collection('customers');

export default {
  checkout: (coin, amount, total, stripeToken, sender, recipient, note = '') => customersRef.add({
    coin,
    amount,
    total,
    stripeToken,
    sender,
    recipient,
    note,
  }),
};
