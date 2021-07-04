<template>
  <main>
    <section id="create-activity">
      <b-container>
        <b-row>
          <b-col cols="12" class="mt-5">
            <b-row>
              <i class='far fa-clock mr-2 icon-title'></i>
              <b-col>
                <h3 class="font-weight-bold">Activity Title</h3> 
                <p>in Day 1, Jogja Trip</p>
                <p><i class='far fa-clock mr-2'></i>12:00 PM - 02:00 PM</p>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" class="mt-3 activity-info">
            <b-row>
              <i class='far fa-clock mr-2 icon-title'></i>
              <b-col>
                <h4>Description</h4> 
                <p>Add a little more description about the activity.</p>
              </b-col>
            </b-row>
            <b-row>
              <i class='far fa-clock mr-2 icon-title'></i>
              <b-col>
                <h4>Destination</h4> 
                <nuxt-link>
                  <b-card no-body class="mt-2 mb-5">
                    <b-row no-gutters>
                      <b-col sm="12" md="3" class="img-display-card" :style="{ backgroundImage: 'url(' + require('@/assets/img/destinations/1.jpg') + ')'}"></b-col>
                      <b-col sm="12" md="9">
                        <b-card-body>
                          <b-row>
                            <b-col sm="12" md="8">
                              <h5 class="mb-1 text-black">
                                Test
                              </h5>
                              <div class="itinerary-information">
                                <div>
                                  <i class="fa fa-repeat fa-flip-horizontal" aria-hidden="true"></i>
                                  <span>
                                    Test
                                  </span>
                                </div>
                                <div>
                                  <i class="fa fa-bus" aria-hidden="true"></i>
                                  <span>
                                    Test
                                  </span>
                                </div>
                              </div>
                              <div class="itinerary-information">
                                <span class="tags bg-primary mr-0">
                                  <i class="fa fa-shield-alt" aria-hidden="true"></i>
                                  Approved
                                </span>
                                <span v-for="(tag, index) in tags" :key="index" class="tags">
                                  Test
                                </span>
                              </div>
                              <p class="text-description mt-2">
                                Test
                              </p>
                            </b-col>
                            <b-col sm="12" md="4" class="my-2 my-md-auto text-md-right">
                              <small>Created by</small>
                              <p class="mb-0">
                                Test
                              </p>
                              <p class="my-1 text-primary font-weight-bold">
                                <i class="fa fa-star trusted-icon" aria-hidden="true"></i>
                                Trusted Traveller
                              </p>
                            </b-col>
                          </b-row>
                        </b-card-body>
                      </b-col>
                    </b-row>
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