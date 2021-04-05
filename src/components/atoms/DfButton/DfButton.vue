<template>
  <button
    class="shadow-button font-heading text-white font-bold px-4 py-3 bg-green-700 hover:bg-green-800 focus:bg-yellow-300 focus:text-black"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DfButton"
});
</script>
