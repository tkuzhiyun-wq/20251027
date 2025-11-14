// menu.js
// 偵測滑鼠是否靠近視窗最左側 100px，若是則顯示側邊選單
const menu = document.getElementById('side-menu');
const iframeOverlay = document.getElementById('iframe-overlay');
const contentIframe = document.getElementById('content-iframe');
const closeBtn = document.getElementById('close-iframe');

function updateMenuVisibility(e) {
  // 支援滑鼠和觸控（用第一個觸點）
  let x = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] && e.touches[0].clientX) || 0;
  if (x <= 100) {
    menu.classList.add('open');
    menu.setAttribute('aria-hidden', 'false');
  } else {
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
  }
}

// 使用 mousemove 為主要觸發事件；同時支援 touchmove
window.addEventListener('mousemove', updateMenuVisibility);
window.addEventListener('touchmove', updateMenuVisibility, {passive: true});

// 可選：當滑鼠離開視窗時收回選單
window.addEventListener('mouseleave', () => {
  menu.classList.remove('open');
  menu.setAttribute('aria-hidden', 'true');
});

// 選單項目點擊事件
menu.addEventListener('click', (evt) => {
  if (evt.target.tagName === 'A') {
    evt.preventDefault(); // 防止預設行為
    const linkText = evt.target.textContent.trim();
    
    // 根據點擊的選項開啟相應內容
    if (linkText === '第一單元作品') {
      openIframe('https://tkuzhiyun-wq.github.io/20251020/');
    } else if (linkText === '第一單元講義') {
      openIframe('https://hackmd.io/@KsqNQqBTRk6MdWHQEubr9A/ryEhU70igx');
    } else if (linkText === '測驗系統') {
      // TODO: 若需要可加入其他 URL
      console.log('測驗系統');
    } else if (linkText === '回到首頁') {
      // TODO: 若需要可加入其他 URL
      console.log('回到首頁');
    }
    
    // 選單項點擊後關閉
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
  }
});

// 開啟 iframe 的函式
function openIframe(url) {
  contentIframe.src = url;
  iframeOverlay.classList.remove('hidden');
}

// 關閉 iframe 的函式
function closeIframe() {
  iframeOverlay.classList.add('hidden');
  contentIframe.src = ''; // 清空 src 以停止載入
}

// 關閉按鈕事件
closeBtn.addEventListener('click', closeIframe);

// 點擊外層背景關閉 iframe
iframeOverlay.addEventListener('click', (evt) => {
  if (evt.target === iframeOverlay) {
    closeIframe();
  }
});
