<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar__left">
        <router-link
          :to="{ name: 'HomeIndex' }"
          class="navbar__title"
        >
          <img
            src="../assets/logos/wordmark.svg"
            alt="Coinvey"
          >
        </router-link>
      </div>

      <div class="navbar__right">
        <div class="navbar__links">
          <router-link
            :to="{ name: 'HomeHow' }"
            class="navbar__link"
          >
            How It Works
          </router-link>

          <router-link
            :to="{ name: 'HomeIndex' }"
            class="navbar__link"
          >
            Contact Us
          </router-link>

          <router-link
            :to="{ name: 'HomeIndex' }"
            class="navbar__link"
          >
            Share
            <img src="../assets/icons/share.svg">
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'Navbar',
  };
</script>

<style lang="scss" scoped>
  @import "../styles/_variables.scss";
  @import "../styles/_functions.scss";
  @import "../styles/_mixins.scss";

  .navbar {
    @include flex-center;
    background-image: grad(navbar);
    display: flex;
    height: 4rem;
  }
  .navbar-container {
    @include flex-row;
    align-items: center;
    justify-content: space-between;
    max-width: $max-width;
    padding: {
      left: 4rem;
      right: 2.5rem;
    }
    width: 100%;
  }
  .navbar__left,
  .navbar__right {
    @include flex-row;
    align-items: center;
    justify-content: space-between;
  }
  .navbar__title {
    @include flex-row;
    @include flex-center;
    color: color(white);
    letter-spacing: -0.9px;
    text-decoration: none;
    img { margin-top: .5rem; }
  }
  .navbar__links {
    @include flex-row;
    align-items: center;
  }
  .navbar__link {
    @include flex-row;
    @include flex-center;
    color: color(white);
    font: {
      size: .9rem;
      weight: 500;
    }
    margin-right: 2.35rem;
    text-decoration: none;
    img { margin-left: .5rem; }
    &:last-child { margin-right: 0; }
  }
</style>
