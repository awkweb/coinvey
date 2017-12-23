<template>
  <div id="app">
    <navbar/>
    <router-view/>
  </div>
</template>

<script>
  import Navbar from '@/components/navbar';

  export default {
    name: 'app',
    components: {
      Navbar,
    },
  };
</script>

<style lang="scss">
  @import "./styles/_variables.scss";
  @import "./styles/_functions.scss";

  *, *:before, *:after {
    box-sizing: inherit;
  }
  html {
    background-color: color(white);
    box-sizing: border-box;
    font: {
      family: $sans-serif;
      size: 18px;
    }
  }
  body {
    margin: 0;
  }
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: color(black);
    height: 100vh;
    text-rendering: optimizeLegibility;
    width: 100vw;
  }
</style>
