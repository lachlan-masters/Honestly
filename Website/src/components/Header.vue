<template>
  <header class="text-gray-600 body-font">
  <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <span class="logo">honestly</span>
    </a>
    <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <router-link to="/" class="mr-10 hover:text-gray-900">Shoppers</router-link>
      <router-link to="/orgs" class="mr-10 hover:text-gray-900">Organisations</router-link>

      <!-- <router-link v-if="$auth.isAuthenticated" to="/profile">Profile</router-link> -->

      <button class="inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
        Login
      </button>
    </nav>
  </div>
</header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo {
  /* Fallback: Set a background color. / */
  background-color: #d317e5;

  /* / Create the gradient. / */
  background-image: linear-gradient(45deg, #20d6e5, #d317e5);

  /* / Set the background size and repeat properties. / */
  background-size: 100%;
  background-repeat: repeat;

  /* / Use the text as a mask for the background. / */
  /* / This will show the gradient as a text color rather than element bg.  */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
}
/* span {
  background: linear-gradient(90.68deg, #20D6E6 -8.98%, #D317E5 89.96%);
} */
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
nav {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 20px;
  color: #333;
}
button {
  border: 1px solid #333;
  border-radius: 20px;
  padding: 5px 24px;
  font-size: 20px;
}
header {
  align-items: center;
}
span {
  font-family: EB Garamond;
  font-weight: 800;
  font-size: 40px;
  color: #333;
  /* color: linear-gradient(90.68deg, #20D6E6 -8.98%, #D317E5 89.96%); */

}
</style>
