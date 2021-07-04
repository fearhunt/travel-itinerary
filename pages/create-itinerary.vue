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
        intros: [
          { title: "It's easy", description: "With Itin, we've make it easier for you to just GO." },
          { title: "It's safe", description: "I don't know how, but we will make sure it is." },
          { title: "It's fun", description: " We all need vacation, bruh." },
        ]
      }
    },

    methods: {
      setNavbarOnScroll() {
        window.onscroll = () => {
          if (document.body.scrollTop > 15 || document.documentElement.scrollTop > 15) {
            document.querySelector(".navbar").classList.remove("transparent");
          } else {
            document.querySelector(".navbar").classList.add("transparent");
          }
        }
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
    }
  }
</script>

<style lang="scss">
  #header {
    height: 350px;
    margin: 0;
    padding: 0;

    .container, .row-header {
      height: 350px;
      align-content: flex-end;
    }

    @media (max-width: 768px) {
      min-height: 100vh;
    }
  }
</style>