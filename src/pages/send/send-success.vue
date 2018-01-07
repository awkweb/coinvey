<template>
  <div class="send-success">
    <div class="send-success__left">
      <h1 class="send-success__header">Gift Sent!</h1>
      <div class="send-success__description">
        Woo! You’ve successful sent Tom a $50 gift of Bitcoin. You’ll receive and email receipt and your lucky receipient will receive an email with instructions to collect his gift. Thanks for using Coinvey!
      </div>

      <div class="send-success__envelope-container">
        <img
          class="send-success__envelope"
          src="../../assets/illustrations/envelope/closed.svg"
        >
      </div>

      <button class="send-success__button">Share</button>

      <router-link
        :to="{name: 'Home'}"
        class="send-success__link"
      >
        Send Another Gift
      </router-link>
    </div>

    <div class="send-success__right">
      <div class="send-success__right-container">
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import CoinSelector from '@/components/coin-selector';
  import Envelope from '@/components/envelope';

  export default {
    name: 'sendSuccess',
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

  .send-success {
    background-color: color(gray, light);
    display: flex;
    height: 100%;
    max-height: calc(100vh - 4rem);
  }
  .send-success__left,
  .send-success__right {
    width: 100%;
  }
  .send-success__left {
    @include flex-column;
    align-items: center;
    flex: 6;
    min-width: 47rem;
    padding-top: 4.3rem;
  }
  .send-success__right {
    background-color: color(white);
    flex: 4;
  }
  .send-success__left-container {
    max-width: 47rem;
  }
  .send-success__right-container {
    @include flex-column;
    align-items: center;
    height: 100%;
    max-width: 33rem;
    width: 100%;
  }
  .send-success__header {
    font: {
      size: 2rem;
      weight: 500;
    }
    letter-spacing: -1.1px;
    margin: {
      bottom: 1.25rem;
      top: 0;
    }
    text-align: center;
  }
  .send-success__description {
    color: #4c4c4c;
    font-size: 15px;
    letter-spacing: 0.1px;
    line-height: 1.6;
    margin-bottom: 2.5rem;
    max-width: 33rem;
    text-align: center;
  }
  .send-success__envelope-container {
    position: relative;
    &:after {
      background: {
        image: url('../../assets/illustrations/envelope/seal.svg');
        repeat: no-repeat;
        size: contain;
      }
      bottom: 8.75rem;
      content: '';
      display: block;
      height: 89px;
      left: calc(50% - 40.5px);
      position: absolute;
      width: 81px;
      z-index: 1;
    }
  }
  .send-success__envelope {
    margin-bottom: 2.75rem;
  }
  .send-success__button {
    @include button;
    border: {
      radius: 4px;
      width: 0;
    }
    background-image: grad(button-secondary);
    color: color(white);
    font-size: 1rem;
    letter-spacing: 0.1px;
    margin-bottom: 1.83rem;
    min-height: 2.7rem;
    transition: {
      property: transform;
      duration: .25s;
    }
    width: 14.8rem;
    &:hover { transform: translateY(-2px); }
    &:active { transform: translateY(1px); }
  }
  .send-success__link {
    @include button;
    background-color: transparent;
    border: 0;
    color: #854dc5;
    font-size: .77rem;
    line-height: 1.71;
    letter-spacing: 0.1px;
    text-align: center;
  }
</style>
