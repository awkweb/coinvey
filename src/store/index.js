import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const SET_ACTIVE_COIN = 'SET_ACTIVE_COIN';
const SET_ACTIVE_PRICE_OPTION = 'SET_ACTIVE_PRICE_OPTION';
const SET_SENDER_EMAIL = 'SET_SENDER_EMAIL';
const SET_SENDER_FIRST_NAME = 'SET_SENDER_FIRST_NAME';
const SET_SENDER_LAST_NAME = 'SET_SENDER_LAST_NAME';
const SET_SENDER_COMPANY = 'SET_SENDER_COMPANY';
const SET_SENDER_STREET = 'SET_SENDER_STREET';
const SET_SENDER_APARTMENT = 'SET_SENDER_APARTMENT';
const SET_SENDER_CITY = 'SET_SENDER_CITY';
const SET_SENDER_ZIP = 'SET_SENDER_ZIP';
const SET_SENDER_PHONE = 'SET_SENDER_PHONE';
const SET_STRIPE_TOKEN = 'SET_STRIPE_TOKEN';
const SET_RECIPIENT_EMAIL = 'SET_RECIPIENT_EMAIL';
const SET_RECIPIENT_NAME = 'SET_RECIPIENT_NAME';
const SET_NOTE = 'SET_NOTE';

const store = new Vuex.Store({
  state: {
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
    recipient: {
      email: null,
      name: null,
    },
    note: null,
    coins: [
      { id: 'btc', name: 'Bitcoin', currency: 'bitcoin' },
      { id: 'eth', name: 'Ethereum', currency: 'ether' },
      { id: 'ltc', name: 'Litecoin', currency: 'litecoin' },
    ],
    priceOptions: [
      { id: 1, amount: 25 },
      { id: 2, amount: 50, active: true },
      { id: 3, amount: 100 },
    ],
    stripeToken: null,
  },
  actions: {},
  mutations: {
    [SET_ACTIVE_COIN](state, nextCoinId) {
      state.coins = state.coins.map((coin) => {
        coin.active = coin.id === nextCoinId; // eslint-disable-line
        return coin;
      });
    },
    [SET_ACTIVE_PRICE_OPTION](state, nextPriceOptionId) {
      state.priceOptions = state.priceOptions.map((priceOption) => {
        priceOption.active = priceOption.id === nextPriceOptionId; // eslint-disable-line
        return priceOption;
      });
    },
    [SET_SENDER_EMAIL](state, email) { state.sender.email = email; },
    [SET_SENDER_FIRST_NAME](state, name) { state.sender.name.first = name; },
    [SET_SENDER_LAST_NAME](state, name) { state.sender.name.last = name; },
    [SET_SENDER_COMPANY](state, company) { state.sender.company = company; },
    [SET_SENDER_STREET](state, street) { state.sender.address.street = street; },
    [SET_SENDER_APARTMENT](state, apt) { state.sender.address.apartment = apt; },
    [SET_SENDER_CITY](state, city) { state.sender.address.city = city; },
    [SET_SENDER_ZIP](state, zip) { state.sender.address.zip = zip; },
    [SET_SENDER_PHONE](state, phone) { state.sender.phone = phone; },
    [SET_STRIPE_TOKEN](state, token) { state.stripeToken = token; },
    [SET_RECIPIENT_EMAIL](state, email) { state.recipient.email = email; },
    [SET_RECIPIENT_NAME](state, name) { state.recipient.name = name; },
    [SET_NOTE](state, note) { state.note = note; },
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
    sender: state => state.sender,
    senderFullName: state => `${state.sender.name.first} ${state.sender.name.last}`,
    stripeToken: state => state.stripeToken,
  },
});

export default store;
