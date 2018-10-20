import * as React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { LANGUAGES, THEMES, FONTS } from '../common/constants';
import { observer, inject } from 'mobx-react';
import { Dropdown, Button, Icon, InputNumber } from 'antd';
import { DropDownButton, EditorDropDown, styled, LineButton } from '../styledComponents';
import { DropdownMenu } from './DropdownMenu';
import { IAppStore } from 'stores/AppStore';

if (typeof navigator !== 'undefined') {
  LANGUAGES.filter(lang => lang.mode !== 'auto').map(lang => require(`codemirror/mode/${lang.mode}/${lang.mode}`));
}

declare module 'react' {
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean;
  }
}

const EditorContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  border-radius: 4px;
  border: solid 1px #dbe3e9;
  overflow: hidden;
`;

const EditorHeader = styled.div`
  display: flex;
  position: relative;
  background-color: black;
  min-width: 100%;
  border-bottom: solid 1px #dbe3e9;
  height: 60px;
  align-items: center;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
`;

const EditorBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #202020;
  width: 100%;
  height: calc(100% - 60px);
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
`;

const OptionsButton = styled(Button as any)`
  &.ant-btn {
    position: absolute;
    right: 0;
    background-color: transparent;
    border: none;
    border-radius: 0px;
    height: 60px;
    border-top-right-radius: 1px;
    transition: none;
    justify-self: right;
    padding: 0 28px;

    &:hover {
      color: inherit;
      background-color: rgba(255, 255, 255, 0.1);
    }
    .anticon {
      margin-left: 0px;
      vertical-align: -0.2em;
      font-size: 18px;
    }
  }
`;

const OptionCloseButton = styled(Button as any)`
  &.ant-btn {
    height: 60px;
    background-color: transparent;
    border: none;
    border-radius: 0;
    transition: none;
    padding: 0 28px;

    &:hover {
      color: inherit;
      background-color: rgba(255, 255, 255, 0.1);
    }
    .anticon {
      margin-left: 0px;
      font-size: 18px;
    }
  }
`;

const OptionDrawer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 370px;
  background-color: #000000;
  border-left: solid 1px #dbe3e9;
  box-shadow: -7px 0 5px 0 rgba(0, 0, 0, 0.5);
  z-index: 2;
  transition: right 0.3s cubic-bezier(0.9, 0, 0.3, 0.7);
`;

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  margin-left: 30px;
`;

const ViewsBottom = styled.div`
  padding: 2rem 0 0;
  display: flex;
`;

interface ICodeEditorProps {
  appStore?: IAppStore;
  gistId?: string;
}

@inject('appStore')
@observer
export default class CodeEditor extends React.Component<ICodeEditorProps> {
  render() {
    const { editor } = this.props.appStore;

    const options = {
      mode: editor.mode,
      theme: editor.theme.id,
      lineNumbers: editor.lineNumbers,
      scrollBarStyle: null,
      viewportMargin: Infinity,
      lineWrapping: true,
    };

    return (
      <>
        <EditorContainer>
          <EditorHeader>
            <EditorDropDown overlay={DropdownMenu(THEMES, editor.setTheme)} trigger={['click']}>
              <DropDownButton style={{ marginRight: '15px', marginLeft: '30px' }}>
                {editor.theme.name} <Icon type="caret-down" />
              </DropDownButton>
            </EditorDropDown>
            <EditorDropDown overlay={DropdownMenu(LANGUAGES, editor.setLanguage)} trigger={['click']}>
              <DropDownButton>
                {editor.language.name} <Icon type="caret-down" />
              </DropDownButton>
            </EditorDropDown>
            <OptionsButton onClick={_ => editor.setOptionDrawerVisible(true)}>
              Options <Icon type="menu-fold" style={{ fontSize: '18px' }} />
            </OptionsButton>
          </EditorHeader>
          <EditorBody>
            <CodeMirror onBeforeChange={editor.onBeforeCodeChange} value={editor.code} options={options} />
          </EditorBody>
          <OptionDrawer style={{ right: editor.optionDrawerVisible ? 0 : '-378px' }}>
            <OptionCloseButton onClick={_ => editor.setOptionDrawerVisible(false)}>
              <Icon type="menu-unfold" />
            </OptionCloseButton>
            <OptionItem>
              <span>Font-Size</span>
              <InputNumber min={10} max={20} value={editor.fontSize} onChange={editor.setFontSize} />
            </OptionItem>
            <OptionItem>
              <span>Font-Family</span>
              <Dropdown overlay={DropdownMenu(FONTS, editor.setFontFamily)} trigger={['click']}>
                <Button>
                  {editor.fontFamily.name}
                  <Icon type="caret-down" />
                </Button>
              </Dropdown>
            </OptionItem>
            <OptionItem>Line-Number</OptionItem>
          </OptionDrawer>
        </EditorContainer>
        {!editor.gistId && (
          <ViewsBottom>
            <LineButton>Save & Share to Facebook</LineButton>
            <LineButton onClick={editor.createGist}>Save & Get Share Link</LineButton>
          </ViewsBottom>
        )}
        <style jsx>{`
          .react-codemirror2 {
            box-shadow: rgba(0, 0, 0, 0.55) 0px 20px 68px;
            width: 100%;
            height: 100%;
          }
          .CodeMirror {
            width: 100%;
            height: 100%;
            overflow: hidden;
            padding: 2px;
            border-radius: 5px;
            font-family: ${editor.fontFamily.id};
            font-size: ${editor.fontSize}px;
          }
        `}</style>
      </>
    );
  }
}
