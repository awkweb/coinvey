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
          ${{priceOption.amount}}
        </button>
      </div>
    </div>

    <div class="checkout__right">
      <h2 class="checkout__steps-title">Checkout</h2>
      <checkout-nav/>
      <router-view/>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  import CheckoutNav from '@/components/checkout-nav';

  export default {
    name: 'Checkout',
    components: {
      CheckoutNav,
    },
    watch: {
      $route: 'initCheckout',
    },
    mounted() {
      this.initCheckout();
    },
    computed: {
      ...mapGetters([
        'activeCoin',
        'priceOptions',
      ]),
    },
    methods: {
      ...mapMutations([
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
    padding: {
      bottom: 1.65rem;
      left: 2.5rem;
      right: 2.5rem;
      top: 1.65rem;
    }
    text-align: center;
  }
  .checkout__right {
    background-color: color(white);
    padding: {
      left: 5rem;
      right: 5rem;
      top: 2.75rem;
    }
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
      &.#{$coin} { background-image: url("../assets/coins/color/#{$coin}.svg"); }
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
      size: 1rem;
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
  .checkout__steps-title {
    font-size: 1.35rem;
    letter-spacing: -0.6px;
    margin: {
      bottom: 1rem;
      top: 0;
    }
  }
</style>

<style lang="scss">
  @import "../styles/_variables.scss";
  @import "../styles/_functions.scss";
  @import "../styles/_mixins.scss";

  .checkout__form {
    @include flex-column;
    height: calc(100vh - 4rem);
  }
  .checkout__section {
    margin-bottom: 1.5rem;

    &.review {
      margin-bottom: .75rem;
    }
  }
  .checkout__section-title {
    font-size: 1rem;
    margin-bottom: .75rem;

    &.review { margin-bottom: 2.25rem; }
    &.textarea { margin-bottom: .5rem; }
  }
  .checkout__section-inline {
    @include flex-row;
    margin-bottom: .75rem;

    .checkout__input {
      flex: 1;
      margin: {
        bottom: 0;
        right: .7rem;
      }

      &:last-child { margin-right: 0; }

      &.flex-7 { flex: 6.5; }
      &.flex-3 { flex: 3.5; }
      &.flex-8 { flex: 8; }
      &.flex-2 { flex: 2; }
    }
  }
  .checkout__input {
    -webkit-appearance: none;
    border: {
      color: color(gray);
      radius: 4px;
      style: solid;
      width: 1px;
    }
    font-size: .8rem;
    height: 2.25rem;
    margin-bottom: .75rem;
    outline: 0;
    padding: {
      left: .5rem;
      right: .5rem;
    }
    width: 100%;

    &:focus {
      border-color: color(gray, dark);
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
  .checkout__textarea {
    -webkit-appearance: none;
    border: {
      color: color(gray);
      radius: 4px;
      style: solid;
      width: 1px;
    }
    font-size: .8rem;
    height: 4rem;
    outline: 0;
    padding: {
      bottom: .5rem;
      left: .5rem;
      right: .5rem;
      top: .5rem;
    }
    resize: none;
    width: 100%;

    &:focus {
      border-color: color(gray, dark);
    }
  }
  .checkout__button {
    @include button;
    align-self: flex-end;
    background-color: color(black, dark);
    border: {
      radius: 4px;
      width: 0;
    }
    color: color(white);
    font: {
      size: .85rem;
      weight: 500;
    }
    min-height: 3rem;
    transition: transform .25s;
    width: 11rem;

    &:hover {
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(1px);
    }
  }
</style>
