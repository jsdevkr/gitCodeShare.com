import * as React from 'react';
import 'isomorphic-unfetch';
// import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';

interface IProps {
  editorStore?: object;
}

@inject('appStore')
@observer
class Editor extends React.Component<IProps> {
  /*
  static async getInitialProps() {
    // NOTE : fetch base url
    console.log(process.env.BACKEND_URL);
    return Promise.resolve({});

  }
  */

  render() {
    const { editorStore } = this.props;
    console.log(editorStore);

    return <>Mock Editor</>;
  }
}

export default Editor;
