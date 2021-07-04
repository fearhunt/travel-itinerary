<template>
  <b-modal id="modal-add-activity" size="xl" hide-header hide-footer>
    <b-container>
      <b-row>
        <b-col cols="12">
          <div>
            <b-row>
              <b-col cols="11" class="my-auto">
                <h3 class="font-weight-bold">
                  <i class='far fa-calendar-alt mr-2 icon-title'></i>
                  {{ tempItinerary.name }}
                </h3> 
              </b-col>
              <b-col cols="1" class="text-center">
                <b-button variant="modal-close" size="xs" @click="$bvModal.hide('modal-add-activity')" class="btn-modal-close">X</b-button>
              </b-col>
            </b-row>
            <p>
              in Day {{ tempItinerary.day }}
            </p>
            <p>
              <i class='far fa-clock mr-2'></i>
              <label for="timepicker-start">{{ form.item.timeStart }}</label>
              -
              <label for="timepicker-end">{{ form.item.timeEnd }}</label>
            </p>
            <b-form-timepicker id="timepicker-start" button-only v-model="form.item.timeStart" size="sm" locale="en" class="hidden"></b-form-timepicker>
            <b-form-timepicker id="timepicker-end" button-only v-model="form.item.timeEnd" size="sm" locale="en" class="hidden"></b-form-timepicker>
          </div>
        </b-col>
        <b-col cols="12" class="activity-info">
          <div class="my-3">
            <h5>
              <i class='far fa-edit mr-2 icon-title'></i>
              Description
            </h5> 
            <b-form-textarea id="description" rows="3" placeholder="Add a little more description about the activity." type="text"></b-form-textarea>
          </div>
          <div class="my-3">
            <h5 class="mb-2">
              <i class='far fa-map mr-2 icon-title'></i>
              Destination
            </h5> 
            <nuxt-link to="/">
              <b-card bg-variant="primary-light" no-body>
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
          </div>
          <div class="my-3">
            <h5>
              <i class='fas fa-car mr-2 icon-title'></i>
              Transportation 
            </h5>
            <p>List of available transportation option:</p>
            <b-form-textarea id="description" rows="4" placeholder="User can add contact for car rental, or travel and also write a note about useful tips for traveller with their own personal
  vehicle, e.g. the small is too small so car cannot enter, etc." type="text"></b-form-textarea>
          </div>
          <!-- <i class='far fa-user-circle mr-2 icon-title'></i>
            <h5>Guide</h5> 
          <i class='fas fa-coins mr-2 icon-title'></i>
            <h5>Total Budget</h5>  -->
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
</template>

<script>
  export default {
    computed: {
      tempItinerary() {
        return this.$store.state.itinerary.tempItinerary;
      }
    },

    data() {
      return {
        form: {
          item: {
            desc: "",
            timeStart: "00:00:00",
            timeEnd: "00:00:00",
            price: 0,
            // location
          }
        },
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

    },
 
    mounted() {

    }
  }
</script>

<style lang="scss">
  
</style>