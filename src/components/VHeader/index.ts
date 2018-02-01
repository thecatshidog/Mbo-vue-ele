import Star from '@/components/star/index.vue';
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    seller: {
      type: Object,
      default: {},
    },
  },
  components: {
    Star,
  },
})
export default class Vheader extends Vue {
  public detailShow = false;
  public classMap: string[] = [];
  public showDetail() {
    this.detailShow = true;
  }
  public hideDetail() {
    this.detailShow = false;
  }
  public created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  }
}
