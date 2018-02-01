import Cartcontrol from '@/components/CartControl/index.vue';
import { IFood } from '@/pages/Goods/index.ts';
import BScroll from 'better-scroll';
import Vue from 'vue';
import Component from 'vue-class-component';

interface IBall {
  show: boolean;
  el?: Element;
}

@Component({
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [
          {
            price: 10,
            count: 1,
          },
        ];
      },
    },
    deliveryPrice: {
      type: Number,
      default: 0,
    },
    minPrice: {
      type: Number,
      default: 0,
    },
  },
  components: {
    Cartcontrol,
  },
})
export default class ShopCart extends Vue {
  public balls: IBall[] = [
    {
      show: false,
    },
    {
      show: false,
    },
    {
      show: false,
    },
    {
      show: false,
    },
    {
      show: false,
    },
  ];
  public dropBalls: IBall[] = [];
  public fold = true;
  public selectFoods: IFood[];
  public minPrice: number;
  public scroll: any;
  get totalPrice() {
    let total = 0;
    this.selectFoods.forEach((food) => {
      if (food.count) {
        total += food.price * food.count;
      }
    });
    return total;
  }
  get totalCount() {
    let count = 0;
    this.selectFoods.forEach((food) => {
      if (food.count) {
        count += food.count;
      }
    });
    return count;
  }
  get payDesc() {
    if (this.totalPrice === 0) {
      return `￥${this.minPrice}元起送`;
    } else if (this.totalPrice < this.minPrice) {
      const diff = this.minPrice - this.totalPrice;
      return `还差￥${diff}元起送`;
    } else {
      return '去结算';
    }
  }
  get payClass() {
    if (this.totalPrice < this.minPrice) {
      return 'not-enough';
    } else {
      return 'enough';
    }
  }
  get listShow() {
    if (!this.totalCount) {
      this.fold = true;
      return false;
    }
    const show = !this.fold;
    if (show) {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.listContent as Element, {
            click: true,
          });
        } else {
          this.scroll.refresh();
        }
      });
    }
    return show;
  }
  public drop(el: Element) {
    this.balls.forEach(item => {
      if (!item.show) {
        item.show = true;
        item.el = el;
        this.dropBalls.push(item);
        return;
      }
    });
  }
  public toggleList() {
    if (!this.totalCount) {
      return;
    }
    this.fold = !this.fold;
  }
  public hideList() {
      this.fold = true;
    }
  public empty() {
      this.selectFoods.forEach((food) => {
        food.count = 0;
      });
    }
  public pay() {
    if (this.totalPrice < this.minPrice) {
      return;
    }
    window.alert(`支付${this.totalPrice}元`);
  }
  public addFood(target: Element) {
    this.drop(target);
  }
  public beforeDrop(el: HTMLElement) {
    let count = this.balls.length;
    while (count--) {
      const ball = this.balls[count];
      if (ball.show && ball.el) {
        const rect = ball.el.getBoundingClientRect();
        const x = rect.left - 32;
        const y = -(window.innerHeight - rect.top - 22);
        el.style.display = '';
        el.style.webkitTransform = `translate3d(0,${y}px,0)`;
        el.style.transform = `translate3d(0,${y}px,0)`;
        const inner = el.getElementsByClassName('inner-hook')[0] as HTMLElement;
        inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
        inner.style.transform = `translate3d(${x}px,0,0)`;
      }
    }
  }
  public dropping(el: HTMLElement, done: () => {}) {
    this.$nextTick(() => {
      el.style.webkitTransform = 'translate3d(0,0,0)';
      el.style.transform = 'translate3d(0,0,0)';
      const inner = el.getElementsByClassName('inner-hook')[0] as HTMLElement;
      inner.style.webkitTransform = 'translate3d(0,0,0)';
      inner.style.transform = 'translate3d(0,0,0)';
      el.addEventListener('transitionend', done);
    });
  }
  public afterDrop(el: HTMLElement) {
    const ball = this.dropBalls.shift();
    if (ball) {
      ball.show = false;
      el.style.display = 'none';
    }
  }
  }
