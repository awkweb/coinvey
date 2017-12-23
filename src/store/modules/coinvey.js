/* eslint-disable no-shadow */
import api from '@/api';

const SET_ACTIVE_COIN = 'SET_ACTIVE_COIN';
const SET_ACTIVE_PRICE_OPTION = 'SET_ACTIVE_PRICE_OPTION';

const state = {
  coins: [
    { id: 'btc', name: 'Bitcoin', currency: 'bitcoin' },
    { id: 'eth', name: 'Ethereum', currency: 'ether' },
    { id: 'ltc', name: 'Litecoin', currency: 'litecoin' },
  ],
  priceOptions: [
    { id: 1, value: 25 },
    { id: 2, value: 50, active: true },
    { id: 3, value: 100 },
  ],
};

const actions = {
  // SEARCH: ({ state, commit, rootState }, searchTerm) =>
  //   api
  //     .search(searchTerm)
  //     .then(res => commit(SET_ACTIVE_PRICE_OPTION, res.data.data)),
};

const mutations = {
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
};

const getters = {
  activeCoin: state => state.coins.find(coin => coin.active),
  coins: state => state.coins,
  priceOptions: state => state.priceOptions,
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
