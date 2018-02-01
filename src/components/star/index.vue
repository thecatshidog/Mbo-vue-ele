<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass, index) in itemClasses" :class="itemClass" class="star-item" :key="index"></span>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="scss" src="./index.scss" scoped></style>
