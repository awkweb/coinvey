<template>
  <div class="home">
    <div class="home__left">
      <router-view></router-view>
    </div>

    <div class="home__right">
      <div class="home__right-container">
        <coin-selector
          v-bind="{coins}"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import CoinSelector from '@/components/coin-selector';

  export default {
    name: 'Home',
    components: {
      CoinSelector,
    },
    computed: {
      ...mapGetters([
        'coins',
      ]),
    },
  };
</script>

<style lang="scss" scoped>
  @import "../styles/_variables.scss";
  @import "../styles/_functions.scss";
  @import "../styles/_mixins.scss";

  .home {
    display: flex;
    height: 100%;
    max-height: calc(100vh - 4rem);
  }
  .home__left,
  .home__right {
    width: 100%;
  }
  .home__left {
    @include flex-column;
    align-items: flex-end;
    background-color: color(purple, dark);
    flex: 6;
    min-width: 47rem;
    overflow: scroll;
    &::-webkit-scrollbar { display: none; }
  }
  .home__right {
    background-color: color(gray, light);
    flex: 4;
  }
  .home__left-container {
    max-width: 47rem;
  }
  .home__right-container {
    @include flex-column;
    align-items: center;
    height: 100%;
    max-width: 33rem;
    width: 100%;
  }
</style>
