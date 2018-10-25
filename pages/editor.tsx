import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { EditorNav } from '../components';
import CodeEditor from '../components/CodeEditor';
import { SLayout, styled } from '../styledComponents';
import { IAppStore } from '../stores/AppStore';
import { appStoreInstance } from '../stores/create';
import { decodeParams as decode } from '../common/utils';

interface IProps {
  appStore?: IAppStore;
}

const PageContainer = styled.div`
  /* padding: 20px 20px; */
`;

@inject('appStore')
@observer
export default class Editor extends React.Component<IProps> {
  static async getInitialProps({ query }: { query: any }) {
    const appStore: IAppStore = appStoreInstance.get();
    if (query.state) {
      const state = decode(query.state);
      state && state.code && appStore.editor.setCode(state.code);
    } else {
      try {
        const gistId = Object.keys(query)[0];
        if (gistId) {
          await appStore.editor.getGist(gistId);
        } else {
          await appStore.editor.clear();
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  render() {
    return (
      <SLayout>
        <EditorNav />
        <PageContainer>
          <CodeEditor />
        </PageContainer>
      </SLayout>
    );
  }
}
