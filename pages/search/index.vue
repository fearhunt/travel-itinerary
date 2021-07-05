<template>
  <main>
    <section id="header">
      <b-container>
        <b-row class="row-header">
          <b-col cols="12" class="mt-auto mb-md-auto">
            <h1 class="font-weight-bold mb-3" v-if="reviewedItineraries">
              Found {{ reviewedItineraries.length }} Itineraries
            </h1>
          </b-col>
          <b-col sm="12" md="3">
            <b-form @submit.prevent="onSubmit()" v-if="locations">
              <b-row>
                <b-col cols="12">
                  <b-form-group label="Location" label-for="location">
                    <b-form-select id="location" v-model="form.location" :options="locationOptions" required></b-form-select>
                  </b-form-group>
                  <b-form-group label="Duration" label-for="duration" class="my-2">
                    <b-form-select id="duration" v-model="form.duration" :options="durationOptions" required></b-form-select>
                  </b-form-group>
                  <b-form-group label="Tags" label-for="tags">
                    <b-card bg-variant="primary-bordered">
                      <ul class="filter-tags">
                        <li><b-form-checkbox id="checkbox-0" name="checkbox-0" value="accepted" unchecked-value="not_accepted">Low Budget</b-form-checkbox></li>
                        <li><li><b-form-checkbox id="checkbox-1" name="checkbox-1" value="accepted" unchecked-value="not_accepted">Instagrammable</b-form-checkbox></li>
                        <li><li><b-form-checkbox id="checkbox-2" name="checkbox-2" value="accepted" unchecked-value="not_accepted">Outdoor</b-form-checkbox></li>
                        <li><li><b-form-checkbox id="checkbox-3" name="checkbox-3" value="accepted" unchecked-value="not_accepted">Healing</b-form-checkbox></li>
                        <li><li><b-form-checkbox id="checkbox-4" name="checkbox-4" value="accepted" unchecked-value="not_accepted">Cultural</b-form-checkbox></li>
                        <li><li><b-form-checkbox id="checkbox-5" name="checkbox-5" value="accepted" unchecked-value="not_accepted">Nature</b-form-checkbox></li>
                        <li><li><b-form-checkbox id="checkbox-6" name="checkbox-6" value="accepted" unchecked-value="not_accepted">Trending</b-form-checkbox></li>
                        <li><li><b-form-checkbox id="checkbox-7" name="checkbox-7" value="accepted" unchecked-value="not_accepted">Staycation</b-form-checkbox></li>
                        <li><li><b-form-checkbox id="checkbox-8" name="checkbox-8" value="accepted" unchecked-value="not_accepted">Eco-friendly</b-form-checkbox></li>
                      </ul>
                    </b-card>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-form>
          </b-col>
          <b-col sm="12" md="9" v-if="reviewedItineraries">
            <b-row class="align-items-end mb-4">
              <p class="pl-3 pr-3">Sort by</p>
              <b-button class="btn-sort mx-2">Most Popular</b-button>
              <b-button class="btn-sort mx-2">Highest Rating</b-button>
              <b-button class="btn-sort mx-2">Most Saved</b-button>
              <b-button class="btn-sort mx-2">Newest</b-button>
            </b-row>
            <nuxt-link v-for="(reviewed, index) in reviewedItineraries" :key="index" :to="`/itinerary/${reviewed.itinId}`">
              <b-card bg-variant="primary-light" no-body class="mt-2 mb-4">
                <b-row no-gutters>
                  <b-card-body>
                    <b-row>
                      <b-col sm="12" md="8">
                        <h5 class="mb-1 text-black">
                          {{ reviewed.name }}
                        </h5>
                        <div class="itinerary-information">
                          <div>
                            <i class="fa fa-repeat fa-flip-horizontal" aria-hidden="true"></i>
                            <span>
                                {{ (reviewed.totalDay > 1) ? `${reviewed.totalDay} days` : "1 day" }}
                            </span>
                          </div>
                          <div>
                            <i class="fa fa-bus" aria-hidden="true"></i>
                            <span>
                                {{ (countItineraryDestination(reviewed.itemPerDay) > 1) ? `${countItineraryDestination(reviewed.itemPerDay)} stops` : "1 stop" }}
                            </span>
                          </div>
                        </div>
                        <div class="itinerary-information">
                          <span class="tags bg-primary mr-0">
                          <i class="fa fa-shield-alt" aria-hidden="true"></i>
                          Approved
                          </span>
                          <span v-for="(tag, index) in reviewed.tags" :key="index" class="tags">
                          {{ tag | capitalizeFirstLetterOfEachWord() }}
                          </span>
                        </div>
                        <p class="text-description mt-2">
                          {{ reviewed.desc }}
                        </p>
                      </b-col>
                      <b-col sm="12" md="4" class="my-2 my-md-auto text-md-right">
                        <small>Created by</small>
                        <p class="mb-0">
                          {{ reviewed.contactPerson }}
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
          </b-col>
        </b-row>
      </b-container>
    </section>
  </main>
</template>

<script>
  export default {
    computed: {
      reviewedItineraries() {
        return this.$store.state.itinerary.reviewedItineraries;
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
        form: {
          location: "",
          duration: ""
        },
        durationOptions: [
          { value: "1", text: "1 Day 1 Night" },
          { value: "2", text: "2 Day 1 Night" },
          { value: "3", text: "2 Day 2 Night" },
          { value: "4", text: "3 Day 1 Night" },
          { value: "5", text: "3 Day 2 Night" },
        ],
      }
    },

    methods: {
      countItineraryDestination(itineraryDestinations) {
        let destinations = 0;

        itineraryDestinations.forEach(destination => {
          destinations += (destination.item).length;
        });

        return destinations;
      },

      onSubmit() {
        // TODO Search itinerary
        console.log("Search")
      }
    },

    mounted() {
      this.$store.dispatch("itinerary/getAllItineraries")
        .then(() => {
          this.$store.dispatch("itinerary/getAllReviewedItineraries");
        });
      this.$store.dispatch("location/getAllLocations");
    }
  }
</script>

<style lang="scss">

</style>