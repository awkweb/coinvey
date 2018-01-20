<template>
  <div class="home-how">
    <div class="home-how__section">
      <h2 class="home-how__section-title">Step 1</h2>
      <div class="home-how__section-description">Select your preferred coin, gift amount and add a personalized note to your recipient.</div>
    </div>

    <div class="home-how__section">
      <h2 class="home-how__section-title two">Step 2</h2>
      <div class="home-how__section-description">Once you’ve sent your gift. Your lucky recipient will receive and email with easy instructions to collect his gift.</div>
    </div>

    <div class="home-how__section">
      <h2 class="home-how__section-title three">Step 3</h2>
      <div class="home-how__section-description">You’ll receive a confirmation when process is complete so you can rejoice in the praise of great gift-giving! </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HomeHow',
    metaInfo: {
      title: 'How It Works',
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../styles/_variables.scss";
  @import "../../styles/_functions.scss";
  @import "../../styles/_mixins.scss";

  .home-how {
    @include flex-column;
    background-color: color(gray, light);
    border-right: {
      color: #ecf0f4;
      style: solid;
      width: 1px;
    }
    height: 100%;
    min-height: calc(100vh - 4rem);
    overflow: hidden;
    padding: {
      left: 4.15rem;
      top: 4.75rem;
    }
    width: 100%;
  }
  .home-how__section {
    margin-bottom: 5rem;
    position: relative;
    &:before {
      background: {
        position: center;
        repeat: no-repeat;
      }
      content: '';
      position: absolute;
    }
    &:first-child {
      &:before {
        background-image: url('../../assets/illustrations/phone.svg');
        display: inline-block;
        height: 277px;
        right: 0;
        top: -2.5rem;
        width: 186px;
      }
    }
    &:nth-child(2) {
      padding-left: 10rem;
      &:before {
        background-image: url('../../assets/illustrations/cat.svg');
        height: 190px;
        left: 0;
        top: -1.5rem;
        width: 145px;
      }
    }
    &:last-child {
      margin-bottom: 0;
      &:before {
        background-image: url('../../assets/illustrations/person.svg');
        display: inline-block;
        height: 309px;
        right: 1rem;
        top: -2.5rem;
        width: 256px;
      }
    }
  }
  .home-how__section-title {
    color: color(purple, light);
    font: {
      family: font(header);
      size: 40px;
      weight: 500;
    }
    letter-spacing: -1.5px;
    margin: {
      bottom: 1rem;
      top: 0;
    }
    text-align: left;
    &.two { color: #7545c1; }
    &.three { color: #9c58cb; }
  }
  .home-how__section-description {
    color: #45484f;
    font: {
      family: $font-body;
      size: 18px;
      weight: 300;
    }
    line-height: 1.67;
    max-width: 28rem;
  }
</style>
