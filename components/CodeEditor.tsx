import * as React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { LANGUAGES, THEMES, FONTS } from '../common/constants';
import { observer, inject } from 'mobx-react';
import { Dropdown, Button, Icon, InputNumber, Switch } from 'antd';
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

// const PageContainer = styled.div`
//   padding: 20px 20px;
// `;

const InputFontNumber = styled(InputNumber as any)`
  position: absolute;
  margin-left: 120px;
  &.ant-input-number {
    border: solid 1px #dbe3e9;
    transition: none;
    background-color: transparent;
    color: ${props => props.theme.primaryTextColor};
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;
const LineSwitch = styled(Switch as any)`
  position: absolute;
  margin-left: 120px;

  &.ant-switch {
    border: solid 1px #dbe3e9;
    transition: none;
    background-color: rgba(255, 255, 255, 0.25);
  }
  &.ant-switch-checked {
    border: solid 1px #dbe3e9;
    transition: none;
    background-color: transparent;
  }
`;

const FontDropDown = styled(Dropdown as any)`
  position: absolute;
  margin-left: 120px;
`;

const EditorContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  border: solid 1px ${props => props.theme.patternBlue};
  overflow: hidden;
`;

const EditorHeader = styled.div`
  display: flex;
  position: relative;
  background-color: black;
  min-width: 100%;
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
  height: calc(100% - 130px);
  /* border-bottom-left-radius: inherit; */
  /* border-bottom-right-radius: inherit; */
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
  z-index: 6;
  transition: right 0.3s cubic-bezier(0.9, 0, 0.3, 0.7);
`;

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  margin-left: 30px;
`;

const ViewsBottom = styled.div`
  height: 70px;
  position: relative;
  display: flex;
  align-items: center;
`;

const HorizontalDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #dbe3e9;
  z-index: 100;
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
          <HorizontalDivider />
          <EditorBody>
            <CodeMirror onBeforeChange={editor.onBeforeCodeChange} value={editor.code} options={options} />
          </EditorBody>
          <HorizontalDivider />
          <OptionDrawer style={{ right: editor.optionDrawerVisible ? 0 : '-378px' }}>
            <OptionCloseButton onClick={_ => editor.setOptionDrawerVisible(false)}>
              <Icon type="menu-unfold" />
            </OptionCloseButton>
            <OptionItem>
              <span>Font-Size</span>
              <InputFontNumber spare-margin min={10} max={20} value={editor.fontSize} onChange={editor.setFontSize} />
            </OptionItem>
            <OptionItem>
              <span>Font-Family</span>
              <FontDropDown overlay={DropdownMenu(FONTS, editor.setFontFamily)} trigger={['click']}>
                <DropDownButton>
                  {editor.fontFamily.name} <Icon type="caret-down" />
                </DropDownButton>
              </FontDropDown>
            </OptionItem>
            <OptionItem>
              <span>Line-Number</span>
              <LineSwitch defaultChecked onChange={editor.setLineNumbers} />
            </OptionItem>
          </OptionDrawer>
          {!editor.gistId && (
            <ViewsBottom>
              <LineButton style={{ position: 'absolute', right: '20px' }} onClick={editor.createGist}>
                Save & Share to Facebook
              </LineButton>
            </ViewsBottom>
          )}
        </EditorContainer>
        <style jsx>{`
          .react-codemirror2 {
            box-shadow: rgba(0, 0, 0, 0.55) 0px 20px 68px;
            width: 100%;
            height: 100%;
            margin: 50px;
            width: 100%;
          }
          .CodeMirror {
            width: 100%;
            height: 100%;
            max-width: 760px;
            height: auto;
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
