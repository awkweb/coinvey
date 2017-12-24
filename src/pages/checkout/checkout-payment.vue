<template>
  <div class="checkout__form">
    <div class="checkout__payment-split">
      <div class="checkout__section">
        <div class="checkout__section-title">Recipient Name:</div>
        <input
          v-model="recipientName"
          class="checkout__input"
          type="text"
        >
      </div>

      <div class="checkout__section">
        <div class="checkout__section-title">Recipient Email:</div>
        <input
          v-model="recipientEmail"
          class="checkout__input"
          placeholder="Email"
          type="text"
        >
      </div>
    </div>

    <div class="checkout__section">
      <div class="checkout__section-title textarea">Add a Personal Note:</div>
      <textarea
        v-model="note"
        class="checkout__textarea"
      ></textarea>
    </div>

    <div class="checkout__section-payment">
      <div class="checkout__section-payment-title">Payment method</div>
      <div class="checkout__section-payment-description">All transactions are secure and encrypted.</div>

      <!--https://stripe.github.io/elements-examples/-->
      <!--https://github.com/fromAtoB/vue-stripe-elements-->
    </div>

    <button
      class="checkout__button"
    >
      Checkout
    </button>
  </div>
</template>

<script>
  export default {
    name: 'CheckoutPayment',
    computed: {
      recipientEmail: {
        get() { return this.$store.state.checkout.recipient.email; },
        set(value) { this.$store.commit('SET_RECIPIENT_EMAIL', value); },
      },
      recipientName: {
        get() { return this.$store.state.checkout.recipient.name; },
        set(value) { this.$store.commit('SET_RECIPIENT_NAME', value); },
      },
      note: {
        get() { return this.$store.state.checkout.note; },
        set(value) { this.$store.commit('SET_NOTE', value); },
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../styles/_variables.scss";
  @import "../../styles/_functions.scss";
  @import "../../styles/_mixins.scss";

  .checkout__payment-split {
    @include flex-row;
    margin-bottom: 1.5rem;

    .checkout__section {
      flex: 1;
      margin: {
        bottom: 0;
        right: 1rem;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
  .checkout__section-payment {
    margin-bottom: 3rem;
  }
  .checkout__section-payment-title {
    font-size: .95rem;
  }
  .checkout__section-payment-description {
    color: color(black, light);
    font-size: .75rem;
    margin-bottom: .25rem;
  }
</style>
