/* 
  It is for typescript interface for later use

  interface Location {
    readonly ancestorOrigins: DOMStringList;
  } 
*/

function injectGitCodeShareWindow() {
  const iframe = document.createElement('iframe');
  // Must be declared at web_accessible_resources in manifest.json
  iframe.id = 'gitCodeShare';
  // iframe.src = chrome.runtime.getURL('src/frame.html');
  iframe.src = 'http://localhost:3000/editor';

  iframe.style.cssText = 'position:fixed;top:10%;right:10%;display:none;width:80%;height:70%;z-index:1000;';
  document.body.appendChild(iframe);
}

function bindToggleEditorEventTo(target) {
  target.addEventListener('click', e => {
    e.stopPropagation();
    const editor = document.getElementById('gitCodeShare');
    editor.style.display = editor.style.display === 'none' ? 'block' : 'none';
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

function bindCloseEvent() {
  const parentDom = document.getElementById('pagelet_composer');
  const targetDom = parentDom.querySelectorAll('div[role]')[0];
  const gitCodeShareModal = document.getElementById('gitCodeShare');

  document.body.addEventListener('click', function(e) {
    const isClickedBackground = e.target.closest("[role='presentation']") !== null;
    const isClickedCloseButton = e.target.parentNode.getAttribute('role') === 'button';
    const targetDomRole = targetDom.getAttribute('role');
    const preventClickEvent = targetDomRole === 'region';

    if (preventClickEvent) {
      return false;
    }
    if (isClickedBackground || isClickedCloseButton) {
      if (gitCodeShareModal.display !== 'none') {
        gitCodeShareModal.style.display = 'none';
      }
    }
  });
}

const isReadyToInsertBtn = () => document.querySelector('div[data-testid="expanded-sprout-list"]>table');
const isHaveBtnAleady = () => document.querySelector('#codeShareBtn');

const extensionOrigin = 'chrome-extension://' + chrome.runtime.id;

if (!window.location.ancestorOrigins.contains(extensionOrigin) && !document.getElementById('gitCodeShare')) {
  injectGitCodeShareWindow();
  bindCloseEvent();
  console.log('gitCodeShare is injected!');

  // We cannot call "clearInterval" because btn can be removed when user change page.
  const insertBtnInterval = setInterval(() => {
    if (isReadyToInsertBtn()) {
      if (!isHaveBtnAleady()) {
        injectBtn();
      }
    }
  }, 1000);
}
