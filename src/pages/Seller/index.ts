import split from '@/components/split/index.vue';
import star from '@/components/star/index.vue';
import { loadFromLocal, saveToLocal } from '@/utils/store';
import BScroll from 'better-scroll';
import Vue from 'vue';
import Component from 'vue-class-component';

interface ISeller {
  id: number;
  pics: string;
}

@Component({
  props: {
    seller: {
      type: Object,
    },
  },
  watch: {
    seller() {
      this.$nextTick(() => {
        this._initScroll();
        this._initPics();
      });
    },
  },
  components: {
    star,
    split,
  },
})
export default class Seller extends Vue {
  public seller: ISeller;
  public classMap: string[];
  public scroll: any;
  public picScroll: any;
  public favorite = (() => {
    return loadFromLocal(this.seller.id, 'favorite', false);
  })();
  get favoriteText() {
    return this.favorite ? '已收藏' : '收藏';
  }

  public created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  }
  public mounted() {
    this.$nextTick(() => {
      this._initScroll();
      this._initPics();
    });
  }
  public toggleFavorite(event: VEvent) {
    if (!event._constructed) {
      return;
    }
    this.favorite = !this.favorite;
    saveToLocal(this.seller.id, 'favorite', this.favorite);
  }
  public _initScroll() {
    if (!this.scroll) {
      this.scroll = new BScroll(this.$refs.seller as Element, {
        click: true,
      });
    } else {
      this.scroll.refresh();
    }
  }
  public _initPics() {
    if (this.seller.pics) {
      const picWidth = 120;
      const margin = 6;
      const width = (picWidth + margin) * this.seller.pics.length - margin;
      (this.$refs.picList as HTMLElement).style.width = width + 'px';
      this.$nextTick(() => {
        if (!this.picScroll) {
          this.picScroll = new BScroll(this.$refs.picWrapper as Element, {
            scrollX: true,
            eventPassthrough: 'vertical',
          });
        } else {
          this.picScroll.refresh();
        }
      });
    }
  }
}
