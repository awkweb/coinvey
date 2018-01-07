<template>
  <div
    v-if="activeCoin"
    class="send"
  >
    <div class="send__left">
      <router-link
        :to="{ name: getBackRouteName() }"
        class="send__back"
      >
        <img src="../assets/icons/chevron-left.svg">
        Back
      </router-link>

      <div class="send__left-container">
        <envelope
          :title="'Gift Amount'"
          :description="`Select how much <b>${activeCoin.currency}</b> you’d like to gift:`"
        >
          <div class="send__price-options">
            <button
              v-for="priceOption in priceOptions"
              :class="['send__price-option', priceOption.active ? 'active' : '']"
              :key="priceOption.id"
              @click="onClickPriceOption(priceOption.id)"
            >
            ${{priceOption.amount}}
            </button>
          </div>
        </envelope>
      </div>
    </div>

    <div
      v-if="activePriceOption"
      class="send__right"
    >
      <div class="send__right-container">
        <h2 class="send__steps-title">Send</h2>
        <send-nav/>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  import { required, email } from 'vuelidate/lib/validators';
  import SendNav from '@/components/send-nav';
  import Envelope from '@/components/envelope';

  export default {
    name: 'Send',
    components: {
      SendNav,
      Envelope,
    },
    watch: {
      $route: 'initSend',
    },
    mounted() {
      this.RESET_APP();
      this.initSend();
    },
    computed: {
      ...mapGetters([
        'activeCoin',
        'activePriceOption',
        'priceOptions',
      ]),
    },
    methods: {
      ...mapMutations([
        'RESET_APP',
        'SET_ACTIVE_COIN',
        'SET_ACTIVE_PRICE_OPTION',
      ]),
      initSend() {
        this.SET_ACTIVE_COIN(this.$route.params.coinId);
      },
      getBackRouteName() {
        let routeName;
        switch (this.$route.name) {
          case 'SendPayment':
            routeName = 'SendInfo';
            break;
          case 'SendReview':
            routeName = 'SendPayment';
            break;
          default:
            routeName = 'HomeIndex';
        }
        return routeName;
      },
      onClickPriceOption(optionId) {
        this.SET_ACTIVE_PRICE_OPTION(optionId);
      },
    },
    validations: {
      recipientEmail: { required, email },
      recipientName: { required },
      senderEmail: { required, email },
      validationGroup: [
        'recipientName',
        'recipientEmail',
        'senderEmail',
      ],
    },
    metaInfo: {
      title: 'Select',
    },
  };
</script>

<style lang="scss" scoped>
  @import "../styles/_variables.scss";
  @import "../styles/_functions.scss";
  @import "../styles/_mixins.scss";

  .send {
    background-color: color(gray, light);
    display: flex;
    min-height: calc(100vh - 4rem);
  }
  .send__left,
  .send__right {
    flex: 1;
    min-height: calc(100vh - 4rem);
  }
  .send__left {
    @include flex-column;
    @include flex-center;
    flex-direction: column;
    position: relative;
  }
  .send__right {
    background-color: color(white);
  }
  .send__left-container,
  .send__right-container {
    @include flex-column;
    max-width: 40rem;
    width: 100%;
  }
  .send__left-container {
    align-items: center;
    padding: {
      bottom: 1.65rem;
      left: 2.5rem;
      right: 2.5rem;
      top: 5rem;
    }
    text-align: center;
  }
  .send__right-container {
    padding: {
      left: 5rem;
      right: 5rem;
      top: 2.75rem;
    }
  }
  .send__back {
    @include flex-row;
    @include flex-center;
    font: {
      size: 18px;
      weight: 300;
    }
    left: 2rem;
    letter-spacing: 0.1px;
    line-height: 1.78;
    position: absolute;
    text-decoration: none;
    top: 2rem;
    &:visited { color: color(black); }
    img { margin-right: .75rem; }
  }
  .send__price-options {
    @include flex-column;
    margin-top: 1.38rem;
  }
  .send__price-option {
    background-color: color(white);
    border: {
      color: #d0d9de;
      radius: 4px;
      style: solid;
      width: 1px;
    }
    color: color(black);
    cursor: pointer;
    font-size: 1rem;
    letter-spacing: .1px;
    margin-bottom: .66rem;
    min-height: 2.77rem;
    min-width: 14.8rem;
    outline: 0;
    &:hover { border-color: color(purple); }
    &.active {
      background-color: color(purple);
      border: 0;
      color: color(white);
    }
  }
  .send__steps-title {
    font: {
      family: font(body);
      size: 1.35rem;
      weight: 600;
    }
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

  .send__form {
    @include flex-column;
  }
  .send__section {
    margin-bottom: 1.5rem;

    &.review {
      margin-bottom: .75rem;
    }
  }
  .send__section-title {
    font-size: 1rem;
    margin-bottom: .75rem;

    &.review { margin-bottom: 2.25rem; }
    &.textarea { margin-bottom: .5rem; }
  }
  .send__section-inline {
    @include flex-row;
    margin-bottom: .75rem;

    .send__input {
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
  .send__input {
    -webkit-appearance: none;
    border: {
      color: color(gray);
      radius: 4px;
      style: solid;
      width: 1px;
    }
    color: color(black, dark);
    font-size: .8rem;
    height: 2.25rem;
    margin-bottom: .75rem;
    outline: 0;
    padding: {
      left: .5rem;
      right: .5rem;
    }
    width: 100%;

    &:focus { border-color: color(gray, dark); }
    &:last-child { margin-bottom: 0; }
    &::-webkit-input-placeholder { color: color(black, light); }
    &[type=number]::-webkit-inner-spin-button,
    &[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
    &.success {
      background: {
        image: url('../assets/icons/input-success.svg');
        position: right 10px center;
        repeat: no-repeat;
        size: 20px;
      };
    }
  }
  .send__textarea {
    -webkit-appearance: none;
    border: {
      color: color(gray);
      radius: 4px;
      style: solid;
      width: 1px;
    }
    font-size: .8rem;
    height: 8rem;
    outline: 0;
    padding: {
      bottom: .5rem;
      left: .5rem;
      right: .5rem;
      top: .5rem;
    }
    resize: none;
    width: 100%;

    &:focus { border-color: color(gray, dark); }
  }
  .send__button {
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

    &:hover { transform: translateY(-2px); }
    &:active { transform: translateY(1px); }
    &.disabled {
      cursor: not-allowed;
      opacity: .5;
      &:hover, &:active { transform: none; }
    }
  }
</style>
