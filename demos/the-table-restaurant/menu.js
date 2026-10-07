const spreads=[...document.querySelectorAll('.spread')];
const book=document.querySelector('#book'), layer=document.querySelector('#turn-layer');
const previous=document.querySelector('#previous'), next=document.querySelector('#next'), chapter=document.querySelector('#chapter'),status=document.querySelector('#page-status');
const reduce=matchMedia('(prefers-reduced-motion:reduce)');
let current=0,busy=false;
function display(index){spreads.forEach((s,i)=>{s.hidden=i!==index;s.inert=i!==index;});current=index;chapter.value=String(index);previous.disabled=index===0;next.disabled=index===spreads.length-1;document.querySelector('#quick-previous').disabled=previous.disabled;document.querySelector('#quick-next').disabled=next.disabled;status.textContent=chapter.options[index].textContent.replace(/^\d+ — /,'')+' · '+(index+1)+' of '+spreads.length;}
function makeFlip(index){
  if(busy||index<0||index>=spreads.length||index===current)return null;
  busy=true;
  const from=current,forward=index>from,mobile=matchMedia('(max-width:700px)').matches;
  const leaf=document.createElement('div');leaf.className='turn-leaf '+(forward?'forward':'backward');
  const clone=(spread,selector)=>{const node=(mobile?spread:spread.querySelector(selector)).cloneNode(true);node.hidden=false;node.inert=true;return node;};
  for(const [side,content] of [['front',clone(spreads[from],forward?'.menu-page':'.picture-page')],['back',clone(spreads[index],forward?'.picture-page':'.menu-page')]]){const face=document.createElement('div');face.className='leaf-face '+side;face.append(content);leaf.append(face);}
  if(!mobile){const stationary=clone(spreads[from],forward?'.picture-page':'.menu-page');stationary.classList.add('stationary-page',forward?'on-left':'on-right');layer.append(stationary);}
  spreads.forEach((spread,i)=>{spread.hidden=i!==index;spread.inert=i!==index;});
  layer.append(leaf);
  return {from,index,forward,leaf,angle:0};
}
function followFlip(flip,distance){
  const width=matchMedia('(max-width:700px)').matches?book.clientWidth:book.clientWidth/2;
  flip.angle=(flip.forward?-1:1)*Math.min(165,Math.max(0,distance)/width*180);
  flip.leaf.style.transform=`rotateY(${flip.angle}deg)`;
}
async function finishFlip(flip,commit){
  const end=commit?(flip.forward?-180:180):0;
  if(!reduce.matches&&!document.body.classList.contains('motion-paused')){
    try{await flip.leaf.animate([{transform:`rotateY(${flip.angle}deg)`},{transform:`rotateY(${end}deg)`}],{duration:Math.max(220,Math.abs(end-flip.angle)/180*850),easing:'cubic-bezier(.22,.65,.25,1)',fill:'forwards'}).finished;}catch{}
  }
  display(commit?flip.index:flip.from);layer.replaceChildren();busy=false;
}
async function turn(index){const flip=makeFlip(index);if(flip)await finishFlip(flip,true);}
previous.addEventListener('click',()=>turn(current-1));next.addEventListener('click',()=>turn(current+1));chapter.addEventListener('change',()=>{if(busy){chapter.value=String(current);return;}turn(Number(chapter.value));});
document.querySelector('#quick-previous').addEventListener('click',()=>turn(current-1));document.querySelector('#quick-next').addEventListener('click',()=>turn(current+1));
book.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();turn(current+1);}if(e.key==='ArrowLeft'){e.preventDefault();turn(current-1);}});
let gesture=null;
const clearGesture=()=>{gesture=null;book.classList.remove('dragging');};
book.addEventListener('dragstart',e=>e.preventDefault());
book.addEventListener('pointerdown',e=>{
  if(busy||!e.isPrimary||(e.pointerType==='mouse'&&e.button!==0)||e.target.closest('a,button,select'))return;
  gesture={id:e.pointerId,x:e.clientX,y:e.clientY,type:e.pointerType,horizontal:false};
  book.setPointerCapture(e.pointerId);
});
book.addEventListener('pointermove',e=>{
  if(!gesture||gesture.id!==e.pointerId)return;
  const dx=e.clientX-gesture.x,dy=e.clientY-gesture.y;
  if(!gesture.horizontal&&Math.abs(dy)>12&&Math.abs(dy)>Math.abs(dx)){clearGesture();return;}
  if(!gesture.horizontal&&Math.abs(dx)>10&&Math.abs(dx)>Math.abs(dy)*1.25){gesture.horizontal=true;gesture.direction=dx<0?1:-1;gesture.flip=makeFlip(current+gesture.direction);}
  if(!gesture.horizontal)return;
  book.classList.add('dragging');
  if(gesture.flip&&!reduce.matches&&!document.body.classList.contains('motion-paused'))followFlip(gesture.flip,dx*(gesture.direction===1?-1:1));
});
book.addEventListener('pointerup',e=>{
  if(!gesture||gesture.id!==e.pointerId)return;
  const g=gesture,dx=e.clientX-g.x,dy=e.clientY-g.y;
  clearGesture();
  if(book.hasPointerCapture(e.pointerId))book.releasePointerCapture(e.pointerId);
  const threshold=Math.min(55,book.clientWidth*.12);
  if(g.flip){finishFlip(g.flip,Math.abs(dx)>=threshold&&Math.abs(dx)>Math.abs(dy)*1.25&&(dx<0?1:-1)===g.direction);return;}
  if(g.type==='mouse'&&Math.hypot(dx,dy)<8){
    const bounds=book.getBoundingClientRect(),edge=Math.min(65,bounds.width*.15);
    if(e.clientX>bounds.right-edge)turn(current+1);
    else if(e.clientX<bounds.left+edge)turn(current-1);
  }
});
const cancelGesture=()=>{const flip=gesture?.flip;clearGesture();if(flip)finishFlip(flip,false);};
book.addEventListener('pointercancel',cancelGesture);
book.addEventListener('lostpointercapture',cancelGesture);
const motion=document.querySelector('#motion-toggle');motion.addEventListener('click',()=>{const paused=document.body.classList.toggle('motion-paused');motion.setAttribute('aria-pressed',String(paused));motion.textContent=paused?'Resume motion':'Pause motion';});
if(reduce.matches){motion.hidden=true;}reduce.addEventListener('change',()=>{motion.hidden=reduce.matches;});display(0);

document.querySelector('#open-book').addEventListener('click',async()=>{const cover=document.querySelector('#cover'),button=document.querySelector('#open-book');button.disabled=true;if(!reduce.matches){try{await cover.animate([{transform:'perspective(1400px) rotateY(0deg)',opacity:1},{transform:'perspective(1400px) rotateY(-75deg)',opacity:0}],{duration:550,easing:'ease-in',fill:'none'}).finished;}catch{}}document.body.classList.remove('book-closed');button.disabled=false;display(0);book.focus();});document.querySelector('#close-book').addEventListener('click',()=>{if(busy)return;document.body.classList.add('book-closed');display(0);document.querySelector('#open-book').focus();});
