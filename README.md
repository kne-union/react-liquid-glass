
# react-liquid-glass


### 描述

用于实现一个liquid glass效果


### 安装

```shell
npm i --save @kne/react-liquid-glass
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

| 属性 | 类型 | 默认值 | 说明 |
|----|----|-----|----|
|    |    |     |    |
