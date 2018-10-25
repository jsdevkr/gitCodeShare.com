import * as React from 'react';
import { inject, observer } from 'mobx-react';
import CodeEditor from '../components/CodeEditor';
import { styled } from '../styledComponents';
import { IAppStore } from '../stores/AppStore';

interface IProps {
  appStore?: IAppStore;
}

const PageContainer = styled.div`
  background-color: black;
`;

@inject('appStore')
@observer
export default class Editor extends React.Component<IProps> {
  render() {
    return (
      <PageContainer id="gitCodeShare">
        <CodeEditor />
      </PageContainer>
    );
  }
}
