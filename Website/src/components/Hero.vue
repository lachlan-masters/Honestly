<template>
  <section class="text-gray-600 body-font">

    
    <!-- Check that the SDK client is not currently loading before accessing is methods -->
      <!-- <div v-if="!$auth.loading"> -->
        <!-- show login when not authenticated -->
        <!-- <button v-if="!$auth.isAuthenticated" @click="login">Log in</button> -->
        <!-- show logout when authenticated -->
        <!-- <button v-if="$auth.isAuthenticated" @click="logout">Log out</button>
      </div> -->


    <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center stretch">
      <div class="lg:flex-grow md:w-1/2 lg:pr-24 lg:w-full md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <h1 class="title-font sm:text-4xl text-3xl mb-4 text-gray-900">
          {{title}}
        </h1>
        <p>Features:</p>
        <ul v-if="features" class="mb-10">
          <li v-for="item in features" :key="item.id">
            {{item.name}}
          </li>
        </ul>
        <div class="flex justify-center">
          <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Register as an organisation
          </button>
          <button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
            Register as a shopper
          </button>
        </div>
      </div>
      <div class="lg:w-full md:w-1/2 w-5/6">
        <img class="lg:max-w-lg object-cover object-center rounded" alt="hero image" :src="require(`@/assets/${img}`)">
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Hero',
  props: {
    'title': String,
    'img': String,
    'features': Array
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-family: EB Garamond;
  font-weight: 800;
  font-size: 40px;
}
ul {
  list-style-type: disc;
  margin-left: 30px;
}
/* ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
} */
/* a {
  color: #42b983;
} */
</style>
