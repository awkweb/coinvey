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
    metaInfo: {
      title: 'Send Bitcoin as a gift.',
      titleTemplate: '%s | Coinvey',
    },
  };
</script>

<style lang="scss">
  @import "./styles/_variables.scss";
  @import "./styles/_functions.scss";
  @import url("//hello.myfonts.net/count/358083");
  @font-face {
    font-family: 'DINNextRoundedLTPro-Medium';
    src: url('./assets/fonts/358083_0_0.eot');
    src: url('./assets/fonts/358083_0_0.eot?#iefix') format('embedded-opentype'),
         url('./assets/fonts/358083_0_0.woff2') format('woff2'),
         url('./assets/fonts/358083_0_0.woff') format('woff'),
         url('./assets/fonts/358083_0_0.ttf') format('truetype');
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  html {
    background-color: color(white);
    box-sizing: border-box;
    font: {
      family: font(body);
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
  h1,
  h2,
  h3 {
    font: {
      family: font(header);
      weight: 500;
    }
  }
</style>
