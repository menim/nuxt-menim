<script setup lang="ts">
const route = useRoute();
const error = route.query.error || "Unknown error occurred";
</script>

<template>
  <div class="card bg-base-300 container mt-4 min-h-72 text-center mx-auto flex flex-col justify-center items-center">
    <div role="alert" class="alert alert-error min-w-1/2 text-center  ">
      <span>Oh! No ! {{ error }}</span>
    </div>
    <NuxtLink to="/" class="btn btn-primary mt-4 ">
      Home
      <Icon name="tabler:arrow-left" size="32 " />
    </NuxtLink>
  </div>
</template>
