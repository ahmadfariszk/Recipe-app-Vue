<template>
  <div class="relative">
    <!-- Paragraph with dynamic classes for truncation and animation -->
    <p
      ref="content"
      v-bind:class="{
        'max-h-24 overflow-hidden': !isExpanded, // Truncated state with ellipsis
        'max-h-[1000px]': isExpanded, // Expanded state (enough height to show content)
      }"
      class="transition-all duration-500 ease-in-out text-ellipsis overflow-hidden"
      :style="{
        display: '-webkit-box',
        '-webkit-line-clamp': isExpanded ? 'unset' : '3', // Line clamp on truncate
        '-webkit-box-orient': 'vertical',
      }"
    >
      {{ text }}
    </p>

    <!-- Show 'Read More' button only when text is truncated -->
    <button
      v-if="isTruncated"
      @click="toggleExpansion"
      class="text-blue-500 hover:text-blue-700 transition-all duration-300 inline-block"
    >
      {{ isExpanded ? "Read Less" : "Read More" }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
const props = defineProps({
  text: String
})

const { text } = props;

const isExpanded = ref(false);
const isTruncated = ref(false); // Tracks whether the text is truncated
const content = ref<HTMLElement | null>(null);

// Handle the toggle and ensure animation works as expected
const toggleExpansion = async () => {
  isExpanded.value = !isExpanded.value;
  await nextTick(); // Ensure DOM is updated before applying animation
};

// Check if the text is truncated after the component has mounted
const checkIfTruncated = () => {
  if (content.value) {
    isTruncated.value = content.value.scrollHeight > content.value.clientHeight;
  }
};

// Run the check on mount
onMounted(() => {
  checkIfTruncated();
});
</script>
