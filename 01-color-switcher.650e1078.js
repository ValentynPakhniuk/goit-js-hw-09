!function(){var e=document.querySelector("body"),t=document.querySelector("[data-start]"),n=document.querySelector("[data-stop]"),a=null;t.addEventListener("click",(function(){t.disabled=!0,n.disabled=!1,a=setInterval((function(){e.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)})),n.addEventListener("click",(function(){clearInterval(a),n.disabled=!0,t.disabled=!1}))}();
//# sourceMappingURL=01-color-switcher.650e1078.js.map