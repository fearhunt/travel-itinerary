<template>
  <footer id="footer" class="bg-primary">
    <b-container>
      <b-row>
        <b-col sm="12" md="4">
          <h5 class="nav-title">Tentang</h5>
          <ul class="footer-nav">
            <b-nav-item v-for="(link, index) in about" :key="index" :to="link.url">
              {{ link.title }}
              <span v-if="link.isNew" class="new-feature">
                New
              </span>
            </b-nav-item>
          </ul>
        </b-col>
        <b-col sm="12" md="4">
          <h5 class="nav-title">Lainnya</h5>
          <ul class="footer-nav">
            <b-nav-item v-for="(link, index) in other" :key="index" :to="link.url">
              {{ link.title }}
              <span v-if="link.isNew" class="new-feature">
                New
              </span>
            </b-nav-item>
          </ul>
        </b-col>
        <b-col sm="12" md="4">
          <h5 class="nav-title">Social Media</h5>
          <ul class="footer-nav">
            <b-nav-item v-for="(link, index) in social_media" :key="index" :href="link.url">
              {{ link.title }}
            </b-nav-item>
          </ul>
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
          { title: 'Tentang Kami', url: '/d', isNew: false },
          { title: 'Bantuan', url: '/d', isNew: false },
          { title: 'Jadi Mitra', url: '/d', isNew: false },
          { title: 'Kontak Kami', url: '/d', isNew: false },
          { title: 'Karir', url: '/d', isNew: false }
        ],
        other: [
          { title: 'Syarat dan Ketentuan', url: '/d', isNew: false },
          { title: 'Kebijakan Privasi', url: '/d', isNew: false },
          { title: 'Press Kit', url: '/d', isNew: false },
          // { title: 'Verifikasi Sertifikat', url: '/d', isNew: false },
          // { title: 'For Enterprise', url: '/d', isNew: false },
          // { title: 'Career Mentoring', url: '/d', isNew: true },
          // { title: 'Rekomendasi Instruktur', url: '/d', isNew: true }
        ],
        social_media: [
          { title: 'Instagram', url: 'https://www.instagram.com/beprofesion/' },
          { title: 'LinkedIn', url: 'https://www.linkedin.com/in/be-profesion-1abb93211/?originalSubdomain=id' },
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>