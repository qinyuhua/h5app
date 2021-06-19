<template>
  <div>
    <div>{{currentCalendarDate.noteContent}}</div>
    <div @click="clickAdd" class="button">
      添加数据
    </div>
  </div>
</template>
<script lang="ts">
  export default {
    name: 'childDate',
    props: {
      data: {
        type: Array,
        default: function () {
          return [];
        }
      },
      currentCalendarDate: {
        type: Object,
        default: function() {
          return {};
        }
      },
    },
    data() {
      return {};
    },
    created () {
      // console.log(this.currentCalendarDate);
    },
    methods: {
      clickAdd() {
        // console.log(1)
        this.$emit('addNote');
      }
    },
    // mounted(): void {
    //   console.log(this.currentCalendarDate)
    // }

  };
</script>
<style lang="scss" scoped>
  .button {
    display: block;
    width: 200px;
    height: 40px;
  }
</style>
