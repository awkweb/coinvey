<template>
  <div class="home-index">
    <header class="home__intro">
      <h1 class="home__intro-title">Send Bitcoin as a gift.</h1>

      <div class="home__intro-description">
        With Coinvey, sending cryptocurrency has never been easier. Any occasion, Anytime.
      </div>

      <router-link
        :to="{ name: 'HomeHow' }"
        class="home__intro-button"
      >
        <span>How It Works</span>
      </router-link>
    </header>

    <div class="home__content">
      <h2 class="home__content-title">Convey your Gratitude, with Coinvey.</h2>
      <div class="home__content-description">(see what we did there)</div>
      <div class="home__content-reasons">
        <div class="home__content-reason">
          <img
            class="home__content-reason-image"
            src="../../assets/illustrations/list.svg"
          >
          <div class="home__content-reason-text">Great for Moms, Brothers, Sisters, Grandmas, Frienemies, Pen Pals, anyone who loves gifts.</div>
        </div>

        <div class="home__content-reason">
          <img
            class="home__content-reason-image"
            src="../../assets/illustrations/cal.svg"
          >
          <div class="home__content-reason-text">Perfect for any occasion. Birthdays, Thank You’s, Holidays, Bar Mitzvahs, Ba Mitzvahs, National Hot Dog Day etc.</div>
        </div>

        <div class="home__content-reason">
          <img
            class="home__content-reason-image"
            src="../../assets/illustrations/pbj.svg"
          >
          <div class="home__content-reason-text">Show the Fam you’re with it, give the gift of cryptocurrency …the gift that keeps on giving (like PB&J).</div>
        </div>
      </div>
      <div class="home__content-faq">
        Still have a question? Check out our <router-link :to="{ name: 'HomeFaq' }">FAQ</router-link>.
      </div>
    </div>

    <footer class="home__footer">
      <h2 class="home__footer-title">Just like you, we thought <span>gifting bitcoin was too hard.</span></h2>
      <img
        class="home__footer-image"
        src="../../assets/illustrations/us.svg"
      >
      <div class="home__footer-description">We’re a group of seasoned tech entrepreneurs who wanted to provide everyone the ability to effortlessly and securely gift cryptocurrency. That’s why we created Coinvey.</div>
      <div class="home__footer-contact">
        Still need help? Contact us <router-link :to="{ name: 'HomeIndex' }">here</router-link>.
      </div>

      <ul class="home__footer-list">
        <li class="home__footer-list-item">Made with love in NYC</li>
        <li class="home__footer-list-item"><router-link :to="{ name: 'HomeIndex' }">Terms & Conditions</router-link></li>
        <li class="home__footer-list-item">©Coinvey 2018</li>
      </ul>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'HomeIndex',
  };
</script>

<style lang="scss" scoped>
  @import "../../styles/_variables.scss";
  @import "../../styles/_functions.scss";
  @import "../../styles/_mixins.scss";

  .home-index {
    max-width: 47rem;
  }
  .home__intro {
    background: {
      image: url('../../assets/illustrations/send.svg');
      position: right 4rem bottom 1.5rem;
      repeat: no-repeat;
    }
    margin-bottom: 8rem;
    min-height: 100vh;
    padding: {
      left: 5rem;
      right: 4rem;
      top: 9.5rem;
    }
  }
  .home__intro-title {
    color: color(white);
    font-size: 3.05rem;
    letter-spacing: -1.5px;
    margin: {
      bottom: .95rem;
      top: 0;
    }
  }
  .home__intro-description {
    color: color(white);
    font: {
      size: 1.11rem;
      weight: 300;
    }
    line-height: 1.9;
    margin-bottom: 4rem;
    max-width: 33rem;
  }
  .home__intro-button {
    @include button;
    @include flex-row;
    @include flex-center;
    background-image: grad(button);
    border: {
      radius: 7px;
      width: 0;
    }
    color: color(white);
    font: {
      size: 1.05rem;
      weight: 500;
    }
    min-height: 3.4rem;
    text-decoration: none;
    transition: transform .25s;
    width: 240px;

    &:hover { transform: translateY(-5px); }
    &:active { transform: translateY(1px); }
  }
  .home__content {
    min-height: 100vh;
    padding: {
      left: 3rem;
      right: 3rem;
    }
  }
  .home__content-title {
    color: color(white);
    font-size: 40px;
    letter-spacing: -0.8px;
    margin: 0;
    text-align: center;
  }
  .home__content-description {
    color: color(gray, dark);
    font: {
      size: .66rem;
      weight: 300;
    }
    letter-spacing: 0.1px;
    line-height: 2.67;
    margin-bottom: 4.25rem;
    text-align: center;
  }
  .home__content-reasons {
    @include flex-row;
    justify-content: space-between;
    margin-bottom: 4.25rem;
  }
  .home__content-reason {
    @include flex-column;
    align-items: center;
    max-width: 200px;

    &:hover {
      .home__content-reason-image {
        transform: scale(1.1);
      }
    }
  }
  .home__content-reason-image {
    margin-bottom: 1.25rem;
    transition: {
      property: transform;
      duration: .25s;
    }
  }
  .home__content-reason-text {
    color: color(gray);
    font: {
      size: .83rem;
      weight: 300;
    }
    line-height: 1.73;
    text-align: center;
  }
  .home__content-faq,
  .home__footer-contact {
    color: color(gray);
    font: {
      size: 1rem;
      weight: 300;
    }
    letter-spacing: 0.1px;
    line-height: 1.78;
    text-align: center;

    a {
      color: color(gray);
      font-weight: bold;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
  .home__footer-contact {
    margin-bottom: 1.4rem;
  }
  .home__footer {
    @include flex-column;
    align-items: center;
    padding: {
      left: 4rem;
      right: 4rem;
    }
  }
  .home__footer-title {
    color: color(white);
    font-size: 2.6rem;
    letter-spacing: -1px;
    margin: {
      bottom: 3.1rem;
      top: 0;
    }
    text-align: center;

    span { color: color(purple); }
  }
  .home__footer-image {
    margin-bottom: 1rem;
  }
  .home__footer-description {
    color: color(gray);
    font: {
      size: .83rem;
      weight: 300;
    }
    line-height: 1.73;
    margin-bottom: 4rem;
    max-width: 24rem;
    text-align: center;
  }
  .home__footer-list {
    @include flex-row;
    list-style-type: none;
    margin: {
      bottom: 4.25rem;
      top: 0;
    }
    padding: 0;
  }
  .home__footer-list-item {
    color: color(gray, dark);
    font: {
      size: .75rem;
      weight: 300;
    }
    letter-spacing: 0.1px;
    line-height: 2.67;

    &::after {
      content: '•';
      margin: {
        left: .75rem;
        right: .75rem;
      }
    }

    &:last-child {
      &:after { display: none; }
    }

    a {
      text-decoration: none;
      &:hover { text-decoration: underline; }
      &:visited { color: color(gray, dark); }
    }
  }
</style>
