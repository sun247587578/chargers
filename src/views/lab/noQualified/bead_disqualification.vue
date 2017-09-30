<template>
  <bead-view :state="2"></bead-view>
</template>
<script>
import { beadView } from "../qualified/componts.js"
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
   
  },
  mounted(){
  }
}

</script>
<style lang="scss" scoped>

</style>
