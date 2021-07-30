<template>
  <footer class="text-gray-600 body-font fixed w-full flex flex-col content-center items-center">
    <div class="container flex-end">
        © honestly 2021
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
footer {
  position: fixed;
  /* padding: 10px 10px 0px 10px; */
  bottom: 40px;
  width: 100%;
  height: 40px;
  text-align: right;
  /* Height of the footer*/ 
  /* height: 40px; */
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
