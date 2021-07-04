<template>
  <b-modal id="modal-add-destination" size="xl" hide-header hide-footer>
    <b-container>
      <b-row class="py-3">
        <b-col cols="12">
          <b-row>
            <b-col cols="11" class="my-auto">
              <h3 class="font-weight-bold">Choose Destination</h3> 
              <p>
                {{ tempItinerary.name }}
              </p>
            </b-col>
            <b-col cols="1" class="text-center">
              <b-button variant="modal-close" size="xs" @click="$bvModal.hide('modal-add-destination')" class="btn-modal-close">X</b-button>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="12">
          <b-row>
            <b-col v-for="(location, index) in locations" :key="index" sm="12" md="6" lg="4" class="my-3">
              <b-card no-body @click="updateTempLocation(location)" class="location-card cursor-pointer">
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
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
</template>

<script>
  export default {
    computed: {
      locations() {
        return this.$store.state.location.locations;
      },
      
      tempItinerary() {
        return this.$store.state.itinerary.tempItinerary;
      }
    },

    methods: {
      updateTempLocation(location) {
        this.$store.dispatch("location/updateTempLocation", location);
        this.$bvModal.hide('modal-add-destination');
      }
    },

    mounted() {

    }
  }
</script>

<style lang="scss">

</style>