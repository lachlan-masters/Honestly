<template>
  <div class="sidebar">
    <div class="sidebar-inner">
        <a class="flex title-font font-medium items-center text-gray-900 mb-8">
          <span class="logo">honestly</span>
        </a>
        <img class="inline-block h-40 w-40 rounded-full ring-2 ring-white mb-20" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
        <nav class="flex flex-col flex-wrap items-center justify-center text-center">
          <router-link to="/" class="mb-8 hover:text-gray-900 text-2xl">Discover</router-link>
          <router-link to="/" class="mb-8 hover:text-gray-900 text-2xl">Preferences</router-link>
          <router-link to="/orgs" class="mb-8 hover:text-gray-900 text-2xl">Settings</router-link>
          <button class="mb-8 hover:text-gray-900 text-2xl">
            Logout
          </button>
        </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar'
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
.sidebar {
  position: fixed;
  left: 0;
  height: 100%;
  padding: 40px;
  width: 50%;
  max-width: 300px;
  border-right: 1px rgba(20,20,20,0.1) solid;
  background-color: #F1F1F1;
}
.sidebar-inner {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
}
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
/* button {
  border: 1px solid #333;
  border-radius: 20px;
  padding: 5px 24px;
  font-size: 20px;
} */
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
