<template>
  <b-modal id="modal-add-activity" size="xl" hide-header hide-footer>
    <b-container>
      <b-form @submit.prevent="onSubmit()">
        <b-row class="py-3">
          <b-col cols="12">
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
            <!-- TODO Set minimal and maximal time -->
            <b-form-timepicker id="timepicker-start" button-only v-model="form.item.timeStart" size="sm" locale="en" class="hidden"></b-form-timepicker>
            <b-form-timepicker id="timepicker-end" button-only v-model="form.item.timeEnd" size="sm" locale="en" class="hidden"></b-form-timepicker>
          </b-col>
          <b-col cols="12" class="activity-info">
            <div class="my-3">
              <h5>
                <i class='far fa-edit mr-2 icon-title'></i>
                Description
              </h5> 
              <b-form-textarea id="description" rows="3" required v-model="form.item.desc" placeholder="Add a little more description about the activity." type="text"></b-form-textarea>
            </div>
            <div class="my-3">
              <div class="mb-2 ">
                <h5 class="d-inline">
                  <i class='far fa-map mr-2 icon-title'></i>
                  Destination
                </h5>
                <span @click="$bvModal.show('modal-add-destination')" class="float-right mt-1 text-secondary cursor-pointer">Edit Location</span>
              </div>
              <b-card bg-variant="primary-light" no-body v-if="location">
                <b-row no-gutters>
                  <b-col sm="12" md="3" class="img-display-card" :style="{ backgroundImage: `url(${$axios.defaults.baseURL + 'images/' + location.imagePath || require('~/assets/img/attention/location.png')})` }"></b-col>
                  <b-col sm="12" md="9">
                    <b-card-body>
                      <div>
                        <h5 class="mb-1 text-black">
                          {{ location.name }}
                        </h5>
                        <div class="itinerary-information">
                          <span class="tags bg-primary mr-0">
                            <i class="fa fa-shield-alt" aria-hidden="true"></i>
                            Approved
                          </span>
                          <span v-for="(tag, index) in location.destinationTags" :key="index" class="tags">
                            {{ tag | capitalizeFirstLetterOfEachWord() }}
                          </span>
                        </div>
                        <p class="my-2">
                          <span class="font-weight-bold">Open Hours:</span> <br>
                          {{ location.openHour }}
                          -
                          {{ location.closeHour }}
                        </p>
                        <p class="text-description mt-2">
                          {{ location.desc }}
                        </p>
                      </div=>
                    </b-card-body>
                  </b-col>
                </b-row>
              </b-card>
              <div v-else class="text-center text-grey py-3">
                <b-card bg-variant="primary-light" class="text-center">
                  Location not set, yet.
                </b-card>
              </div>
            </div>
            <div class="my-3">
              <h5 class="mb-0">
                <i class='fas fa-car mr-2 icon-title'></i>
                Transportation 
              </h5>
              <small>List of available transportation option:</small>
              <b-form-textarea id="description" rows="2" placeholder="User can add contact for car rental, or travel and also write a note about useful tips for traveller with their own personal
    vehicle, e.g. the small is too small so car cannot enter, etc." type="text" class="mt-2"></b-form-textarea>
            </div>
            <div class="my-3">
              <h5>
                <i class='fas fa-coins mr-2 icon-title'></i>
                Budget
              </h5>
              <b-form-input required v-model="form.item.price" type="number" min="0" max="1000000000" placeholder="ex: 50000"></b-form-input>
            </div>
            <!-- <i class='far fa-user-circle mr-2 icon-title'></i>
              <h5>Guide</h5> -->

            <b-button type="submit" variant="secondary" block class="text-white mt-4">Add Activity</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-container>

    <!-- TODO Change dismissed alert on state management -->
    <b-alert :show="dismissCountDown" variant="warning" dismissible @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged" fade>
      {{ dismissMessage }}
    </b-alert>

    <ModalItineraryChooseDestination />
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
            locationId: 0,
          }
        },
        location: null,
        dismissMessage: "",
        dismissSecs: 5,
        dismissCountDown: 0,
      }
    },

    methods: {
      async onSubmit() {
        if (this.form.locationId == 0 || this.location == null) {
          this.dismissMessage = "Please choose your location before add activity";
          this.showAlert();
        } else {
          this.$store.dispatch("itinerary/updateTempItineraryItem", this.form.item );
          this.form.item = {
            desc: "",
            timeStart: "00:00:00",
            timeEnd: "00:00:00",
            price: 0,
            locationId: 0,
          }
          this.location = null;
          this.$bvModal.hide('modal-add-activity');
        }
      },

      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown;
      },

      showAlert() {
        this.dismissCountDown = this.dismissSecs;
      }
    },
 
    mounted() {
      this.$root.$on("bv::modal::hidden", (bvEvent, modalId) => {
        if (modalId == "modal-add-destination") {
          this.location = this.$store.state.location.tempLocation;
          this.form.item.locationId = this.location.id;
          // * Debugging
          console.log(this.location)
          // * Debugging
        }
      });
    }
  }
</script>

<style lang="scss">
  .activity-info {
    margin-top: -2rem;
  }
</style>