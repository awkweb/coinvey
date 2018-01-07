<template>
  <div class="send-nav">
    <button
      @click="onClickNavItem('SendInfo')"
      class="send-nav__link complete"
    >
      Information
    </button>

    <button
      :class="[
        'send-nav__link',
        this.$route.name === 'SendPayment' || this.$route.name === 'SendReview' ? 'complete' : ''
      ]"
      :disabled="$v.validationGroup.information.$invalid"
      @click="onClickNavItem('SendPayment')"
    >
      Payment
    </button>

    <button
      :to="{ name: 'SendReview' }"
      :class="['send-nav__link', this.$route.name === 'SendReview' ? 'complete' : '']"
      :disabled="$v.validationGroup.payment.$invalid"
      @click="onClickNavItem('SendReview')"
    >
      Review & Send
    </button>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { required, email } from 'vuelidate/lib/validators';

  export default {
    name: 'SendNav',
    computed: {
      ...mapGetters([
        'recipientEmail',
        'recipientName',
        'senderAddress',
        'senderCity',
        'senderEmail',
        'senderFirstName',
        'senderLastName',
        'senderZip',
        'stripeToken',
      ]),
    },
    methods: {
      onClickNavItem(name) {
        if (this.$route.name !== name) {
          this.$router.push({ name });
        }
      },
    },
    validations: {
      recipientEmail: { required, email },
      recipientName: { required },
      senderAddress: { required },
      senderCity: { required },
      senderEmail: { required, email },
      senderFirstName: { required },
      senderLastName: { required },
      senderZip: { required },
      stripeToken: { required },
      validationGroup: {
        information: [
          'recipientName',
          'recipientEmail',
          'senderEmail',
        ],
        payment: [
          'senderFirstName',
          'senderLastName',
          'senderAddress',
          'senderCity',
          'senderZip',
          'stripeToken',
        ],
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../styles/_variables.scss";
  @import "../styles/_functions.scss";
  @import "../styles/_mixins.scss";

  .send-nav {
    margin-bottom: 2rem;
  }
  .send-nav__link {
    @include flex-row;
    @include flex-center;
    -webkit-appearance: none;
    background-color: transparent;
    border: 0;
    color: color(gray, dark);
    cursor: pointer;
    display: inline-flex;
    font: {
      family: font(body);
      size: .7rem;
      weight: 500;
    }
    height: 100%;
    outline: 0;
    padding: 0;

    &:last-child {
      &:after { display: none; }
    }
    &:disabled { cursor: default; }
    &:after {
      background: {
        image: url("../assets/icons/chevron-right.svg");
        position: center;
        repeat: no-repeat;
        size: contain;
      }
      content: '';
      display: inline-flex;
      height: .5rem;
      margin: {
        left: .75rem;
        right: .5rem;
      }
      width: .5rem;
    }
    &.complete {color: color(black); }
  }
</style>
