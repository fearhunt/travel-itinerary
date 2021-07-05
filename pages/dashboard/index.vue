<template>
  <main>
    <section id="header">
      <b-container>
        <b-row>
          <b-col>
            <b-card no-body>
              <b-row no-gutters>
                <b-col cols="12" class="img-display-card" :style="{ backgroundImage: `url(${require('~/assets/img/jumbotron.png')})`, minHeight: '12rem' }"></b-col>
                <b-col cols="12">
                  <b-card-body>
                    <h3>
                      Adimas Cipta
                    </h3>
                    <p class="my-1 text-primary font-weight-bold">
                      <i class="fa fa-star trusted-icon" aria-hidden="true"></i>
                      Trusted Traveller
                    </p>
                    <small class="my-1">
                      Travellling is my passion. I’ve been to 100+ countries and eager to explore more. I want to share my experiences with you, so I’ll write as much itinerary as I can.
                    </small>
                  </b-card-body>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </section>
    
    <section id="content">
      <b-container>
        <b-row class="row-header">
          <b-col sm="12" md="3">
            <b-card bg-variant="secondary" style="opacity: 0.4">
              User Rating
            </b-card>
          </b-col>
          <b-col sm="12" md="9">
            <div class="d-flex justify-content-between">
              <h4>
                Itinerary List
              </h4>
              <nuxt-link to="/dashboard/create-itinerary" class="btn btn-primary">
                <i class="fa fa-plus-circle mr-1"></i>
                Add Itinerary
              </nuxt-link>
            </div>
            <div v-if="unreviewedItineraries.length">
              <nuxt-link v-for="(unreviewed, index) in unreviewedItineraries" :key="index" :to="`/itinerary/${unreviewed.itinId}`">
                <b-card bg-variant="primary-light" no-body class="mt-2 mb-4">
                  <b-row no-gutters>
                    <b-card-body>
                      <b-row>
                        <b-col sm="12" md="8">
                          <h5 class="mb-1 text-black">
                            {{ unreviewed.name }}
                          </h5>
                          <div class="itinerary-information">
                            <div>
                              <i class="fa fa-repeat fa-flip-horizontal" aria-hidden="true"></i>
                              <span>
                                  {{ (unreviewed.totalDay > 1) ? `${unreviewed.totalDay} days` : "1 day" }}
                              </span>
                            </div>
                            <div>
                              <i class="fa fa-bus" aria-hidden="true"></i>
                              <span>
                                  {{ (countItineraryDestination(unreviewed.itemPerDay) > 1) ? `${countItineraryDestination(unreviewed.itemPerDay)} stops` : "1 stop" }}
                              </span>
                            </div>
                          </div>
                          <div class="itinerary-information">
                            <span class="tags bg-primary mr-0">
                            <i class="fa fa-shield-alt" aria-hidden="true"></i>
                            Approved
                            </span>
                            <span v-for="(tag, index) in unreviewed.tags" :key="index" class="tags">
                            {{ tag | capitalizeFirstLetterOfEachWord() }}
                            </span>
                          </div>
                          <p class="text-description mt-2">
                            {{ unreviewed.desc }}
                          </p>
                        </b-col>
                        <b-col sm="12" md="4" class="my-2 my-md-auto text-md-right">
                          <small>Created by</small>
                          <p class="mb-0">
                            {{ unreviewed.contactPerson }}
                          </p>
                          <p class="my-1 text-primary font-weight-bold">
                            <i class="fa fa-star trusted-icon" aria-hidden="true"></i>
                            Trusted Traveller
                          </p>
                        </b-col>
                      </b-row>
                    </b-card-body>
                  </b-row>
                </b-card>
              </nuxt-link>
            </div>
            <div v-else>
              <p class="text-center my-4">
                Currently no itinerary made.
              </p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </main>
</template>

<script>
  export default {
    computed: {
      unreviewedItineraries() {
        return this.$store.state.itinerary.unreviewedItineraries;
      },

      locations() {
        return this.$store.state.location.locations;
      },

      locationOptions() {
        const options = [];

        (this.locations).forEach(location => {
          options.push({
            value: location.id,
            text: location.name
          });
        });

        return options;
      }
    },

    data() {
      return {

      }
    },

    methods: {
      countItineraryDestination(itineraryDestinations) {
        let destinations = 0;

        itineraryDestinations.forEach(destination => {
          destinations += (destination.item).length;
        });

        return destinations;
      }
    },

    mounted() {
      this.$store.dispatch("itinerary/getAllItineraries")
        .then(() => {
          this.$store.dispatch("itinerary/getAllUnreviewedItineraries");
        });
      this.$store.dispatch("location/getAllLocations");
    }
  }
</script>

<style lang="scss">

</style>