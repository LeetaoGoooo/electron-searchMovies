<template>
  <div class="container">
        <update-bar v-on:NETSTATUS='getNetstatus'></update-bar>
        <search-bar :netstatus="status" ></search-bar>
  </div>
</template>

<script>
import UpdateBar from './UpdatePage/UpdateBar'
import SearchBar from './LandingPage/SearchBar'

export default {
  name: 'landing-page',
  data () {
    return {
      status: true
    }
  },
  components: { SearchBar, UpdateBar },
  methods: {
    getNetstatus: function (status) {
      this.status = status
    }
  }
}
</script>

<style>

</style>
