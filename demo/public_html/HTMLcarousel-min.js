var Carousel=function(){};Carousel.prototype={debug:!0,loop:!0,currentSlide:0,clickable:!0,mode:1,screenflow:{width:null,height:null,smaller:null,buffer:-30,fade:.7},active:!0,offset:0,arrows:{size:64,margin:0},slide:"cover",desktopAgents:["desktop"],svg:{prev:'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="48" height="48" viewBox="0 0 48 48"><path d="M30.844 14.813l-9.188 9.188 9.188 9.188-2.813 2.813-12-12 12-12z"></path></svg>',next:'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="48" height="48" viewBox="0 0 48 48"><path d="M19.969 12l12 12-12 12-2.813-2.813 9.188-9.188-9.188-9.188z"></path></svg>',spin:'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32" viewBox="0 0 32 32"><path d="M16 0c-8.711 0-15.796 6.961-15.995 15.624 0.185-7.558 5.932-13.624 12.995-13.624 7.18 0 13 6.268 13 14 0 1.657 1.343 3 3 3s3-1.343 3-3c0-8.837-7.163-16-16-16zM16 32c8.711 0 15.796-6.961 15.995-15.624-0.185 7.558-5.932 13.624-12.995 13.624-7.18 0-13-6.268-13-14 0-1.657-1.343-3-3-3s-3 1.343-3 3c0 8.837 7.163 16 16 16z"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 16 16" to="360 16 16" begin="0" dur="1s" repeatCount="indefinite" /></path></svg>'},colors_container:"#000",colors_prev:"#FFF",colors_next:"#FFF",colors_spin:"#FFF",colors_net:"rgba(0,0,0,0.3)",dom_container:null,dom_slides:null,dom_net:null,dom_dots:null,dom_prev:null,dom_next:null,dom_spin:null,images:[],imageinfo:[],dom_index:{prev:null,now:null,next:null},checkForMobile:function(){for(var e=!0,t=0;t<this.desktopAgents.length;t++){var s;s=new RegExp(this.desktopAgents[t],"i"),window.document.documentElement.className.match(s)&&(e=!1)}e?(this.ismobile=!0,this.trace("mobile browser detected")):(this.ismobile=!1,this.trace("desktop browser detected"))},dom_template_prev:function(){this.dom_prev=document.createElement("div"),this.dom_prev.innerHTML=this.svg.prev,this.dom_prev.getElementsByTagName("path")[0].style.fill=this.colors_prev,this.dom_prev.getElementsByTagName("svg")[0].style.height=this.arrows.size,this.dom_prev.getElementsByTagName("svg")[0].style.width=this.arrows.size},dom_template_next:function(){this.dom_next=document.createElement("div"),this.dom_next.innerHTML=this.svg.next,this.dom_next.getElementsByTagName("path")[0].style.fill=this.colors_next,this.dom_next.getElementsByTagName("svg")[0].style.height=this.arrows.size,this.dom_next.getElementsByTagName("svg")[0].style.width=this.arrows.size},dom_template_spin:function(){this.dom_spin=document.createElement("div"),this.dom_spin.innerHTML=this.svg.spin,this.dom_spin.getElementsByTagName("path")[0].style.fill=this.colors_spin},init:function(e,t,s){var i=this;this.images=t,3===this.mode&&this.images.length<3&&(alert("You need at least three images for mode 3. Switching to default (1)"),this.mode=1),s&&(this.imageinfo=s),null===this.ismobile&&this.checkForMobile(),"object"==typeof e?this.dom_container=document.getElementById(e.id):this.dom_container=document.getElementById(e);var o=window.getComputedStyle(this.dom_container).getPropertyValue("position");if("static"===o&&(this.dom_container.style.position="relative"),this.dom_container.style.backgroundColor=this.colors_container,this.dom_container.style.overflow="hidden",document.defaultView&&document.defaultView.getComputedStyle){var n=document.defaultView.getComputedStyle(this.dom_container,"");this.zindex=parseInt(n.getPropertyValue("z-index"),50)}else this.dom_container.currentStyle&&(this.zindex=parseInt(this.dom_container.currentStyle.zIndex,50));this.zindex||(this.zindex=0,this.trace("z-index for video container element not detected, make sure position property is set.\nzIndex set to 0")),this.dom_slides=document.createElement("div"),this.dom_slides.className="slides",this.dom_slides.style.position="relative",this.dom_slides.style.height="100%",this.dom_slides.style.width="100%",this.dom_slides.style.top=0,this.dom_slides.style.left=0,this.dom_slides.style.display="block",this.dom_slides.style.zIndex=this.zindex+1,this.dom_container.appendChild(this.dom_slides),this.dom_template_prev(),this.addClass(this.dom_prev,"cbtn"),this.addClass(this.dom_prev,"prev"),this.dom_prev.style.zIndex=this.zindex+6,this.dom_prev.style.display="block",this.dom_prev.style.position="absolute",this.dom_prev.style.cursor="pointer",this.dom_prev.style.opacity=0,this.dom_prev.onclick=function(){i.prevSlide()},this.setVendor(this.dom_prev,"Transition","all 0.3s ease-In"),this.dom_container.appendChild(this.dom_prev),this.dom_template_next(),this.addClass(this.dom_next,"cbtn"),this.addClass(this.dom_next,"next"),this.dom_next.style.zIndex=this.zindex+6,this.dom_next.style.display="block",this.dom_next.style.position="absolute",this.dom_next.style.cursor="pointer",this.dom_next.style.opacity=0,this.dom_next.onclick=function(){i.nextSlide()},this.setVendor(this.dom_next,"Transition","all 0.3s ease-In"),this.dom_container.appendChild(this.dom_next),this.dom_net=document.createElement("div"),this.dom_net.style.position="absolute",this.dom_net.style.display="none",this.dom_net.style.width="100%",this.dom_net.style.height="100%",this.dom_net.style.top="0",this.dom_net.style.left="0",this.dom_net.style.backgroundColor=this.colors_net,this.dom_net.style.opacity=0,this.dom_net.style.zIndex=this.zindex+7,this.setVendor(this.dom_net,"Transition","all 0.3s ease-In"),this.dom_container.appendChild(this.dom_net),this.dom_template_spin(),this.addClass(this.dom_spin,"spin"),this.dom_spin.style.zIndex=this.zindex+8,this.dom_spin.style.display="block",this.dom_spin.style.opacity=1,this.dom_spin.style.visibility="visible",this.dom_spin.style.position="absolute",this.setVendor(this.dom_spin,"Transition","all 0.3s ease-In"),this.dom_container.appendChild(this.dom_spin),this.reflow(),this.loadSlide(0)},prevSlide:function(){this.active&&(this.loadSlide(0,0),this.currentSlide--,this.currentSlide<0&&(this.currentSlide=this.images.length-1),this.trace(this.currentSlide))},nextSlide:function(){this.active&&(this.loadSlide(0,1),this.currentSlide++,this.currentSlide>this.images.length-1&&(this.currentSlide=0),this.trace(this.currentSlide))},checkEdges:function(){this.trace("loop: "+this.loop),this.loop?(this.toggle(this.dom_prev,1),this.toggle(this.dom_next,1)):(0===this.currentSlide?this.toggle(this.dom_prev,0):this.toggle(this.dom_prev,1),this.currentSlide===this.images.length-1?this.toggle(this.dom_next,0):this.toggle(this.dom_next,1))},loadSlide:function(e,t){var s=this,i=e+1,o=this.dom_slides,n=t?"right":"left";this.wait(1);var l;this.dom_index.next?(this.trace("no longer first"),"left"===n?this.arrayRotate(this.images,!0):this.arrayRotate(this.images),l=3===this.mode?this.images["left"===n?0:2]:this.images[1]):(this.trace("first time"),this.arrayRotate(this.images,!0),this.imageinfo.length&&this.arrayRotate(this.imageinfo,!0),l=3===this.mode?[this.images[0],this.images[1],this.images[2]]:this.images[1]),this.load(l,function(){s.wait(0),s.callback_show();var e=s.dom_index.next?s.dom_index.next:null,t=s.dom_index.prev?s.dom_index.prev:null,l=s.dom_index.now?s.dom_index.now:null,d,a,r,h,c,m,p,y,f,u,_;3===s.mode&&(e||l||t)&&(i="left"===n?0:2);var x=document.createElement("div");switch(x.style.position="absolute",x.style.backgroundImage="url("+s.images[i]+")",x.style.backgroundRepeat="no-repeat",x.style.backgroundPosition="center",x.style.zIndex=s.zindex+5,x.style.opacity=0,x.style.backgroundSize=s.slide,3!==s.mode&&(x.style.width="100%",x.style.height="100%"),s.setVendor(x,"Transition","all 0.3s ease-In"),o.appendChild(x),e||3===s.mode||setTimeout(function(){x.style.left=0,x.style.opacity=1,s.dom_index.next=x,s.assignClicks(),s.active=!0},50),s.mode){case 1:d="left"===n?s.dom_container.offsetWidth:s.dom_container.offsetWidth*-1,a="left"===n?s.dom_container.offsetWidth*-1:s.dom_container.offsetWidth,e&&(x.style.opacity=1,x.style.left=a+"px",setTimeout(function(){x.style.left="0px",e.style.left=d+"px",setTimeout(function(){e.parentNode.removeChild(e),s.dom_index.next=x,s.assignClicks(),s.active=!0},500)},200));break;case 2:d="left"===n?s.dom_container.offsetWidth:s.dom_container.offsetWidth*-1,a="left"===n?s.dom_container.offsetWidth*-1:s.dom_container.offsetWidth,e&&(e.style.zIndex=s.zindex+5,x.style.zIndex=s.zindex+4,x.style.opacity=1,x.style.left="0px",setTimeout(function(){e.style.left=d+"px",setTimeout(function(){e.parentNode.removeChild(e),s.dom_index.next=x,s.assignClicks(),s.active=!0},500)},500));break;case 3:if(r=s.screenflow.width?s.screenflow.width:s.dom_container.offsetHeight,h=s.screenflow.height?s.screenflow.height:s.dom_container.offsetHeight,c=(s.dom_container.offsetWidth-r)/2,m=s.screenflow.smaller?s.screenflow.smaller:.7,p=s.screenflow.smaller?s.screenflow.smaller*s.screenflow.smaller:.7*.7,x.style.width=r+"px",x.style.height=h+"px",t||l||e)y=t.offsetLeft,f=e.offsetLeft,u=t.offsetLeft-r*m,_=e.offsetLeft+r*m,x.style.width=r+"px",x.style.height=h+"px",x.style.opacity=0,s.setVendor(x,"Transform","scale("+p+")"),o.appendChild(x),x.style.left=("left"===n?u:_)+"px",setTimeout(function(){"left"===n?(e.style.left=_+"px",e.style.opacity=0,e.style.zIndex=s.zindex+3,s.setVendor(e,"Transform","scale("+p+")"),l.style.left=f+"px",l.style.opacity=s.screenflow.fade,s.setVendor(l,"Transform","scale("+m+")"),t.style.left=c+"px",t.style.opacity=1,s.setVendor(t,"Transform","scale(1.0)"),x.style.left=y+"px",x.style.opacity=s.screenflow.fade,x.style.zIndex=s.zindex+3,s.setVendor(x,"Transform","scale("+m+")"),setTimeout(function(){t.style.zIndex=s.zindex+6},50),setTimeout(function(){e.parentNode.removeChild(e),l.style.zIndex=s.zindex+4,t.style.zIndex=s.zindex+5,s.dom_index.prev=x,s.dom_index.now=t,s.dom_index.next=l,s.assignClicks(),s.active=!0},500)):(t.style.left=u+"px",t.style.zIndex=s.zindex+3,s.setVendor(t,"Transform","scale("+p+")"),l.style.left=y+"px",l.style.opacity=s.screenflow.fade,s.setVendor(l,"Transform","scale("+m+")"),e.style.left=c+"px",e.style.opacity=1,s.setVendor(e,"Transform","scale(1.0)"),x.style.left=f+"px",x.style.opacity=s.screenflow.fade,x.style.zIndex=s.zindex+3,s.setVendor(x,"Transform","scale("+m+")"),setTimeout(function(){e.style.zIndex=s.zindex+6},50),setTimeout(function(){t.parentNode.removeChild(t),l.style.zIndex=s.zindex+4,e.style.zIndex=s.zindex+5,s.dom_index.prev=l,s.dom_index.now=e,s.dom_index.next=x,s.assignClicks(),s.active=!0},500))},50);else{var g=document.createElement("div");g.style.position="absolute",g.style.backgroundImage="url("+s.images[i-1]+")",g.style.backgroundRepeat="no-repeat",g.style.backgroundPosition="center",g.style.zIndex=s.zindex+4,g.style.opacity=0,g.style.width=r+"px",g.style.height=h+"px",g.style.backgroundSize=s.slide,s.setVendor(g,"Transition","all 0.3s ease-In"),s.setVendor(g,"Transform","scale("+m+")"),o.appendChild(g);var v=document.createElement("div");v.style.position="absolute",v.style.backgroundImage="url("+s.images[i+1]+")",v.style.backgroundRepeat="no-repeat",v.style.backgroundPosition="center",v.style.zIndex=s.zindex+4,v.style.opacity=0,v.style.width=r+"px",v.style.height=h+"px",v.style.backgroundSize=s.slide,s.setVendor(v,"Transition","all 0.3s ease-In"),s.setVendor(v,"Transform","scale("+m+")"),o.appendChild(v),y=c-(g.offsetWidth+s.screenflow.buffer),f=c+r+s.screenflow.buffer,g.style.left=y+"px",v.style.left=f+"px",x.style.left=c+"px",setTimeout(function(){x.style.opacity=1,g.style.opacity=s.screenflow.fade,v.style.opacity=s.screenflow.fade,s.dom_index.now=x,s.dom_index.prev=g,s.dom_index.next=v,s.assignClicks(),s.active=!0},50)}break;default:e&&(e.style.zIndex=s.zindex+4,setTimeout(function(){x.style.opacity=1},50),setTimeout(function(){e.parentNode.removeChild(e),s.dom_index.next=x,s.assignClicks(),s.active=!0},500))}s.checkEdges()})},assignClicks:function(){var e=this;3===this.mode?(this.dom_index.prev.style.cursor="default",this.dom_index.prev.onclick=function(){(e.loop||0!==e.currentSlide)&&e.prevSlide()},this.dom_index.next.style.cursor="default",this.dom_index.next.onclick=function(){(e.loop||e.currentSlide!==e.images.length-1)&&e.nextSlide()},this.clickable&&(this.dom_index.now.style.cursor="pointer"),this.dom_index.now.onclick=function(){e.clickable&&e.callback_click()}):(this.clickable&&(this.dom_index.next.style.cursor="pointer"),this.dom_index.next.onclick=function(){e.clickable&&e.callback_click()})},callback_show:function(){this.trace("callback_show")},callback_click:function(){this.trace("callback_click")},toggle:function(e,t){t?(e.style.opacity=0,e.style.display="block",setTimeout(function(){e.style.opacity=1},50)):(e.style.opacity=0,setTimeout(function(){e.style.display="none"},300))},wait:function(e){var t=this;this.active=!1,e?this.dom_spin.style.visibility="visible":t.dom_spin.style.visibility="hidden"},get:function(e){return document.querySelector(e)},reflow:function(){this.dom_spin.style.top="50%",this.dom_spin.style.marginTop=Number(this.dom_spin.offsetHeight/2)*-1+"px",this.dom_spin.style.left="50%",this.dom_spin.style.marginLeft=Number(this.dom_spin.offsetWidth/2)*-1+"px",this.dom_prev.style.top="50%",this.dom_prev.style.marginTop=Number(this.dom_prev.offsetHeight/2)*-1+"px",this.dom_prev.style.left=this.arrows.margin+"px",this.dom_next.style.top="50%",this.dom_next.style.marginTop=Number(this.dom_next.offsetHeight/2)*-1+"px",this.dom_next.style.right=this.arrows.margin+"px"},setVendor:function(e,t,s){e.style["webkit"+t]=s,e.style["moz"+t]=s,e.style["ms"+t]=s,e.style["o"+t]=s},load:function(e,t){switch(typeof e){case"object":for(var s=0,i=function(){++s===e.length&&t&&t()},o=function(e){console&&console.log(e)},n=0;n<e.length;n++){var l=new Image;l.onload=i,l.onerror=o,l.src=e[n]}break;default:var d=new Image;d.onload=function(){t()},d.onerror=function(e){window.console&&console.log(e)},d.src=e}},arrayRotate:function(e,t){return t?(e.unshift(e.pop()),this.trace("array shifted left")):(e.push(e.shift()),this.trace("array shifted right")),e},trace:function(e){this.debug&&(window.console&&window.console.log(e),this.dom_debug&&(this.dom_debug.innerHTML+=e+"<br>"))},addClass:function(e,t){e.classList?e.classList.add(t):e.className+=" "+t},removeClass:function(e,t){e.classList?e.classList.remove(t):e.className=e.className.replace(new RegExp("(^|\\b)"+t.split(" ").join("|")+"(\\b|$)","gi")," ")}};