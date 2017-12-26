<template>
  <form class="checkout__form">
    <div class="checkout__payment-split">
      <div class="checkout__section">
        <div class="checkout__section-title">Recipient Name:</div>
        <input
          v-model="recipientName"
          v-focus
          :class="['checkout__input', { 'success': !$v.recipientName.$invalid }]"
          spellcheck="false"
          type="email"
        >
      </div>

      <div class="checkout__section">
        <div class="checkout__section-title">Recipient Email:</div>
        <input
          v-model="recipientEmail"
          :class="['checkout__input', { 'success': !$v.recipientEmail.$invalid }]"
          placeholder="Email"
          spellcheck="false"
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

      <Card
        @change="stripe.complete = $event.complete"
        :options="stripe.options"
        :stripe='stripe.key'
        id="stripe-card"
      />
    </div>

    <button
      @click.prevent="onClickCheckout()"
      @keyup.enter="onClickCheckout()"
      :class="['checkout__button', { 'disabled': $v.validationGroup.$invalid || !stripe.complete }]"
      :disabled="$v.validationGroup.$invalid || !stripe.complete"
    >
      Checkout
    </button>
  </form>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  import { required, email } from 'vuelidate/lib/validators';
  import { Card, createToken } from 'vue-stripe-elements-plus';

  export default {
    name: 'CheckoutPayment',
    components: {
      Card,
    },
    data: () => ({
      stripe: {
        complete: false,
        key: 'pk_test_VFndrTFCnus2nq4FHBQIseds',
        options: {
          // see https://stripe.com/docs/stripe.js#element-options for details
          classes: { base: 'stripe-card' },
          hidePostalCode: true,
          style: {
            base: {
              color: '#000000',
              fontFamily: 'Helvetica Neue',
              fontSize: '14.4px',
              fontSmoothing: 'antialiased',
              '::placeholder': {
                color: '#716d6d',
              },
            },
          },
        },
      },
    }),
    computed: {
      ...mapGetters([
        'senderAddress',
        'senderApartment',
        'senderCity',
        'senderFullName',
        'senderZip',
      ]),
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
    methods: {
      ...mapMutations([
        'SET_STRIPE_TOKEN',
      ]),
      onClickCheckout() {
        const options = {
          name: this.senderFullName,
          address_city: this.senderCity,
          address_line1: this.senderAddress,
          address_zip: this.senderZip,
        };
        if (this.senderApartment) {
          options.address_line2 = this.senderApartment;
        }
        createToken(options)
          .then((data) => {
            this.SET_STRIPE_TOKEN(data.token);
            this.$router.push({ name: 'CheckoutReview' });
          })
          .catch((err) => {
            this.stripeError = err;
          });
      },
    },
    validations: {
      recipientEmail: { required, email },
      recipientName: { required },
      validationGroup: [
        'recipientName',
        'recipientEmail',
      ],
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
    margin-bottom: .75rem;
  }
</style>

<style lang="scss">
  .stripe-card {
    align-items: center;
    border: {
      color: #d0d9de;
      radius: 4px;
      style: solid;
      width: 1px;
    }
    display: flex;
    height: 2.25rem;
    padding: {
      left: .5rem;
      right: .5rem;
    }

    &.StripeElement--focus { border-color: #999999; }
    &.StripeElement--complete {
      background: {
        image: url("../../assets/icons/input-success.svg");
        position: right 10px center;
        repeat: no-repeat;
        size: 20px;
      };
      padding-right: 1.5rem;
    }

    div { width: 100%; }
  }
</style>
