<template>
  <div class="claim">
    <h1>Claim {{$route.params.hash}}</h1>
  </div>
</template>

<script>
  export default {
    name: 'Claim',
    metaInfo: {
      title: 'Claim',
    },
  };
</script>

<style lang="scss" scoped>
  @import "../styles/_variables.scss";
  @import "../styles/_functions.scss";
  @import "../styles/_mixins.scss";

  .claim {

  }
</style>
