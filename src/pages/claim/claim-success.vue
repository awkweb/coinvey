<template>
  <div class="claim-success">
    <div class="claim-success__left">
      <envelope
        :title="'Confirmation'"
        :hideEnvelope="true"
      >
        <div class="claim-success__content">
          <div class="claim-success__message">
            <p>Woo! You’ve successfuly initiated a you initiated a withdrawal of $50 gift of Bitcoin to your Wallet ending in 4453. Thanks for using Coinvey!</p>
            <p>Please allow a 24 hours for your Wallet to reflect this withdrawal.</p>
            <p>Withdrawal reference: HRKR973L</p>
          </div>

          <button class="claim-success__button">Share</button>
          <button class="claim-success__print">Print Receipt</button>
        </div>
      </envelope>
    </div>

    <div class="claim-success__right">
      <div class="claim-success__right-container">
        <coin-selector
          v-bind="{coins}"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import CoinSelector from '@/components/coin-selector';
  import Envelope from '@/components/envelope';

  export default {
    name: 'ClaimSuccess',
    components: {
      CoinSelector,
      Envelope,
    },
    computed: {
      ...mapGetters([
        'coins',
      ]),
    },
    metaInfo: {
      title: 'Success',
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../styles/_variables.scss";
  @import "../../styles/_functions.scss";
  @import "../../styles/_mixins.scss";

  .claim-success {
    background-color: color(gray, light);
    display: flex;
    height: 100%;
    max-height: calc(100vh - 4rem);
  }
  .claim-success__left,
  .claim-success__right {
    width: 100%;
  }
  .claim-success__left {
    @include flex-column;
    @include flex-center;
    flex: 6;
    min-width: 47rem;
  }
  .claim-success__right {
    background-color: color(gray, light);
    flex: 4;
  }
  .claim-success__left-container {
    max-width: 47rem;
  }
  .claim-success__right-container {
    @include flex-column;
    align-items: center;
    height: 100%;
    max-width: 33rem;
    width: 100%;
  }
  .claim-success__content {
    @include flex-column;
    align-items: center;
    margin-top: 2.38rem;
    text-align: center;
  }
  .claim-success__message {
    margin-bottom: 3.5rem;

    p {
      color: #4c4c4c;
      font-size: .83rem;
      letter-spacing: 0.1px;
      line-height: 1.6;
      margin: {
        bottom: 1.15rem;
        top: 0;
      }
      &:last-child { margin: 0; }
    }
  }
  .claim-success__button {
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
    margin-bottom: 1rem;
    transition: {
      property: transform;
      duration: .25s;
    }
    width: 14.8rem;
    &:hover { transform: translateY(-2px); }
    &:active { transform: translateY(1px); }
  }
  .claim-success__print {
    @include button;
    background-color: transparent;
    border: 0;
    color: #4c4c4c;
    font-size: .77rem;
    line-height: 1.71;
    letter-spacing: 0.1px;
  }
</style>
