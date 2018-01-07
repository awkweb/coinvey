<template>
  <form class="send__form">
    <div class="send__section">
      <div class="send__section-title">Your Information</div>
      <input
        v-model="senderEmail"
        v-focus
        :class="['send__input', { 'success': !$v.senderEmail.$invalid }]"
        placeholder="Email"
        spellcheck="false"
        type="email"
      >
    </div>

    <div class="send__payment-split">
      <div class="send__section">
        <div class="send__section-title">Recipient Name:</div>
        <input
          v-model="recipientName"
          class="send__input"
          spellcheck="false"
          type="email"
        >
      </div>

      <div class="send__section">
        <div class="send__section-title">Recipient Email:</div>
        <input
          v-model="recipientEmail"
          :class="['send__input', { 'success': !$v.recipientEmail.$invalid }]"
          placeholder="Email"
          spellcheck="false"
          type="text"
        >
      </div>
    </div>

    <div class="send__section">
      <div class="send__section-title textarea">Add a Personal Note:</div>
      <textarea
        v-model="note"
        class="send__textarea"
      ></textarea>
    </div>

    <button
      @click.prevent="onClickContinue()"
      @keyup.enter="onClickContinue()"
      :class="['send__button', {'disabled': $v.validationGroup.$invalid}]"
      :disabled="$v.validationGroup.$invalid"
    >
      Continue
    </button>
  </form>
</template>

<script>
  import { required, email } from 'vuelidate/lib/validators';

  export default {
    name: 'SendInfo',
    computed: {
      note: {
        get() { return this.$store.state.note; },
        set(value) { this.$store.commit('SET_NOTE', value); },
      },
      recipientEmail: {
        get() { return this.$store.state.recipient.email; },
        set(value) { this.$store.commit('SET_RECIPIENT_EMAIL', value); },
      },
      recipientName: {
        get() { return this.$store.state.recipient.name; },
        set(value) { this.$store.commit('SET_RECIPIENT_NAME', value); },
      },
      senderEmail: {
        get() { return this.$store.state.sender.email; },
        set(value) { this.$store.commit('SET_SENDER_EMAIL', value); },
      },
    },
    methods: {
      onClickContinue() {
        this.$router.push({ name: 'SendPayment' });
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
      title: 'Information',
    },
  };
</script>

<style lang="scss">
  @import "../../styles/_variables.scss";
  @import "../../styles/_functions.scss";
  @import "../../styles/_mixins.scss";

  .send__payment-split {
    @include flex-row;
    margin-bottom: 1.5rem;

    .send__section {
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
</style>
