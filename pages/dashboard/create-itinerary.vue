<template>
  <main>
    <section id="create-itinerary" class="min-vh-75">
      <b-container>
        <b-form @submit.prevent="onSubmit()">
          <b-row>
            <b-col cols="12">
              <div class="mb-4 px-3">
                <h3 class="font-weight-bold">Create Itinerary</h3> 
                <b-form-input class="form-input-simplified-line" required ref="itinerary-name" v-model="form.itin.name" type="text" placeholder="Itinerary name"></b-form-input>
              </div>
              <div class="lists-container">
                <div v-for="(list, index) in form.itemPerDay" :key="index" class="list">
                  <h3 class="list-title">
                    Day {{ index + 1 }}
                  </h3>
                  <ul class="list-items">
                    <li v-for="(item, index) in list" :key="index">
                      <h5>Borobudur</h5>
                      <p>Time: 10.00-13.00</p>
                    </li>
                    <b-button variant="black" @click="toggleActivityModal(index + 1)" class="add-card-btn">
                      <i class="fa fa-plus-circle mr-1"></i> 
                      Add activity
                    </b-button>
                  </ul>
                </div>
                <b-button variant="primary" @click="addList" class="add-list-btn">
                  <i class="fa fa-plus-circle mr-1"></i>
                  Add a list
                </b-button>
              </div>
            </b-col>
          </b-row>
        </b-form>
      </b-container>
    </section>

    <!-- TODO Change dismissed alert on state management -->
    <b-alert :show="dismissCountDown" variant="warning" dismissible @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged" fade>
      {{ dismissMessage }}
    </b-alert>

    <ModalItineraryAddActivity v-if="tempItinerary" />
  </main>
</template>

<script>
  export default {
    computed: {
      popularItineraries() {
        return this.$store.state.itinerary.popularItineraries;
      },

      tempItinerary() {
        return this.$store.state.itinerary.tempItinerary;
      },
      
      tempItineraryItem() {
        return this.$store.state.itinerary.tempItineraryItem;
      }
    },

    data() {
      return {
        form: {
          itin: {
            name: "",
            desc: "",
            narasi: "",
            totalDay: 0,
          },
          itemPerDay: []
        },
        dismissMessage: "",
        dismissSecs: 5,
        dismissCountDown: 0,
      }
    },

    methods: {
      addList() {
        this.form.itemPerDay.push([]);
      },

      toggleActivityModal(day) {
        if (this.form.itin.name == "") {
          this.dismissMessage = "Please input itinerary name first";
          this.showAlert();
          this.$refs["itinerary-name"].focus();
        } else {
          this.$store.dispatch("itinerary/updateTempItinerary", { name: this.form.itin.name, day: day });
          this.$bvModal.show('modal-add-activity');
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
      this.$store.dispatch("location/getAllLocations");
      this.$root.$on("bv::modal::hidden", (bvEvent, modalId) => {
        if (modalId == "modal-add-activity") {
          console.log(this.tempItineraryItem)
          console.log(this.tempItinerary)
          // this.form.itemPerDay[this.tempItinerary.day - 1].push(this.tempItineraryItem);
          // console.log(this.form.itemPerDay[this.tempItinerary.day - 1])
        }
      });
    }
  }
</script>

<style lang="scss">
  
</style>