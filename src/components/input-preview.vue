<template>
  <div class="input-preview">
    <label class="input-preview__label">{{label}}:</label>
    <input
      v-if="active"
      v-focus
      :value="value"
      :class="['input-preview__input', { 'success': valid && showValidity }]"
      :type="inputType"
      @blur="onBlurInput()"
      @input="onInput($event.target.value)"
    >
    <div v-else>
      <span class="input-preview__value">{{value}}</span>
      <button
        @click.prevent="onClickEditButton()"
        class="input-preview__button"
      >
        Edit
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'InputPreview',
    data: () => ({
      active: false,
    }),
    props: {
      inputType: { type: String, default: 'text' },
      label: { type: String, required: true },
      showValidity: { type: Boolean, default: false },
      valid: { type: Boolean },
      value: { type: String, required: true },
    },
    methods: {
      onBlurInput() {
        if (this.valid) {
          this.active = false;
        }
      },
      onClickEditButton() {
        this.active = true;
      },
      onInput: value => this.$emit('input', value),
    },
  };
</script>

<style lang="scss" scoped>
  @import "../styles/_variables.scss";
  @import "../styles/_functions.scss";
  @import "../styles/_mixins.scss";

  .input-preview {
    @include flex-row;
    align-items: center;
    height: 2rem;
    margin-bottom: .25rem;
  }
  .input-preview__label {
    color: color(black);
    font-size: 1rem;
    margin-right: .66rem;
    min-width: 7.5rem;
    opacity: .54;
  }
  .input-preview__value {
    color: #333333;
    font-size: 1rem;
  }
  .input-preview__button {
    -webkit-appearance: none;
    border: 0;
    cursor: pointer;
    font: {
      size: .55rem;
      weight: 500;
    }
    outline: 0;
  }
  .input-preview__input {
    -webkit-appearance: none;
    border: {
      color: color(gray);
      radius: 4px;
      style: solid;
      width: 1px;
    }
    color: color(black, dark);
    font-size: .8rem;
    height: 2rem;
    outline: 0;
    padding: {
      left: .5rem;
      right: .5rem;
    }
    width: 100%;

    &:focus { border-color: color(gray, dark); }
    &::-webkit-input-placeholder { color: color(black, light); }
    &.success {
      background: {
        image: url('../assets/icons/input-success.svg');
        position: right 10px center;
        repeat: no-repeat;
        size: 20px;
      };
    }
  }
</style>
