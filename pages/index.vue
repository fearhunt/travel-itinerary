<template>
  <main>
    <section id="jumbotron">
      <b-container>
        <b-row>
          <b-col sm="12" md="6" class="mt-auto mb-md-auto">
            <h1>
              Find your <span class="font-weight-bold">Best <br>
              Vacation Itinerary</span><br>
              With Us.
            </h1>
            <p><span style="font-weight: bold; font-size: 2rem">*</span>Click here for more information about covid regulation</p>
          </b-col>
          <b-col sm="12" md="6" class="mt-md-auto mb-auto">
            <b-card>
              <nuxt-link to="/" class="btn btn-primary float-right">Go StayCation</nuxt-link>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section id="intro">
      <b-container>
        <b-row>
          <b-col cols="12" class="mb-4">
            <h1 class="text-title">With Us, You're Safe</h1>
            <p>In the COVID-19 pandemic, we’re making sure to help you plan the safest vacation.</p>
          </b-col>
          <b-col v-for="(intro, index) in intros" :key="index" sm="12" md="4" class="my-2">
            <b-card>
              <b-row>
                <b-col cols="3" class="my-auto">
                  <h2 class="intro-index text-center">
                    {{ index + 1 }}
                  </h2>
                </b-col>
                <b-col cols="9">
                  <h5 class="font-weight-bold mb-1">
                    {{ intro.title }}
                  </h5>
                  <p class="text-description">
                    {{ intro.description }}
                  </p>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section id="attention">
      <b-container>
        <b-row>
          <b-col cols="12" class="mb-4">
            <h1 class="text-title">Feeling for a Staycation? We got you!</h1>
          </b-col>
          <b-col cols="12">
            <b-card bg-variant="primary-light">
              
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section id="popular">
      <b-container>
        <b-row>
          <b-col cols="12" class="mb-4">
            <h1 class="text-title">Most Popular Itinerary</h1>
          </b-col>
          <b-col cols="12" v-if="popularItineraries">
            <b-card v-for="(popular, index) in popularItineraries" :key="index" class="mt-2 mb-5">

            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section id="benefit">
      <b-container>
        <b-row>
          <b-col sm="12" md="5" class="mb-4">
            <h1 class="text-title">Share your itinerary, and get promos</h1>
            <p class="text-description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex provident quod placeat accusamus dolore vel cupiditate, totam velit voluptate sed, at maiores ipsa fugiat voluptatum, quas laboriosam? Aliquam, accusantium dolorum!
            </p>
          </b-col>
          <b-col sm="12" md="7" class="my-auto">
            <b-card bg-variant="primary" style="height: 300px">

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
  #jumbotron {
    background: url("~/assets/img/jumbotron.png");
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
    margin: 0;
    padding: 0;
    color: white;

    .container, .row {
      height: 100vh;
    }

    @media (max-width: 768px) {
      min-height: 100vh;
    }
  }
</style>