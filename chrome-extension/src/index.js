let editor;
let iframe;

function injectGitCodeShareWindow() {
  const div = document.createElement('div');
  div.innerHTML = `
    <div class="editor">
      <div class="editor__back">
        <iframe id="gitCodeShare" class="editor__iframe" src="http://localhost:3000/fbeditor"></iframe>
      </div>
    </div>
  `;
  document.body.appendChild(div);
  editor = document.querySelector('.editor');
  iframe = div.querySelector('#gitCodeShare');
}

const showEditor = () => {
  editor.style.display = 'block';
  editor.style.opacity = '1';
  iframe.classList.remove('goUp');
  iframe.classList.remove('goDown');
  iframe.classList.add('goDown');
};

const hideEditor = () => {
  iframe.classList.remove('goUp');
  iframe.classList.remove('goDown');
  iframe.classList.add('goUp');
  setTimeout(() => {
    editor.style.display = 'none';
    editor.style.opacity = '0';
  }, 250);
};

function bindToggleEditorEventTo(target) {
  target.addEventListener('click', () => {
    showEditor();
  });
  editor.addEventListener('click', e => {
    hideEditor();
  });
}

/* This function is messy dom approach process for searching suitable location in Facebook DOM jungle. */
function injectBtn() {
  const contBtns = Array.prototype.filter.call(
    document.querySelectorAll(`div[data-testid="expanded-sprout-list"] td`) || [],
    n => n.hasChildNodes(),
  );
  const btnsCount = Array.isArray(contBtns) ? contBtns.filter(n => n.hasChildNodes()).length : 0;
  const getNodes = str => new DOMParser().parseFromString(str, 'text/html').body.childNodes;
  const btn = getNodes(
    `
    <span role="presentation" id="codeShareBtn">
      <a role="button" aria-pressed="false" href="#">
        <div uiconfig="[object Object]" class="_m_1 _2nst">
          <img src=${chrome.extension.getURL(
            'images/icon.png',
          )} style="height: 20px;left: 9px;position: absolute;top: 6px;width: 20px;">
          <div data-tooltip-delay="500" data-tooltip-display="overflow" data-tooltip-content="이벤트 태그" data-hover="tooltip" class="_2aha">
            gitCodeShare
          </div>
        </div>
      </a>
    </span>
    `,
  )[0];

  bindToggleEditorEventTo(btn);

  // Add button to suitable position
  if (document.querySelector(`div[data-testid="expanded-sprout-list"]>table>tbody`)) {
    if (btnsCount % 2 === 0) {
      const firstChild = document.createElement('td');
      const secondChild = document.createElement('td');

      firstChild.className = 'pas _1fng _51m-';
      firstChild.appendChild(btn);

      const parent = document.createElement('tr');
      parent.className = '_51mx';

      parent.appendChild(firstChild);
      parent.appendChild(secondChild);

      document.querySelector(`div[data-testid="expanded-sprout-list"]>table>tbody`).appendChild(parent);
    } else {
      document
        .querySelector(`div[data-testid="expanded-sprout-list"]>table>tbody`)
        .lastChild.lastChild.appendChild(btn);
    }
  }
}

const isReadyToInsertBtn = () => document.querySelector('div[data-testid="expanded-sprout-list"]>table');
const isHaveBtnAleady = () => document.querySelector('#codeShareBtn');

const extensionOrigin = 'chrome-extension://' + chrome.runtime.id;

if (!window.location.ancestorOrigins.contains(extensionOrigin) && !document.getElementById('gitCodeShare')) {
  injectGitCodeShareWindow();
  console.log('gitCodeShare is injected!');

  // We cannot call "clearInterval" because btn can be removed when user change page.
  const insertBtnInterval = setInterval(() => {
    if (isReadyToInsertBtn()) {
      if (!isHaveBtnAleady()) {
        injectBtn();
      }
    }
  }, 1000);

  window.addEventListener('message', e => {
    if (e.origin !== 'http://localhost:3000') return;
    if (e.data.type === 'setHeight') {
      iframe.style.height = `${e.data.value}px`;
      return;
    }
    if (e.data.type === 'success') {
      hideEditor();
      document.querySelector('div.notranslate').focus();
      document.execCommand('insertHTML', false, `${e.data.value}`);
    }
  });
}
