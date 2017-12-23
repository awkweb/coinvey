<template>
  <div class="home">
    <div class="home__left">
      <h1 class="home__title">Send Bitcoin as a gift.</h1>

      <div class="home__description">
        With Coinvey, sending cryptocurrency has never been easier. Any occasion, Anytime.
      </div>

      <button
        class="home__button"
      >
        How It Works
      </button>
    </div>

    <div class="home__right">
      <div class="home__cta">Get Started</div>
      <div class="home__instructions">Select which coin you’d like to gift:</div>

      <div class="home__coin-cards">
        <router-link
          :to="{ name: 'Checkout', params: { coinId: coin.id } }"
          v-for="coin in coins"
          :key="coin.id"
          class="home__coin-card"
        >
          <div
            :class="['home__coin-card-image', coin.id]"
          >
          </div>
          <div class="home__coin-card-name">{{ coin.name }}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'Home',
    computed: {
      ...mapGetters('coinvey', [
        'coins',
      ]),
    },
  };
</script>

<style lang="scss" scoped>
  @import "../styles/_variables.scss";
  @import "../styles/_functions.scss";
  @import "../styles/_mixins.scss";

  .home {
    display: flex;
    height: 100%;
    max-height: calc(100vh - 4rem);
  }
  .home__left, .home__right {
    @include flex-column;
    height: 100%;
  }
  .home__left {
    background-color: color(purple, dark);
    max-width: 47rem;
    padding: {
      left: 5rem;
      right: 4rem;
      top: 9.5rem;
    }
    width: 100%;
  }
  .home__right {
    background-color: color(gray, light);
    max-width: 33rem;
    padding: {
      left: 3.5rem;
      right: 3.5rem;
      top: 11rem;
    }
    width: 100%;
  }
  .home__title {
    color: color(white);
    font-size: 3rem;
    letter-spacing: -2px;
    margin: {
      bottom: .9rem;
      top: 0;
    }
  }
  .home__description {
    color: color(white);
    font: {
      size: 1.25rem;
      weight: 300;
    }
    line-height: 1.73;
    margin-bottom: 4rem;
    max-width: 33rem;
  }
  .home__button {
    -webkit-appearance: none;
    background-image: grad(button);
    border: {
      radius: 7px;
      width: 0;
    }
    color: color(white);
    cursor: pointer;
    font: {
      size: 19.2px;
      weight: 500;
    }
    height: 62px;
    outline: 0;
    transition: transform .25s;
    width: 240px;

    &:hover {
      transform: translateY(-5px);
    }

    &:active {
      transform: translateY(1px);
    }
  }
  .home__cta {
    color: color(black);
    font: {
      size: 2rem;
      weight: 600;
    }
    letter-spacing: -0.5px;
    line-height: 0.89;
    margin-bottom: .6rem;
    text-align: center;
  }
  .home__instructions {
    color: color(black);
    font: {
      size: 1rem;
      weight: 300;
    }
    line-height: 1.78;
    letter-spacing: 0.1px;
    margin-bottom: 2rem;
    text-align: center;
  }
  .home__coin-cards {
    @include flex-row;
  }
  .home__coin-card {
    @include flex-column;
    @include flex-center;
    background-color: color(white);
    border: {
      color: color(gray);
      radius: 5px;
      style: solid;
      width: 1px;
    }
    cursor: pointer;
    height: 8rem;
    margin-right: .8rem;
    text-decoration: none;
    transition: {
      property: border-color, transform;
      duration: .5s;
    }
    width: 8rem;

    &:hover {
      border-color: color(purple);
      transform: translateY(-4px);
    }

    &:active {
      transform: translateY(1px);
    }

    &:last-child {
      margin-right: 0;
    }
  }
  .home__coin-card-image {
    background: {
      repeat: no-repeat;
      size: contain;
    }
    height: 2.15rem;
    margin-bottom: .5rem;
    width: 2.15rem;

    @each $coin in (btc, eth, ltc) {
      &.#{$coin} { background-image: url("../assets/coins/#{$coin}.svg"); }
    }
  }
  .home__coin-card-name {
    color: color(black);
    font: {
      size: .8rem;
      weight: 500;
    }
    line-height: 1.61;
    text-transform: capitalize;
  }
</style>
