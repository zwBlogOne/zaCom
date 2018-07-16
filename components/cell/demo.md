## 列表项 Cell

:::demo 基本用法
```jsx
import { Cell } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Cell title="标题文字" />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 带描述
```jsx
import { Cell, Icon } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Cell title="标题文字" description="描述文字" />
        <Cell title="标题文字" description={<Icon type="right" />} />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 带图标、描述
```jsx
import { Cell, Icon } from 'zarm';

const img = 'https://static.zhongan.com/website/health/zarm/images/icons/state.png';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Cell title="标题文字" icon={<Icon type="right" />} />
        <Cell title="标题文字" icon={<img alt="" src={img} />} />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 带跳转
```jsx
import { Cell } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Cell title="标题文字" onClick={() => {}} />
        <Cell title="标题文字" onClick={() => {}} />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 带描述、箭头、跳转
```jsx
import { Cell } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Cell hasArrow title="标题文字" description="描述文字" onClick={() => {}} />
        <Cell hasArrow title="标题文字" description="描述文字" onClick={() => {}} />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 带图标、描述、箭头、跳转
```jsx
import { Cell, Icon } from 'zarm';

const img = 'https://static.zhongan.com/website/health/zarm/images/icons/state.png';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Cell hasArrow title="标题文字" description="描述文字" icon={<Icon type="right" />} onClick={() => {}} />
        <Cell hasArrow title="标题文字" description="描述文字" icon={<img alt="" src={img} />} onClick={() => {}} />
        <Cell
          hasArrow
          title={
            <div className="box">
              <div className="box-title">标题文字</div>
              <div className="box-description">描述文字</div>
            </div>
          }
          description="附加提示"
          icon={<img alt="" src={img} />}
          onClick={() => {}}
        />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 提示信息
```jsx
import { Cell, Message, Icon, Input } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Cell
          title="标题"
          help={<Message theme="error" icon={<Icon type="info-round" />}>标题不能为空</Message>}
        >
          <Input type="text" placeholder="请输入标题" />
        </Cell>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::



:::api API

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-cell | | 类名前缀 |
| className | string | | | 追加类名 |
| theme | string | `primary` | `default`, `primary`, `info`, `success`, `warning`, `error` | 主题 |
| icon | any | | | 显示的图标 |
| titile | any | | | 标题 |
| description | any | | | 描述 |
| hasArrow | boolean | false | | 是否显示箭头 |
| help | any | | | 下方提示信息，通常配合`Message`组件使用 |
| onClick | <code>() => void</code> | noop | | 点击后触发的回调函数 |

:::