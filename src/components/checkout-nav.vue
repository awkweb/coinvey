<template>
  <div class="checkout-nav">
    <router-link
      :to="{ name: 'CheckoutInfo' }"
      class="checkout-nav__link complete"
    >
      Customer Info
    </router-link>

    <router-link
      :to="{ name: 'CheckoutPayment' }"
      :class="[
        'checkout-nav__link',
        this.$route.name === 'CheckoutPayment' || this.$route.name === 'CheckoutReview' ? 'complete' : ''
      ]"
    >
      Recipient & Payment
    </router-link>

    <router-link
      :to="{ name: 'CheckoutReview' }"
      :class="['checkout-nav__link', this.$route.name === 'CheckoutReview' ? 'complete' : '']"
    >
      Review & Send
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'CheckoutNav',
  };
</script>

<style lang="scss" scoped>
  @import "../styles/_variables.scss";
  @import "../styles/_functions.scss";
  @import "../styles/_mixins.scss";

  .checkout-nav {
    @include flex-row;
    margin-bottom: 2rem;
  }
  .checkout-nav__link {
    color: color(gray, dark);
    display: flex;
    font: {
      size: .7rem;
      weight: 500;
    }
    height: 100%;
    outline: 0;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }

    &:last-child {
      &:after { display: none; }
    }

    &:after {
      background: {
        image: url("../assets/icons/chevron-right.svg");
        position: center;
        size: contain;
      }
      content: '';
      display: inline-flex;
      height: 1rem;
      margin: {
        left: .25rem;
        right: .25rem;
      }
      width: 1rem;
    }

    &.complete {
      color: color(black);
    }
  }
</style>
