import { tohash } from './utils';
import { EditorConfiguration } from 'codemirror';

export interface ILANGUAGE {
  name: string;
  mode: string;
  mime?: string;
  custom?: boolean;
  short?: string;
}

export const LANGUAGES: ILANGUAGE[] = [
  // {
  //   name: 'Auto',
  //   mode: 'auto',
  // },
  // {
  //   name: 'Apache',
  //   mode: 'apache',
  //   mime: 'text/apache',
  //   custom: true,
  // },
  {
    name: 'Bash',
    mode: 'shell',
    mime: 'application/x-sh',
  },
  // {
  //   name: 'Plain Text',
  //   mode: 'text',
  // },
  {
    name: 'C',
    mode: 'clike',
    mime: 'text/x-csrc',
    short: 'c',
  },
  {
    name: 'C++',
    mode: 'clike',
    mime: 'text/x-c++src',
    short: 'cpp',
  },
  {
    name: 'C#',
    mode: 'clike',
    mime: 'text/x-csharp',
    short: 'cs',
  },
  {
    name: 'Clojure',
    mode: 'clojure',
  },
  {
    name: 'Cobol',
    mode: 'cobol',
  },
  {
    name: 'CoffeeScript',
    mode: 'coffeescript',
  },
  {
    name: 'Crystal',
    mode: 'crystal',
  },
  {
    name: 'CSS',
    mode: 'css',
  },
  {
    name: 'D',
    mode: 'd',
  },
  {
    name: 'Dart',
    mode: 'dart',
  },
  {
    name: 'Diff',
    mode: 'diff',
    mime: 'text/x-diff',
  },
  {
    name: 'Django',
    mode: 'django',
  },
  {
    name: 'Docker',
    mode: 'dockerfile',
  },
  // {
  //   name: 'Elixir',
  //   mode: 'elixir',
  //   custom: true,
  // },
  {
    name: 'Elm',
    mode: 'elm',
  },
  {
    name: 'Erlang',
    mode: 'erlang',
  },
  {
    name: 'Fortran',
    mode: 'fortran',
  },
  {
    name: 'F#',
    mode: 'mllike',
  },
  // {
  //   name: 'GraphQL',
  //   mode: 'graphql',
  //   custom: true,
  // },
  {
    name: 'Go',
    mode: 'go',
  },
  {
    name: 'Groovy',
    mode: 'groovy',
  },
  {
    name: 'Handlebars',
    mode: 'handlebars',
  },
  {
    name: 'Haskell',
    mode: 'haskell',
  },
  {
    name: 'Haxe',
    mode: 'haxe',
  },
  {
    name: 'HTML',
    mode: 'htmlmixed',
  },
  {
    name: 'Java',
    mode: 'clike',
    mime: 'text/x-java',
    short: 'java',
  },
  {
    name: 'JavaScript',
    mode: 'javascript',
    short: 'javascript',
  },
  {
    name: 'JSON',
    mode: 'javascript',
    mime: 'application/json',
    short: 'json',
  },
  {
    name: 'JSX',
    mode: 'jsx',
  },
  {
    name: 'Julia',
    mode: 'julia',
  },
  {
    name: 'Kotlin',
    mode: 'clike',
    mime: 'text/x-kotlin',
    short: 'kotlin',
  },
  {
    name: 'LaTeX',
    mode: 'stex',
  },
  {
    name: 'Lisp',
    mode: 'commonlisp',
  },
  {
    name: 'Lua',
    mode: 'lua',
  },
  {
    name: 'Markdown',
    mode: 'markdown',
  },
  {
    name: 'Mathematica',
    mode: 'mathematica',
  },
  {
    name: 'MATLAB/Octave',
    mode: 'octave',
    mime: 'text/x-octave',
  },
  {
    name: 'MySQL',
    mode: 'sql',
    mime: 'text/x-mysql',
    short: 'mysql',
  },
  {
    name: 'NGINX',
    mode: 'nginx',
  },
  // {
  //   name: 'Nim',
  //   mode: 'nimrod',
  //   custom: true,
  // },
  {
    name: 'Objective C',
    mode: 'clike',
    mime: 'text/x-objectivec',
    short: 'objectivec',
  },
  {
    name: 'OCaml',
    mode: 'mllike',
  },
  {
    name: 'Pascal',
    mode: 'pascal',
  },
  {
    name: 'Perl',
    mode: 'perl',
  },
  {
    name: 'PHP',
    mode: 'php',
    mime: 'text/x-php',
    short: 'php',
  },
  {
    name: 'PowerShell',
    mode: 'powershell',
  },
  {
    name: 'Python',
    mode: 'python',
  },
  {
    name: 'R',
    mode: 'r',
  },
  {
    name: 'Ruby',
    mode: 'ruby',
  },
  {
    name: 'Rust',
    mode: 'rust',
  },
  {
    name: 'Sass',
    mode: 'sass',
  },
  {
    name: 'Scala',
    mode: 'clike',
    mime: 'text/x-scala',
    short: 'scala',
  },
  {
    name: 'Smalltalk',
    mode: 'smalltalk',
  },
  {
    name: 'SPARQL',
    mode: 'sparql',
    mime: 'application/sparql-query',
  },
  {
    name: 'SQL',
    mode: 'sql',
  },
  {
    name: 'Stylus',
    mode: 'stylus',
    mime: 'stylus',
  },
  {
    name: 'Swift',
    mode: 'swift',
  },
  {
    name: 'TCL',
    mode: 'tcl',
  },
  {
    name: 'TOML',
    mode: 'toml',
  },
  {
    name: 'TypeScript',
    mode: 'javascript',
    mime: 'application/typescript',
    short: 'typescript',
  },
  {
    name: 'VB.NET',
    mode: 'vb',
  },
  {
    name: 'Verilog',
    mode: 'verilog',
  },
  {
    name: 'VHDL',
    mode: 'vhdl',
  },
  {
    name: 'Vue',
    mode: 'vue',
  },
  {
    name: 'XML',
    mode: 'xml',
  },
  {
    name: 'YAML',
    mode: 'yaml',
  },
];

export interface ITHEME {
  id: string;
  name: string;
  link?: string;
}

export const THEMES: ITHEME[] = [
  {
    id: '3024-night',
    name: '3024 Night',
  },
  {
    id: 'blackboard',
    name: 'Blackboard',
  },
  {
    id: 'base16-dark',
    name: 'Base 16 (Dark)',
  },
  {
    id: 'base16-light',
    name: 'Base 16 (Light)',
  },
  {
    id: 'cobalt',
    name: 'Cobalt',
  },
  {
    id: 'dracula',
    name: 'Dracula',
  },
  {
    id: 'duotone-dark',
    name: 'Duotone',
  },
  {
    id: 'hopscotch',
    name: 'Hopscotch',
  },
  {
    id: 'lucario',
    name: 'Lucario',
  },
  {
    id: 'material',
    name: 'Material',
  },
  {
    id: 'monokai',
    name: 'Monokai',
  },
  // {
  //   id: 'night-owl',
  //   name: 'Night Owl',
  // },
  // {
  //   id: 'nord',
  //   name: 'Nord',
  // },
  {
    id: 'oceanic-next',
    name: 'Oceanic Next',
  },
  // {
  //   id: 'one-dark',
  //   name: 'One Dark',
  // },
  {
    id: 'panda-syntax',
    name: 'Panda',
  },
  {
    id: 'paraiso-dark',
    name: 'Paraiso',
  },
  {
    id: 'seti',
    name: 'Seti',
  },
  // {
  //   id: 'solarized dark',
  //   name: 'Solarized (Dark)',
  //   link: 'solarized',
  // },
  // {
  //   id: 'solarized light',
  //   name: 'Solarized (Light)',
  //   link: 'solarized',
  // },
  {
    id: 'tomorrow-night-bright',
    name: 'Tomorrow Night',
  },
  {
    id: 'twilight',
    name: 'Twilight',
  },
  // {
  //   id: 'verminal',
  //   name: 'Verminal',
  // },
  {
    id: 'yeti',
    name: 'Yeti',
  },
  {
    id: 'zenburn',
    name: 'Zenburn',
  },
];

export const THEMES_HASH = tohash(THEMES, 'id');
export const LANGUAGES_HASH = tohash(LANGUAGES, 'name');

export const DEFAULT_THEME = THEMES_HASH.dracula;
export const DEFAULT_LANGUAGE = LANGUAGES_HASH.JavaScript;
export const DEFAULT_CODE = `// This is javascript code.
const pluckDeep = key => obj => key.split('.').reduce((accum, key) => accum[key], obj)

const compose = (...fns) => res => fns.reduce((accum, next) => next(accum), res)

const unfold = (f, seed) => {
  const go = (f, seed, acc) => {
    const res = f(seed)
    return res ? go(f, res[1], acc.concat([res[0]])) : acc
  }
  return go(f, seed, [])
}`;

export const DEFAULT_SETTINGS: EditorConfiguration = {
  // paddingVertical: '48px',
  // paddingHorizontal: '32px',
  // marginVertical: '45px',
  // marginHorizontal: '45px',
  // backgroundImage: null,
  // backgroundImageSelection: null,
  // backgroundMode: 'color',
  // dropShadow: true,
  // dropShadowOffsetY: '20px',
  // dropShadowBlurRadius: '68px',
  theme: DEFAULT_THEME.id,
  mode: DEFAULT_LANGUAGE.mode,
  // windowTheme: 'none',
  // language: DEFAULT_LANGUAGE.mode,
  // fontFamily: 'Hack',
  // fontSize: '14px',
  // lineHeight: '133%',
  // windowControls: true,
  // widthAdjustment: true,s
  lineNumbers: true,
  // exportSize: '2x',
  // titleBar: '',
  // watermark: false,
  // squaredImage: false,
  // timestamp: false,
};
