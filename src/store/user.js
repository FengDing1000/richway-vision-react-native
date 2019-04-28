import { observable, action } from 'mobx';

class User {
    @observable user;

    constructor() {
      this.user = {}; // 初始化变量，可以定义默认值
    }

    @action // 方法推荐用箭头函数的形式
    setUser = (res) => {
      this.user = res;
    };
}

const obj = new User();

export default obj;
