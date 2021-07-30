<template>
  <div class="orgs">
    <Hero
      title="Enabling organisations to pass their transparency onto consumers."
      img="orgs-ill.png"
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
  name: 'Orgs',
  components: {
    Hero
  }
}
</script>
