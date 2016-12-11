
(function slideShow(parentEl,pageNum,dire,autoLoop,loopTime){
    var slides = document.getElementsByTagName('img'); //展示图片数组
    var slidesLen = slides.length; //缓存图片数量
    var dir = 0; //滚动方向，
    if (dire == 'left')
        dir = -1;
    else
        dir = 1;
    var naviUl = document.createElement('ul');  //导航条控件
    //按照图片数量添加导航点
    for (var i = 0; i < slidesLen; i++) {
        var newLi = document.createElement('li');
        newLi.setAttribute('id', i);
        naviUl.appendChild(newLi);
    }
    addClass(naviUl,'navi-control');
    parentEl.parentNode.appendChild(naviUl);    //添加导航条到dom

    //设置初始显示图片
    addClass(document.getElementsByTagName('li')[pageNum],'active');
    var currentIndex = pageNum;
    parentEl.style.left = currentIndex * (-400) +'px';

    //添加导航条点击切换事件 
    delegateEvent($('.navi-control'),'li','click',function(e){
        removeActivedLi($('.navi-control'));
        addClass(e.target,'active');    
        var index = e.target.getAttribute('id'),
            iTarget = index * (-400);

        startmove(parentEl,{'left':iTarget},30);
    })

    //自动切换函数
   function autoSlide() {
        //1. 寻找当前显示图片
       var currentLi = $('.active'),
           currentIndex = currentLi.getAttribute('id');
        //2.确定下一个目标图片           
       var nextIndex = 0;
       if (+currentIndex + 1 * dir == -1) {
           nextIndex = 3;   //当前为第一张时，改成最后一张
       } else if (+currentIndex + 1 * dir == slidesLen) {
           nextIndex = 0;   //当前为最后一张时，改成第一张
       } else {
           nextIndex = +currentIndex + 1 * dir; //否则根据dir方向决定
       }

       var iTarget = -nextIndex * 400,  //400为图片宽度，单位移动距离
           nextLi = $('.navi-control').children[nextIndex];
       //3.移动图片，改变导航点样式
       startmove(parentEl, { 'left': iTarget }, 30);
       removeActivedLi($('.navi-control'));
       addClass(nextLi, 'active');
   }
   //循环为true时，设定计时器
   if(autoLoop){
    var loopTimer = setInterval(autoSlide,loopTime);
   }

   //鼠标在轮播器上时，取消自动循环计时器
   $.addEvent($('.img-container'),'mouseover',function(){
       autoLoop && clearInterval(loopTimer);
   })
   //鼠标移出轮播器时，重新设定计时器
   $.addEvent($('.img-container'),'mouseout',function(){
       autoLoop && (loopTimer = setInterval(autoSlide,loopTime));
   })

})( $('.img-wrapper'),1,'right',true,1000)

function removeActivedLi(element){
    var child = element.firstElementChild;
    while(!!child){
        child.classList.remove('active');
        child = child.nextElementSibling;
    }
}

