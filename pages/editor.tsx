import * as React from 'react';
import { observer } from 'mobx-react';
import { EditorNav } from '../components';
import CodeEditor from '../components/CodeEditor';
import { SLayout, styled } from '../styledComponents';

interface IEditorProps {}

const PageContainer = styled.div`
  /* padding: 20px 20px; */
`;

@observer
export default class Editor extends React.Component<IEditorProps> {
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
