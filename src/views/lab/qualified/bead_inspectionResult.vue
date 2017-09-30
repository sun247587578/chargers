<template>
  <bead-view :state="1"></bead-view>
</template>
<script>
import { beadView } from "./componts.js"
export default {
  components: {
    beadView
  },
  data(){
    return {
      list:[],
      state:null
    }
  },
  methods:{
    cons(){
      console.log()
    }
  },
  mounted(){
    // this.getUrl()
  }
}

</script>
<style lang="scss" scoped>

</style>
