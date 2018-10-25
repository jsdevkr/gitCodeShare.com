import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { IAppStore, IAlertMessage } from '../stores/AppStore';

import { Button, Modal, Divider } from 'antd';

interface IAppProps {
  appStore?: IAppStore;
}

@inject('appStore')
@observer
class Create extends React.Component<IAppProps> {
  alertClear = () => {
    const { alertClear } = this.props.appStore;
    alertClear();
  };
  handleOk = () => {
    // console.log('ok');
    this.alertClear();
  };
  handleCancel = () => {
    // console.log('cancel');
    this.alertClear();
  };

  render() {
    const { alertMessages } = this.props.appStore;

    if (alertMessages.length === 0) {
      return null;
    }

    return (
      <Modal
        width={400}
        visible={true}
        title={'Alert'}
        onCancel={this.handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={this.handleOk}>
            OK
          </Button>,
        ]}
      >
        {alertMessages.map((m: IAlertMessage, mIndex: number) => {
          return (
            <React.Fragment key={mIndex}>
              {mIndex ? <Divider /> : null}
              <p className={m.messageType}>{m.message}</p>
            </React.Fragment>
          );
        })}
      </Modal>
    );
  }
}

export default Create;
