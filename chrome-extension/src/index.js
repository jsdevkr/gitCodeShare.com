const isDevMode = () => !('update_url' in chrome.runtime.getManifest());
const productionURL = 'https://gitcodeshare.com';
const developmentURL = 'http://localhost:3000';
const getURL = () => (isDevMode() ? developmentURL : productionURL);

let editor;
let iframe;

const injectGitCodeShareWindow = () => {
  const div = document.createElement('div');
  div.innerHTML = `
    <div class="editor">
      <div class="editor__back">
        <iframe id="gitCodeShare" class="editor__iframe" src="${getURL()}/fbeditor"></iframe>
      </div>
    </div>
  `;
  document.body.appendChild(div);
  editor = document.querySelector('.editor');
  iframe = div.querySelector('#gitCodeShare');
};

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
const injectBtn = () => {
  const contBtns = Array.prototype.filter.call(
    document.querySelectorAll(`div[data-testid="expanded-sprout-list"] td`) || [],
    n => n.hasChildNodes(),
  );
  if (!Array.isArray(contBtns)) {
    throw 'not fount btns';
  }

  const btnsCount = contBtns.length;

  // copy last btn to gitCodeShare btn
  const lastBtn = contBtns[contBtns.length - 1];
  const btn = lastBtn.cloneNode(true);

  // styling
  btn.id = 'codeShareBtn';
  btn.querySelector('[data-hover="tooltip"]').innerText = 'gitCodeShare';
  btn.querySelector('i').style.backgroundPosition = 'center';
  btn.querySelector('i').style.backgroundSize = '20px';
  btn.querySelector('i').style.backgroundImage = `url("${chrome.extension.getURL('images/icon.png')}")`;

  bindToggleEditorEventTo(btn);

  // Add button to suitable position
  const targetTbody = document.querySelector(`div[data-testid="expanded-sprout-list"]>table>tbody`);
  if (targetTbody) {
    if (btnsCount % 2 === 0) {
      const newTr = targetTbody.firstChild.cloneNode(true);
      // remove td inner
      for (let i = 0; i < newTr.children.length; i++) {
        newTr.children[i].innerText = '';
      }
      targetTbody.append(newTr);

      newTr.firstChild.remove();
      newTr.prepend(btn);
    } else {
      const lastTr = targetTbody.lastChild;
      lastTr.lastChild.remove();
      lastTr.append(btn);
    }
  }
};

const isReadyToInsertBtn = () => document.querySelector('div[data-testid="expanded-sprout-list"]>table');
const isHaveBtnAleady = () => document.querySelector('#codeShareBtn');

const extensionOrigin = 'chrome-extension://' + chrome.runtime.id;

if (!window.location.ancestorOrigins.contains(extensionOrigin) && !document.getElementById('gitCodeShare')) {
  injectGitCodeShareWindow();
  console.log('gitCodeShare is injected!');

  window.addEventListener('message', e => {
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

window.addEventListener('click', e => {
  if (document.querySelector('[data-testid="expanded-sprout-list"] table td') && !isHaveBtnAleady()) {
    try {
      injectBtn();
    } catch (error) {
      console.log('error');
    }
  }
});
