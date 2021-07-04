<template>
  <main>
    <section id="header">
      <b-container>
        <b-row class="row-header">
          <b-col sm="12" md="6" class="mt-auto mb-md-auto">
            <h1 class="font-weight-bold big-size">
              Jogja Staycation
            </h1>
            <p class="pr-1">Deskripsi itinerary. Apa yangs seru. Deskripsi itinerary. Apa yangs seru. Deskripsi itinerary. Apa yangs seru. Deskripsi itinerary. Apa yangs seru. Deskripsi itinerary. Apa yangs seru. </p>
            <nuxt-link to="/" class="btn btn-primary btn-like mr-3"><i class='fas fa-heart color-bg-pink'></i>Save</nuxt-link>
            <nuxt-link to="/" class="btn btn-primary btn-like"><i class='fa fa-comments color-bg-blue'></i>Comment</nuxt-link>
          </b-col>
          <b-col sm="12" md="6" class="mt-md-auto mb-auto">
            <b-row class="row-info align-items-baseline">
              <p>128</p><i class='fa fa-comments mr-1 color-blue'></i>
              <p>5,983</p><i class='fas fa-heart mr-1 color-pink'></i>
              <p>4.8</p><i class='fa fa-star mr-1 color-yellow'></i>
            </b-row>
            <b-row class="row-info">
              <p class="pt-3 pr-4 text-right">Created by<br>Adimas Cipta</p>
              <b-img :src="require('~/assets/img/user.jpg')" rounded="circle" style="height:5rem" class="mb-3"></b-img>
            </b-row>
            <b-row class="row-info">
              <nuxt-link to="/" class="btn btn-primary">Book this Itinerary</nuxt-link>
            </b-row>
            
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section id="section-map">
      <b-container>
        <b-row>
          <b-col cols="12">
            <b-card bg-variant="primary-light" style="height:400px" class="align-items-center">
              <b-img :src="require('~/assets/img/map-journey.png')" style="height:370px" class="mb-3"></b-img>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section id="view-itinerary">
      <b-container>
        <b-row>
          <b-col cols="12">
            <b-col cols="12" class="mb-4">
              <h3 class="font-weight-bold">Your Itinerary</h3>
              <p>You can copy and edit this itinerary accordingly</p>
            </b-col>
            <section class="lists-container">
              <div class="list">
                <h3 class="list-title">Day 1</h3>
                <ul class="list-items">
                  <li>
                    <h5>Borobudur</h5>
                    <p>Time: 10.00-13.00</p>
                  </li>
                  <li>
                    <h5>Taman Sari</h5>
                    <p>Time: 10.00-13.00</p>
                  </li>
                  <button class="add-card-btn btn"><i class='fa fa-plus-circle'></i>Add activity</button>
                </ul>
              </div>
              <div class="list">
                <h3 class="list-title">Day 1</h3>
                <ul class="list-items">
                  <li>
                    <h5>Borobudur</h5>
                    <p>Time: 10.00-13.00</p>
                  </li>
                  <li>
                    <h5>Taman Sari</h5>
                    <p>Time: 10.00-13.00</p>
                  </li>
                  <li>
                    <h5>Prambanan</h5>
                    <p>Time: 10.00-13.00</p>
                  </li>
                  <button class="add-card-btn btn"><i class='fa fa-plus-circle'></i>Add activity</button>
                </ul>
              </div>
              <div class="list">
                <h3 class="list-title">Day 1</h3>
                <ul class="list-items">
                  <li>
                    <h5>Borobudur</h5>
                    <p>Time: 10.00-13.00</p>
                  </li>
                  <li>
                    <h5>Taman Sari</h5>
                    <p>Time: 10.00-13.00</p>
                  </li>
                  <li>
                    <h5>Prambanan</h5>
                    <p>Time: 10.00-13.00</p>
                  </li>
                  <button class="add-card-btn btn"><i class='fa fa-plus-circle'></i>Add activity</button>
                </ul>
              </div>
              <div class="list">
                <h3 class="list-title">Day 1</h3>
                <ul class="list-items">
                  <li>
                    <h5>Borobudur</h5>
                    <p>Time: 10.00-13.00</p>
                  </li>
                  <li>
                    <h5>Taman Sari</h5>
                    <p>Time: 10.00-13.00</p>
                  </li>
                  <li>
                    <h5>Prambanan</h5>
                    <p>Time: 10.00-13.00</p>
                  </li>
                  <button class="add-card-btn btn"><i class='fa fa-plus-circle'></i>Add activity</button>
                </ul>
              </div>
            </section>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </main>
</template>

<script>
  export default {
    computed: {
      popularItineraries() {
        return this.$store.state.itinerary.popularItineraries;
      }
    },

    data() {
      return {
        
      }
    },

    methods: {
      setNavbarOnScroll() {
        window.onscroll = () => {
          if (document.body.scrollTop > 15 || document.documentElement.scrollTop > 15) {
            document.querySelector(".navbar").classList.remove("transparent");
          } else {
            document.querySelector(".navbar").classList.add("transparent");
          }
        }
      }
    },

    beforeMount() {
      window.addEventListener("scroll", this.setNavbarOnScroll);
    },

    beforeDestroy() {
      window.removeEventListener("scroll", this.setNavbarOnScroll);
    },

    mounted() {
      this.$store.dispatch("itinerary/getAllItineraries")
        .then(() => {
          this.$store.dispatch("itinerary/getAllPopularItineraries");
        });
    }
  }
</script>

<style lang="scss">
  #header {
    height: 350px;
    margin: 0;
    padding: 0;

    .container, .row-header {
      height: 350px;
      align-content: flex-end;
    }

    @media (max-width: 768px) {
      min-height: 100vh;
    }
  }
</style>