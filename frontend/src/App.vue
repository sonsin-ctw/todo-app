<template>  
    <main class="container mx-auto p-4">
      <router-view></router-view>
    </main>
 
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>