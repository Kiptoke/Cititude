<script setup lang="ts">
    const cities = ["Tokyo","Jakarta","Delhi","Guangzhou","Mumbai","Manila","Shanghai","São Paulo","Seoul","Mexico City","Cairo","New York","Toronto"]
</script>

<template>
  <div>
    <p class="text-5xl m-5 flex justify-center font-extrabold">cititude</p>
    <Citysearch class="mx-20"/>
    <Cityblock
      v-for="city in cities"
      :city="city"
    />
  </div>
</template>
