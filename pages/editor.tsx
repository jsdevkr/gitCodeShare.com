import * as React from 'react';
import { observer } from 'mobx-react';
import CodeEditor from '../components/CodeEditor';
import { styled } from '../styledComponents';

interface IEditorProps {}

const PageContainer = styled.div`
  padding: 20px 20px;
`;

@observer
export default class Editor extends React.Component<IEditorProps> {
  render() {
    return (
      <PageContainer>
        <CodeEditor />
      </PageContainer>
    );
  }
}
