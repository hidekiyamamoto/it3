if(!window.X){window.X={};}
it3.dowloadbig=function(data,fn){
	let fileStream=streamSaver.createWriteStream(fn);
	let writer = fileStream.getWriter();
	let encoder=new TextEncoder();
	let uint8array = encoder.encode(JSON.stringify(data) + "\n\n");
	writer.write(uint8array);
	writer.close();};
it3.data={};
it3.data.sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds));};
//it3.data.monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

it3.data.Page=function(){
	this.name='Page';this.tiles=[];
	var _this=this;
	this.ELM=it3.ins(this.content,'div',['id',id,'class','report-page','onclick',"(window.R||window.DASH).ui_page_click(event);"],it3.data.T.vuegrid);
	this.G=new Vue({el:E,data:{draggable:isdraggable,resizable:isdraggable,index:0,layout:[]},
		methods:{
			itemTitle:function(item){var result=item.i;if(item.static){result+=" - Static";}return result;},				        
			removeItem:function(item){_this._remove_gitem(item.id);this.layout.splice(this.layout.indexOf(item),1);},
			editItem:function(item,ev){
				if(!ev.target.classList.contains('dt-button')){if(!ev.target.parentElement.classList.contains('dt-button')){
					if(ev){it3.fix(ev)}_this.select_gitem(item.id,false,true);
			}}},
			addItem:function(obj){var c;var item={"x":obj.x,"y":obj.y,"w":obj.w,"h":obj.h,"i":this.index+"","id":it3.uid('gid')};
				this.index++;this.layout.push(item);return item;},
			resizedEvent:function(i, newX, newY, newHPx, newWPx){	
				for(let x=0;x<this.layout.length;x++){if(this.layout[x].i==i){
					var CGI=DASH._get_gitem_by_id(this.layout[x].id);
					if(CGI.xobj.reflow){CGI.xobj.reflow();
						it3.data.sleep(250).then(()=>{CGI.xobj.reflow();it3.data.sleep(1000).then(()=>{CGI.xobj.reflow();});});}
	}	}	}	}	});
};
it3.data.Page.prototype{	
	empty_page:function(page){let i;let x=page.grid.layout.length;for(i=0;i<x;i++){page.grid.removeItem(page.grid.layout[i]);}},
	add_tile:function(ghtype,source,options,_next){		
		//this.select_source(false,sourcename);	
		if(options.coords){options.coords.static=it3.data.report_static;}
		var griditem=this.page.grid.addItem(options.coords||{"x":0,"y":0,"w":12,"h":14,static:it3.data.report_static});
		it3.data.sleep(250).then(()=>{
			var xx=this['_as_'+this.ghtype](target,source,options,_next);
			if(xx.is_msg){return false;}else{griditem.xobj=xx;this.tiles.push(griditem);}
		});
	},
	remove_tile:function(id){var XI;let gx=0;	/*only called by buttons*/
		for(gx=0;gx<this.tiles.length;gx++){if(this.tiles[gx].gitem.id==id){XI=this.tiles[gx];break;}}
		if(XI==this.current_gitem){this.unselect_all();this.current_gitem=false;}XI.destroy(false);this.tiles.splice(gx,1);},
	get_tile_by_id:function(id){for(var gx=0;gx<this.tiles.length;gx++){if(this.tiles[gx].gitem.id==id){return this.tiles[gx];}}},
	select_gitem:function(id,_gitem,keep_selection){
		if(it3.data.report_static){this.unselect_all();return;}
		var gid='';if(this.current_gitem){gid=this.current_gitem.gitem.id;}
		if(!_gitem){for(var gx=0;gx<this.tiles.length;gx++){
			if(this.tiles[gx].gitem.id==id){this.current_gitem=this.tiles[gx];break;}}
		}else{this.current_gitem=_gitem}
		if(this.current_gitem){
			if((gid==this.current_gitem.gitem.id)&&(!keep_selection)){
				this.unselect_all();this.current_gitem=false;
			}else{if(gid!=this.current_gitem.gitem.id){this.unselect_all();}
				gid=this.current_gitem.gitem.id;	
				if(this.current_gitem.ghtype!='tinymce'){
				if(this.current_source){if(this.current_source.ui){
					this.current_source.ui.style.display='';
						this.select_source(false,false,this.current_gitem.source);
						this.current_source._ui_revert_groups(this.current_gitem.grouped,this.current_gitem.filtered);
				}}}else{
					if(this.current_gitem.ghtype=='tinymce'){var _ox=this.current_gitem;this.current_gitem._re_tiny(function(tiny){_ox.xobj=tiny});}
					if(this.current_gitem.xobj){if(this.current_gitem.xobj.render){this.current_gitem.xobj.render();}}
				}
				this.select_page(false,this.current_gitem.page);
				var selector='# .sel-ctr,# .highcharts-button-symbol,# .highcharts-button-box,# .dt-buttons,# .dataTables_filter';
				selector=selector.replace(/#/g,'#'+gid);oo=document.querySelectorAll(selector);oo.forEach(function(o){o.style.display=''});				
				oo=document.querySelectorAll('# .dataTables_wrapper'.replace(/#/g,'#'+gid));oo.forEach(function(o){o.style.top='32px'});				
				oo=document.querySelectorAll('#'+this.guid+' .report-grouping');oo.forEach(e=>{e.classList.remove('disabled-chip');});				
				let CB=document.getElementById(this.current_gitem.gitem.id);if(CB){CB=CB.previousSibling;
				CB.style.display='';if(CB.previousSibling){CB.previousSibling.style.display='';
				if(CB.previousSibling.previousSibling){CB.previousSibling.previousSibling.style.display='';
				if(CB.previousSibling.previousSibling.previousSibling){CB.previousSibling.previousSibling.previousSibling.style.display='';}}}}
				if(this.current_gitem.xobj){if(this.current_gitem.xobj.series){
				for(var s=0;s<this.current_gitem.xobj.series.length;s++){
					oo=this.current_gitem.xobj.series[s].options;oo.showInLegend=true;
					this.current_gitem.xobj.series[s].setOptions(oo);}
				this.current_gitem.xobj.legend.update();}}
		}	}else{this.unselect_all();this.current_gitem=false;}
		return this.current_gitem;
	},
	unselect_all:function(){
		let oo=document.querySelectorAll('.report-source-ui');oo.forEach(function(o){o.style.display='none'});
		oo=document.querySelectorAll('.sel-ctr,.highcharts-button-symbol,.highcharts-button-box,.dt-buttons,.dataTables_filter');
		oo.forEach(function(o){o.style.display='none'});
		oo=document.querySelectorAll('.dataTables_wrapper');oo.forEach(function(o){o.style.top='0'});	
		oo=document.querySelectorAll('#'+this.guid+' .report-grouping');oo.forEach(e=>{e.classList.add('disabled-chip');});	
		for(let i=0;i<this.gitems.length;i++){
			if(this.gitems[i].ghtype=='tinymce'){if(this.gitems[i].xobj){
				if(this.gitems[i].xobj.destroy){this.gitems[i].xobj.destroy();
					this.gitems[i].element.firstChild.style.visibility='visible';
					this.gitems[i].element.firstChild.style.display='';
				}}
			}else if(this.gitems[i].ghtype=='xy-graph'){
				if(this.gitems[i].xobj){
				for(let s=0;s<this.gitems[i].xobj.series.length;s++){
					if(!this.gitems[i].xobj.series[s].visible){
						oo=this.gitems[i].xobj.series[s].options;oo.showInLegend=false;
						this.gitems[i].xobj.series[s].setOptions(oo);}
				}this.gitems[i].xobj.legend.update();}
	}	}	},
};


it3.data.Report=function(target,_menutarget){this.uid=it3.uid('rep');this.barid='bar'+this.uid;
	this.element=it3.ins(target,'div',['id',this.uid]);
	this.sources=[];this.gitems=[];this.pages=[];
	this.ui=null;
	this.content=null;
	this.current_page=false;this.current_source=false;this.current_gitem=false;
	this.init(_menutarget);};
it3.data.Report.prototype={
	init:function(_menutarget){let _this=this;this.mode='edit';
		this.ui=it3.ins(this.element,'div',['class','report-ui']);
		this.content=it3.ins(this.element,'div');
		if(!_menutarget){_menutarget=this.ui}
		this.report_menu=it3.ins(_menutarget,'div',['id',this.barid,'class','report-menu add_mode','style','display:inline-block'],it3.data.T.report_menu);
		let bb=document.querySelectorAll('#'+this.barid+' .it3-mb.dropdown-menu');
		bb.forEach(e=>{e.addEventListener('click',function(ev){return _this.ui_menu_button(ev);})});
		this.sources_sel=this.report_menu.getElementsByClassName('source-select')[0];
		this.sources_sel.addEventListener('change',function(ev){_this.ui_source_sel_handler(ev)});
		this.rem_src_butt=this.report_menu.getElementsByClassName('remove_source')[0];
		this.rem_src_butt.addEventListener('click',function(ev){_this.rem_source(ev)});
		this.ui_pages_nav=it3.ins(document.getElementById('new_advertising-reports'),'div',['class','report-pager']);		
		bb=it3.ins(this.ui_pages_nav,'button',['class','page-thumb'],'<i class="fa fa-plus"></i>');
		bb.addEventListener('click',function(ev){_this.add_page()});
		this.grouping_target=this.report_menu.getElementsByClassName('report-grouping-target')[0];
		this.src_type_sel=this.report_menu.getElementsByClassName('new-src-type')[0];
		this.brands_sel=this.report_menu.getElementsByClassName('new-src-brand')[0];
		it3.data.X=X.advReporting;
	},
	reset_report:function(){let x;for(x=0;x<this.sources.length;x++){this.rem_source(false,this.sources[x].name);}
		for(x=0;x<this.pages.length;x++){this.empty_page(this.pages[x])}},
	destroy:function(){this.reset_report();it3.clearchilds(this.element);window.DASH=false;delete window.DASH;},
	/* SOURCES */
	add_source:function(name,data,oo,_Tdata){
		let i=new it3.data.ReportData(this,name,data,oo,_Tdata);
		this.sources.push(i);let _this=this;
		i.source_option=it3.ins(this.sources_sel,'option',['value',this.sources.length-1],name);
		this.select_source({target:this.sources_sel});
		return i;},
	rem_source:function(ev,name){if(!name){name=this.current_source.name.toString();}		
		for(i=0;i<this.sources.length;i++){if(this.sources[i].name==name){
			this.sources_sel.removeChild(this.sources[i].source_option);
			this.sources[i].destroy();break;}}
		this.sources.splice(i,1);},	
	select_source:function(ev,name,_source){let previous_s=this.current_source;this.current_source=false;
		let idx=-1;if(_source){this.current_source=_source}
		else if(ev){if(typeof ev.target!='number'){idx=ev.target.options[ev.target.selectedIndex].getAttribute('value');}else{idx=ev.target;}
			this.current_source=this.sources[idx];}
		else if(name){for(let gx=0;gx<this.sources.length;gx++){
			if(this.sources[gx].name==name){this.current_source=this.sources[gx];break;}}}
		if(!this.current_source){if(previous_s){this.current_source=previous_s}}
		if(!this.current_source){if(this.sources.length>0){this.current_source=this.sources[0];}else{console.log('No source to select')}}
		if(this.current_source){
			for(let hx=0;hx<this.sources_sel.options.length;hx++){if(this.sources_sel.options[hx].innerHTML==this.current_source.name){this.sources_sel.selectedIndex=hx;}}
			let xx=document.querySelectorAll('.report-source-ui');
			xx.forEach(function(elm){elm.style.display='none'});
			if(this.current_source.ui){this.current_source.ui.style.display='';
				let se=this.report_menu.getElementsByClassName('new-src-menu')[0];
				se.style.display='none';this.rem_src_butt.style.display='';
			}else{
				this.sources_sel.selectedIndex=0;
				let se=this.report_menu.getElementsByClassName('new-src-menu')[0];
				se.style.display='';this.rem_src_butt.style.display='none';
			}
			xx=document.querySelector('.tool-area-bar .report-menu');
			xx.classList.remove('add_mode');
		}else{this.sources_sel.selectedIndex=0;
			let se=this.report_menu.getElementsByClassName('new-src-menu')[0];
			se.style.display='';this.rem_src_butt.style.display='none';			
			xx=document.querySelector('.tool-area-bar .report-menu');
			xx.classList.add('add_mode');
		}
	},
	/*PAGES*/
	select_page:function(id,_page){if(!_page){
		for(let gx=0;gx<this.pages.length;gx++){
			if(this.pages[gx].id==id){this.current_page=this.pages[gx];break;
		}}}else{this.current_page=_page}
		this.current_page.element=document.getElementById(this.current_page.id);
		let pp=document.querySelectorAll('.report-page');
		pp.forEach(function(e){e.style.display=(e.id==id)?'':'none'});
		if(this.current_page.element){this.current_page.element.style.display='';
			pp=document.querySelectorAll('.page-thumb');pp.forEach(function(e){e.classList.remove('selected')});
			this.current_page.thumb.classList.add('selected');}},
	add_page:function(undraggable){var id=this.uid+it3.uid('pid');var _this=this;let isdraggable=true;if(undraggable==true){isdraggable=false}		
		let pthumb=it3.ins(this.ui_pages_nav,'div',['id',id+'-page-ref','class','page-thumb'],);
		it3.ins(pthumb,'span',['onclick','DASH.select_page(\''+id+'\')'],'Page '+(this.pages.length+1));
		let idx=this.pages.push({id:id,title:'Page '+(this.pages.length+1),element:E,thumb:pthumb,grid:G})-1;
		//let self=this;//this.template.push({'page':(this.pages.length),'sources':[],'current_page':false});
		it3.ins(pthumb,'button',['id',id+'remove-page-button','onclick','DASH.remove_page(event,\''+id+'\')'],'<i class="fa fa-times"></i>');
		this.select_page(id);
		//E.addEventListener('click',function(ev){(window.R||window.DASH).unselect_all()});
	},			
	remove_page:function(ev,id){let p;let i;ev.stopPropagation();
			for(p=0;p<this.pages.length;p++){if(id==this.pages[p].element.id){break;}}
			console.log('Remove page '+p);
			var pelm=document.getElementById(this.pages[p].id);
			for(i=0;i<this.pages[p].grid.layout.length;i++){
				let item=this.pages[p].grid.layout[i];
				var elm=document.getElementById(item.id);
				if(elm){elm.parentElement.removeChild(elm);}
				item.gobj.destroy(true);
			}this.content.removeChild(pelm);
			//if(p==R.pages.length-1 && R.pages.length!=1){R.show_page(R.pages[p-1].element.id);}
			this.pages[p].thumb.parentElement.removeChild(this.pages[p].thumb);
			for(let h=p;h<this.pages.length-1;h++){this.pages[h]=this.pages[h+1];}
			this.pages.pop();for(i=0;i<this.pages.length;i++){this.pages[i].title='Page '+(i+1);}			
			let page_nav=document.querySelectorAll('.page-thumb');
			for(i=1;i<page_nav.length;i++){page_nav[i].firstChild.innerHTML='Page '+(i);
				page_nav[i].setAttribute('onclick','DASH.select_page(\''+this.pages[i-1].id+'\')');
				page_nav[i].children[1].setAttribute('onclick','DASH.remove_page(event,\''+this.pages[i-1].id+'\')');
			}
			if(this.pages.length==0){this.add_page();}
			this.select_page(this.pages[0].id);
	},	
	/* ########################################################################################################################################## */
	/*LOAD - SAVE*/
	toJSON:function(){var JOUT={sources:[],pages:[]};var s=0;var gi=0;let tmp1=null;let tmp2;this.unselect_all();
		for(s=0;s<this.sources.length;s++){JOUT.sources.push({name:this.sources[s].name,D:this.sources[s].D,oo:this.sources[s].oo});}
		return this._toJSON(JOUT);},
	toJSONT:function(){var JOUT={sourcesT:[],pages:[]};this.unselect_all();
		for(s=0;s<this.sources.length;s++){JOUT.sourcesT.push({market:this.sources[s]._Tdata.market,channel:this.sources[s]._Tdata.channel,timesel:this.sources[s]._Tdata.timesel,rtype:this.sources[s]._Tdata.rtype});}
		return this._toJSON(JOUT);},
	_toJSON:function(JOUT){var s=0;var gi=0;let tmp1=null;let tmp2;
		for(s=0;s<this.pages.length;s++){JOUT.pages[s]=[];
			for(gi=0;gi<this.gitems.length;gi++){if(this.gitems[gi].page==this.pages[s]){tmp1=this.gitems[gi].gitem;
				tmp2={coords:{x:tmp1.x,y:tmp1.y,w:tmp1.w,h:tmp1.h},ghtype:this.gitems[gi].ghtype};
				if(this.gitems[gi].ghtype=='tinymce'){
					tmp2.content=document.getElementById(tmp1.id).innerHTML;
				}else if(this.gitems[gi].ghtype=='xy-graph'){tmp2.xyrevert={};
					tmp2.grouped=this.gitems[gi].grouped;tmp2.filtered=this.gitems[gi].filtered;
					tmp2.sourcename=this.gitems[gi].source.name;
					for(let m=0;m<this.gitems[gi].xobj.series.length;m++){
						tmp2.xyrevert[this.gitems[gi].xobj.series[m].options.name]={show:this.gitems[gi].xobj.series[m].options.showInLegend}
					}
				}else{tmp2.grouped=this.gitems[gi].grouped;tmp2.filtered=this.gitems[gi].filtered;
					tmp2.sourcename=this.gitems[gi].source.name;
					let CB=document.getElementById(this.gitems[gi].gitem.id);if(CB){CB=CB.previousSibling;
						if(CB.previousSibling){CB=CB.previousSibling;tmp2.metric1=CB.options[CB.selectedIndex].innerHTML;}
						if(CB.previousSibling){CB=CB.previousSibling;tmp2.metric2=CB.options[CB.selectedIndex].innerHTML;}
						if(CB.previousSibling){CB=CB.previousSibling;tmp2.metric3=CB.options[CB.selectedIndex].innerHTML;}
				}	}
				JOUT.pages[s].push(tmp2);
		}	}	}
		return JOUT;
	},
	fromJSON:function(JIN,undraggable){
		Highcharts.setOptions({
			plotOptions: {
				series: {
					animation: false
				}
			}
		});
		if(JIN.pages){this.loadingItemsCount=0;this.loadingItemsCurr=0;
			for(let p=0;p<JIN.pages.length;p++){
				this.loadingItemsCount=this.loadingItemsCount+JIN.pages[p].length;
		}}
		if((JIN.weekstart)||(JIN.weekstart==0)){it3.data.weekstart=JIN.weekstart;}
		if(JIN.sources){this.fromJSONF(JIN,undraggable);}
		else{this.fromJSONT(JIN,undraggable);}
	},
	fromJSONF:function(JIN,undraggable){this.reset_report();
		for(let x=0;x<JIN.sources.length;x++){this.add_source(JIN.sources[x].name,JIN.sources[x].D,JIN.sources[x].oo);}
		var PPIDX=0;var GIIDX=0;var _this=this;var lastP=-1;
		this.preview_mode();
		var item_load_step=function(){
			_this.unselect_all();
			if(GIIDX<JIN.pages[PPIDX].length){
				var llin=document.getElementById('loading-inside');if(llin){document.getElementById('loading-wrap').style.display='';
					llin.innerHTML='Loading Page '+(PPIDX+1)+'/'+JIN.pages.length+' - Item '+(GIIDX+1)+'/'+JIN.pages[PPIDX].length;
					var bar=document.getElementById('loading-bar');
					bar.style.width=(Math.round((33/DASH.loadingItemsCount)*DASH.loadingItemsCurr))+'%';
					DASH.loadingItemsCurr=DASH.loadingItemsCurr+1;}
				var NGI=JIN.pages[PPIDX][GIIDX];
				if(PPIDX>0){if(lastP!=PPIDX){lastP=PPIDX;_this.add_page(undraggable);}}
				if(NGI.ghtype=='tinymce'){_this.add_gitem('tinymce',false,NGI,function(xobj){GIIDX=GIIDX+1;item_load_step();});}
				else{
					_this.select_source(false,NGI.sourcename);
					_this.current_source._ui_revert_groups(NGI.grouped,NGI.filtered,true);
					_this.add_gitem(NGI.ghtype,NGI.sourcename,NGI,function(xobj){GIIDX=GIIDX+1;item_load_step();});
				}
			}else{GIIDX=0;PPIDX=PPIDX+1;if(PPIDX<JIN.pages.length){item_load_step();}else{console.log('finished load file');
				var ll=document.getElementById('loading-wrap');if(ll){ll.style.display='none';}
				setTimeout("DASH.unselect_all();",100)}}
		};item_load_step();},
	fromJSONT:function(JIN,undraggable){this.reset_report();
		var SSIDX=-1;var _this=this;
		var loadsources=function(){SSIDX=SSIDX+1;
			if(SSIDX<JIN.sourcesT.length){
				it3.data.X._add_source(JIN.sourcesT[SSIDX].timesel,JIN.sourcesT[SSIDX].market,JIN.sourcesT[SSIDX].channel?JIN.sourcesT[SSIDX].channel:'ALL',JIN.sourcesT[SSIDX].rtype,loadsources);				
			}else{_this._fromJSONT_step2(JIN,undraggable);}
		};loadsources();
	},
	_fromJSONT_B4:function(JIN){
		var bb=[];
		for (let s=0;s<JIN.sourcesT.length;s++){
			
		}
		//Show table of replacements
		//Refill JIN
		//Call fromJSONT(JIN)
	},
	_fromJSONT_step2:function(JIN,undraggable){
		//this.reset_report();
		//for(let x=0;x<JIN.sources.length;x++){this.add_source(JIN.sources[x].name,JIN.sources[x].D,JIN.sources[x].oo);}
		var PPIDX=0;var GIIDX=0;var _this=this;var lastP=-1;
		this.preview_mode();
		var item_load_step=function(){
			_this.unselect_all();
			if(GIIDX<JIN.pages[PPIDX].length){
				var NGI=JIN.pages[PPIDX][GIIDX];
				var brandname=DASH.brands_sel.selectedOptions[0].innerHTML;
				if(PPIDX>0){if(lastP!=PPIDX){lastP=PPIDX;_this.add_page(undraggable);}}
				if(NGI.ghtype=='tinymce'){NGI.content=NGI.content.replace('%BRAND',brandname);_this.add_gitem('tinymce',false,NGI,function(xobj){GIIDX=GIIDX+1;item_load_step();});}
				else{
					NGI.sourcename=NGI.sourcename.split('-');
					NGI.sourcename[0]=DASH.brands_sel.selectedOptions[0].innerHTML;
					NGI.sourcename=NGI.sourcename.join('-');
					_this.select_source(false,NGI.sourcename);
					_this.current_source._ui_revert_groups(NGI.grouped,NGI.filtered,true);
					_this.add_gitem(NGI.ghtype,NGI.sourcename,NGI,function(xobj){GIIDX=GIIDX+1;item_load_step();});
				}
			}else{GIIDX=0;PPIDX=PPIDX+1;if(PPIDX<JIN.pages.length){item_load_step();}else{console.log('finished load template');}}
		};item_load_step();},
	preview_mode:function(){this.unselect_all();document.body.classList.add('dashboard_mode');this.toggle_unpreview();},	
	toggle_unpreview:function(){var _this=this;let d=document.getElementById('unpreview-element-modal');
		if(!d){d=it3.ins(document.body,'div',['id','unpreview-element-modal','style','position:absolute;top:0;bottom:50px;left:0;right:0;background-color:transparent;z-index:100;display:none']);
			d.addEventListener('click',function(){if(!document.body.classList.contains('hard')){
			document.getElementById('preview-mode-button').innerHTML='Preview mode';document.getElementById('unpreview-element-modal').style.display='none';document.body.classList.remove('dashboard_mode');}});
		}else{d.style.display='none';}},	
	ui_handleFileSelect:function(evt){var files=evt.target.files;
		for(var i=0,f;f=files[i];i++){
			//if (!f.type.match('.*.json')) {console.log('does not seem json file')}
			var reader=new FileReader();
			reader.onload=(function(theFile){return function(e){DASH.fromJSON(JSON.parse(e.target.result));};})(f);
		reader.readAsText(f);}},
	ui_source_sel_handler:function(ev,skip_sel){
		var idx=ev.target.selectedIndex;
		if(idx==0){this.unselect_all();
			
			let xx=document.querySelectorAll('.report-source-ui');
			xx.forEach(function(elm){elm.style.display='none'});
			xx=this.report_menu.getElementsByClassName('new-src-menu')[0];
			xx.style.display='';this.rem_src_butt.style.display='none';
			xx=document.querySelector('.tool-area-bar .report-menu');
			xx.classList.add('add_mode');
		}else{if(!skip_sel){			
			xx=document.querySelector('.tool-area-bar .report-menu');
			xx.classList.remove('add_mode');this.select_source(ev);}}
	},ui_page_click:function(ev){var flag=true;if(this.current_gitem){flag=false;}this.current_gitem=false;
		this.unselect_all();if(flag){this.preview_mode();}
	},
	ui_menu_button:function(ev){if(ev){let action=ev.target.getAttribute('href');
		if(action){action=action.replace('#','');}else{return false}	
		if(action=='preview'||action=='print'){
			var s=document.getElementById('preview-mode-button');var s=s.innerHTML;			
			if((s.indexOf('view')>-1)||(action=='print')){s.innerHTML='Edit mode';
				this.unselect_all();document.body.classList.add('dashboard_mode');
				this.toggle_unpreview();}
			else{s.innerHTML='Preview mode';document.body.classList.remove('dashboard_mode');}
		}if(action=='print'){window.print();}
		if(action=='reset'){this.reset_report();}
		else if(action=='Add page'){this.add_page(ev)}
		else if(action=='Remove page'){this.remove_page(ev)}
		else if(action=='exportJSON'){it3.dowloadbig(this.toJSON(),'report.json');}
		else if(action=='exportLINK'){
			var a=prompt('Set password (leave empty for none)');
			var T=this.toJSON();
			it3.data.saveURL(a,JSON.stringify(T));
		}
		else if(action=='exportTLINK'){
			var a=prompt('Set password (leave empty for none)');
			var T=this.toJSON();
			X.advReporting.saveURL(a,JSON.stringify(T));
			//it3.dowloadbig(,'report.json');
		}
		else if(action=='exportJSONT'){it3.dowloadbig(this.toJSONT(),'template.json');}
		else if(action=='importJSON'){jQuery('#json-file').click();}
		else if(action.indexOf('gi-')==0){this.add_gitem(action.replace('gi-',''));}
		else if(action=='download_excel'){
			//Download Excel Tables
			it3.data.X.download(ev);
		}else{
			console.log('Unimplemented action '+action);}
	}return false;},
};
it3.data.report_static=false;
it3.data.saveURL=function(pass,ctc){
	var http = new XMLHttpRequest();
	var url = 'https://xingu.tech/u/saveDOCLINK';
	var XD={pass:pass,content:ctc};
	http.open('POST', url, true);
	http.setRequestHeader('Content-type', 'application/json; charset=utf-8');
	http.onreadystatechange = function() {//Call a function when the state changes.
		if(http.readyState == 4 && http.status == 200) {
			window.open('http://xingu.tech:8069/web#action=254&model=xingu.doclink&view_type=form&menu_id=168&id='+http.responseText);
			
		}else if(http.readyState == 4 ){
			console.log('Response ended with '+http.status)
		}
	}
	http.send(JSON.stringify(XD));
};

it3.data.T={vuegrid:`<grid-layout :layout="layout"
		:col-num="44"
		:row-height="8"
		:is-draggable="draggable"
		:is-resizable="resizable"
		:vertical-compact="true"
		:use-css-transforms="true"
><grid-item v-for="item in layout" :key="item.id"
	   :static="item.static"
	   :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i"
	   @resize="resizedEvent"
	   drag-ignore-from="th"
><button @click="removeItem(item)" class="chart_times fa fa-times sel-ctr"></button><div v-bind:id="item.id" @click="editItem(item,event)" class="report-viz">
</div></grid-item></grid-layout>`,
	report_menu:`<div class="form-inline"><div style="display:inline-block;">
<button class="btn btn-sm btn-primary dropdown-toggle waves-effect waves-light" type="button" data-toggle="dropdown"
  aria-haspopup="true" aria-expanded="false">File</button>
<div class="it3-mb dropdown-menu">
  <a class="it3-mb dropdown-item" href="#gi-tinymce">Insert Text Element</a>
  <a id="preview-mode-button" class="it3-mb dropdown-item" href="#preview">Preview</a>
  <a class="it3-mb dropdown-item" href="#print">Print</a>
  <div class="dropdown-divider"></div>
  <a class="it3-mb dropdown-item" href="#reset">New...</a>
  <label for="json-file"><a class="it3-mb dropdown-item" href="#importJSON">Open...</a></label><input type="file" id="json-file" name="json-file" onchange="DASH.ui_handleFileSelect(event)" style="display:none;"/>
  <a class="it3-mb dropdown-item" href="#exportJSON">Save</a>
  <a class="it3-mb dropdown-item" href="#embed">Embed</a>
  <a class="it3-mb dropdown-item" href="#exportLINK">Save LINK</a>
  <a class="it3-mb dropdown-item" href="#download_excel">Download Excel Tables</a>
  <div class="dropdown-divider"></div>
  <a class="it3-mb dropdown-item" href="#importJSON">Open from template</a>
  <a class="it3-mb dropdown-item" href="#exportJSONT">Save as template</a>
  <!--<div class="dropdown-divider"></div>
  <a class="it3-mb dropdown-item" href="#exportJSON">Export JSON</a>
  <a class="it3-mb dropdown-item" href="#importJSON">Import JSON</a>-->
</div></div><div style="display:inline-block;">
<button class="insert-btn btn btn-sm btn-primary dropdown-toggle waves-effect waves-light" type="button" data-toggle="dropdown"
  aria-haspopup="true" aria-expanded="false">Insert</button>
<div class="it3-mb dropdown-menu rmenu_page-menu">  
  <a class="it3-mb dropdown-item" href="#gi-table">Table element</a>
  <a class="it3-mb dropdown-item" href="#gi-xy-graph">XY graph</a>
  <a class="it3-mb dropdown-item" href="#gi-flux-graph">Flux graph</a>
  <a class="it3-mb dropdown-item" href="#gi-pie-graph">Cake graph</a>
  <a class="it3-mb dropdown-item" href="#gi-bubble-graph">Bubble simple</a>
  <a class="it3-mb dropdown-item" href="#gi-bubble">Bubbles in Time</a>
</div>
</div>
<select class="source-select form-control">
	<option value="insert-new-src">Add source...</option>
</select><button style="display:none;border:none;background:transparent;" class="remove_source" type="button"><i class="fa fa-trash-alt"></i></button>
</div>
<div class="new-src-menu form-inline new-mode" style="margin-left:8px;display:inline-block;">
<select class="new-src-brand form-control mr-sm-2" style="width:150px">
<input id="single-template-file" type="file" class="form-control tpl-ctr"/>
</select><select class="new-src-market form-control new-ctr">
	   <option value="ALL">ALL</option><option value="IT">IT</option><option value="FR">FR</option><option value="ES">ES</option>
		  <option value="DE">DE</option><option value="UK">UK</option><option value="US">US</option></select>
<select class="new-src-channel form-control new-ctr">
	   <option value="ALL" selected="selected">ALL</option><option value="vendor">Vendor</option><option value="seller">Seller</option></select>
<select class="new-src-time form-control mr-sm-2 new-ctr">
	<option value="-y0">Current Year</option>
	<option value="-y1">Previous Year</option>
	<option value="-w6">-6 Weeks [+21]</option>
	<option value="-w12" selected="selected">-12 Weeks [+21]</option>
	<option value="-w52">-52 Weeks [+21]</option>
	<option value="-m3">Last 3m</option>
	<option value="-m6">Last 6m</option>
	<option value="-m12">Last 12m</option>
	<option value="-m24">Last 24m</option>	
	<option value="cq1">curr Q1</option>
	<option value="pq1">prev Q1</option>
	<option value="cq2">curr Q2</option>
	<option value="pq2">prev Q2</option>
	<option value="cq3">curr Q3</option>
	<option value="pq3">prev Q3</option
	<option value="cq4">curr Q4</option>>
	<option value="pq4">prev Q4</option></select>
<select class="new-src-type form-control mr-sm-2 new-ctr"><option value="" disabled=""></option><option value="adGroup">AdGroup</option><option value="keyword">Keyword</option><option value="campaign">Campaign</option><option value="targets">Targets</option><option value="productAd">ProductAd</option><option value="otherAsin">OtherAsin</option></select>
<input type="checkbox" title="week starts on sunday" onchange="if(it3.data.weekstart==1){it3.data.weekstart=0}else{it3.data.weekstart=1}"/>
<button class="btn btn-outline-white btn-sm waves-effect waves-light new-ctr" onclick="it3.data.X.add_source()">Add</button></div>
<div class="new-src-menu form-inline" style="margin-left:8px;display:none;">
</div>
<div class="report-grouping-target form-inline" style="margin-left:8px;">
</div></div>`,
};


