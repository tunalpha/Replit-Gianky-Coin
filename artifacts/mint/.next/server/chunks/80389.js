"use strict";exports.id=80389,exports.ids=[80389],exports.modules={80389:(e,t,n)=>{function o(e,t={}){let{qrSize:n=280,showCloseButton:o=!0,closeButtonText:r="\xd7",theme:i="light",container:d=document.body,onCancel:s}=t,l=document.createElement("div");l.style.cssText=`
    position: fixed;
    inset: 0;
    background-color: ${"dark"===i?"rgba(0, 0, 0, 0.8)":"rgba(0, 0, 0, 0.5)"};
    backdrop-filter: blur(10px);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 300ms ease-out;
  `,t.overlayStyles&&Object.assign(l.style,t.overlayStyles);let c=document.createElement("div");if(c.style.cssText=`
    background: ${"dark"===i?"#1f1f1f":"#ffffff"};
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    max-width: 90vw;
    max-height: 90vh;
    position: relative;
    animation: scaleIn 300ms ease-out;
  `,t.modalStyles&&Object.assign(c.style,t.modalStyles),o){let e=document.createElement("button");e.textContent=r,e.style.cssText=`
      position: absolute;
      top: 16px;
      right: 16px;
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: ${"dark"===i?"#ffffff":"#000000"};
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      transition: background-color 0.2s;
    `,e.addEventListener("mouseenter",()=>{e.style.backgroundColor="dark"===i?"rgba(255, 255, 255, 0.1)":"rgba(0, 0, 0, 0.1)"}),e.addEventListener("mouseleave",()=>{e.style.backgroundColor="transparent"}),e.addEventListener("click",()=>{h(!0)}),c.appendChild(e)}let p=document.createElement("div");p.style.cssText=`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  `;let f=document.createElement("h3");f.textContent="Scan to Connect",f.style.cssText=`
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: ${"dark"===i?"#ffffff":"#000000"};
    text-align: center;
  `;let m=document.createElement("canvas");m.width=n,m.height=n,m.style.cssText=`
    border: 1px solid ${"dark"===i?"#333333":"#e5e5e5"};
    border-radius: 12px;
  `,a(e,m,n).catch(console.error);let x=document.createElement("button");x.textContent="Copy URI",x.style.cssText=`
    background: ${"dark"===i?"#333333":"#f5f5f5"};
    border: 1px solid ${"dark"===i?"#444444":"#e5e5e5"};
    color: ${"dark"===i?"#ffffff":"#000000"};
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
  `,x.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(e);let t=x.textContent;x.textContent="Copied!",setTimeout(()=>{x.textContent=t},2e3)}catch(e){console.error("Failed to copy URI:",e)}}),p.appendChild(f),p.appendChild(m),p.appendChild(x),c.appendChild(p),l.appendChild(c);let u=document.createElement("style");u.textContent=`
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
    @keyframes scaleIn {
      from { transform: scale(0.9); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    @keyframes scaleOut {
      from { transform: scale(1); opacity: 1; }
      to { transform: scale(0.9); opacity: 0; }
    }
  `,document.head.appendChild(u);let y=e=>{"Escape"===e.key&&h(!0)},g=e=>{e.target===l&&h(!0)};function h(e=!1){document.removeEventListener("keydown",y),l.removeEventListener("click",g),e&&s&&s(),l.style.animation="fadeOut 200ms ease-in",c.style.animation="scaleOut 200ms ease-in";let t=()=>{l.parentNode&&l.parentNode.removeChild(l),u.parentNode&&u.parentNode.removeChild(u)};l.addEventListener("animationend",t,{once:!0}),setTimeout(t,250)}return document.addEventListener("keydown",y),l.addEventListener("click",g),d.appendChild(l),{destroy:()=>h(!1),hide:function(){l.style.display="none"},show:function(){l.style.display="flex"}}}async function a(e,t,o){if(!t.getContext("2d"))return;let{toCanvas:a}=await n.e(64913).then(n.t.bind(n,64913,19));await a(t,e,{width:o,margin:2,color:{dark:"#000000",light:"#ffffff"}})}n.d(t,{createQROverlay:()=>o})}};