import { observable, action } from 'mobx';
import { View } from 'react-native';
import React from 'react';

class ImageLayer {
    @observable visibility;

    @observable image;

    constructor() {
      this.visibility = false; // 初始化变量，可以定义默认值
      this.image = <View />;
    }

    @action // 方法推荐用箭头函数的形式
    show = (res) => {
      this.visibility = true;
      this.image = res;
    };

    @action // 方法推荐用箭头函数的形式
    setHideView = () => {
      this.image = <View />;
    };

    @action // 方法推荐用箭头函数的形式
    hide = () => {
      this.visibility = false; // 初始化变量，可以定义默认值
    };
}

const obj = new ImageLayer();

export default obj;
