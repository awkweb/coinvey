<template>
  <div class="checkout-nav">
    <span class="checkout-nav__link complete">Customer Info</span>

    <span
      :class="[
        'checkout-nav__link',
        this.$route.name === 'CheckoutPayment' || this.$route.name === 'CheckoutReview' ? 'complete' : ''
      ]"
    >
      Recipient & Payment
    </span>

    <span
      :class="['checkout-nav__link', {'complete': this.$route.name === 'CheckoutReview'}]"
    >
      Review & Send
    </span>
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

    &:last-child {
      &:after { display: none; }
    }

    &:after {
      background: {
        image: url("../assets/icons/chevron-right.svg");
        position: center;
        repeat: no-repeat;
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
