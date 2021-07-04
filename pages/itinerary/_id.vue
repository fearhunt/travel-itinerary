<template>
  <main>
    <template v-if="isFetched">
      <template v-if="itineraryDetail">
        <section id="header">
          <b-container>
            <b-row class="row-header">
              <b-col sm="12" md="6" class="mt-auto mb-md-auto">
                <h1 class="font-weight-bold big-size mb-3">
                  {{ itineraryDetail.name }}
                </h1>
                <p class="pr-1">
                  {{ itineraryDetail.narasi }}
                </p>
                <nuxt-link to="#" class="btn btn-primary btn-like mr-3"><i class='fas fa-heart color-bg-pink'></i>Save</nuxt-link>
                <nuxt-link to="#" class="btn btn-primary btn-like"><i class='fa fa-comments color-bg-blue'></i>Comment</nuxt-link>
              </b-col>
              <b-col sm="12" md="6" class="mt-md-auto mb-auto">
                <b-row class="row-info align-items-baseline">
                  <p>128</p><i class='fa fa-comments mr-1 color-blue'></i>
                  <p>5,983</p><i class='fas fa-heart mr-1 color-pink'></i>
                  <p>4.8</p><i class='fa fa-star mr-1 color-yellow'></i>
                </b-row>
                <b-row class="row-info">
                  <p class="pt-3 pr-4 text-right">
                    Created by<br>
                    {{ itineraryDetail.contactPerson }}
                  </p>
                  <b-img :src="require('~/assets/img/user.jpg')" rounded="circle" style="height:5rem" class="mb-3"></b-img>
                </b-row>
                <b-row class="row-info">
                  <nuxt-link to="/#" class="btn btn-primary">Book this Itinerary</nuxt-link>
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
                  <b-img :src="require('~/assets/img/map-journey.png')" fluid style="height: 22.5rem; object-fit: cover" class="mb-3"></b-img>
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
                  <div v-for="(list, index) in itineraryDetail.itemPerDay" :key="index" class="list">
                    <h3 class="list-title">
                      Day {{ list.day }}
                    </h3>
                    <ul class="list-items">
                      <li v-for="(destination, index) in list.item" :key="index">
                        <h5 class="mb-1">
                          {{ destination.name }}
                        </h5>
                        <p>
                          Time: 
                          {{ destination.timeStart }} - {{ destination.timeEnd }}
                        </p>
                      </li>
                      <button class="add-card-btn btn"><i class='fa fa-plus-circle'></i>Add activity</button>
                    </ul>
                  </div>
                </section>
              </b-col>
            </b-row>
          </b-container>
        </section>
      </template>

      <template v-else>
        <section class="d-flex align-items-center justify-content-center min-vh-75">
          <b-container>
            <b-row>
              <b-col>
                <b-card bg-variant="primary" class="text-center">
                  <h4 class="font-weight-bold">Oops!</h4>
                  <p>Itinerary not found. You can try access another itinerary via our homepage</p>
                  <nuxt-link to="/" class="btn btn-light">Go to Homepage</nuxt-link>
                </b-card>
              </b-col>
            </b-row>
          </b-container>
        </section>
      </template>
    </template>
  </main>
</template>

<script>
  export default {
    computed: {
      itineraryDetail() {
        return this.$store.state.itinerary.itineraryDetail;
      }
    },

    data() {
      return {
        isFetched: false,
        itinId: this.$route.params.id
      }
    },

    mounted() {
      this.$nextTick(() => {
        this.$nuxt.$loading.start();
  
        this.$store.dispatch("itinerary/getItineraryDetail", this.itinId)
          .then(() => {
            this.isFetched = true;
          }).catch(() => {
            console.error("Fetching itinerary detail error");
            console.error(err);
          }).finally(() => {
            setTimeout(() => this.$nuxt.$loading.finish(), 500);
          });
    })
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