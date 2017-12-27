<template>
  <form class="checkout__form">
    <div class="checkout-review__section">
      <div class="checkout__section-title review">Review Order</div>

      <div class="checkout-review__gift">
        <div class="checkout-review__gift-left">
          <div
            :class="['checkout-review__gift-coin', activeCoin.id]"
          >
          </div>
          <div class="checkout-review__gift-description">${{activePriceOption.amount}} Gift of {{activeCoin.name}}</div>
        </div>

        <div class="checkout-review__gift-amount">
          ${{activePriceOption.amount.toFixed(2)}}
        </div>
      </div>

      <div class="checkout__section review">
        <div class="checkout__section-title">Recipient Email:</div>
        <input
          v-model="recipientEmail"
          :class="['checkout__input', { 'success': !$v.recipientEmail.$invalid }]"
          placeholder="Email"
          type="text"
        >
      </div>

      <div class="checkout-review__bill">
        <div class="checkout-review__bill-rows">
          <div
            v-for="row in bill.rows"
            :key="row.id"
            class="checkout-review__bill-row"
          >
            <span class="checkout-review__bill-row-item">{{ row.name }}</span>
            <span class="checkout-review__bill-row-amount">${{ row.amount.toFixed(2) }}</span>
          </div>
        </div>

        <div class="checkout-review__bill-total">
          <span class="checkout-review__bill-row-item">Total</span>
          <span class="checkout-review__bill-total-right">
            <span class="checkout-review__bill-total-currency">USD</span>
            <span class="checkout-review__bill-total-value">${{ bill.total.toFixed(2) }}</span>
          </span>
        </div>
      </div>
    </div>

    <button
      @click.prevent="onClickSend()"
      @keyup.enter="onClickSend()"
      :class="['checkout-review__button', { 'disabled': $v.recipientEmail.$invalid }]"
      :disabled="$v.recipientEmail.$invalid"
    >
      Send
    </button>

    <div class="checkout-review__terms">
      By hitting send, you agree to our <router-link :to="{ name: 'Home' }">Terms & Conditions.</router-link>
    </div>
  </form>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { required, email } from 'vuelidate/lib/validators';

  export default {
    name: 'CheckoutReview',
    computed: {
      ...mapGetters([
        'activeCoin',
        'activePriceOption',
        'bill',
      ]),
      recipientEmail: {
        get() { return this.$store.state.recipient.email; },
        set(value) { this.$store.commit('SET_RECIPIENT_EMAIL', value); },
      },
    },
    methods: {
      onClickSend() {
        return false;
      },
    },
    validations: {
      recipientEmail: { required, email },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../styles/_variables.scss";
  @import "../../styles/_functions.scss";
  @import "../../styles/_mixins.scss";

  .checkout-review__section {
    margin-bottom: 2rem;
  }
  .checkout-review__gift {
    @include flex-row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.75rem;
  }
  .checkout-review__gift-left {
    @include flex-row;
    align-items: center;
  }
  .checkout-review__gift-coin {
    background: {
      color: color(purple);
      position: center;
      repeat: no-repeat;
    }
    border-radius: 5px;
    height: 70px;
    margin-right: .75rem;
    width: 70px;

    @each $coin in (btc, eth, ltc) {
      &.#{$coin} { background-image: url("../../assets/coins/white/#{$coin}.svg"); }
    }
  }
  .checkout-review__gift-description {
    font-size: 1rem;
  }
  .checkout-review__gift-amount {
    font: {
      size: 1rem;
      weight: bold;
    }
  }
  .checkout-review__bill-rows {
    border: {
      color: color(gray);
      style: solid;
      width: 1px;
    }
    border-left: 0;
    border-right: 0;
    margin-bottom: 1.25rem;
    padding: {
      bottom: 1rem;
      top: 1rem;
    }
  }
  .checkout-review__bill-row {
    @include flex-row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: .8rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
  .checkout-review__bill-row-item,
  .checkout-review__bill-row-amount {
    font: {
      size: .8rem;
      weight: 500;
    }
  }
  .checkout-review__bill-total {
    @include flex-row;
    align-items: center;
    justify-content: space-between;
  }
  .checkout-review__bill-total-right {
    @include flex-row;
    align-items: baseline;
  }
  .checkout-review__bill-total-currency {
    color: color(gray, dark);
    font: {
      size: .8rem;
      weight: 500;
    }
    margin-right: .5rem;
  }
  .checkout-review__bill-total-value {
    font: {
      size: 1rem;
      weight: bold;
    }
  }
  .checkout-review__button {
    @include button;
    align-self: flex-end;
    background-image: grad(button-success);
    border: {
      radius: 4px;
      width: 0;
    }
    color: color(white);
    font: {
      size: 1.1rem;
      weight: 500;
    }
    letter-spacing: 0.1px;
    margin-bottom: 2rem;
    min-height: 2.7rem;
    transition: transform .25s;
    width: 12rem;

    &:hover { transform: translateY(-2px); }
    &:active { transform: translateY(1px); }
    &.disabled {
      cursor: not-allowed;
      opacity: .5;
      &:hover, &:active { transform: none; }
    }
  }
  .checkout-review__terms {
    align-self: flex-end;
    color: color(gray, dark);
    font: {
      size: 10px;
      weight: 500;
    }

    a:visited { color: color(gray, dark); }
  }
</style>
