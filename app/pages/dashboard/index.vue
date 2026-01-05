<script setup lang="ts">
const locationsStore = useLocationsStore();
const { locations, status } = storeToRefs(locationsStore);
onMounted(() => {
  locationsStore.refresh();
});
</script>

<template>
  <div class="p-4">
    <h2 class="text-2xl">
      Locations
    </h2>
    <div v-if="status === 'pending'">
      <span class="loading loading-spinner loading-xl" />
    </div>
    <div v-else-if="locations && locations.length > 0" class="flex flex-nowrap  mt-4 gap-2 overflow-auto">
      <div
        v-for="location in locations"
        :key="location.id"
        class="card card-compact h-40 w-72 bg-base-200 shrink-0"
      >
        <div class="card-body">
          <h3 class="card-title text-xl">
            {{ location.name }}
          </h3>
          <p>{{ location.description }}</p>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col gap-2 mt-4">
      <p>Add a location to get started</p>
      <NuxtLink to="dashboard/add" class="btn btn-primary mt-4 w-20">
        Add Location
        <Icon
          name="tabler:circle-plus-filled"
          size="24"
          class="ml-2"
        />
      </NuxtLink>
    </div>
  </div>
</template>
