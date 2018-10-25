import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { EditorNav } from '../components';
import CodeEditor from '../components/CodeEditor';
import { SLayout, styled } from '../styledComponents';
import { IAppStore } from '../stores/AppStore';

interface IProps {
  appStore?: IAppStore;
}

const PageContainer = styled.div`
  /* padding: 20px 20px; */
`;

@inject('appStore')
@observer
export default class Editor extends React.Component<IProps> {
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
