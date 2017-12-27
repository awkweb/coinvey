<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar__left">
        <router-link
          :to="{ name: 'Home' }"
          class="navbar__tile"
        >
          Coinvey
        </router-link>
      </div>

      <div class="navbar__right">
        <div class="navbar__links">
          <router-link
            :to="{ name: 'Home' }"
            class="navbar__link"
          >
            How It Works
          </router-link>

          <router-link
            :to="{ name: 'Home' }"
            class="navbar__link"
          >
            Contact Us
          </router-link>

          <router-link
            :to="{ name: 'Home' }"
            class="navbar__link"
          >
            Share
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

  .navbar {
    align-items: center;
    background-image: grad(navbar);
    display: flex;
    height: 4rem;
    justify-content: center;
  }
  .navbar-container {
    align-items: center;
    display: flex;
    justify-content: space-between;
    max-width: $max-width;
    padding: {
      left: 2.5rem;
      right: 2.5rem;
    }
    width: 100%;
  }
  .navbar__left,
  .navbar__right {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
  .navbar__tile {
    color: color(white);
    font: {
      size: 2rem;
      weight: 600;
    }
    letter-spacing: -0.9px;
    text-decoration: none;
  }
  .navbar__links {
    align-items: center;
    display: flex;
  }
  .navbar__link {
    color: color(white);
    font: {
      size: .9rem;
      weight: 600;
    }
    margin-right: 2rem;
    text-decoration: none;

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      text-decoration: underline;
    }
  }
</style>
