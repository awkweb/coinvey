<template>
  <div class="checkout__form">
    <div class="checkout__section">
      <div class="checkout__section-title">Sender Information</div>
      <input
        v-model="senderEmail"
        class="checkout__input"
        placeholder="Email"
        type="text"
      >
    </div>

    <div class="checkout__section">
      <div class="checkout__section-title">Billing Address</div>
      <div class="checkout__section-inline">
        <input
          v-model="senderFirstName"
          class="checkout__input"
          placeholder="First name"
          type="text"
        >

        <input
          v-model="senderLastName"
          class="checkout__input"
          placeholder="Last name"
          type="text"
        >
      </div>

      <input
        v-model="senderCompany"
        class="checkout__input"
        placeholder="Company (optional)"
        type="text"
      >

      <div class="checkout__section-inline">
        <input
          v-model="senderAddress"
          class="checkout__input flex-7"
          placeholder="Address"
          type="text"
        >
        <input
          v-model="senderApartment"
          class="checkout__input flex-3"
          placeholder="Apt, suite, etc. (optional)"
          type="text"
        >
      </div>

      <div class="checkout__section-inline">
        <input
          v-model="senderCity"
          class="checkout__input flex-8"
          placeholder="City"
          type="text"
        >
        <input
          v-model="senderZip"
          class="checkout__input flex-2"
          placeholder="Zip code"
          type="text"
        >
      </div>

      <input
        v-model="senderPhone"
        class="checkout__input"
        placeholder="Phone (optional)"
        type="text"
      >
    </div>

    <button
      class="checkout__button"
    >
      Continue
    </button>
  </div>
</template>

<script>
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
  };
</script>
