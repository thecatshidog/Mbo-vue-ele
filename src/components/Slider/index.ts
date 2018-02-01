import Vue from 'vue';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import Component from 'vue-class-component';

@Component({
  props: {
    options: {
      type: Object,
      default() {
        return {
          autoplay: true,
          loop: true,
          pagination: {
            el: '.swiper-pagenition',
          },
          notNextTick: false,
        };
      },
    },
    items: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    swiper,
    swiperSlide,
  },
})
export default class Slider extends Vue {

}
