import VHeader from '@/components/VHeader/index.vue';
import urlParse from '@/utils/urlParse';
import axios from 'axios';
import Vue from 'vue';
import Component from 'vue-class-component';

const ERR_OK = 0;
// const debug = false; // process.env.NODE_ENV !== 'production';

@Component({
  components: {
    VHeader,
  },
})
export default class App extends Vue {
  public seller = {
    id: (() => {
      const queryParam = urlParse();
      return queryParam.id;
    })(),
  };
  public created() {
    const url = '/api/seller';
    axios.get(url + '?id=' + this.seller.id).then((response) => {
      const data = response.data;
      if (data.errno === ERR_OK) {
        const res = data.data;
        this.seller = Object.assign({}, this.seller, res);
      }
    });
  }
}
