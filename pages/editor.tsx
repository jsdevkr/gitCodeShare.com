import * as React from 'react';

import { Controlled as CodeMirror } from 'react-codemirror2';

interface IEditorProps {}
interface IEditorState {
  value: string;
}

class Editor extends React.Component<IEditorProps, IEditorState> {
  state = {
    value: '',
  };

  render() {
    const config = {
      paddingVertical: '48px',
      paddingHorizontal: '32px',
      marginVertical: '45px',
      marginHorizontal: '45px',
      backgroundImage: null,
      backgroundImageSelection: null,
      backgroundMode: 'color',
      // backgroundColor: DEFAULT_BG_COLOR,
      dropShadow: true,
      dropShadowOffsetY: '20px',
      dropShadowBlurRadius: '68px',
      // theme: DEFAULT_THEME.id,
      windowTheme: 'none',
      // language: DEFAULT_LANGUAGE,
      fontFamily: 'Hack',
      fontSize: '14px',
      lineHeight: '133%',
      windowControls: true,
      widthAdjustment: true,
      lineNumbers: false,
      exportSize: '2x',
      titleBar: '',
      watermark: false,
      squaredImage: false,
      timestamp: false,
    };
    const options = {
      lineNumbers: true,
      mode: 'plaintext',
      theme: 'vs',
      scrollBarStyle: null,
      viewportMargin: Infinity,
      lineWrapping: true,
      extraKeys: { 'Shift-Tab': 'indentLess' }, // negative values removes the cursor, undefined means default (530)
      cursorBlinkRate: -1,
    };
    return (
      <CodeMirror
        className={`CodeMirror__container window-theme__${config.windowTheme}`}
        onBeforeChange={(editor, data, value) => {
          this.setState({ value });
        }}
        value={this.state.value}
        options={options}
      />
    );
  }
}

export default Editor;
