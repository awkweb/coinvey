<template>
  <div
    v-if="activeCoin"
    class="checkout"
  >
    <div class="checkout__left">
      <router-link
        :to="{ name: 'Home' }"
        class="checkout__back"
      >
        Back
      </router-link>

      <div :class="['checkout__coin', activeCoin.id]">
      </div>

      <h1 class="checkout__title">Select Amount</h1>
      <div class="checkout__description">Select how much {{ activeCoin.currency }} you’d like to gift:</div>

      <div class="checkout__price-options">
        <button
          v-for="priceOption in priceOptions"
          :class="['checkout__price-option', priceOption.active ? 'active' : '']"
          :key="priceOption.id"
          @click="onClickPriceOption(priceOption.id)"
        >
          ${{priceOption.value}}
        </button>
      </div>
    </div>

    <div class="checkout__right">

    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';

  export default {
    name: 'Checkout',
    watch: {
      $route: 'initCheckout',
    },
    mounted() {
      this.initCheckout();
    },
    computed: {
      ...mapGetters('coinvey', [
        'activeCoin',
        'priceOptions',
      ]),
    },
    methods: {
      ...mapMutations('coinvey', [
        'SET_ACTIVE_COIN',
        'SET_ACTIVE_PRICE_OPTION',
      ]),
      initCheckout() {
        this.SET_ACTIVE_COIN(this.$route.params.coinId);
      },
      onClickPriceOption(optionId) {
        this.SET_ACTIVE_PRICE_OPTION(optionId);
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../styles/_variables.scss";
  @import "../styles/_functions.scss";
  @import "../styles/_mixins.scss";

  .checkout {
    display: flex;
    height: calc(100vh - 4rem);
  }
  .checkout__left, .checkout__right {
    @include flex-column;
    width: 50vw;
    height: 100%;
  }
  .checkout__left {
    align-items: center;
    background-color: color(gray, light);
    padding: 1.65rem;
    text-align: center;
  }
  .checkout__right {
    background-color: color(white);
  }
  .checkout__back {
    align-self: flex-start;
    font: {
      size: 18px;
      weight: 300;
    }
    letter-spacing: 0.1px;
    line-height: 1.78;
    margin-bottom: 2.6rem;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }

    &:visited {
      color: color(black);
    }
  }
  .checkout__coin {
    background: {
      repeat: no-repeat;
      size: cover;
    }
    min-height: 2.85rem;
    min-width: 2.85rem;
    margin-bottom: 2rem;

    @each $coin in (btc, eth, ltc) {
      &.#{$coin} { background-image: url("../assets/coins/#{$coin}.svg"); }
    }
  }
  .checkout__title {
    font-size: 2rem;
    letter-spacing: -0.5px;
    line-height: 0.89;
    margin: {
      bottom: .65rem;
      top: 0;
    }
  }
  .checkout__description {
    font: {
      size: 18px;
      weight: 300;
    }
    letter-spacing: 0.1px;
    line-height: 1.78;
    margin-bottom: 2rem;
  }
  .checkout__price-options {
    @include flex-column;
  }
  .checkout__price-option {
    background-color: color(white);
    border-radius: 5px;
    border: {
      color: color(gray);
      style: solid;
      width: 1px;
    }
    color: color(black);
    cursor: pointer;
    font: {
      size: 1.3rem;
      weight: 600;
    }
    min-height: 3.25rem;
    letter-spacing: 0.2px;
    margin-bottom: .9rem;
    outline: 0;
    width: 17rem;

    &:hover {
      border-color: color(purple);
      transition: {
        property: border-color;
        duration: .25s;
      }
    }

    &.active {
      background-color: color(purple);
      border: 0;
      color: color(white);
    }
  }
</style>
