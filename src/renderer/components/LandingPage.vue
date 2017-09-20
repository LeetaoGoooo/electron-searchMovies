<template>
  <div class="container">
        <update-bar></update-bar>
        <search-bar></search-bar>
  </div>
</template>

<script>
import UpdateBar from './UpdatePage/UpdateBar'
import SearchBar from './LandingPage/SearchBar'

export default {
  name: 'landing-page',
  components: { SearchBar, UpdateBar }
}
</script>

<style>

</style>
