<template>
  <div id="app">
    <router-view/>
    
    <audio id="chatAudio" style="display: none;"> 
      <source src="/beep.mp3" type="audio/mpeg"> 
    </audio>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
@import './assets/Roboto.scss';

$image-path: '~@/../mdb/mdbvue/img';
@import '~@/../mdb/mdbvue/scss/mdb-free.scss';

</style>
