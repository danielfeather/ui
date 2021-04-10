<template>
  <div class="relative mb-4" :aria-expanded="state === 'open' ? 'true' : 'false'">
    <div role="combobox" class="relative border-2 border-black w-full focus-within:ring ring-yellow-300 flex">
      <div class="flex flex-wrap flex-1 pl-2 pr-1 py-2">
        <template v-if="multiple">
          <div>
            <slot v-for="option in selected" :key="option" :option="option" name="option">
              <Tag class="mr-2">
                <span class="mr-1">{{ option }}</span>
                <button @click="clearOption(option)">
                  <img src="./assets/cross.svg" alt="Close icon" class="inline" />
                </button>
              </Tag>
            </slot>
          </div>
        </template>
        <template v-if="!multiple && selected">
          <slot :option="selected" name="option">
            <span :class="`${state === 'open' ? 'absolute opacity-40' : ''} ${search ? 'hidden' : ''}`">{{ selected }}</span>
          </slot>
        </template>
        <input class="flex-1" role="textbox" type="text" :placeholder="!!selected ? '' : placeholder" v-model="search" @focus="state = 'open'" @keydown.delete="search.length === 0 && multiple ? selected.pop() : null">
      </div>
      <div class="flex pr-2 pl-1">
        <button @click="clearOption" v-if="!multiple && selected">
          <img src="./assets/cross.svg" alt="Close icon" />
        </button>
        <button class="ml-2" @click="toggle">
          <img src="./assets/caret.svg" alt="Dropdown Icon" :class="state === 'open' ? 'transform rotate-180' : ''">
        </button>
      </div>
    </div>
    <ul v-if="state === 'open'" class="bg-white border-r-2 border-l-2 border-black absolute left-0 right-0" role="listbox" tabindex="0">
        <li class="p-2 border-b-2 border-black focus:bg-yellow-300 cursor-pointer hover:bg-yellow-300" v-for="option in filteredOptions" :key="option" @click="chooseOption(option)" @keyup.enter="chooseOption(option)">{{ option }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, PropType } from "vue";
import Tag from "../DfTag/DfTag.vue";

export default defineComponent({
  name: "DfSelect",
  components: {
    Tag
  },
  props: {
    label: {
      type: String,
      default: "label"
    },
    placeholder: String,
    multiple: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: true
    },
    options: {
      required: true,
      type: Array as PropType<string[]>
    }
  },
  setup(props, { emit }) {
    const search = ref<string>("");

    const state = ref<string>("");

    const selected = !props.multiple ? ref<string>("") : ref<string[]>([]);

    const filteredOptions = computed(() => props.options.filter((option: string) => option.toLowerCase().includes(search.value.toLowerCase())));

    function toggle() {
      state.value = state.value === "open" ? "closed" : "open";
    }

    function chooseOption(option: string) {
      toggle();
      search.value = "";
      if (!props.multiple) {
        if (props.options.indexOf(option) < 0) {
          return;
        }
        selected.value = option;
        return;
      }

      // Stops options that are already selected or are not valid options from being selected.
      if (props.options.indexOf(option) < 0 || selected.value.indexOf(option) >= 0) {
        return;
      }

      if (typeof selected.value !== "string") {
        selected.value.push(option);
      }
    }

    function clearOption(option?: string) {
      if (!props.multiple) {
        selected.value = "";
        return;
      }

      if (typeof selected.value === "string"){
        return;
      }

      if (!option) {
        return;
      }

      const optionIndex = selected.value.indexOf(option);

      if (optionIndex < 0) {
        return;
      }

      selected.value.splice(optionIndex, 1);
    }

    watch(selected, selection => {
        emit("update:modelValue", selection);
      },
      { deep: true }
    );

    return { state, selected, search, chooseOption, clearOption, toggle, filteredOptions };
  }
});
</script>