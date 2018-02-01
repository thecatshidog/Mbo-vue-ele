<template>
  <div class="goods-page">
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li
            v-for="(item, index) in goods"
            class="menu-item"
            :class="{'current': currentIndex == index}"
            :key="index"
            @click="selectMenu(index, $event)"
            ref="menuList"
          >
            <span class="text">
              <span class="icon" v-show="item.type > 0" :class="classMap[item.type]"></span>{{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="(item, index) in goods" class="food-list" ref="foodList" :key="index">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li @click="selectFood(food,$event)" v-for="(food, index) in item.foods" class="food-item border-1px" :key="index">
                <div class="icon">
                  <img :src="food.icon" width="57" height="57">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol @add="addFood" :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
            
          </li>
        </ul>
      </div>
      <shopcart
        ref="shopcart"
        :selectFoods="selectFoods"
        :deliveryPrice="seller.deliveryPrice"
        :minPrice="seller.minPrice"/>
    </div>
    <food @add="addFood" :food="selectedFood" ref="food"/>
  </div>
  
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="scss" src="./index.scss" scoped></style>
