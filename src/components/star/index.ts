import Vue from 'vue';
import Component from 'vue-class-component';

const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';

@Component({
  props: {
    size: {
      type: Number,
    },
    score: {
      type: Number,
    },
  },
})
export default class Star extends Vue {
  public size: number;
  public score: number;
  get starType() {
    return 'star-' + this.size;
  }
  get itemClasses() {
    const result = [];
    const score = Math.floor(this.score * 2) / 2;
    const hasDecimal = score % 1 !== 0;
    const integer = Math.floor(score);
    for (let i = 0; i < integer; i++) {
      result.push(CLS_ON);
    }
    if (hasDecimal) {
      result.push(CLS_HALF);
    }
    while (result.length < LENGTH) {
      result.push(CLS_OFF);
    }
    return result;
  }
}
