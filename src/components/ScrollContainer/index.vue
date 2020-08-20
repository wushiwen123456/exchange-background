<template>
  <div :style="{height:height}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: String,
      default: '50vh',
    },
  },
}
</script>