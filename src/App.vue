<script>
import { RouterView } from 'vue-router';
import {store} from './data/store.js';

export default {
  name: "AppMain",
  data: ()=>({
    ...store
  })
}
</script>

<template>
  <header>

    <h1 class="text-center">The CryptoBlog</h1>

  </header>

  <div class="container">
    
    <main class="my-5">
      
      <RouterView/>
    
    
    </main>

  </div>
  
  <footer>
    <RouterLink :to="{name:'create'}" class="mt-4 ms-3" @click="isRouteCreate = !isRouteCreate" v-show="!isRouteCreate">
      Hai idee? Crea un Post!
    </RouterLink>
  </footer>
</template>

<style lang="scss" scoped>

</style>
