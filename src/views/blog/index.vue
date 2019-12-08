<template>
  <div >
    <Navbar></Navbar>
    <formulabar v-model="markdownEditor.text"></formulabar>
  </div>
</template>

<script>
  import {Navbar} from '@/views/layout/components/'
  import formulabar from '@/components/formulabar'
    export default {
        name: "index.vue",
      data(){
        return{
          markdownEditor:{
            text:"",
            default:""
          },
        }
      },
      components:{
          formulabar,
          Navbar
      }
    }
</script>

<style scoped>

</style>
