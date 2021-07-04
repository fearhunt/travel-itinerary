<template>
  <main>
    <section id="jumbotron">
      <b-container>
        <b-row>
          <b-col sm="12" md="6" class="mt-auto mb-md-auto">
            <h1>
              Find Your Best<br>
              <span class="font-weight-bold">Vacation Itinerary</span> <br>
              With Us.
            </h1>
            <p>
              <span class="font-weight-bold">*</span>
              Click here for more information about COVID-19 regulation
            </p>
          </b-col>
          <b-col sm="12" md="6" class="mt-md-auto mb-auto">
            <b-card>
              <b-form @submit.prevent="onSubmit()" v-if="locations">
                <b-row>
                  <b-col cols="12">
                    <b-form-group label="Location" label-for="location">
                      <b-form-select id="location" v-model="form.location" :options="locationOptions" required></b-form-select>
                    </b-form-group>
                    <b-form-group label="Duration" label-for="duration" class="my-2">
                      <b-form-select id="duration" v-model="form.duration" :options="durationOptions" required></b-form-select>
                    </b-form-group>
                  </b-col>
                  <b-col cols="12" class="mt-4">
                    <b-button type="submit" class="btn btn-secondary float-right">Search Itinerary</b-button>
                  </b-col>
                </b-row>
              </b-form>
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
                  <h2 class="intro-index text-center" :class="((index % 2) == 1) ? 'text-red' : ''">
                    {{ index + 1 }}
                  </h2>
                </b-col>
                <b-col cols="9" class="my-auto">
                  <h5 class="font-weight-bold mb-1 text-black">
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
            <h1 class="text-title">Feeling for a staycation? We got you!</h1>
          </b-col>
          <b-col cols="12">
            <b-card no-body bg-variant="primary-light">
              <b-row>
                <b-col sm="12" md="3" class="img-display-card" :style="{ backgroundImage: `url(${require('~/assets/img/attention/holder.png')})` }"></b-col>
                <b-col sm="12" md="9" v-if="locations">
                  <b-card-body class="px-0 px-md-4">
                    <b-button @click.prevent="slidePrev('carousel-locations')" variant="round" class="btn-slider left">
                      <i class="fa fa-arrow-left" aria-hidden="true"></i>
                    </b-button>
                    <b-button @click.prevent="slideNext('carousel-locations')" variant="round" class="btn-slider right">
                      <i class="fa fa-arrow-right" aria-hidden="true"></i>
                    </b-button>
                    <hooper ref="carousel-locations" :settings="hooperSettings" class="h-100 my-0 px-0">
                      <slide v-for="(location, index) in locations" :key="index" class="mx-3 mb-4">
                        <b-card no-body>
                          <b-row no-gutters>
                            <b-col cols="12" class="img-display-card" :style="{ backgroundImage: `url(${$axios.defaults.baseURL + 'images/' + location.imagePath || require('~/assets/img/attention/location.png')})`, minHeight: '12rem' }"></b-col>
                            <b-col cols="12" class="px-0">
                              <b-card-body>
                                <h5>
                                  {{ location.name }}
                                </h5>
                                <p class="text-description">
                                  {{ location.desc }}
                                </p>
                              </b-card-body>
                            </b-col>
                          </b-row>
                        </b-card>
                      </slide>
                      <hooper-pagination slot="hooper-addons"></hooper-pagination>
                    </hooper>
                  </b-card-body>
                </b-col>
              </b-row>
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
            <nuxt-link v-for="(popular, index) in popularItineraries" :key="index" :to="`/itinerary/${popular.itinId}`">
              <b-card no-body class="mt-2" :class="(index < (popularItineraries.length - 1)) ? 'mb-5' : ''">
                <b-row no-gutters>
                  <b-col sm="12" md="3" class="img-display-card" :style="{ backgroundImage: `url(${$axios.defaults.baseURL + 'images/' + popular.itemPerDay[0].item[0].destinationId.imagePath || require('~/assets/img/attention/location.png')})` }"></b-col>
                  <b-col sm="12" md="9">
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
                            <span v-for="(tag, index) in tags" :key="index" class="tags">
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
                  </b-col>
                </b-row>
              </b-card>
            </nuxt-link>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section id="categories">
      <b-container>
        <b-row>
          <b-col cols="12">
            <h1 class="text-title">Browse our itinerary categories</h1>
          </b-col>
          <b-col cols="12">
            <b-card bg-variant="primary-light">
              <b-row>
                <b-col v-for="(category, index) in categories" :key="index" cols="6" class="my-2">
                  <nuxt-link :to="category.url">
                    <b-card overlay :img-src="category.imgURL">
                      <h3 class="text-white category-title">
                        {{ category.title }}
                      </h3>
                    </b-card>
                  </nuxt-link>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section id="benefit" class="bg-primary-light mb-0">
      <b-container>
        <b-row>
          <b-col sm="12" md="5" class="mb-4 my-md-auto">
            <h1 class="text-title">Share your itinerary, and get promos!</h1>
            <p class="text-description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex provident quod placeat accusamus dolore vel cupiditate, totam velit voluptate sed, at maiores ipsa fugiat voluptatum, quas laboriosam? Aliquam, accusantium dolorum!
            </p>
            <nuxt-link to="/?page=login" class="btn btn-primary my-4">Start Making Itinerary</nuxt-link>
          </b-col>
          <b-col sm="12" md="7" class="my-auto d-sm-none d-md-block">
            <b-img :src="require('~/assets/img/benefit.png')" fluid rounded></b-img>
          </b-col>
        </b-row>
      </b-container>
    </section>
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
          { title: "It's easy", description: "With Itin, we've make it easier for you to just GO." },
          { title: "It's safe", description: "I don't know how, but we will make sure it is." },
          { title: "It's fun", description: " We all need vacation, bruh." },
        ],
        categories: [
          { title: "Outdoor", imgURL: require("~/assets/img/categories/1.jpg"), url: "/?page=category" },
          { title: "Healing", imgURL: require("~/assets/img/categories/2.jpg"), url: "/?page=category" },
          { title: "Cultural", imgURL: require("~/assets/img/categories/3.jpg"), url: "/?page=category" },
          { title: "Nature", imgURL: require("~/assets/img/categories/4.jpg"), url: "/?page=category" },
          { title: "Trending Places", imgURL: require("~/assets/img/categories/5.jpg"), url: "/?page=category" },
          { title: "See More", imgURL: require("~/assets/img/categories/6.jpg"), url: "/?page=category" }
        ],
        // TODO Fetch from API
        tags: [
          "staycation",
          "historical"
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
  #jumbotron {
    background: url("~/assets/img/jumbotron.png");
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
    margin: 0;
    padding: 0;
    color: white;

    .container, .row {
      height: 100%;
    }

    @media (max-width: 768px) {
      min-height: 100vh;
    }
  }

  #categories {
    .category-title {
      position: absolute;
      bottom: 1rem;

      @media (max-width: 768px) {
        font-size: 0.7rem;
        text-align: center;
      }
    }
  }
</style>