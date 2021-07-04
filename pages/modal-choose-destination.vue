<template>
  <main>
    <section id="choose-destination">
      <b-container>
        <b-row>
          <b-col cols="12" class="mt-5">
            <h3 class="font-weight-bold">Choose Destination</h3> 
            <p>Itinerary Name</p>
          </b-col>
          <b-col cols="12">
            <b-row>
              <b-col v-for="(destination, index) in destinations" :key="index" cols="4" class="my-3">
                <nuxt-link :to="destination.url">
                  <b-card :img-src="destination.imgURL" img-top>
                    <h5>
                      {{ destination.title }}
                    </h5>
                    <p class="text-description">
                      {{ destination.desc }}
                    </p>
                  </b-card>
                </nuxt-link>
              </b-col>
            </b-row>
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
        destinations: [
          { title: "Prambanan", imgURL: require("~/assets/img/destinations/1.jpg"), url: "/?page=destination", desc:"Lorem ipsum dolar sit amet lorem ipsum. Dolar sit amet." },
          { title: "Malioboro", imgURL: require("~/assets/img/destinations/2.jpg"), url: "/?page=destination", desc:"Lorem ipsum dolar sit amet lorem ipsum. Dolar sit amet." },
          { title: "Ratu Boko", imgURL: require("~/assets/img/destinations/3.jpg"), url: "/?page=destination", desc:"Lorem ipsum dolar sit amet lorem ipsum. Dolar sit amet." },
          { title: "Prambanan", imgURL: require("~/assets/img/destinations/4.jpg"), url: "/?page=destination", desc:"Lorem ipsum dolar sit amet lorem ipsum. Dolar sit amet." },
          { title: "Taman Sari", imgURL: require("~/assets/img/destinations/5.jpg"), url: "/?page=destination", desc:"Lorem ipsum dolar sit amet lorem ipsum. Dolar sit amet." },
          { title: "Tebing Breksi", imgURL: require("~/assets/img/destinations/6.jpg"), url: "/?page=destination", desc:"Lorem ipsum dolar sit amet lorem ipsum. Dolar sit amet." }
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
</style>