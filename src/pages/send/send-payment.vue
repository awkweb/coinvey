<template>
  <form
    class="send__form"
  >
    <div class="send__section">
      <div class="send__section-title">Billing Address</div>
      <div class="send__section-inline">
        <input
          v-focus
          v-model="senderFirstName"
          class="send__input"
          placeholder="First name"
          spellcheck="false"
          type="text"
        >

        <input
          v-model="senderLastName"
          class="send__input"
          placeholder="Last name"
          spellcheck="false"
          type="text"
        >
      </div>

      <input
        v-model="senderCompany"
        class="send__input"
        placeholder="Company (optional)"
        spellcheck="false"
        type="text"
      >

      <div class="send__section-inline">
        <input
          v-model="senderAddress"
          class="send__input flex-7"
          placeholder="Address"
          spellcheck="false"
          type="text"
        >
        <input
          v-model="senderApartment"
          class="send__input flex-3"
          placeholder="Apt, suite, etc. (optional)"
          spellcheck="false"
          type="text"
        >
      </div>

      <div class="send__section-inline">
        <input
          v-model="senderCity"
          class="send__input flex-8"
          placeholder="City"
          spellcheck="false"
          type="text"
        >
        <input
          v-model="senderZip"
          class="send__input flex-2"
          placeholder="Zip code"
          spellcheck="false"
          type="text"
        >
      </div>

      <input
        v-model="senderPhone"
        class="send__input"
        placeholder="Phone (optional)"
        spellcheck="false"
        type="text"
      >
    </div>

    <div class="send__section-payment">
      <div class="send__section-payment-title">Payment method</div>
      <div class="send__section-payment-description">All transactions are secure and encrypted.</div>

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
      :class="['send__button', { 'disabled': $v.validationGroup.$invalid || !stripe.complete }]"
      :disabled="$v.validationGroup.$invalid || !stripe.complete"
    >
      Send
    </button>
  </form>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  import { required } from 'vuelidate/lib/validators';
  import { Card, createToken } from 'vue-stripe-elements-plus';

  export default {
    name: 'SendPayment',
    components: {
      Card,
    },
    data: () => ({
      stripe: {
        complete: false,
        key: process.env.stripe.key,
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
        'sender',
        'senderFullName',
      ]),
      senderFirstName: {
        get() { return this.$store.state.sender.name.first; },
        set(value) { this.$store.commit('SET_SENDER_FIRST_NAME', value); },
      },
      senderLastName: {
        get() { return this.$store.state.sender.name.last; },
        set(value) { this.$store.commit('SET_SENDER_LAST_NAME', value); },
      },
      senderCompany: {
        get() { return this.$store.state.sender.company; },
        set(value) { this.$store.commit('SET_SENDER_COMPANY', value); },
      },
      senderAddress: {
        get() { return this.$store.state.sender.address.street; },
        set(value) { this.$store.commit('SET_SENDER_STREET', value); },
      },
      senderApartment: {
        get() { return this.$store.state.sender.address.apartment; },
        set(value) { this.$store.commit('SET_SENDER_APARTMENT', value); },
      },
      senderCity: {
        get() { return this.$store.state.sender.address.city; },
        set(value) { this.$store.commit('SET_SENDER_CITY', value); },
      },
      senderZip: {
        get() { return this.$store.state.sender.address.zip; },
        set(value) { this.$store.commit('SET_SENDER_ZIP', value); },
      },
      senderPhone: {
        get() { return this.$store.state.sender.phone; },
        set(value) { this.$store.commit('SET_SENDER_PHONE', value); },
      },
    },
    methods: {
      ...mapMutations([
        'SET_STRIPE_TOKEN',
      ]),
      onClickCheckout() {
        const options = {
          name: this.senderFullName,
          address_city: this.sender.address.city,
          address_line1: this.sender.address.street,
          address_zip: this.sender.address.zip,
        };
        if (this.senderApartment) {
          options.address_line2 = this.sender.address.apartment;
        }
        createToken(options)
          .then((data) => {
            this.SET_STRIPE_TOKEN(data.token);
            this.$router.push({ name: 'SendReview' });
          })
          .catch((err) => {
            this.stripeError = err;
          });
      },
    },
    validations: {
      senderFirstName: { required },
      senderLastName: { required },
      senderAddress: { required },
      senderCity: { required },
      senderZip: { required },
      validationGroup: [
        'senderFirstName',
        'senderLastName',
        'senderAddress',
        'senderCity',
        'senderZip',
      ],
    },
    metaInfo: {
      title: 'Payment',
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../styles/_variables.scss";
  @import "../../styles/_functions.scss";
  @import "../../styles/_mixins.scss";

  .send__section-payment {
    margin-bottom: 3rem;
  }
  .send__section-payment-title {
    font-size: .95rem;
  }
  .send__section-payment-description {
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
        image: url('../../assets/icons/input-success.svg');
        position: right 10px center;
        repeat: no-repeat;
        size: 20px;
      };
      padding-right: 1.5rem;
    }

    div { width: 100%; }
  }
</style>
