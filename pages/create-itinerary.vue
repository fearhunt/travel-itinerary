<template>
  <main>
    <section id="create-itinerary">
      <b-container>
        <b-row>
          <b-col cols="12">
            <b-col cols="12" class="mb-4 mt-5">
              <h3 class="font-weight-bold">Create Itinerary</h3> 
              <p>Itinerary Name</p>
            </b-col>
            <section class="lists-container">
              <div class="list">
                <h3 class="list-title">Day 1</h3>
                <ul class="list-items">
                  <li>
                    <h5>Borobudur</h5>
                    <p>Time: 10.00-13.00</p>
                  </li>
                  <li>
                    <h5>Taman Sari</h5>
                    <p>Time: 10.00-13.00</p>
                  </li>
                  <button class="add-card-btn btn"><i class='fa fa-plus-circle'></i>Add activity</button>
                </ul>
              </div>
              <button class="add-list-btn btn"><i class='fa fa-plus-circle'></i> Add a list</button>
            </section>
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
      
      }
    },

    mounted() {
    
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