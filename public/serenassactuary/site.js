const booking='https://book.carepatron.com/Serena-s-Sanctuary/All?p=By665D2WQCih7hjeQCvCkg&i=YMV5Rnub';
document.querySelectorAll('[data-book]').forEach(a=>{a.href=booking;a.target='_blank';a.rel='noopener noreferrer';});
const toggle=document.querySelector('.menu'),nav=document.querySelector('#navigation');
function closeMenu(){toggle?.setAttribute('aria-expanded','false');nav?.classList.remove('open');}
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle?.getAttribute('aria-expanded')==='true'){closeMenu();toggle.focus();}});
const floatingActions = document.querySelector('.floating-actions');
if (floatingActions) {
  const updateFloatingActions = () => {
    floatingActions.hidden = window.scrollY <= 80;
  };
  updateFloatingActions();
  window.addEventListener('scroll', updateFloatingActions, { passive: true });
  window.addEventListener('pageshow', updateFloatingActions);
}
