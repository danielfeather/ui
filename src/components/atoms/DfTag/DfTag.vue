<template>
  <span :class="`inline-block font-bold py-1 px-2 uppercase text-white bg-${colours[variant]}`">
    <slot></slot>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Tag",
  props: {
    variant: {
      type: String,
      validator(value: string): boolean {
        return ["info", "success", "warning", "danger"].indexOf(value) !== -1;
      },
      default: "info"
    }
  },
  setup() {
    const colours = {
      info: "blue-500",
      success: "green-500",
      warning: "yellow-500",
      danger: "red-500"
    };

    return { colours };
  }
});
</script>
