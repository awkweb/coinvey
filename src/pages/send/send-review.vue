<template>
  <form class="send__form">
    <div class="send-review__section">
      <div class="send__section-title review">Review Order</div>

      <div class="send-review__gift">
        <div class="send-review__gift-left">
          <div
            :class="['send-review__gift-coin', activeCoin.id]"
          >
          </div>
          <div class="send-review__gift-description">${{activePriceOption.amount}} Gift of {{activeCoin.name}}</div>
        </div>

        <div class="send-review__gift-amount">
          ${{activePriceOption.amount.toFixed(2)}}
        </div>
      </div>

      <div class="send__section review">
        <input-preview
          v-model="recipientName"
          :label="'Recipient Name'"
          :valid="!$v.recipientName.$invalid"
        />
        <input-preview
          v-model="recipientEmail"
          :inputType="'email'"
          :label="'Recipient Email'"
          :valid="!$v.recipientEmail.$invalid"
          :showValidity="true"
        />
      </div>

      <div class="send-review__bill">
        <div class="send-review__bill-rows">
          <div
            v-for="row in bill.rows"
            :key="row.id"
            class="send-review__bill-row"
          >
            <span class="send-review__bill-row-item">{{ row.name }}</span>
            <span class="send-review__bill-row-amount">${{ row.amount.toFixed(2) }}</span>
          </div>
        </div>

        <div class="send-review__bill-total">
          <span class="send-review__bill-row-item">Total</span>
          <span class="send-review__bill-total-right">
            <span class="send-review__bill-total-currency">USD</span>
            <span class="send-review__bill-total-value">${{ bill.total.toFixed(2) }}</span>
          </span>
        </div>
      </div>
    </div>

    <button
      @click.prevent="onClickSend()"
      @keyup.enter="onClickSend()"
      :class="['send-review__button', { 'disabled': $v.recipientEmail.$invalid || sending }]"
      :disabled="$v.recipientEmail.$invalid || sending"
    >
      {{ sending ? 'Sending...' : 'Send' }}
    </button>

    <div class="send-review__terms">
      By hitting send, you agree to our <router-link :to="{ name: 'HomeIndex' }">Terms & Conditions.</router-link>
    </div>
  </form>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { required, email } from 'vuelidate/lib/validators';
  import api from '@/api';
  import InputPreview from '@/components/input-preview';

  export default {
    name: 'SendReview',
    components: {
      InputPreview,
    },
    data: () => ({
      error: false,
      sending: false,
    }),
    computed: {
      ...mapGetters([
        'activeCoin',
        'activePriceOption',
        'bill',
        'note',
        'recipient',
        'stripeToken',
        'sender',
      ]),
      recipientEmail: {
        get() { return this.$store.state.recipient.email; },
        set(value) { this.$store.commit('SET_RECIPIENT_EMAIL', value); },
      },
      recipientName: {
        get() { return this.$store.state.recipient.name; },
        set(value) { this.$store.commit('SET_RECIPIENT_NAME', value); },
      },
    },
    methods: {
      onClickSend() {
        this.sending = true;
        api
          .checkout(
            this.activeCoin.id,
            this.activePriceOption.amount,
            this.bill.total,
            this.stripeToken,
            this.sender,
            this.recipient,
            this.note,
          )
          .then(() => {
            this.sending = false;
            this.$router.push({ name: 'SendSuccess' });
          })
          .catch((err) => {
            this.error = err;
            this.sending = false;
          });
      },
    },
    validations: {
      recipientEmail: { required, email },
      recipientName: { required },
    },
    metaInfo: {
      title: 'Review',
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../styles/_variables.scss";
  @import "../../styles/_functions.scss";
  @import "../../styles/_mixins.scss";

  .send-review__section {
    margin-bottom: 2rem;
  }
  .send-review__gift {
    @include flex-row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.75rem;
  }
  .send-review__gift-left {
    @include flex-row;
    align-items: center;
  }
  .send-review__gift-coin {
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
      &.#{$coin} { background-image: url('../../assets/coins/white/#{$coin}.svg'); }
    }
  }
  .send-review__gift-description {
    font-size: 1rem;
  }
  .send-review__gift-amount {
    font: {
      size: 1rem;
      weight: bold;
    }
  }
  .send-review__bill-rows {
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
  .send-review__bill-row {
    @include flex-row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: .8rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
  .send-review__bill-row-item,
  .send-review__bill-row-amount {
    font: {
      size: .8rem;
      weight: 500;
    }
  }
  .send-review__bill-total {
    @include flex-row;
    align-items: center;
    justify-content: space-between;
  }
  .send-review__bill-total-right {
    @include flex-row;
    align-items: baseline;
  }
  .send-review__bill-total-currency {
    color: color(gray, dark);
    font: {
      size: .8rem;
      weight: 500;
    }
    margin-right: .5rem;
  }
  .send-review__bill-total-value {
    font: {
      size: 1rem;
      weight: bold;
    }
  }
  .send-review__button {
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
  .send-review__terms {
    align-self: flex-end;
    color: color(gray, dark);
    font: {
      size: 10px;
      weight: 500;
    }

    a:visited { color: color(gray, dark); }
  }
</style>
