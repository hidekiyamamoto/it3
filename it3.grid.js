if(!it3){console.log('it3.js not found - it3.js is required by it3.grid.js')}
it3.Grid=function(elm,oo){this.elm=it3.$(elm);if(it3.inoe(this.elm.id)){this.elm.id=it3.uid('it3grid-')}
	this.oo=it3.extend({width:10,height:10,itemclass:'gitem',draggable:true,resize:'both',overflow:'auto';},oo)
	this.items=[];this.itemsids={};this.init();
};
it3.Grid.prototype={
	init:function(){var _this=this;
		if(this.oo.draggable){this.elm.addEventListener('dragover',function(ev){_this._dragover(ev)});this.elm.addEventListener('drop',function(ev){_this._drop(ev)});}
		let ii=document.querySelectorAll('#'+this.elm.id+' .'+this.oo.itemclass);
		for(let i=0;i<ii.length;i++){
			let x=ii[i].offsetTop/this.cellh;let y=ii[i].offsetLeft/this.cellw;
			let h=ii[i].offsetHeight/this.cellh;let w=ii[i].offsetWidth/this.cellw;
			this._setupgitem(ii[i],x,y,w,h);
		}
	},
	flow:function(){this.maxw=this.elm.offsetWidth;this.maxh=this.elm.offsetHeight;
		this.cellw=Math.floor(this.maxw/this.oo.width);
		this.cellh=Math.floor(this.maxh/this.oo.height);
	},
	add:function(x,y,w,h){
		
	},
	remove:function(item){let itemO=null;
		if(typeof item=="string"){item=this.itemsids[item]||false}
		if(typeof item=="number"){itemO=this.items[item]}
		if(typeof item=="object"){itemO=item;for(let i=0;i<this.items.length;i++){if(item.gitem.id==this.items[i].gitem.id){item=i;break;}}}
		if(!item){console.log('Item not found')}else{
		delete this.itemsids[itemO.gelm.id];it3.clearchilds(itemO.gelm);
		itemO.gelm.parentElement.removeChild(itemO.gelm);
		this.items.filter(function(a,b){if(b==item)return false;return true})}		
	}
	_setupgitem:function(gelm,x,y,w,h){var _this=this;if(it3.inoe(gelm.id)){gelm.id=it3.uid('it3gitem-')}
		gelm.style.resize=this.oo.resize;gelm.style.overflow=this.oo.overflow;
		if(this.oo.draggable){gelm.setAttribute('draggable',true);gelm.addEventListener('dragstart',function(ev){_this._itemdragstart(ev));}}
		w=w*this.cellw;h=h*this.cellh;y=y*this.cellw;x=x*this.cellh;
		if(this.oo.onselect){gelm.addEventListener('click',function(ev){_this._itemselect(ev));}}
		this.itemsids[gelm.id]=this.items.length;this.items.push({elm:gelm,x:x,y:y,w:w,h:h});
	},
	_itemselect:function(ev){
		ev.it3Grid=this;
		this.oo.onselect(ev);
	},
	_itemdragstart:function(ev){
		
	},_dragover:function(ev){
		
	},_drop:function(ev){
		
	}
};