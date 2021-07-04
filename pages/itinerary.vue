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
        <b-row class="row-map">
          <b-col cols="12">
            <b-card bg-variant="primary-light" style="height:400px; box-shadow:none" class="align-items-center">
              <b-img :src="require('~/assets/img/map-journey.png')" style="height:400px" class="mb-3"></b-img>
            </b-card>
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
        intros: [
          { title: "It's easy", description: "With Itin, we've make it easier for you to just GO." },
          { title: "It's safe", description: "I don't know how, but we will make sure it is." },
          { title: "It's fun", description: " We all need vacation, bruh." },
        ]
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
  // #section-map {
  //   height: 400px;
  //   margin: 0;
  //   padding: 0;

  //   .container, .row-map {
  //     height: 400px;
  //   }

  //   @media (max-width: 768px) {
  //     min-height: 100vh;
  //   }
  // }
</style>