<template>
  <form class="checkout__form">
    <div class="checkout__section">
      <div class="checkout__section-title">Sender Information</div>
      <input
        v-model="senderEmail"
        v-focus
        :class="['checkout__input', { 'success': !$v.senderEmail.$invalid }]"
        placeholder="Email"
        spellcheck="false"
        type="email"
      >
    </div>

    <div class="checkout__section">
      <div class="checkout__section-title">Billing Address</div>
      <div class="checkout__section-inline">
        <input
          v-model="senderFirstName"
          :class="['checkout__input', { 'success': !$v.senderFirstName.$invalid }]"
          placeholder="First name"
          spellcheck="false"
          type="text"
        >

        <input
          v-model="senderLastName"
          :class="['checkout__input', { 'success': !$v.senderLastName.$invalid }]"
          placeholder="Last name"
          spellcheck="false"
          type="text"
        >
      </div>

      <input
        v-model="senderCompany"
        class="checkout__input"
        placeholder="Company (optional)"
        spellcheck="false"
        type="text"
      >

      <div class="checkout__section-inline">
        <input
          v-model="senderAddress"
          :class="['checkout__input', 'flex-7', { 'success': !$v.senderAddress.$invalid }]"
          placeholder="Address"
          spellcheck="false"
          type="text"
        >
        <input
          v-model="senderApartment"
          class="checkout__input flex-3"
          placeholder="Apt, suite, etc. (optional)"
          spellcheck="false"
          type="text"
        >
      </div>

      <div class="checkout__section-inline">
        <input
          v-model="senderCity"
          :class="['checkout__input', 'flex-8', { 'success': !$v.senderCity.$invalid }]"
          placeholder="City"
          spellcheck="false"
          type="text"
        >
        <input
          v-model="senderZip"
          :class="['checkout__input', 'flex-2', { 'success': !$v.senderZip.$invalid }]"
          placeholder="Zip code"
          spellcheck="false"
          type="text"
        >
      </div>

      <input
        v-model="senderPhone"
        class="checkout__input"
        placeholder="Phone (optional)"
        spellcheck="false"
        type="text"
      >
    </div>

    <button
      @click.prevent="onClickContinue()"
      @keyup.enter="onClickContinue()"
      :class="['checkout__button', {'disabled': $v.validationGroup.$invalid}]"
      :disabled="$v.validationGroup.$invalid"
    >
      Continue
    </button>
  </form>
</template>

<script>
  import { required, email } from 'vuelidate/lib/validators';

  export default {
    name: 'CheckoutInfo',
    computed: {
      senderEmail: {
        get() { return this.$store.state.checkout.sender.email; },
        set(value) { this.$store.commit('SET_SENDER_EMAIL', value); },
      },
      senderFirstName: {
        get() { return this.$store.state.checkout.sender.name.first; },
        set(value) { this.$store.commit('SET_SENDER_FIRST_NAME', value); },
      },
      senderLastName: {
        get() { return this.$store.state.checkout.sender.name.last; },
        set(value) { this.$store.commit('SET_SENDER_LAST_NAME', value); },
      },
      senderCompany: {
        get() { return this.$store.state.checkout.sender.company; },
        set(value) { this.$store.commit('SET_SENDER_COMPANY', value); },
      },
      senderAddress: {
        get() { return this.$store.state.checkout.sender.address.street; },
        set(value) { this.$store.commit('SET_SENDER_STREET', value); },
      },
      senderApartment: {
        get() { return this.$store.state.checkout.sender.address.apartment; },
        set(value) { this.$store.commit('SET_SENDER_APARTMENT', value); },
      },
      senderCity: {
        get() { return this.$store.state.checkout.sender.address.city; },
        set(value) { this.$store.commit('SET_SENDER_CITY', value); },
      },
      senderZip: {
        get() { return this.$store.state.checkout.sender.address.zip; },
        set(value) { this.$store.commit('SET_SENDER_ZIP', value); },
      },
      senderPhone: {
        get() { return this.$store.state.checkout.sender.phone; },
        set(value) { this.$store.commit('SET_SENDER_PHONE', value); },
      },
    },
    methods: {
      onClickContinue() {
        this.$router.push({ name: 'CheckoutPayment' });
      },
    },
    validations: {
      senderEmail: { required, email },
      senderFirstName: { required },
      senderLastName: { required },
      senderAddress: { required },
      senderCity: { required },
      senderZip: { required },
      validationGroup: [
        'senderEmail',
        'senderFirstName',
        'senderLastName',
        'senderAddress',
        'senderCity',
        'senderZip',
      ],
    },
  };
</script>
