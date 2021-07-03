<template>
  <b-navbar toggleable="lg" type="light">
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
        <b-nav-item to="/?page=discover">Discover</b-nav-item>
        <b-nav-item to="/?auth=login" class="btn btn-md btn-primary">Go StayCation</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
  export default {
    methods: {
      // async logout() {
      //   this.$nuxt.$loading.start();

      //   await this.$auth.$storage.removeUniversal('roles');
      //   await this.$auth.logout();
      //   this.isLoggedIn = false;

      //   setTimeout(() => this.$nuxt.$loading.finish(), 500);
      // }
    }
  }
</script>

<style lang="scss" scoped>

</style>