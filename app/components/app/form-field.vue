<script setup lang="ts">
const props = defineProps<{
  label: string;
  name: string;
  type?: "text" | "textarea" | "number";
  error?: string;
  disabled?: boolean;
}>();
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      {{ props.label }}
    </legend>
    <Field
      :name="props.name"
      :type="props.type || 'text'"
      :disabled="props.disabled"
      class="w-full input"
      :class="{
        'input-error': props.error,
        'textarea': type === 'textarea',
      }"
    />
    <p v-if="props.error" class="label text-error">
      {{ props.error }}
    </p>
  </fieldset>
</template>
