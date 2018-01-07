<template>
  <div class="success">
    <h1>Success</h1>
  </div>
</template>

<script>
  export default {
    name: 'SendSuccess',
    metaInfo: {
      title: 'Success!',
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../styles/_variables.scss";
  @import "../../styles/_functions.scss";
  @import "../../styles/_mixins.scss";

  .success {
    @include flex-column;
    @include flex-center;
  }
</style>
