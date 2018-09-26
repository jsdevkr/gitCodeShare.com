// It is for typescript interface for later use
// interface Location {
//   readonly ancestorOrigins: DOMStringList;
// }

function injectGitCodeShare() {
  const iframe = document.createElement('iframe');
  // Must be declared at web_accessible_resources in manifest.json
  iframe.id = 'gitCodeShare';
  iframe.src = chrome.runtime.getURL('src/frame.html');

  iframe.style.cssText = 'position:fixed;top:10%;right:10%;display:none;width:80%;height:70%;z-index:1000;';
  document.body.appendChild(iframe);
}

function bindToggleEditorEventTo(target) {
  target.addEventListener('click', () => {
    const editor = document.getElementById('gitCodeShare');
    editor.style.display = editor.style.display === 'none' ? 'block' : 'none';
  });
}

/* this function is messy dom approach process for searching suitable location in Facebook DOM jungle. */
function injectBtn() {
  const contentBtnCount = document.getElementsByClassName('_2aha').length;
  const getNodes = str => new DOMParser().parseFromString(str, 'text/html').body.childNodes;
  const btn = getNodes(
    `
    <span role="presentation" id="codeShareBtn">
      <a role="button" aria-pressed="false" href="#">
        <div uiconfig="[object Object]" class="_m_1 _2nst">
          <i class="_4a0a img sp_caMraDQLjmq_2x sx_9c86db" alt=""></i>
          <div data-tooltip-delay="500" data-tooltip-display="overflow" data-tooltip-content="이벤트 태그" data-hover="tooltip" class="_2aha">
            gitCodeShare
          </div>
        </div>
      </a>
    </span>
    `,
  )[0];

  /* TODO: fix event binding not working */
  bindToggleEditorEventTo(btn);

  if (contentBtnCount % 2 === 0) {
    const firstChild = document.createElement('td');
    const secondChild = document.createElement('td');

    firstChild.className = 'pas _1fng _51m-';
    firstChild.appendChild(btn);

    const parent = document.createElement('tr');
    parent.className = '_51mx';

    parent.appendChild(firstChild);
    parent.appendChild(secondChild);

    document.querySelector('._5f0n>tbody').appendChild(parent);
  } else {
    document.querySelector('._5f0n>tbody').lastChild.lastChild.appendChild(btn);
  }
}

const extensionOrigin = 'chrome-extension://' + chrome.runtime.id;

if (!window.location.ancestorOrigins.contains(extensionOrigin) && !document.getElementById('gitCodeShare')) {
  injectGitCodeShare();
  console.log('gitCodeShare is injected!');

  /* class name "_1gr3" is unique class of extends btn*/
  const extendsBtn = document.getElementsByClassName('_1gr3')[0];

  if (extendsBtn) {
    document.addEventListener('click', e => {
      /* "_2aha" is unique class name of btn for media content */
      /* "_5f0n" is class name of container of "_2aha" */
      if (document.querySelector('._5f0n') && !document.querySelector('#codeShareBtn')) {
        injectBtn();
      }
    });
  }
}
