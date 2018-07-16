import React, { PureComponent, CSSProperties } from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  UIManager,
  Animated,
  Easing,
} from 'react-native';
import PropsType from './PropsType';
import popupStyle from './style/index.native';
// import Mask from '../Mask';

export interface PopupProps extends PropsType {
  style?: CSSProperties;
  styles?: typeof popupStyle;
}

const popupStyles = StyleSheet.create<any>(popupStyle);

export default class Popup extends PureComponent<PopupProps, any> {
  static defaultProps = {
    visible: false,
    mask: true,
    direction: 'bottom',
    autoClose: false,
    stayTime: 3000,
    animationDuration: 200,
    styles: popupStyles,
  };
  private timer: number;

  constructor(props) {
    super(props);
    this.state = {
      isMaskShow: props.visible || false,
      isPending: false,
      isShow: false,
      animationState: 'enter',
      directionStyle: {},
      transfromStyle: {},
      translateValue: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.state.translateValue.addListener((value) => {
      this.animationEnd(value);
    });
    if (this.props.visible) {
      // this.enter(this.props);
      this.setState({
        isShow: true,
      });
    }
  }

  componentWillUnmount() {
    this.state.translateValue.removeAllListeners();
  }

  componentWillReceiveProps(nextProps) {
    clearTimeout(this.timer);
    if (nextProps.visible) {
      this.enter(nextProps);
    } else {
      this.leave(nextProps);
    }
  }

  enter = ({ stayTime, autoClose, onMaskClick, direction, animationDuration }) => {
    let transfromStyle = {};
    let newValue;
    if (direction === 'bottom') {
      transfromStyle = { transform: [{ translateY: this.state.translateValue }] };
      newValue = this.state.directionStyle[direction];
    } else if (direction === 'top') {
      transfromStyle = { transform: [{ translateY: this.state.translateValue }] };
      newValue = -this.state.directionStyle[direction];
    } else if (direction === 'left') {
      transfromStyle = { transform: [{ translateX: this.state.translateValue }] };
      newValue = -this.state.directionStyle[direction];
    } else {
      transfromStyle = { transform: [{ translateX: this.state.translateValue }] };
      newValue = this.state.directionStyle[direction];
    }
    this.setState({
      isMaskShow: true,
      isPending: true,
      animationState: 'enter',
      transfromStyle: transfromStyle,
    });

    Animated.timing(
      this.state.translateValue,
      {
        toValue: newValue,
        duration: animationDuration,
        easing: Easing.linear,
      }).start();
    if (stayTime > 0 && autoClose) {
      this.timer = setTimeout(() => {
        onMaskClick();
        clearTimeout(this.timer);
      }, stayTime);
    }
  }

  leave = ({ animationDuration, visible }) => {
    this.setState({
      // isPending: false,
      animationState: 'leave',
      isMaskShow: visible || false,
    });
    Animated.timing(
      this.state.translateValue,
      {
        toValue: 0,
        duration: animationDuration,
        easing: Easing.linear,
      }).start();
  }

  animationEnd = (value) => {
    const { onClose } = this.props;

    if (this.state.animationState === 'leave' && value.value === 0 && this.state.isPending) {
      this.setState({
        isPending: false,
      });
      if (typeof onClose === 'function') {
        onClose();
      }
    }
  }

  renderMask = () => {
    return null;
    // const { mask, maskType, onMaskClick, styles, direction } = this.props;
    // const { isMaskShow } = this.state;
    // const maskStyle = [
    //   styles![`${direction}Mask`],
    // ];
    // return mask && (
    //     <Mask
    //       visible={isMaskShow}
    //       type={maskType}
    //       onClose={onMaskClick}
    //       style={maskStyle}
    //     />
    //   );
  }

  onLayout = (e, direction, that) => {
    let directionStyle = {};
    UIManager.measure(e.target, (_x, _y, width, height, _pageX, _pageY) => {
      if (direction === 'bottom' || direction === 'top') {
        directionStyle[direction] = -height;
      } else {
        directionStyle[direction] = -width;
      }
      that.setState({ directionStyle: directionStyle });
      if (that.state.isShow) {
        that.enter(that.props);
        that.setState({ isShow: false });
      }
    });
  }

  render() {
    const { direction, styles, children, style } = this.props;
    const { directionStyle, transfromStyle } = this.state;

    const popupCls = [
      styles!.wrapperStyle,
      styles![`${direction}Wrapper`],
      style,
    ] as ViewStyle;

    const invisibleStyle = [
      styles!.invisibleWrapper,
      styles![`${direction}Invisible`],
    ] as ViewStyle;

    const popUpStyle = [popupCls, directionStyle, transfromStyle];

    return (
      <View style={invisibleStyle}>
        <Animated.View style={popUpStyle} onLayout={(e) => this.onLayout(e, direction, this)}>
          {children}
        </Animated.View>
        {this.renderMask()}
      </View>
    );
  }
}
