import * as React from 'react';

import { Controlled as CodeMirror } from 'react-codemirror2';
import {
  LANGUAGES,
  THEMES,
  DEFAULT_LANGUAGE,
  DEFAULT_THEME,
  DEFAULT_CODE,
  DEFAULT_SETTINGS,
} from '../common/constants';
import { Menu, Dropdown, Button, Icon } from 'antd';
import { EditorConfiguration } from 'codemirror';

if (typeof navigator !== 'undefined') {
  LANGUAGES.map(lang => require(`codemirror/mode/${lang.mode}/${lang.mode}`));
}

interface IEditorProps {}
interface IEditorState extends EditorConfiguration {
  language: string;
  themeName: string;
}

class Editor extends React.Component<IEditorProps, IEditorState> {
  state = {
    value: DEFAULT_CODE,
    mode: DEFAULT_LANGUAGE.mode,
    theme: DEFAULT_THEME.id,
    language: DEFAULT_LANGUAGE.name,
    themeName: DEFAULT_THEME.name,
  };

  render() {
    const options = {
      ...DEFAULT_SETTINGS,
      mode: this.state.mode,
      theme: this.state.theme,
      lineNumbers: true,
      scrollBarStyle: null,
      viewportMargin: Infinity,
      lineWrapping: true,
    };

    const handleLanguageMenuClick = e => {
      this.setState({
        mode: e.item.props.menu.mode,
        language: e.item.props.menu.name,
      });
    };
    const handleThemeMenuClick = e => {
      this.setState({
        theme: e.item.props.menu.id,
        themeName: e.item.props.menu.name,
      });
    };
    const menu = (menuItems, clickHandler) => (
      <Menu onClick={clickHandler}>
        {menuItems.map(menu => (
          <Menu.Item key={menu.name} menu={menu}>
            {menu.name}
          </Menu.Item>
        ))}
      </Menu>
    );
    return (
      <>
        <CodeMirror
          className={`CodeMirror__container`}
          onBeforeChange={(editor, data, value) => {
            this.setState({ value });
          }}
          value={this.state.value}
          options={options}
        />
        <Dropdown overlay={menu(THEMES, handleThemeMenuClick)} trigger={['click']}>
          <Button style={{ marginLeft: 8 }}>
            {this.state.themeName} <Icon type="down" />
          </Button>
        </Dropdown>
        <Dropdown overlay={menu(LANGUAGES, handleLanguageMenuClick)} trigger={['click']}>
          <Button style={{ marginLeft: 8 }}>
            {this.state.language} <Icon type="down" />
          </Button>
        </Dropdown>
      </>
    );
  }
}

export default Editor;
