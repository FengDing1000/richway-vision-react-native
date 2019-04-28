import { observable, action } from 'mobx';

class Tabs {
    @observable index;

    constructor() {
      this.index = 0; // 初始化变量，可以定义默认值
    }

    @action // 方法推荐用箭头函数的形式
    setIndex = (res) => {
      this.index = res;
    };
}

const obj = new Tabs();

export default obj;
