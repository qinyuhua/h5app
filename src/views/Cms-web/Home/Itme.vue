<template>
  <div>
    <div>{{ source.value }}</div>
  </div>
</template>

<script>
  export default {
    name: 'item-component',
    props: {
      data: { // index of current item
        type: Array
      },
      source: {
        type: Object,
      }
    },
    mounted() {
      console.log(2, this.source);
    }
  }
</script>
