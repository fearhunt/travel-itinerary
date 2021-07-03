<template>
  <main>
    <section id="jumbotron">
      <b-container>
        <b-row>
          <b-col sm="12" md="6" class="d-flex align-items-center justify-content-center">
            <h1>
              Book Your Next <br>
              <span class="font-weight-bold">Safe Staycation</span> <br>
              With Us.
            </h1>
          </b-col>
          <b-col sm="12" md="6" class="d-flex align-items-center justify-content-center">
            <b-card>
              <nuxt-link to="/" class="btn btn-primary">Go StayCation</nuxt-link>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section id="intro">
      <b-container>
        <b-row>
          <b-col cols="12" class="mb-3">
            <h1 class="text-title">With Us, You're Safe</h1>
          </b-col>
          <b-col v-for="(intro, index) in intros" :key="index" sm="12" md="4">
            <b-card>
              <b-row>
                <b-col cols="3" class="d-flex align-items-center justify-content-center">
                  <h2 class="intro-index">
                    {{ index + 1 }}
                  </h2>
                </b-col>
                <b-col cols="9">
                  <h5 class="font-weight-bold mb-1">
                    {{ intro.title }}
                  </h5>
                  <p class="text-description">
                    {{ intro.desc }}
                  </p>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </main>
</template>

<script>
  export default {
    data() {
      return {
        intros: [
          { title: "It's easy", desc: "With Itin, we've make it easier for you to just GO." },
          { title: "It's safe", desc: "I don't know how, but we will make sure it is." },
          { title: "It's fun", desc: " We all need vacation, bruh." },
        ]
      }
    }
  }
</script>

<style lang="scss">
  #jumbotron {
    height: 100vh;
    padding: 0;

    .container, .row {
      height: 100vh;
    }

    @media (max-width: 768px) {
      min-height: 100vh;
    }
  }
</style>