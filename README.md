
# react-liquid-glass


### 描述

用于实现一个liquid glass效果


### 安装

```shell
npm i --save @kne/react-liquid-glass
```


### 概述

### 项目概述

这是一个基于 React 的液态玻璃效果项目，旨在通过动态视觉效果增强用户界面的交互体验。

#### 主要功能
- 液态玻璃动态效果渲染
- 响应式设计，适配不同屏幕尺寸
- 可配置的参数化效果控制

***

#### 注意

* 需要同时引入样式文件

```js
import LiquidGlass from '@kne/react-liquid-glass';
import '@kne/react-liquid-glass/dist/index.css';
```

### 示例


#### 示例样式

```scss
.glass-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  border-radius: 40px;
  padding: 40px;
  z-index: 9999;
  color: #FFF;

  h2 {
    text-shadow: #000000 0 0 8px;
    opacity: 0.8;
  }
}
```

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _ReactLiquidGlass(@kne/current-lib_react-liquid-glass)[import * as _ReactLiquidGlass from "@kne/react-liquid-glass"],(@kne/current-lib_react-liquid-glass/dist/index.css),bgImage(./doc/bg.jpeg),antd(antd)

```jsx
const { default: ReactLiquidGlass } = _ReactLiquidGlass;
const { default: bg } = bgImage;
const { Slider, Flex } = antd;
const { useState } = React;

const BaseExample = () => {
  const [options, setOptions] = useState({
    scale: 1,
    blur: 0.25,
    brightness: 1.05,
    contrast: 1.2
  });
  return (
    <div>
      <Flex vertical>
        <Flex align="center">
          <div>Scale:</div>
          <Slider
            style={{ width: '200px' }}
            min={0}
            max={2}
            step={0.1}
            value={options.scale}
            onChange={value => {
              setOptions(options => {
                return Object.assign({}, options, { scale: value });
              });
            }}
          />
        </Flex>
        <Flex align="center">
          <div>Blur:</div>
          <Slider
            style={{ width: '200px' }}
            min={0}
            max={3}
            step={0.01}
            value={options.blur}
            onChange={value => {
              setOptions(options => {
                return Object.assign({}, options, { blur: value });
              });
            }}
          />
        </Flex>
        <Flex align="center">
          <div>Brightness:</div>
          <Slider
            style={{ width: '200px' }}
            min={0}
            max={2}
            step={0.01}
            value={options.brightness}
            onChange={value => {
              setOptions(options => {
                return Object.assign({}, options, { brightness: value });
              });
            }}
          />
        </Flex>
        <Flex align="center">
          <div>Contrast:</div>
          <Slider
            style={{ width: '200px' }}
            min={0}
            max={2}
            step={0.01}
            value={options.contrast}
            onChange={value => {
              setOptions(options => {
                return Object.assign({}, options, { contrast: value });
              });
            }}
          />
        </Flex>
      </Flex>
      <ReactLiquidGlass className="glass-container" {...options}>
        <h2>React Liquid Glass</h2>
      </ReactLiquidGlass>
      <img src={bg} alt="背景图片" style={{ width: '100%' }} />
    </div>
  );
};

render(<BaseExample />);

```


### API

| 名称 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| className | string | 无 | 自定义类名 |
| children | ReactNode | 无 | 子组件 |
| responsiveBorder | boolean | true | 是否启用响应式边框效果 |
| dpi | number | 1.2 | 分辨率比例 |
| scale | number | 1 | 缩放比例 |
| blur | number | 0.25 | 模糊效果强度 |
| contrast | number | 1.2 | 对比度 |
| brightness | number | 1.05 | 亮度 |
| saturate | number | 1.1 | 饱和度 |
