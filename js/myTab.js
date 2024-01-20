window.onload = function(){
    var tab1 = new Tab('#tab');
}

class Tab{
    constructor(selector){  
        this.initDOM(selector);
        this.bindingEvent();
        this.nextBtn();
        this.prevBtn();
    }
    
    initDOM(el){
        this.el = document.querySelector(el);        
        this.btns = this.el.querySelectorAll('ul>li');
        this.boxs = this.el.querySelectorAll('div');
        
        this.next = this.el.querySelector('a.tab_next');    
        this.prev = this.el.querySelector('a.tab_prev');
        this.total = this.el.querySelector('span.total'); // 탭의 총 개수 표시부분
        this.total.innerHTML = this.btns.length;
        this.active_num = this.el.querySelector('span.active'); // 탭의 현재 위치 표시부분
    }

    bindingEvent(){
        let self = this;
        for(let i=0; i<this.btns.length; i++){
            this.btns[i].addEventListener('click',function(e){
                e.preventDefault();
                self.activateBox(i);
            });
        }
    }

    nextBtn(){
        let self= this;    
        this.next.addEventListener('click',function(e){
            e.preventDefault();
            for(let i=0; i<self.btns.length; i++){
                if(self.btns[i].className=="on"){
                    (i==self.btns.length-1)? i=0 : i+=1;
                    self.activateBox(i);
                }
            }
        });        
    }        

    prevBtn(){
        let self= this;    
        this.prev.addEventListener('click',function(e){
            e.preventDefault();
            for(let i=0; i<self.btns.length; i++){
                if(self.btns[i].className=="on"){
                    (i==0)? i=self.btns.length-1 : i-=1;
                    self.activateBox(i);
                }
            }
        });        
    }   

    activateBox(index){
        for(let i=0; i<this.btns.length; i++){
            this.btns[i].classList.remove('on');
            this.btns[index].classList.add('on');
            this.boxs[i].classList.remove('on');
            this.boxs[index].classList.add('on');
        }
        this.naviNum(index+1);
    }

    //네비게이션 현재위치 표시
    naviNum(current){        
        this.active_num.innerHTML = current;
    }
    
}
