$(document).ready(function(){
    $('.slider').mySlide();


    //navi
    $gnb = $('#main_gnb');
    $gnb_li = $gnb.children('li');
    $gnb_open = $('.opened_gnb');
    $subGnb_ul = $('.opened_gnb').find('ul');
    isDone=true;
    speed = 300;

   $gnb_li.on('mouseenter',openSub);
   $gnb_li,$gnb_open.on('mouseleave',closeSub);
   function openSub(){
       if(isDone){
            isDone = false;
           $gnb_open.slideDown(speed);  
       }        
       return false;
   }
   function closeSub(){
       $gnb_open.stop().slideUp(speed);
       isDone = true;
   }


   //search
   $search = $('.search_box').children('a.search');
   $search.on('click',function(e){
       e.preventDefault();
       if($('#search').width() == 0){
        $('#search').animate({width:190},200)
       }else{
           $('#search').animate({width:0},200)
       }
   });
   



   //scroll
   
   var sec1Pos = $('.section1').offset().top;
   var top = $('body').offset().top;
   $('.btn_scroll_down').on('click', function(e){
        e.preventDefault();
        movePos(sec1Pos);
   });
   $(".slider").on("mousewheel DOMMouseScroll",function(e){
        var delta = e.originalEvent.wheelDelta;  
        if(delta == -120){
            movePos(sec1Pos);
            return
        }
    });
    $(".section1").on("mousewheel DOMMouseScroll",function(e){
        var delta = e.originalEvent.wheelDelta;        
        if(delta == 120){
            movePos(top);
            return
        }
    });

    function movePos(pos){    
    move = TweenMax.to($('html,body'),0.5,{scrollTop:pos});
    // TweenMax.to( target:Object, duration:Number, vars:Object )
    // $('html,body').stop().animate({'scrollTop':pos},500);
    };  

    //cookies
    //https://www.w3schools.com/js/js_cookies.asp
});



(function(){
    function Slides(panel){                    
        var it = this;
        this.initDOM(panel);
        this.nextEvent(it);
        this.prevEvent(it);
        this.naviBtn(it);
        this.rollingSlide(it);
        this.rollingPlay(it);
        this.mouseEnter(it);
        this.mouseLeave(it);
    } 
    
    Slides.prototype.initDOM = function(el){
        this.$wrap = $(el);
        this.$panels = this.$wrap.children('.panel');
        this.$panel = this.$wrap.children('.panel').children('li');            
        this.$total = this.$panel.length;            
        this.$total -= 1;
        this.$next = this.$wrap.children('.next');
        this.$prev = this.$wrap.children('.prev');
        this.$nav = this.$wrap.children('.navi');
        this.$navi = this.$nav.children('li');
        this.$navi_a = this.$navi.find('a'); 
        this.$rolling = this.$wrap.children('#rolling');
        this.$group = [this.$nav,this.$next,this.$prev]; // mouseHover elements group
    }

    Slides.prototype.nextEvent = function(self){
        self.$next.on('click',function(e){        
            e.preventDefault();             
            var i = self.$panels.children('li.on').index(); 
            (i == self.$total) ?  i=0 :  i++;
            self.showSlide(i);
        });
    }

    Slides.prototype.prevEvent = function(self){
        self.$prev.on('click',function(e){
            e.preventDefault();            
            (i==0) ? i=self.$total : i--;
            self.showSlide(i);
        });
    }   

    //네비게이션 버튼 클릭이벤트
    Slides.prototype.naviBtn = function(self){ 
        self.$navi.on('click',function(e){            
            e.preventDefault();
            var i = self.$panels.children('li.on').index(); 
            var clicked = $(this).index();                
            if(i != clicked){
               self.showSlide(clicked);
            }    
        });
    }
    
    //재생 or 스탑버튼 클릭이벤트
    Slides.prototype.rollingPlay = function(self){
        this.$rolling.on('click',function(){
            if($(this).attr('class') == 'stop'){
                clearInterval(self.timer);
                self.$rolling.removeClass();
                self.$rolling.addClass('play never');
            }else{
                self.$rolling.removeClass();
                self.$rolling.addClass('stop');                
                self.rollingSlide(self);
            }
        });
    }

    //자동롤링
    Slides.prototype.rollingSlide = function(self){
        self.timer = setInterval(function(){
            var i = self.$panels.children('li.on').index();  
            (i == self.$total) ?  i=0 :  i++;
            self.showSlide(i);
        },3000);        
    }

    //페이징이벤트
    Slides.prototype.showSlide = function(index){     
        this.$navi_a.removeClass("on");
        this.$navi.eq(index).children('a').addClass("on"); 
        this.$panel.fadeOut().removeClass("on");
        this.$panel.eq(index).fadeIn().addClass("on");
    }        

    //마우스엔터
    Slides.prototype.mouseEnter = function(self){
        this.$group.forEach(elem =>{
            elem.on('mouseenter', ()=>{
                if(self.$rolling.attr('class') == 'stop'){
                    clearInterval(self.timer);
                    self.$rolling.removeClass();
                    self.$rolling.addClass('play');
                }
            });
        })
    }

    //마우스리브
    Slides.prototype.mouseLeave = function(self){
        this.$group.forEach(elem =>{            
            elem.on('mouseleave', ()=>{
                if(self.$rolling.attr('class') == 'play'){
                    self.$rolling.removeClass();
                    self.$rolling.addClass('stop');
                    self.rollingSlide(self);            
                }else{
                    return
                }
            });
        })
    }

$.fn.mySlide = function(){
        new Slides(this);
    }
        
})(jQuery)
    