<template>
  <div class="claim">
    <div class="claim__left">
      <div class="claim__left-container">
        <envelope
          :title="'Hey Tom'"
          :description="'Happy Birthday, enjoy the Bitcoins, I hope they make you rich! Love Nanna'"
          :showSeal="true"
        >
          <div class="claim__message">
            <div class="claim__amount">$50</div>
            <div class="claim__currency">In Bitcoins!</div>
          </div>
        </envelope>
      </div>
    </div>

    <div class="claim__right">
      <div class="claim__right-container">
        <div class="claim__option">
          <h2 class="claim__header">Collect Your Bitcoins</h2>
          <div class="claim__description">Enter your Bitcoin Wallet Address:</div>
          <input
            v-model="walletId"
            class="claim__input"
            placeholder="i.e. 1KcdC2PZCt43ZLgquRpwZotnVqUkia2nJC"
            type="text"
          >
          <button
            v-show="walletId !== ''"
            @click="onClickWithdraw()"
            class="claim__button"
          >
            Withdraw
          </button>

          <div
            v-show="walletId !== ''"
            class="claim__legal"
          >
            By hitting withrdaw, you agree to our <a href="">Terms & Conditions</a>.
          </div>
        </div>

        <div
          v-show="walletId === ''"
          class="claim__option"
        >
          <h3 class="coinbase__header">Don’t have a wallet?</h3>
          <div class="claim__description">Learn more about wallets <a href="">here</a> or create an account with our friends at Coinbase:</div>
          <a
            class="coinbase__button"
            href=""
          >
            <img src="../assets/logos/coinbase.svg">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Envelope from '@/components/envelope';

  export default {
    name: 'Claim',
    components: {
      Envelope,
    },
    data: () => ({
      walletId: '',
    }),
    methods: {
      onClickWithdraw() {
        this.$router.push({ name: 'ClaimSuccess' });
      },
    },
    metaInfo: {
      title: 'Claim',
    },
  };
</script>

<style lang="scss" scoped>
  @import "../styles/_variables.scss";
  @import "../styles/_functions.scss";
  @import "../styles/_mixins.scss";

  .claim {
    background-color: color(gray, light);
    display: flex;
    min-height: calc(100vh - 4rem);
  }
  .claim__left,
  .claim__right {
    flex: 1;
    min-height: calc(100vh - 4rem);
  }
  .claim__left {
    @include flex-column;
    @include flex-center;
    flex-direction: column;
    position: relative;
  }
  .claim__right {
    background-color: color(white);
  }
  .claim__right-container {
    @include flex-column;
    height: 100%;
  }
  .claim__message {
    @include flex-column;
    @include flex-center;
    margin-top: 2rem;
    text-align: center;
  }
  .claim__amount {
    color: #613bbb;
    font: {
      size: 4.8rem;
      weight: bold;
    }
    margin-bottom: .5rem;
  }
  .claim__currency {
    color: color(black);
    font: {
      size: 1rem;
      weight: bold;
    }
  }
  .claim__option {
    @include flex-column;
    @include flex-center;
    border-top: {
      color: #f4f7fa;
      style: solid;
      width: 1px;
    }
    flex: 1;
    &:first-child { border: 0; }
  }
  .claim__header {
    font: {
      size: 2rem;
      weight: 500;
    }
    letter-spacing: -1.5px;
    line-height: 0.89;
    margin: {
      bottom: .83rem;
      top: 0;
    }
  }
  .claim__description {
    color: #4c4c4c;
    font: {
      size: 1rem;
      weight: 300;
    }
    letter-spacing: 0.1px;
    line-height: 1.78;
    margin-bottom: 2rem;
    max-width: 31rem;
    text-align: center;
  }
  .claim__input {
    background-color: #f5f7f8;
    border: {
      color: #d0d9de;
      radius: 4.1px;
      style: solid;
      width: 1px;
    }
    font-size: .9rem;
    height: 50px;
    line-height: 1.52;
    max-width: 23.6rem;
    outline: 0;
    padding: {
      left: .5rem;
      right: .5rem;
    }
    text-align: center;
    width: 100%;
    &::-webkit-input-placeholder { color: #cdcdcd; }
  }
  .claim__button {
    @include button;
    border: {
      radius: 4px;
      width: 0;
    }
    background-image: grad(button-secondary);
    color: color(white);
    font-size: 1rem;
    height: 2.7rem;
    letter-spacing: 0.1px;
    margin: {
      bottom: 1.6rem;
      top: 2rem;
    }
    transition: {
      property: transform;
      duration: .25s;
    }
    width: 14.8rem;
    &:hover { transform: translateY(-2px); }
    &:active { transform: translateY(1px); }
  }
  .claim__legal {
    color: #9f9f9f;
    font-size: .66rem;
    letter-spacing: -0.1px;
    line-height: 1.8;
    padding-bottom: 12.75rem;
    text-align: center;
    a { color: #9f9f9f; }
  }
  .coinbase__header {
    font: {
      size: 1.33rem;
      weight: 500;
    }
    letter-spacing: -1.5px;
    line-height: 1.33;
    margin: {
      bottom: .55rem;
      top: 0;
    }
  }
  .coinbase__button {
    @include flex-row;
    @include flex-center;
    background-color: transparent;
    border: {
      color: #2669c9;
      radius: 4.3px;
      style: solid;
      width: 1px;
    }
    height: 4rem;
    padding-bottom: .25rem;
    transition: {
      property: transform;
      duration: .25s;
    }
    width: 12rem;

    &:hover { transform: translateY(-2px); }
    &:active { transform: translateY(1px); }
  }
</style>
