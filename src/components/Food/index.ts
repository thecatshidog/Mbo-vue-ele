import cartcontrol from '@/components/CartControl/index.vue';
import ratingselect from '@/components/ratingSelect/index.vue';
import split from '@/components/split/index.vue';
import { formatDate } from '@/utils/date.ts';
import BScroll from 'better-scroll';
import Vue from 'vue';
import Component from 'vue-class-component';

const ALL = 2;
interface Rating {
  username: string;
  rateTime: number;
  rateType: number;
  text: string;
  avatar: string;
}

interface IFood {
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

@Component({
  props: {
    food: {
      type: Object,
      default: {},
    },
  },
  components: {
    cartcontrol,
    ratingselect,
    split,
  },
  filters: {
    formatDate(time: string) {
      const date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    },
  },
})
export default class Food extends Vue {
  public showFlag = false;
  public selectType: number = ALL;
  public onlyContent = true;
  public desc = {
    all: '全部',
    positive: '推荐',
    negative: '吐槽',
  };

  public scroll: any;
  public food: IFood;
  public show() {
    this.showFlag = true;
    this.selectType = ALL;
    this.onlyContent = true;
    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.food as Element, {
          click: true,
        });
      } else {
        this.scroll.refresh();
      }
    });
  }
  public hide() {
    this.showFlag = false;
  }
  public addFirst(event: VEvent) {
    if (!event._constructed) {
      return;
    }
    this.$emit('add', event.target);
    Vue.set(this.food, 'count', 1);
  }
  public needShow(type: number, text: string) {
    if (this.onlyContent && !text) {
      return false;
    }
    if (this.selectType === ALL) {
      return true;
    } else {
      return type === this.selectType;
    }
  }
  public addFood(target: string) {
    this.$emit('add', target);
  }
  public selectRating(type: number) {
    this.selectType = type;
    this.$nextTick(() => {
      this.scroll.refresh();
    });
  }
  public toggleContent() {
    this.onlyContent = !this.onlyContent;
    this.$nextTick(() => {
      this.scroll.refresh();
    });
  }
}
