<script setup lang="ts">
const props = defineProps<{
  label: string;
  icon: string;
  href: string;
  showLabel: boolean;
  iconColor?: "text-accent" | "text-primary" | "text-secondary" | "text-info" | "text-success" | "text-warning" | "text-error";
}>();
const route = useRoute();
</script>

<template>
  <div :data-tip="props.showLabel ? undefined : props.label" :class="{ 'tooltip tooltip-right': !showLabel }">
    <NuxtLink
      :class="{ 'bg-base-200': route.path === props.href, 'justify-center': !props.showLabel, 'justify-start': showLabel }"
      class="flex gap-2 p-2 hover:bg-base-300 hover:cursor-pointer flex-nowrap"
      :to="props.href"
    >
      <Icon
        :name="props.icon"
        size="24"
        :class="iconColor"
      />
      <Transition name="grow">
        <span v-if="props.showLabel">
          {{ props.label }}
        </span>
      </Transition>
    </NuxtLink>
  </div>
</template>

<style scoped>
.grow-enter-active {
  animation: grow 0.2s;
}
.grow-leave-active {
  animation: grow 0.2s reverse;
}
@keyframes grow {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
