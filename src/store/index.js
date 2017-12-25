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
const SET_RECIPIENT_EMAIL = 'SET_RECIPIENT_EMAIL';
const SET_RECIPIENT_NAME = 'SET_RECIPIENT_NAME';
const SET_NOTE = 'SET_NOTE';

const store = new Vuex.Store({
  state: {
    checkout: {
      sender: {
        address: {
          apartment: undefined,
          city: undefined,
          street: undefined,
          zip: undefined,
        },
        company: undefined,
        email: undefined,
        name: {
          first: undefined,
          last: undefined,
        },
        phone: undefined,
      },
      recipient: {
        email: undefined,
        name: undefined,
      },
      note: undefined,
    },
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
    [SET_SENDER_EMAIL](state, email) { state.checkout.sender.email = email; },
    [SET_SENDER_FIRST_NAME](state, name) { state.checkout.sender.name.first = name; },
    [SET_SENDER_LAST_NAME](state, name) { state.checkout.sender.name.last = name; },
    [SET_SENDER_COMPANY](state, company) { state.checkout.sender.company = company; },
    [SET_SENDER_STREET](state, street) { state.checkout.sender.address.street = street; },
    [SET_SENDER_APARTMENT](state, apt) { state.checkout.sender.address.apartment = apt; },
    [SET_SENDER_CITY](state, city) { state.checkout.sender.address.city = city; },
    [SET_SENDER_ZIP](state, zip) { state.checkout.sender.address.zip = zip; },
    [SET_SENDER_PHONE](state, phone) { state.checkout.sender.phone = phone; },
    [SET_RECIPIENT_EMAIL](state, email) { state.checkout.recipient.email = email; },
    [SET_RECIPIENT_NAME](state, name) { state.checkout.recipient.name = name; },
    [SET_NOTE](state, note) { state.checkout.note = note; },
  },
  getters: {
    activeCoin: state => state.coins.find(coin => coin.active),
    activePriceOption: state => state.priceOptions.find(priceOption => priceOption.active),
    checkout: state => state.checkout,
    coins: state => state.coins,
    priceOptions: state => state.priceOptions,
    bill: (state) => {
      const activePriceOption = state.priceOptions.find(priceOption => priceOption.active);
      const subtotal = activePriceOption.amount;
      const networkFee = 4.32;
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
  },
});

export default store;
