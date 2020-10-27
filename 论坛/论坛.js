// JavaScript Document



window.onload=function(){
    var imgArr=[
        {"path":"img/2.png"},
        {"path":"img/2.png"},
        {"path":"img/3.png"},
        {"path":"img/4.png"},
        {"path":"img/5.png"},
        {"path":"img/6.png"},
        {"path":"img/7.jpg"}
    ];
    var size=[
        {"top":60,"left":0,"width":400,"height":240,"zIndex":1,"opacity":0},
        {"top":60,"left":0,"width":400,"height":240,"zIndex":2,"opacity":40},
        {"top":30,"left":150,"width":500,"height":300,"zIndex":3,"opacity":70},
        {"top":0,"left":300,"width":600,"height":360,"zIndex":4,"opacity":100},
        {"top":30,"left":550,"width":500,"height":300,"zIndex":3,"opacity":70},
        {"top":60,"left":800,"width":400,"height":240,"zIndex":2,"opacity":40},
        {"top":60,"left":800,"width":400,"height":240,"zIndex":1,"opacity":0}
    ];
    var imgSum=imgArr.length;
    var wrap=document.getElementById('wrap');
    var cont=wrap.firstElementChild || wrap.firstChild;
    var btnArr=wrap.getElementsByTagName('a');
    var falg=true;
    var speed=7000;
    wrap.onmouseover=function(){
        for (var i=0;i<btnArr.length;i++) {
            btnArr[i].style.display='block';
        }
        clearInterval(wrap.timer);
    }
    wrap.onmouseout=function(){
        for (var i=0;i<btnArr.length;i++) {
            btnArr[i].style.display='none';
        }
        wrap.timer=setInterval(function(){
             move(true);
         },speed);
    }
    for (var i=0;i<imgSum;i++) {
        var lis=document.createElement('li');             
        // lis.style.cssText='top:'+size[i].top+'px;'+'left:'+size[i].left+'px;'+'width:'+size[i].width+'px;'+'z-index:'+size[i].zIndex+';'+'height:'
        // +size[i].height+'px;'+'opacity:'+size[i].opacity+';';
        lis.style.backgroundImage='url('+imgArr[i].path+')';
        cont.appendChild(lis);
    }
    var liArr=cont.children;
    move();
    wrap.timer=setInterval(function(){
        move(true);
    },speed);
    btnArr[1].onclick=function(){
        if (falg) {
            move(true);
        }
    }
    btnArr[0].onclick=function(){
        if (falg) {
            move(false);
        }
    }
    function move(bool){
        if(bool!=undefined){
            if(bool){
                size.unshift(size.pop());
            }else {
                size.push(size.shift());
            }
        }
        for (var i=0;i<liArr.length;i++) {
            animate(liArr[i],size[i],function(){
                falg=true;
            });
        }
    }
}




function getStyle(obj,attr){
	return obj.currentStyle ? obj.currentStyle[attr] : window.getComputedStyle(obj,null)[attr];
}

function animate(obj,json,fn){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var bool=true;
		for(var k in json){
			var leader;
			if (k=='opacity') {
				if (getStyle(obj,k)==undefined) {
					leader=100;
				}else {
					leader=parseInt(getStyle(obj,k)*100);
				}
			}else {
				leader=parseInt(getStyle(obj,k)) || 0;
			}
			var step=(json[k]-leader)/10;
			step=step>0?Math.ceil(step):Math.floor(step);
			leader=leader+step;
			if(k=='zIndex'){
				obj.style[k]=json[k];
			}else if(k=='opacity'){
				obj.style[k]=leader/100;
				obj.style.filter='alpha(opacity='+leader+')';
			}else {
				obj.style[k]=leader+'px';
			}
			if(json[k]!=leader){
				bool=false;
			}
		}
		if(bool){
			clearInterval(obj.timer);
			if (fn) {
				fn();
			}
		}
	},10);
}
