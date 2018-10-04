import { tohash } from './utils';
import { EditorConfiguration } from 'codemirror';

export interface ILANGUAGE {
  name: string;
  mode: string;
  mime?: string;
  custom?: boolean;
  short?: string;
  ext?: string;
}

export const LANGUAGES = [
  { name: 'Auto', mode: 'auto' }, //   mode: 'apache', //   name: 'Apache', // {
  //   mime: 'text/apache',
  //   custom: true,
  // },
  { name: 'Bash', mode: 'shell', mime: 'application/x-sh', ext: '.sh' }, //   mode: 'text', //   name: 'Plain Text', // {
  // },
  { name: 'C', mode: 'clike', mime: 'text/x-csrc', short: 'c', ext: '.c' },
  { name: 'C++', mode: 'clike', mime: 'text/x-c++src', short: 'cpp', ext: '.cpp' },
  { name: 'C#', mode: 'clike', mime: 'text/x-csharp', short: 'cs', ext: '.cs' },
  { name: 'Clojure', mode: 'clojure', ext: '.cljs' },
  { name: 'Cobol', mode: 'cobol', ext: '.cbl' },
  { name: 'CoffeeScript', mode: 'coffeescript', ext: '.coffee' },
  { name: 'Crystal', mode: 'crystal', ext: '.cr' },
  { name: 'CSS', mode: 'css', ext: '.css' },
  { name: 'D', mode: 'd', ext: '.d' },
  { name: 'Dart', mode: 'dart', ext: '.dart' },
  { name: 'Diff', mode: 'diff', mime: 'text/x-diff', ext: '.diff' },
  { name: 'Django', mode: 'django', ext: '.py' },
  { name: 'Docker', mode: 'dockerfile', ext: '.' }, //   mode: 'elixir', //   name: 'Elixir', // {
  //   custom: true,
  // },
  { name: 'Elm', mode: 'elm', ext: '.elm' },
  { name: 'Erlang', mode: 'erlang', ext: '.erl' },
  { name: 'Fortran', mode: 'fortran', ext: '.for' },
  { name: 'F#', mode: 'mllike', ext: '.fs' }, //   mode: 'graphql', //   name: 'GraphQL', // {
  //   custom: true,
  // },
  { name: 'Go', mode: 'go', ext: '.go' },
  { name: 'Groovy', mode: 'groovy', ext: '.groovy' },
  { name: 'Handlebars', mode: 'handlebars', ext: '.hbs' },
  { name: 'Haskell', mode: 'haskell', ext: '.lhs' },
  { name: 'Haxe', mode: 'haxe', ext: '.hx' },
  { name: 'HTML', mode: 'htmlmixed', ext: '.html' },
  { name: 'Java', mode: 'clike', mime: 'text/x-java', short: 'java', ext: '.java' },
  { name: 'JavaScript', mode: 'javascript', short: 'javascript', ext: '.js' },
  { name: 'JSON', mode: 'javascript', mime: 'application/json', short: 'json', ext: '.json' },
  { name: 'JSX', mode: 'jsx', ext: '.jsx' },
  { name: 'Julia', mode: 'julia', ext: '.jl' },
  { name: 'Kotlin', mode: 'clike', mime: 'text/x-kotlin', short: 'kotlin', ext: '.kt' },
  { name: 'LaTeX', mode: 'stex', ext: '.tex' },
  { name: 'Lisp', mode: 'commonlisp', ext: '.lisp' },
  { name: 'Lua', mode: 'lua', ext: '.lua' },
  { name: 'Markdown', mode: 'gfm', ext: '.md' },
  { name: 'Mathematica', mode: 'mathematica', ext: '.mathematica' },
  { name: 'MATLAB/Octave', mode: 'octave', mime: 'text/x-octave', ext: '.matlab' },
  { name: 'MySQL', mode: 'sql', mime: 'text/x-mysql', short: 'mysql', ext: '.sql' },
  { name: 'NGINX', mode: 'nginx', ext: '.nginxconf' }, //   mode: 'nimrod', //   name: 'Nim', // {
  //   custom: true,
  // },
  { name: 'Objective C', mode: 'clike', mime: 'text/x-objectivec', short: 'objectivec', ext: '.m' },
  { name: 'OCaml', mode: 'mllike', ext: '.ml' },
  { name: 'Pascal', mode: 'pascal', ext: '.pas' },
  { name: 'Perl', mode: 'perl', ext: '.pl' },
  { name: 'PHP', mode: 'php', mime: 'text/x-php', short: 'php', ext: '.php' },
  { name: 'PowerShell', mode: 'powershell', ext: '.ps1' },
  { name: 'Python', mode: 'python', ext: '.py' },
  { name: 'R', mode: 'r', ext: '.r' },
  { name: 'Ruby', mode: 'ruby', ext: '.rb' },
  { name: 'Rust', mode: 'rust', ext: '.rs' },
  { name: 'Sass', mode: 'sass', ext: '.sass' },
  { name: 'Scala', mode: 'clike', mime: 'text/x-scala', short: 'scala', ext: '.scala' },
  { name: 'Smalltalk', mode: 'smalltalk', ext: '.st' },
  { name: 'SPARQL', mode: 'sparql', mime: 'application/sparql-query', ext: '.sparql' },
  { name: 'SQL', mode: 'sql', ext: '.sql' },
  { name: 'Stylus', mode: 'stylus', mime: 'stylus', ext: '.styl' },
  { name: 'Swift', mode: 'swift', ext: '.swift' },
  { name: 'TCL', mode: 'tcl', ext: '.tcl' },
  { name: 'TOML', mode: 'toml', ext: '.toml' },
  { name: 'TypeScript', mode: 'javascript', mime: 'application/typescript', short: 'typescript', ext: '.ts' },
  { name: 'VB.NET', mode: 'vb', ext: '.vb' },
  { name: 'Verilog', mode: 'verilog', ext: '.v' },
  { name: 'VHDL', mode: 'vhdl', ext: '.vhdl' },
  { name: 'Vue', mode: 'vue', ext: '.vue' },
  { name: 'XML', mode: 'xml', ext: '.xml' },
  { name: 'YAML', mode: 'yaml', ext: '.yml' },
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

export interface IFONTS {
  id: string;
  name: string;
}

export const FONTS: IFONTS[] = [
  { id: 'Anonymous Pro', name: 'Anonymous Pro' },
  { id: 'Droid Sans Mono', name: 'Droid Sans Mono' },
  { id: 'Fantasque Sans Mono', name: 'Fantasque Sans Mono' },
  { id: 'Fira Code', name: 'Fira Code' },
  { id: 'Hack', name: 'Hack' },
  { id: 'IBM Plex Mono', name: 'IBM Plex Mono' },
  { id: 'Inconsolata', name: 'Inconsolata' },
  { id: 'Iosevka', name: 'Iosevka' },
  { id: 'Monoid', name: 'Monoid' },
  { id: 'Source Code Pro', name: 'Source Code Pro' },
  { id: 'Space Mono', name: 'Space Mono' },
  { id: 'Ubuntu Mono', name: 'Ubuntu Mono' },
];

export const THEMES_ID_HASH = tohash(THEMES, 'id');
export const THEMES_NAME_HASH = tohash(THEMES, 'name');
export const LANGUAGES_MODE_HASH = tohash(LANGUAGES, 'mode');
export const LANGUAGES_NAME_HASH = tohash(LANGUAGES, 'name');
export const LANGUAGES_MIME_HASH = tohash(LANGUAGES, 'mime');
export const LANGUAGES_SHORT_HASH = tohash(LANGUAGES, 'short');
export const FONTS_HASH = tohash(FONTS, 'id');

export const DEFAULT_THEME = THEMES_ID_HASH.dracula;
export const DEFAULT_LANGUAGE = LANGUAGES_NAME_HASH.JavaScript;
export const DEFAULT_FONT = FONTS_HASH['Fira Code'];
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
  // theme: DEFAULT_THEME.id,
  // mode: DEFAULT_LANGUAGE.mode,
  // windowTheme: 'none',
  // language: DEFAULT_LANGUAGE.mode,
  // fontFamily: 'Fira Code',
  // fontSize: '14px',
  // lineHeight: '133%',
  // windowControls: true,
  // widthAdjustment: true,s
  // lineNumbers: true,
  // exportSize: '2x',
  // titleBar: '',
  // watermark: false,
  // squaredImage: false,
  // timestamp: false,
};
