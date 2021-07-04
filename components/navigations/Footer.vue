<template>
  <footer id="footer" class="bg-primary">
    <b-container>
      <b-row>
        <b-col sm="12" md="2" class="my-auto">
          <h2 class="brand-title">itin</h2>
          <nuxt-link to="/?page=partner" class="btn btn-light btn-sm font-weight-bold my-2">Be Our Partner!</nuxt-link>
        </b-col>
        <b-col sm="12" md="10">
          <b-row>
            <b-col sm="12" md="3" class="text-md-center">
              <h4 class="nav-title">About</h4>
              <ul class="footer-nav">
                <b-nav-item v-for="(link, index) in about" :key="index" :to="link.url">
                  {{ link.title }}
                </b-nav-item>
              </ul>
            </b-col>
            <b-col sm="12" md="3" class="text-md-center">
              <h4 class="nav-title">Support</h4>
              <ul class="footer-nav">
                <b-nav-item v-for="(link, index) in support" :key="index" :href="link.url">
                  {{ link.title }}
                </b-nav-item>
              </ul>
            </b-col>
            <b-col sm="12" md="6">
              <h4 class="nav-title">Subscribe to our newsletter</h4>
              <b-form @submit.prevent="onSubmit()"> <!-- Inline not working -->
                <b-row>
                  <b-col sm="12" md="9">
                    <b-form-input required autocomplete="on" v-model="form.email" type="email" placeholder="Email"></b-form-input>
                  </b-col>
                  <b-col sm="12" md="3" class="my-2 my-md-auto">
                    <b-button type="submit" variant="secondary" class="text-white">Subscribe</b-button>
                  </b-col>
                </b-row>
              </b-form>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </footer>
</template>

<script>
  export default {
    data() {
      return {
        about: [
          { title: "Blog", url: "/?page=here" },
          { title: "Contact Us", url: "/?page=here" },
          { title: "Career", url: "/?page=here" },
        ],
        support: [
          { title: "Help", url: "/?page=here" },
          { title: "Privacy Policy", url: "/?page=here" },
          { title: "Terms & Conditions", url: "/?page=here" },
        ],
        form: {
          email: ""
        }
      }
    },

    methods: {
      onSubmit() {
        // TODO Subscribe letter
        this.$store.dispatch("alert/displaySuccess", { message: `Email ${this.form.email} successfully subscribed` });
        this.email = "";
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>