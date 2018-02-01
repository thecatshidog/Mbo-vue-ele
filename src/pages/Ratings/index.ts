import RatingSelect from '@/components/ratingSelect/index.vue';
import Split from '@/components/split/index.vue';
import Star from '@/components/star/index.vue';
import { formatDate } from '@/utils/date.ts';
import axios from 'axios';
import BScroll from 'better-scroll';
import Vue from 'vue';
import Component from 'vue-class-component';

const ALL = 2;
const ERR_OK = 0;
const debug = false; // process.env.NODE_ENV !== 'production';

@Component({
  props: {
    seller: {
      type: Object,
    },
  },
  filters: {
    formatDate(time: number) {
      const date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    },
  },
  components: {
    Star,
    Split,
    RatingSelect,
  },
})
export default class Ratings extends Vue {
  public ratings = [];
  public selectType = ALL;
  public onlyContent = true;

  public scroll: any;

  public created() {
    const url = debug ? '' : '/api/ratings';
    axios.get(url).then((res) => {
      const data = res.data;
      if (data.errno === ERR_OK) {
        this.ratings = data.data;
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratings as Element, {
            click: true,
          });
        });
      }
    });
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
