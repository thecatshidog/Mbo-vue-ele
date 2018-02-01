import { IFood } from '@/pages/Goods/index.ts';
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    food: {
      type: Object,
    },
  },
})
export default class CartControl extends Vue {
  public food: IFood;
  public addCart(event: VEvent) {
    if (!event._constructed) {
      return;
    }
    if (!this.food.count) {
      Vue.set(this.food, 'count', 1);
    } else {
      this.food.count++;
    }
    this.$emit('add', event.target);
  }
  public decreaseCart(event: VEvent) {
    if (!event._constructed) {
      return;
    }
    if (this.food.count) {
      this.food.count--;
    }
  }
}
