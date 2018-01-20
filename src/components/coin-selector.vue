<template>
  <div class="coin-selector">
    <router-link
      :to="{ name: 'SendInfo', params: { coinId: coin.id } }"
      v-for="coin in coins"
      :key="coin.id"
      class="coin-selector__coin"
    >
      <div
        :class="['coin-selector__coin-image', coin.id]"
      >
      </div>
      <div class="coin-selector__coin-name">Gift {{ coin.name }}</div>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'CoinSelector',
    props: {
      coins: { type: Array, required: true },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../styles/_variables.scss";
  @import "../styles/_functions.scss";
  @import "../styles/_mixins.scss";

  .coin-selector {
    @include flex-column;
    height: 100%;
    width: 100%;
  }
  .coin-selector__coin {
    @include flex-column;
    @include flex-center;
    background-color: color(white);
    border-bottom: {
      color: #ecf0f4;
      style: solid;
      width: 1px;
    }
    cursor: pointer;
    flex: 1;
    text-decoration: none;
    width: 100%;

    &:hover {
      background: grad(coin);
      border-color: transparent;
      .coin-selector__coin-image {
        @each $coin in (btc, eth, ltc) {
          &.#{$coin} { background-image: url('../assets/coins/white/#{$coin}.svg'); }
        }
      }
      .coin-selector__coin-name { color: color(white); }
    }
    &:last-child { border: 0; }
  }
  .coin-selector__coin-image {
    background: {
      repeat: no-repeat;
      size: contain;
    }
    height: 2.15rem;
    margin-bottom: 1rem;
    width: 2.15rem;

    @each $coin in (btc, eth, ltc) {
      &.#{$coin} { background-image: url('../assets/coins/color/#{$coin}.svg'); }
    }
  }
  .coin-selector__coin-name {
    color: color(black);
    font: {
      family: font(header);
      size: 2rem;
      weight: 500;
    }
    letter-spacing: -1.5px;
    line-height: 0.8;
  }
</style>
