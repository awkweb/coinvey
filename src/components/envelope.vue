<template>
  <div
    :class="[
      'envelope',
      {'show-seal': showSeal},
      {'hide-envelope': hideEnvelope}
    ]"
  >
    <div class="envelope__container">
      <div class="envelope__paper">
        <h1 class="envelope__title">{{title}}</h1>
        <div
          v-if="description"
          v-html="description"
          class="envelope__body"
        >
        </div>
        <slot></slot>
      </div>
    </div>

    <footer
      v-if="!hideEnvelope"
      class="envelope__footer"
    >
      Learn more about our fees
      <router-link :to="{ name: 'HomeIndex' }">here</router-link>.
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'Envelope',
    props: {
      title: { type: String, required: true },
      description: { type: String },
      showSeal: { type: Boolean, default: false },
      hideEnvelope: { type: Boolean, default: false },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../styles/_variables.scss";
  @import "../styles/_functions.scss";
  @import "../styles/_mixins.scss";

  .envelope {
    position: relative;
    &.show-seal {
      &:after {
        background: {
          image: url('../assets/illustrations/envelope/seal.svg');
          repeat: no-repeat;
          size: contain;
        }
        bottom: 9.5rem;
        content: '';
        display: block;
        height: 89px;
        left: calc(50% - 40.5px);
        position: absolute;
        width: 81px;
        z-index: 1;
      }
    }
    &.hide-envelope {
      .envelope__container {
        &:before,
        &:after { display: none; }
      }
    }
  }
  .envelope__container {
    @include flex-column;
    @include flex-center;
    margin-bottom: 2rem;
    position: relative;
    &:before,
    &:after {
      background: {
        repeat: no-repeat;
        size: contain;
      }
      content: '';
      display: block;
      pointer-events: none;
      position: absolute;
    }
    &:before {
      background-image: url('../assets/illustrations/envelope/background.svg');
      bottom: -1.15rem;
      height: 401px;
      width: 486px;
      z-index: 0;
    }
    &:after {
      background-image: url('../assets/illustrations/envelope/front.svg');
      bottom: -.7rem;
      height: 267px;
      width: 470px;
      z-index: 1;
    }
  }
  .envelope__paper {
    @include flex-column;
    align-items: center;
    background-color: color(white);
    box-shadow: -2px 8px 3px 0 rgba(0,0,0,.05);
    color: #232323;
    height: 30rem;
    padding: {
      left: 2rem;
      right: 2rem;
      top: 2.5rem;
    }
    position: relative;
    width: 419px;
    z-index: 1;
  }
  .envelope__title {
    font: {
      size: 2rem;
      weight: 500;
    }
    letter-spacing: -1.6px;
    line-height: 0.89;
    margin: 0;
    text-align: center;
  }
  .envelope__body {
    font: {
      size: .88rem;
      weight: 300;
    }
    line-height: 1.5;
    margin-top: .5rem;
    text-align: center;
  }
  .envelope__footer {
    color: #a6a6a6;
    font: {
      size: .66rem;
      weight: 300;
    }
    letter-spacing: 0.2px;
    line-height: 2.67;
    text-align: center;
    a { color: #a6a6a6; }
  }
</style>
