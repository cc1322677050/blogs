<template>
  <div class="app-wrapper" :class="classObj">
    <div>
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, AppMain } from './components'
export default {
  name: 'layout',
  components: {
    Navbar,
    AppMain
  },
  computed: {
    classObj() {

    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
