<template>
  <b-navbar toggleable="lg" type="light" :class="isHomepage">
    <b-navbar-brand to="/">
      <h2 class="navbar-brand-title mb-0">itin</h2>
    </b-navbar-brand>
    
    <b-navbar-toggle target="nav-collapse">
      <template #default="{ expanded }">
        <i v-if="expanded" class="fa fa-chevron-up" aria-hidden="true"></i>
        <i v-else class="fa fa-chevron-down" aria-hidden="true"></i>
      </template>
    </b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto d-flex align-items-center p-2">
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/?page=about">About</b-nav-item>
        <b-nav-item to="/?page=help">Help</b-nav-item>
        <b-nav-item to="/?page=login" class="btn btn-md btn-primary">Go StayCation</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
  export default {
    computed: {
      isHomepage() {
        if (this.$route.path == "/") {
          return "transparent";
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>