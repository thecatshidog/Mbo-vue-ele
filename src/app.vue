<template>
  <div class="app-page">
    <v-header :seller="seller"/>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
    <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>
<script lang="ts" src="./app.ts"></script>
<style lang="scss" src="./app.scss" scoped></style>
