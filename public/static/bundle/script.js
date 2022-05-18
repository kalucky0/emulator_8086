(()=>{"use strict";var t={d:(r,e)=>{for(var n in e)t.o(e,n)&&!t.o(r,n)&&Object.defineProperty(r,n,{enumerable:!0,get:e[n]})},o:(t,r)=>Object.prototype.hasOwnProperty.call(t,r)};t.d({},{J$:()=>v,YD:()=>k,yt:()=>y,Kz:()=>A});var r=function(t){return document.querySelector(t)},e=function(t){return document.querySelectorAll(t)};Number.prototype.toHex=function(){return this.toString(16)};var n=/[^0-9a-fA-F]+/g,a="0000",i={"0000":"00"},u={"0000":"00"},o=function(t){return t=t.toLowerCase(),null==u[t]&&(u[t]="00"),u[t]},s=function(t){for(var r=0,e=0,a=(t=t.slice(1,-1)).split("+");e<a.length;e++){var i=a[e];if("bx"==i||"bp"==i||"si"==i||"di"==i||"disp"==i)r+=parseInt(k[i].value,16);else{if(n.test(i))return i+" can't be used to adress memory";r+=parseInt(i,16)}}return r.toHex().padStart(4,"0")},l=function(t,r){if(t=t.substring(t.length-4).toLowerCase(),n.test(r))return"Argument is incorrect value";var e=r.toUpperCase();return e.length<=2?(e=e.padStart(2,"0"),i[t]=e):e.length>2&&((e=e.padStart(4,"0")).length>4&&(e=e.substring(e.length-4)),i[(parseInt(t,16)+1).toHex().padStart(4,"0")]=e.slice(0,2),i[t]=e.substring(2,4)),v.value=t.toUpperCase(),y(t,i),!1},c=function(t){return t=t.toLowerCase(),null==i[t]&&(i[t]="00"),i[t]},f=function(t){return null==k[t]?null:"x"==t[1]||"p"==t[1]||"i"==t[1]?4:2},p=function(t,r){var e=f(t);if(null===e)return null;if(n.test(r))return"Incorrect value";var a=r.padStart(e,"0");return a=a.toUpperCase(),4==e&&a.length>4||2==e&&a.length>2?"Out of register bounds or incorrect argument":(2==e&&(k[t].value=a),4==e&&("x"==t[1]?(k[t[0].concat("h")].value=a.slice(0,2),k[t[0].concat("l")].value=a.substring(2,4)):k[t].value=a),null)},g=function(t){if(null==k[t])return null;if("x"==t[1]){var r=k[t[0].concat("h")].value,e=k[t[0].concat("l")].value;return r=r.padStart(2,"0"),e=e.padStart(2,"0"),r.concat(e).concat("h")}return 2==f(t)?k[t].value.padStart(2,"0").concat("h"):4==f(t)?k[t].value.padStart(4,"0").concat("h"):null},h=function(t){var r=t.toLowerCase().split(/(?<=^\S+)\s/);if(!r[1])return"no arguments given";r[1]=r[1].replace(/\s+/g,"");var e=r[1].split(",");switch(r[0]){case"mov":return function(t){if(2!=t.length)return"incorrect arguments";if(t[0].startsWith("["))return(r=s(t[0])).length>5?r:null==f(t[1])?l(r,t[1]):l(r,g(t[1]));if(t[1].startsWith("[")){var r;if((r=s(t[1])).length>5)return r;var e=f(t[0]);if(null==e)return"wrong register: "+t[0];if(2==e)return p(t[0],c(r));var n=c("".concat((parseInt(r,16)+1).toHex().padStart(4,"0")).concat(c(r),"h"));return p(t[0],n)}var a=f(t[0]),i=f(t[1]);return null==a?"wrong register: "+t[0]:null==i?p(t[0],t[1]):a==i?p(t[0],g(t[1])):"registers sizes do not match"}(e);case"xchg":return function(t){if(2!=t.length)return"incorrect arguments";if(t[0].startsWith("[")){if((a=s(t[0])).length>5)return a;if(null==(i=f(t[1])))return"wrong register: "+t[1];var r,e=g(t[1]);if(2==i)r=p(t[1],c(a));else{var n="".concat(c((parseInt(a,16)+1).toHex().padStart(4,"0"))).concat(c(a),"h");r=p(t[1],n)}return r||l(a,e)}if(t[1].startsWith("[")){var a,i;if((a=s(t[1])).length>5)return a;if(null==(i=f(t[0])))return"wrong register: "+t[0];var u,o=g(t[1]);return 2==i?u=p(t[0],c(a)):(n="".concat(c((parseInt(a,16)+1).toHex().padStart(4,"0"))).concat(c(a),"h"),u=p(t[0],n)),u||l(a,o)}var h=f(t[0]),v=f(t[1]);if(null==h)return"wrong register: "+t[0];if(null==v)return"wrong register: "+t[1];if(h!=v)return"registers sizes do not match";var d=g(t[0]);return p(t[0],g(t[1]))||p(t[1],d)}(e);case"push":return function(t){var r,e,i=f(t);if(null==i)e=t;else{if(i<4)return"wrong register: "+t;e=(e=null!==(r=g(t))&&void 0!==r?r:"").toLowerCase()}var o=function(t,r){if(t=t.substring(t.length-4).toLowerCase(),n.test(r))return"Argument is incorrect value";var e=r.toUpperCase();return e.length<=2?(e=e.padStart(2,"0"),u[t]=e):e.length>2&&((e=e.padStart(4,"0")).length>4&&(e=e.substring(e.length-4)),u[(parseInt(t,16)+1).toHex().padStart(4,"0")]=e.slice(0,2),u[t]=e.substring(2,4)),!1}(k.sp.value,e);if(o)return o;var s=parseInt(k.sp.value,16)+2,l=p("sp",s.toHex());if(l)return l;A(a,u)}(e[0]);case"pop":return function(t){var r=f(t);if(null==r||r<4)return"incorrect register: "+t;var e=parseInt(k.sp.value,16)-2;if(e<0)return"empty stack";var n=p("sp",e.toHex());if(n)return n;A(a,u);var i=k.sp.value,s="".concat(o((parseInt(i,16)+1).toHex().padStart(4,"0"))).concat(o(i));return s=s.toLowerCase(),p(t,s)}(e[0]);default:return"wrong instruction"}},v=r("#memAddress"),d=(r("#stackAddress"),e("#memory .input")),m=e("#stack .input"),b=e(".mem-name"),S=e(".stack-name"),w=r("#cmd"),x=r("#execBtn"),C=r("#randomBtn"),L=r("#resetRegBtn"),I=r("#resetDataBtn"),H=r("#resetStackBtn"),k={ah:r("#ah"),al:r("#al"),bh:r("#bh"),bl:r("#bl"),ch:r("#ch"),cl:r("#cl"),dh:r("#dh"),dl:r("#dl"),ax:r("#al"),bx:r("#bl"),cx:r("#cl"),dx:r("#dl"),bp:r("#bp"),si:r("#si"),di:r("#di"),sp:r("#sp"),disp:r("#disp")};C.onclick=function(){return function(){for(var t in k)if("sp"!=t&&"h"!=t[1]&&"l"!=t[1]){var r=(e=0,65535,e=Math.ceil(e),Math.floor(Math.random()*(Math.floor(65535)-e))+e);p(t,r)}var e}()},L.onclick=function(){return function(){for(var t in k)"sp"!=t&&"h"!=t[1]&&"l"!=t[1]&&p(t,0)}()},I.onclick=function(){return function(){for(var t in i)i[t]="00";y("0000",i)}()},H.onclick=function(){return function(){for(var t in u)u[t]="00";p("sp",0),A(a="0000",u)}()},x.onclick=function(){var t=h(w.value);t&&alert(t)};var y=function(t,r){t=t.toLowerCase();var e=[];b.forEach((function(r,n){e[n]=0==n?t.slice(0,-1)+"0":(parseInt(e[n-1],16)+16).toString(16).padStart(4,"0"),r.innerHTML=e[n].length>4?"":e[n]})),d.forEach((function(n){var a=n,i="";"a"==a.id[1]?i=e[0]:"b"==a.id[1]?i=e[1]:"c"==a.id[1]?i=e[2]:"d"==a.id[1]&&(i=e[3]);var u=(i.slice(0,-1)+a.id[0]).toLowerCase();u.length>4?a.value="":(null==r[u]&&(r[u]="00"),a.value=r[u].toUpperCase(),t==u?a.classList.add("highlight"):a.classList.remove("highlight"),a.parentElement.id=u)}))},A=function(t,r){t=t.toLowerCase();var e=[];S.forEach((function(r,n){e[n]=0==n?t.slice(0,-1)+"0":(parseInt(e[n-1],16)+16).toString(16).padStart(4,"0"),r.innerHTML=e[n].length>4?"":e[n]})),m.forEach((function(t){var n=t,a="";"a"==n.id[2]?a=e[0]:"b"==n.id[2]?a=e[1]:"c"==n.id[2]?a=e[2]:"d"==n.id[2]&&(a=e[3]);var i=(a.slice(0,-1)+n.id[1]).toLowerCase();i.length>4?n.value="":(null==r[i]&&(r[i]="00"),n.value=r[i].toUpperCase(),n.parentElement.id="s"+i,k.sp.value.toLowerCase()==i?n.classList.add("highlight"):n.classList.remove("highlight"))}))}})();