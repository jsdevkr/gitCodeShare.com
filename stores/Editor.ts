import debounce from 'lodash.debounce';
import { highlightAuto } from 'highlight.js';
import {
  FONTS_HASH,
  DEFAULT_THEME,
  DEFAULT_CODE,
  DEFAULT_LANGUAGE,
  DEFAULT_FONT,
  LANGUAGES_NAME_HASH,
  THEMES_NAME_HASH,
  LANGUAGES_MODE_HASH,
  LANGUAGES_SHORT_HASH,
} from './../common/constants';
import { Instance, types } from 'mobx-state-tree';

const Language = types.model('Language', {
  mode: types.string,
  name: types.string,
  mime: types.maybe(types.string),
  short: types.maybe(types.string),
});

const Theme = types.model('Theme', {
  id: types.string,
  name: types.string,
});

const Font = types.model('Font', {
  id: types.string,
  name: types.string,
});

export interface ILanguage extends Instance<typeof Language> {}

const detectedLanguage = debounce(code => {
  const _detectedLanguage = highlightAuto(code).language;
  const language = LANGUAGES_MODE_HASH[_detectedLanguage] || LANGUAGES_SHORT_HASH[_detectedLanguage];
  return language && (language.mime || language.mode);
}, 100);

export const Editor = types
  .model('Editor', {
    code: types.optional(types.string, DEFAULT_CODE),
    fontFamily: types.optional(Font, DEFAULT_FONT),
    fontSize: types.optional(types.integer, 14),
    optionDrawerVisible: types.optional(types.boolean, false),
    language: types.optional(Language, DEFAULT_LANGUAGE),
    theme: types.optional(Theme, DEFAULT_THEME),
    lineNumbers: types.optional(types.boolean, true),
  })
  .actions(self => ({
    setFontFamily: e => (self.fontFamily = FONTS_HASH[e.key]),
    setFontSize: v => (self.fontSize = v),
    setOptionDrawerVisible: v => (self.optionDrawerVisible = v),
    setLanguage: e => (self.language = LANGUAGES_NAME_HASH[e.key]),
    setTheme: e => (self.theme = THEMES_NAME_HASH[e.key]),
    onBeforeCodeChange: (_, $, code) => (self.code = code),
  }))
  .views(self => ({
    get languageMode() {
      if (self.language.mode === 'auto') {
        return detectedLanguage(self.code);
      }
      return self.language.mode;
    },
  }));

export interface IEditor extends Instance<typeof Editor> {}

const editor = Editor.create({});

export default editor;
