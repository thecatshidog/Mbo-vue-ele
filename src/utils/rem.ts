export const setRem = () => {
  const doc = document,
    win = window;
  const docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = () => {
        const clientWidth = docEl.clientWidth;
        if (!clientWidth) { return; }
        if (clientWidth >= 750) {
          docEl.style.width = '750px';
          docEl.style.fontSize = '75px';
        } else {
            docEl.style.fontSize = (clientWidth / 10) + 'px';
        }
    };

  if (!doc.addEventListener) { return; }
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
};

export default setRem;
