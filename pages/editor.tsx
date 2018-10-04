import * as React from 'react';
import { observer } from 'mobx-react';
import CodeEditor from '../components/CodeEditor';

interface IEditorProps {}

@observer
export default class Editor extends React.Component<IEditorProps> {
  render() {
    return (
      <>
        <CodeEditor />
      </>
    );
  }
}
