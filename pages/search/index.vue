<template>
  <main>
    <!-- <template v-if="isFetched">
      <template v-if="itineraryDetail"> -->
        <section id="header">
          <b-container>
            <b-row class="row-header">
              <b-col cols="12" class="mt-auto mb-md-auto">
                <h1 class="font-weight-bold mb-3">
                    Found 3 Itineraries
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
                                        <li><b-form-checkbox id="checkbox-0" v-model="status" name="checkbox-0" value="accepted" unchecked-value="not_accepted">Low Budget</b-form-checkbox></li>
                                        <li><li><b-form-checkbox id="checkbox-1" v-model="status" name="checkbox-1" value="accepted" unchecked-value="not_accepted">Instagrammable</b-form-checkbox></li>
                                        <li><li><b-form-checkbox id="checkbox-2" v-model="status" name="checkbox-2" value="accepted" unchecked-value="not_accepted">Outdoor</b-form-checkbox></li>
                                        <li><li><b-form-checkbox id="checkbox-3" v-model="status" name="checkbox-3" value="accepted" unchecked-value="not_accepted">Healing</b-form-checkbox></li>
                                        <li><li><b-form-checkbox id="checkbox-4" v-model="status" name="checkbox-4" value="accepted" unchecked-value="not_accepted">Cultural</b-form-checkbox></li>
                                        <li><li><b-form-checkbox id="checkbox-5" v-model="status" name="checkbox-5" value="accepted" unchecked-value="not_accepted">Nature</b-form-checkbox></li>
                                        <li><li><b-form-checkbox id="checkbox-6" v-model="status" name="checkbox-6" value="accepted" unchecked-value="not_accepted">Trending</b-form-checkbox></li>
                                        <li><li><b-form-checkbox id="checkbox-7" v-model="status" name="checkbox-7" value="accepted" unchecked-value="not_accepted">Staycation</b-form-checkbox></li>
                                        <li><li><b-form-checkbox id="checkbox-8" v-model="status" name="checkbox-8" value="accepted" unchecked-value="not_accepted">Eco-friendly</b-form-checkbox></li>

                                    </ul>
                                </b-card>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-form>
              </b-col>
              <b-col sm="12" md="9" v-if="popularItineraries">
                <b-row class="align-items-end mb-4">
                    <p class="pl-3 pr-3">Sort by</p>
                    <b-button class="btn-sort mx-2">Most Popular</b-button>
                    <b-button class="btn-sort mx-2">Highest Rating</b-button>
                    <b-button class="btn-sort mx-2">Most Saved</b-button>
                    <b-button class="btn-sort mx-2">Newest</b-button>
                </b-row>
                <nuxt-link v-for="(popular, index) in popularItineraries" :key="index" :to="`/itinerary/${popular.itinId}`">
                    <b-card bg-variant="primary-light" no-body class="mt-2 mb-4">
                        <b-row no-gutters>
                        <b-card-body>
                        <b-row>
                            <b-col sm="12" md="8">
                            <h5 class="mb-1 text-black">
                                {{ popular.name }}
                            </h5>
                            <div class="itinerary-information">
                                <div>
                                <i class="fa fa-repeat fa-flip-horizontal" aria-hidden="true"></i>
                                <span>
                                    {{ (popular.totalDay > 1) ? `${popular.totalDay} days` : "1 day" }}
                                </span>
                                </div>
                                <div>
                                <i class="fa fa-bus" aria-hidden="true"></i>
                                <span>
                                    {{ (countItineraryDestination(popular.itemPerDay) > 1) ? `${countItineraryDestination(popular.itemPerDay)} stops` : "1 stop" }}
                                </span>
                                </div>
                            </div>
                            <div class="itinerary-information">
                                <span class="tags bg-primary mr-0">
                                <i class="fa fa-shield-alt" aria-hidden="true"></i>
                                Approved
                                </span>
                                <span v-for="(tag, index) in popular.tags" :key="index" class="tags">
                                {{ tag | capitalizeFirstLetterOfEachWord() }}
                                </span>
                            </div>
                            <p class="text-description mt-2">
                                {{ popular.desc }}
                            </p>
                            </b-col>
                            <b-col sm="12" md="4" class="my-2 my-md-auto text-md-right">
                            <small>Created by</small>
                            <p class="mb-0">
                                {{ popular.contactPerson }}
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
      <!-- </template>
    </template> -->
  </main>
</template>

<script>
  import { Hooper, Slide, Pagination as HooperPagination } from "hooper";
  import "hooper/dist/hooper.css";

  export default {
    components: {
      Hooper,
      Slide,
      HooperPagination
    },

    computed: {
      popularItineraries() {
        return this.$store.state.itinerary.popularItineraries;
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
        intros: [
          { title: "Plan", description: "With our database, we'll help you plan your best staycation" },
          { title: "Browse", description: "Find the most intriguing staycation with our smart filter." },
          { title: "Budgeting", description: "All your activities cost will be calculated automatically." },
        ],
        categories: [
          { title: "Outdoor", imgURL: require("~/assets/img/categories/1.jpg"), url: "/?page=category" },
          { title: "Healing", imgURL: require("~/assets/img/categories/2.jpg"), url: "/?page=category" },
          { title: "Cultural", imgURL: require("~/assets/img/categories/3.jpg"), url: "/?page=category" },
          { title: "Nature", imgURL: require("~/assets/img/categories/4.jpg"), url: "/?page=category" },
          { title: "Trending Places", imgURL: require("~/assets/img/categories/5.jpg"), url: "/?page=category" },
          { title: "See More", imgURL: require("~/assets/img/categories/6.jpg"), url: "/?page=category" }
        ],
        hooperSettings: {
          breakpoints: {
            640: {
              itemsToShow: 2
            },
            320: {
              itemsToShow: 1
            }
          },
          autoPlay: true,
          centerMode: true,
          infiniteScroll: true,
          transition: 500
        },
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

      setNavbarOnScroll() {
        window.onscroll = () => {
          if (document.body.scrollTop > 15 || document.documentElement.scrollTop > 15) {
            document.querySelector(".navbar").classList.remove("transparent");
          } else {
            document.querySelector(".navbar").classList.add("transparent");
          }
        }
      },

      slideNext(carousel) {
        this.$refs[carousel].slideNext();
      },

      slidePrev(carousel) {
        this.$refs[carousel].slidePrev();
      },

      onSubmit() {
        // TODO Search itinerary
        console.log("Search")
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
      this.$store.dispatch("location/getAllLocations");
    }
  }
</script>

<style lang="scss">
  #header {
    .container, .row-header {
      align-content: flex-end;
    }

    @media (max-width: 768px) {
      min-height: 100vh;
    }
  }
</style>