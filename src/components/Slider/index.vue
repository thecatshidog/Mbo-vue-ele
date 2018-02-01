<template>
  <section class="cname">
    <swiper :options="options" :no-next-tick="options.notNextTick">
      <swiper-slide v-for="item in items" :key="item.link">
        <router-link :to="{name: item.href}">
          <img :src="item.src" alt="">
        </router-link>
      </swiper-slide>
      <div class="swiper-pagenition" v-if="options.pagenition"></div>
    </swiper>
  </section>
</template>
<script src="./index.ts" lang="ts"></script>
<style lang="scss" src="./index.scss" scoped></style>
