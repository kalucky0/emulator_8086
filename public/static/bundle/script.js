(()=>{"use strict";var t={d:(e,r)=>{for(var n in r)t.o(r,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};t.d({},{J$:()=>d,YD:()=>k,yt:()=>A,Kz:()=>E});var e=function(t){return document.querySelector(t)},r=function(t){return document.querySelectorAll(t)};Number.prototype.toHex=function(){return this.toString(16)};var n=/[^0-9]+/g,a=/[^0-9a-fA-F]+/g,i="0000",l={"0000":"00"},s={"0000":"00"},u=function(t){return t=t.toLowerCase(),null==s[t]&&(s[t]="00"),s[t]},o=function(t){for(var e=0,r=0,i=(t=t.slice(1,-1)).split("+");r<i.length;r++){var l=i[r];if("bx"==l||"bp"==l||"si"==l||"di"==l||"disp"==l)e+=parseInt(k[l].value,16);else if("h"!=l[l.length-1]&&"H"!=l[l.length-1]){if(n.test(l))return l+" can't be used to adress memory";e+=parseInt(l)}else{if(l=l.slice(0,-1),a.test(l))return l+" can't be used to adress memory";e+=parseInt(l,16)}}return e.toHex().padStart(4,"0")},c=function(t,e){var r;if(t=t.substring(t.length-4).toLowerCase(),"h"!=e[e.length-1]&&"H"!=e[e.length-1]){if(n.test(e))return"Argument is incorrect value";r=(e=parseInt(e)).toHex()}else if(r=e.slice(0,-1),a.test(r))return"Argument is incorrect value";return(r=r.toUpperCase()).length<=2?(r=r.padStart(2,"0"),l[t]=r):r.length>2&&((r=r.padStart(4,"0")).length>4&&(r=r.substring(r.length-4)),l[(parseInt(t,16)+1).toHex().padStart(4,"0")]=r.slice(0,2),l[t]=r.substring(2,4)),d.value=t.toUpperCase(),A(t,l),!1},p=function(t){return t=t.toLowerCase(),null==l[t]&&(l[t]="00"),l[t]},h=function(t){return null==k[t]?null:"x"==t[1]||"p"==t[1]||"i"==t[1]?4:2},f=function(t,e){var r="",i=h(t);if(null===i)return null;if("h"!=e[e.length-1]&&"H"!=e[e.length-1]){if(n.test(e))return"Incorrect value";r=(e=parseInt(e)).toHex()}else if(r=e.slice(0,-1),a.test(r))return"Incorrect value";return r=(r=r.padStart(i,"0")).toUpperCase(),console.log(t,r),4==i&&r.length>4||2==i&&r.length>2?"Out of register bounds or incorrect argument":(2==i&&(k[t].value=r),4==i&&("x"==t[1]?(k[t[0].concat("h")].value=r.slice(0,2),k[t[0].concat("l")].value=r.substring(2,4)):k[t].value=r),null)},g=function(t){if(null==k[t])return null;if("x"==t[1]){var e=k[t[0].concat("h")].value,r=k[t[0].concat("l")].value;return e=e.padStart(2,"0"),r=r.padStart(2,"0"),e.concat(r).concat("h")}return 2==h(t)?k[t].value.padStart(2,"0").concat("h"):4==h(t)?k[t].value.padStart(4,"0").concat("h"):null},v=function(t){var e=t.toLowerCase().split(/(?<=^\S+)\s/);if(!e[1])return"no arguments given";e[1]=e[1].replace(/\s+/g,"");var r=e[1].split(",");switch(e[0]){case"mov":return function(t){if(2!=t.length)return"incorrect arguments";if(t[0].startsWith("["))return(e=o(t[0])).length>5?e:null==h(t[1])?c(e,t[1]):c(e,g(t[1]));if(t[1].startsWith("[")){var e;if((e=o(t[1])).length>5)return e;var r=h(t[0]);if(null==r)return"wrong register: "+t[0];if(2==r)return f(t[0],p(e)+"h");var n=p("".concat((parseInt(e,16)+1).toHex().padStart(4,"0")).concat(p(e),"h"));return f(t[0],n)}var a=h(t[0]),i=h(t[1]);return null==a?"wrong register: "+t[0]:null==i?f(t[0],t[1]):a==i?f(t[0],g(t[1])):"Registers size do not match"}(r);case"xchg":return;case"push":return function(t){var e,r,l=h(t);if(null==l)r=t;else{if(l<4)return"wrong register: "+t;r=(r=null!==(e=g(t))&&void 0!==e?e:"").toLowerCase()}var u=function(t,e){var r="";if(t=t.substring(t.length-4).toLowerCase(),"h"!=e[e.length-1]&&"H"!=e[e.length-1]){if(n.test(e))return"Argument is incorrect value";r=(e=parseInt(e)).toHex()}else if(r=e.slice(0,-1),a.test(r))return"Argument is incorrect value";return(r=r.toUpperCase()).length<=2?(r=r.padStart(2,"0"),s[t]=r):r.length>2&&((r=r.padStart(4,"0")).length>4&&(r=r.substring(r.length-4)),s[(parseInt(t,16)+1).toHex().padStart(4,"0")]=r.slice(0,2),s[t]=r.substring(2,4)),!1}(k.sp.value,r);if(u)return u;var o=parseInt(k.sp.value,16)+2,c=f("sp",o);if(c)return c;E(i,s)}(r[0]);case"pop":return function(t){var e=h(t);if(null==e||e<4)return"incorrect register: "+t;var r=parseInt(k.sp.value,16)-2;if(r<0)return"empty stack";var n=f("sp",r);if(n)return n;E(i,s);var a=k.sp.value,l="".concat(u((parseInt(a,16)+1).toHex().padStart(4,"0"))).concat(u(a));return l=l.toLowerCase(),f(t,l+"h")}(r[0]);default:return"wrong instruction"}},d=e("#memAddress"),m=(e("#stackAddress"),r("#memory .input")),b=r("#stack .input"),S=r(".mem-name"),x=r(".stack-name"),w=e("#cmd"),C=e("#execBtn"),L=e("#randomBtn"),I=e("#resetRegBtn"),H=e("#resetDataBtn"),y=e("#resetStackBtn"),k=(r(".reg-val input"),{ah:e("#ah"),al:e("#al"),bh:e("#bh"),bl:e("#bl"),ch:e("#ch"),cl:e("#cl"),dh:e("#dh"),dl:e("#dl"),ax:e("#al"),bx:e("#bl"),cx:e("#cl"),dx:e("#dl"),bp:e("#bp"),si:e("#si"),di:e("#di"),sp:e("#sp"),disp:e("#disp")});L.onclick=function(){return function(){for(var t in k)if("sp"!=t&&"h"!=t[1]&&"l"!=t[1]){var e=(r=0,65535,r=Math.ceil(r),Math.floor(Math.random()*(Math.floor(65535)-r))+r);f(t,e)}var r}()},I.onclick=function(){return function(){for(var t in k)"sp"!=t&&"h"!=t[1]&&"l"!=t[1]&&f(t,0)}()},H.onclick=function(){return function(){for(var t in l)l[t]="00";A("0000",l)}()},y.onclick=function(){return function(){for(var t in s)s[t]="00";f("sp",0),E(i="0000",s)}()},C.onclick=function(){var t=v(w.value);t&&alert(t)};var A=function(t,e){t=t.toLowerCase();var r=[];S.forEach((function(e,n){r[n]=0==n?t.slice(0,-1)+"0":(parseInt(r[n-1],16)+16).toString(16).padStart(4,"0"),e.innerHTML=r[n].length>4?"":r[n]})),m.forEach((function(n){var a=n,i="";"a"==a.id[1]?i=r[0]:"b"==a.id[1]?i=r[1]:"c"==a.id[1]?i=r[2]:"d"==a.id[1]&&(i=r[3]);var l=(i.slice(0,-1)+a.id[0]).toLowerCase();l.length>4?a.value="":(null==e[l]&&(e[l]="00"),a.value=e[l].toUpperCase(),t==l?a.classList.add("highlight"):a.classList.remove("highlight"),a.parentElement.id=l)}))},E=function(t,e){t=t.toLowerCase();var r=[];x.forEach((function(e,n){r[n]=0==n?t.slice(0,-1)+"0":(parseInt(r[n-1],16)+16).toString(16).padStart(4,"0"),e.innerHTML=r[n].length>4?"":r[n]})),b.forEach((function(t){var n=t,a="";"a"==n.id[2]?a=r[0]:"b"==n.id[2]?a=r[1]:"c"==n.id[2]?a=r[2]:"d"==n.id[2]&&(a=r[3]);var i=(a.slice(0,-1)+n.id[1]).toLowerCase();i.length>4?n.value="":(null==e[i]&&(e[i]="00"),n.value=e[i].toUpperCase(),n.parentElement.id="s"+i,k.sp.value.toLowerCase()==i?n.classList.add("highlight"):n.classList.remove("highlight"))}))}})();