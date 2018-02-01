import Vue from 'vue';
import Component from 'vue-class-component';

const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

interface IRatings {
  rateType: number;
}

@Component({
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      },
    },
    selectType: {
      type: Number,
      default: ALL,
    },
    onlyContent: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意',
        };
      },
    },
  },
})
export default class RatingSelect extends Vue {

  public ratings: IRatings[];

  get positives() {
    return this.ratings.filter((rating) => {
      return rating.rateType === POSITIVE;
    });
  }
  get negatives() {
    return this.ratings.filter((rating) => {
      return rating.rateType === NEGATIVE;
    });
  }

  public select(type: number, event: VEvent) {
    if (!event._constructed) {
      return;
    }
    this.$emit('select', type);
  }
  public toggleContent(event: VEvent) {
    if (!event._constructed) {
      return;
    }
    this.$emit('toggle');
  }

}
