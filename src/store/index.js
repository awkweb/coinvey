import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const RESET_APP = 'RESET_APP';
const SET_ACTIVE_COIN = 'SET_ACTIVE_COIN';
const SET_ACTIVE_PRICE_OPTION = 'SET_ACTIVE_PRICE_OPTION';
const SET_NOTE = 'SET_NOTE';
const SET_RECIPIENT_EMAIL = 'SET_RECIPIENT_EMAIL';
const SET_RECIPIENT_NAME = 'SET_RECIPIENT_NAME';
const SET_SENDER_APARTMENT = 'SET_SENDER_APARTMENT';
const SET_SENDER_CITY = 'SET_SENDER_CITY';
const SET_SENDER_COMPANY = 'SET_SENDER_COMPANY';
const SET_SENDER_EMAIL = 'SET_SENDER_EMAIL';
const SET_SENDER_FIRST_NAME = 'SET_SENDER_FIRST_NAME';
const SET_SENDER_LAST_NAME = 'SET_SENDER_LAST_NAME';
const SET_SENDER_PHONE = 'SET_SENDER_PHONE';
const SET_SENDER_STREET = 'SET_SENDER_STREET';
const SET_SENDER_ZIP = 'SET_SENDER_ZIP';
const SET_STRIPE_TOKEN = 'SET_STRIPE_TOKEN';

const store = new Vuex.Store({
  state: {
    note: null,
    priceOptions: [
      { id: 1, amount: 25 },
      { id: 2, amount: 50 },
      { id: 3, amount: 100 },
    ],
    recipient: {
      email: null,
      name: null,
    },
    coins: [
      { id: 'btc', name: 'Bitcoin', currency: 'bitcoin' },
      { id: 'eth', name: 'Ethereum', currency: 'ether' },
      { id: 'ltc', name: 'Litecoin', currency: 'litecoin' },
    ],
    sender: {
      address: {
        apartment: null,
        city: null,
        street: null,
        zip: null,
      },
      company: null,
      email: null,
      name: {
        first: null,
        last: null,
      },
      phone: null,
    },
    stripeToken: null,
  },
  actions: {},
  mutations: {
    [RESET_APP](state) {
      state.priceOptions = state.priceOptions.map((priceOption) => {
        // eslint-disable-next-line
        priceOption.active = false;
        return priceOption;
      });
    },
    [SET_ACTIVE_COIN](state, nextCoinId) {
      state.coins = state.coins.map((coin) => {
        // eslint-disable-next-line
        coin.active = coin.id === nextCoinId;
        return coin;
      });
    },
    [SET_ACTIVE_PRICE_OPTION](state, nextPriceOptionId) {
      state.priceOptions = state.priceOptions.map((priceOption) => {
        // eslint-disable-next-line
        priceOption.active = priceOption.id === nextPriceOptionId;
        return priceOption;
      });
    },
    [SET_NOTE](state, note) { state.note = note; },
    [SET_RECIPIENT_EMAIL](state, email) { state.recipient.email = email; },
    [SET_RECIPIENT_NAME](state, name) { state.recipient.name = name; },
    [SET_SENDER_APARTMENT](state, apt) { state.sender.address.apartment = apt; },
    [SET_SENDER_CITY](state, city) { state.sender.address.city = city; },
    [SET_SENDER_COMPANY](state, company) { state.sender.company = company; },
    [SET_SENDER_EMAIL](state, email) { state.sender.email = email; },
    [SET_SENDER_FIRST_NAME](state, name) { state.sender.name.first = name; },
    [SET_SENDER_LAST_NAME](state, name) { state.sender.name.last = name; },
    [SET_SENDER_PHONE](state, phone) { state.sender.phone = phone; },
    [SET_SENDER_STREET](state, street) { state.sender.address.street = street; },
    [SET_SENDER_ZIP](state, zip) { state.sender.address.zip = zip; },
    [SET_STRIPE_TOKEN](state, token) { state.stripeToken = token; },
  },
  getters: {
    activeCoin: state => state.coins.find(coin => coin.active),
    activePriceOption: state => state.priceOptions.find(priceOption => priceOption.active),
    coins: state => state.coins,
    bill: (state) => {
      const activePriceOption = state.priceOptions.find(priceOption => priceOption.active);
      const activeCoin = state.coins.find(coin => coin.active);
      const subtotal = activePriceOption.amount;
      const multiplier = activeCoin.name === 'btc' ? 0.0025 : 0.003;
      const networkFee = subtotal * multiplier;
      const convenienceFee = 1;
      return {
        rows: [
          { id: 'subtotal', name: 'Subtotal', amount: subtotal },
          { id: 'network-fee', name: 'Network Fee', amount: networkFee },
          { id: 'convenience-fee', name: 'Convenience Fee', amount: convenienceFee },
        ],
        total: subtotal + networkFee + convenienceFee,
      };
    },
    note: state => state.note,
    priceOptions: state => state.priceOptions,
    recipient: state => state.recipient,
    recipientEmail: state => state.recipient.email,
    recipientName: state => state.recipient.name,
    sender: state => state.sender,
    senderAddress: state => state.sender.address.street,
    senderEmail: state => state.sender.email,
    senderCity: state => state.sender.address.city,
    senderFirstName: state => state.sender.name.first,
    senderFullName: state => `${state.sender.name.first} ${state.sender.name.last}`,
    senderLastName: state => state.sender.name.last,
    senderZip: state => state.sender.address.zip,
    stripeToken: state => state.stripeToken,
  },
});

export default store;
