// LibPagenate
//import LibCommon from "../libs/LibCommon"

//
export default {
    init:function(){
        this.per_page = 10;
    },    
    set_per_page:function(num){
        this.per_page = num;
    },    
    get_per_page:function(){
        return  this.per_page;
    },    
    get_page_start:function(page){
        var start_num = (page -1) * this.per_page;
        var end = page * this.per_page;
        var ret ={
//            start: start_num,  limit: this.per_page,
            start: start_num,  end: end,
        }        
//        console.log("per_page:",this.per_page)
        return ret;
    },    
    get_max_page:function(count){
        var num = count / this.per_page;
        return num
    },
    is_paging_display(count){
        var ret = 0;
        var num = count / this.per_page;
//console.log( "num=" ,num )
        if(num >= 1){
            ret = 1
        }
        return ret;
    },
    is_next_display(page, count){
        var ret = 0
        var maxNum = count / this.per_page;
//console.log( "maxNum=" ,maxNum )
        if(page < maxNum){
            ret = 1
        }
        return ret
    },
    get_page_items(data){
        var paginate_disp = this.is_paging_display(data.length)
        var page_item = {
            "item_count":data.length ,"paginate_disp": paginate_disp
        }
        var param = {
             "docs": data ,
             "page_item": page_item,            
        };
        return  param;       
    },
    getOnepageItems : function(items, start , end){
        var ret = []
        items.forEach(function(item, index){
            if((index >= start) && (index < end )){
                ret.push(item)
            }
    //            console.log( item )
        });
        return ret
    },
    /*********************************
     * get , 1 page items
    ***********************************/     
   get_items: function(items, skip, limit){
        var ret = []
        var end = skip + limit;
    // console.log( start, end )
        items.forEach(function(item, index){
            if((index >= skip) && (index < end )){
                ret.push(item)
            }
//            console.log( item )
        });
        return ret        
    },       
}