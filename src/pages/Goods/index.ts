import Cartcontrol from '@/components/CartControl/index.vue';
import Food from '@/components/Food/index.vue';
import Shopcart from '@/components/ShopCart/index.vue';
import axios from 'axios';
import BScroll from 'better-scroll';
import Vue from 'vue';
import Component from 'vue-class-component';

const ERR_OK = 0;
const debug = false;

interface Rating {
  username: string;
  rateTime: number;
  rateType: number;
  text: string;
  avatar: string;
}

export interface IFood {
  name: string;
  price: number;
  oldPrice: number;
  description: string;
  rating: number;
  info: string;
  ratings: Rating[];
  icon: string;
  image: string;
  count?: number;
}

type IFoods = IFood[];

interface Good {
  name: string;
  type: number;
  foods: IFoods;
}
type GoodsType = Good[];

@Component({
  props: {
    seller: {
      type: Object,
      default: {},
    },
  },
  components: {
    Shopcart,
    Food,
    Cartcontrol,
  },
})
export default class Goods extends Vue {
  public goods: GoodsType = [];
  public listHeight: number[] = [];
  public scrollY: number = 0;
  public selectedFood = {};

  public menuScroll: any;
  public classMap: string[];
  public foodsScroll: any;

  get currentIndex() {
    this.listHeight.forEach((item, index) => {
      const h1 = item;
      const h2 = this.listHeight[index + 1];
      if (!h2 || (this.scrollY >= h1 && this.scrollY < h2)) {
        this._followScroll(index);
        return index + 1;
      }
    });
    return 0;
  }
  get selectFoods() {
    const foods: IFoods = [];
    this.goods.forEach(good => {
      good.foods.forEach((food: IFood) => {
        if (food.count) {
          foods.push(food);
        }
      });
    });
    return foods;
  }

  public created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    const url = debug ? '' : '/api/goods';
    axios.get(url).then((res) => {
      const data = res.data;
      if (data.errno === ERR_OK) {
        this.goods = data.data;
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        });
      }
    });
  }

  public selectMenu(index: number, event: VEvent) {
    if (!event._constructed) {
      return;
    }
    const foodList = this.$refs.foodList as Element[];
    const el = foodList[index];
    this.foodsScroll.scrollToElement(el, 300);
  }
  public selectFood(food: Food, event: VEvent) {
    if (event._constructed) {
      return;
    }
    this.selectedFood = food;
    const el: any = this.$refs.food;
    el.show();
  }
  public addFood(target: Element) {
    this._drop(target);
  }
  private _drop(target: Element) {
    this.$nextTick(() => {
      const el: any = this.$refs.shopcart;
      el.drop(target);
    });
  }
  private _initScroll() {
    this.menuScroll = new BScroll(this.$refs.menuWrapper as Element, {
      click: true,
    });
    this.foodsScroll = new BScroll(this.$refs.foodsWrapper as Element, {
      click: true,
      probeType: 3,
    });
    this.foodsScroll.on('scroll', (pos: {y: number}) => {
      if (pos.y <= 0) {
        this.scrollY = Math.abs(Math.round(pos.y));
      }
    });
  }
  private _calculateHeight() {
    const foodList = this.$refs.foodList as Element[];
    let height: number = 0;
    this.listHeight.push(height);
    foodList.forEach(el => {
      height += el.clientHeight;
      this.listHeight.push(height);
    });
  }
  private _followScroll(index: number) {
    const menuList = this.$refs.menuList as Element[];
    const el = menuList[index];
    this.menuScroll.scrollToElement(el, 300, 0, -100);
  }
}
