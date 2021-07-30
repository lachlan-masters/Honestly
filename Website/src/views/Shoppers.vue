<template>
  <div class="shoppers">
    <Hero 
      title="Enabling online shoppers to trust the brands they love."
      img="shoppers-ill.png"
      :features="[{
          id:0,
          name:'abc'
        },{
          id:1,
          name:'cde'
        }]"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import Hero from '@/components/Hero.vue'

export default {
  name: 'Shoppers',
  components: {
    Hero
  }
}
</script>
