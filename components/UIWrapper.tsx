import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { IAppStore } from '../stores/AppStore';
import { Spin } from 'antd';

interface IProps {
  appStore?: IAppStore;
}

@inject('appStore')
@observer
class UIWrapper extends React.Component<IProps> {
  render() {
    const { appStore } = this.props;
    const { spinning, spinningTip } = appStore;

    return (
      <Spin spinning={spinning} size="large" tip={spinningTip}>
        {this.props.children}
      </Spin>
    );
  }
}

export default UIWrapper;
