it3.data={};
it3.data.sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds));};
it3.data.pad=function(num, size) {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
};

it3.data.GraphDefaultOpts={
	readonly:false,
	suid:'',
	G:[],
	F:[]
},
it3.data.BaseGraph=function(griditem,source,options){
	this.S=source;
	this.P=S.R.current_page;
	this.ELM=document.getElementById(griditem.id);			
	if(!this.ELM){console.log('timeout with vue grid problem')}
	if(!options){options={};}
	this.OO.G=options.G||JSON.parse(JSON.stringify(this.source.G));
	this.OO.F=options.F||JSON.parse(JSON.stringify(this.source.F));
	this.ghtype=ghtype;
	this.xobj=null;
};
it3.data.BaseGraph.prototype={
	destroy:function(removegitem){this.xobj.destroy();it3.clearchilds(this.E.id);if(removegitem){this.P.grid.removeItem(this.gitem);}},
	_ui_onregroup:function(G,F){this.grouped=G;this.filtered=F;if(this.xobj){if(this.ghtype=='tinymce'){console.log('Should never be here, but no problem.');}
		else{this.xobj.destroy();it3.clearchilds(this.E.id);
		this.xobj=this['_as_'+this.ghtype]();}}},		
	_add_metric:function(m_elm_nm,_select){
		if(!_select){if(m_elm_nm.indexOf('1')>-1){_select='Impression'}
			else if(m_elm_nm.indexOf('2')>-1){_select='Clicks'}
			else if(m_elm_nm.indexOf('3')>-1){_select='CTR'}}
		if(this[m_elm_nm]){console.log('existing ok');}else{var  _this=this;var _m_elm_nm=m_elm_nm;
			let c=0;let tmp=this.source.oo.def.cols;
			let XB=document.getElementById(this.gitem.id).previousSibling;
			this[m_elm_nm]=it3.ins(XB.parentNode,'select',['class','gitem-metric sel-ctr'],'',XB);			
			for(c=0;c<tmp.length;c++){this.source.out_adapter[tmp[c].name.replace(/ /g,'').toLowerCase()]=c;let _c=c;
				if(tmp[c].axis){if((tmp[c].axis!='date')&&(tmp[c].axis!='string')){
					if(tmp[c].name==_select){it3.ins(this[m_elm_nm],'option',['value',tmp[c].name,'selected','selected'],tmp[c].name);}
					else{it3.ins(this[m_elm_nm],'option',['value',tmp[c].name],tmp[c].name);}
			}}}
			this[m_elm_nm].addEventListener('click',function(ev){ev.cancelBubble=true;});			
			this[m_elm_nm].addEventListener('change',function(ev){
				_this['v'+_m_elm_nm]=ev.target.options[ev.target.selectedIndex].innerHTML;
				_this.xobj.destroy();_this.xobj=_this['_as_'+_this.ghtype](document.getElementById(_this.gitem.id),true);
			});	
		}	
	},
};
it3.data.Graph=function(source,type){
	it3.data.BaseGraph.call(this,source);
	
};
it3.data.Graphs={
	table:{
		make:function(tgt,next){
		
		}
	}
};

it3.data.ITADATATABLES={
	"sEmptyTable":     "Nessun dato presente nella tabella",
	"sInfo":           "Vista da _START_ a _END_ di _TOTAL_ elementi",
	"sInfoEmpty":      "Vista da 0 a 0 di 0 elementi",
	"sInfoFiltered":   "(filtrati da _MAX_ elementi totali)",
	"sInfoPostFix":    "",
	"sInfoThousands":  ".",
	"sLengthMenu":     "Visualizza _MENU_ elementi",
	"sLoadingRecords": "Caricamento...",
	"sProcessing":     "Elaborazione...",
	"sSearch":         "Cerca:",
	"sZeroRecords":    "La ricerca non ha portato alcun risultato.",
	"oPaginate": {"sFirst":"Inizio","sPrevious":"Precedente","sNext":"Successivo","sLast":"Fine"},
	"oAria": {
		"sSortAscending":  ": attiva per ordinare la colonna in ordine crescente",
		"sSortDescending": ": attiva per ordinare la colonna in ordine decrescente"
	}
};
it3.data.decorator={
	formatLocal:function(num){
		return num.toLocaleString();
	},	
	formatPerc:function(num){		
		return parseFloat(num).toLocaleString()+'%';
	},	
	formatVal:function(num){
		return parseFloat(num).toLocaleString()+'€';
	}
};


//var basicurl='https://xingu.tech/u/subprofiles?onload=loadprofiles&mode=json&xtoken=%XTOKEN'.replace('%XTOKEN',encodeURIComponent(window.XTOKEN));
it3.data.Graph=function(source,ghtype,_revertdata,_next){
	//_page,_metric,_metrics,_metrics_type,_grouped,_coords

	this._init(_revertdata,_next);
};
it3.data.Graph.prototype={
	_init:function(_revertdata,_next){
		
		this.gitem.gobj=this;
		
	});},
	_as_tinymce:function(tgt,_revertdata,_next){tinyid=it3.uid('tiny');var _ox=this;var ctc=_revertdata.content||'';
		if(ctc.indexOf('class="report-gtext"')>-1){tgt.innerHTML=ctc;}
		else{this.tinyelm=it3.ins(tgt,'div',['id',tinyid,'class','report-gtext','style','width:100%;height:100%;'],ctc);}
		if(it3.data.report_static){if(_next){_next(this.tinyelm);}return this.tinyelm;}
		else{return this._re_tiny(function(tiny){_ox.xobj=tiny},_next);}
	},
	_re_tiny:function(_base,_next){var _this=this;_this._tnext=_next;
		var xxx=tinymce.init({selector:'#'+this.gitem.id+' .report-gtext',menubar:false,inline:false,height:'100%',entity_encoding:'raw',verify_html:false,
			plugins: 'print paste importcss searchreplace autolink code visualblocks visualchars image link media template table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists imagetools textpattern noneditable help emoticons',
			toolbar: 'print undo redo | insertfile image media link | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | code | outdent indent | numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fontselect fontsizeselect formatselect',
			toolbar_sticky:true,toolbar_drawer:'sliding',
			//quickbars_selection_toolbar: ' bullist numlist outdent indent',
			//contextmenu: 'undo redo | inserttable | cell row column deletetable | help',
			powerpaste_word_import:'clean', powerpaste_html_import: 'clean',
			content_style: "body {padding:0;margin:0;font-size:14px}",
			color_map: [
'#BFEDD2','Light Green','#FBEEB8','Light Yellow','#F8CAC6','Light Red','#ECCAFA','Light Purple','#C2E0F4','Light Blue','#2DC26B','Green','#F1C40F','Yellow',
'#E03E2D','Red','#B96AD9','Purple','#3598DB','Blue','#169179','Dark Turquoise','#E67E23','Orange','#BA372A','Dark Red','#843FA1','Dark Purple','#236FA1',
'Dark Blue','#ECF0F1','Light Gray','#CED4D9','Medium Gray','#95A5A6','Gray','#7E8C8D','Dark Gray','#34495E','Navy Blue','#000000','Black','#ffffff','White'],
			init_instance_callback:function(editor){_this.xobj=editor;			
				editor.contentDocument.body.style.backgroundColor = 'rgb(245,245,245)';editor.show();
				editor.on('click', function(e){DASH.select_gitem(false,_this,true);});
				if(_base){_base(editor)}if(_next){_next(editor)}
		}});return xxx;},
	_as_table:function(tgt,_revertdata,_next){
		let t=it3.ins(tgt,'table',['class','report-table'],'<thead><tr><th>'+this.source.OH.join('</th><th>')+'</th></tr></thead><tbody></tbody>');
		//TODO : APPLY FORMAT (fixfn)
		/*var fixfn;
		for(let h=0;h<this.source.OH.length;h++){
			if(fixfn){
			for(let x=0;x<this.source.O.length;x++){
				this.source.O[x][h]=fixfn(this.source.O[x][h]);
			}}
		}*/
		let xobj=$(t).DataTable({data:this.source.O,"paging":false,dom:'Bfirtp',colReorder:true,"language":ITADATATABLES,
			buttons:[{extend:'copy',text:'<i class="fa fa-copy"></i>'},{extend:'excel',text:'<i class="fa fa-file-excel"></i>'}
			,{extend: 'colvis',text:'<i class="fa fa-eye"></i>'}]
		});
		for(var oh=0;oh<this.source.OH.length;oh++){
			/*if(oh>4){xobj.column(oh).visible(false);}*/
		}
		tgt.insertBefore(xobj.buttons().container()[0],tgt.firstChild);
		if(_next){_next(xobj);}return xobj;},
	'_as_pie-graph':function(tgt,_revertdata,_next){let midx=-1;let o=0;
		var metric1=(_revertdata['metric1']);
		if(!metric1){if(this['metric1_sel']){metric1=this['metric1_sel'].options[this['metric1_sel'].selectedIndex].value}}
		if(!metric1){metric1='Impression';}	
		for(o=0;o<this.source.OH.length;o++){if(this.source.OH[o]==metric1){midx=o;break}}		
		var time_cats=[];var series=[];let oseries={};let tmp;let k='';
		for(o=0;o<this.source.O.length;o++){
			for(k in this.source.OUTIDX){if(this.source.OUTIDX[k]==o){
				time_cats.push(k);if(!oseries[k]){oseries[k]={name:k,y:0}}
			}}}
		for(k=0;k<time_cats.length;k++){
			for(o in oseries){tmp=0;
				if(time_cats[k]==o){tmp=parseFloat(this.source.O[this.source.OUTIDX[time_cats[k]]][midx]);oseries[o].y=tmp;}
		}	}		
		for(o in oseries){series.push(oseries[o])}
		oseries=[{name:'Metrics',colorByPoint:true,data:series}]; 
		let newchart=Highcharts.chart(tgt, {credits:{enabled:false},
			chart:{type:'pie',zoomType : false,plotBackgroundColor:null,plotBorderWidth:null,plotShadow: false},title:{floating:true,align:'left',text:metric1},
			tooltip:{pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'},
			plotOptions:{pie:{allowPointSelect:true,cursor:'pointer',dataLabels:{enabled:false},showInLegend:true}},
			series: oseries});
		this._add_metric('metric1_sel',metric1);
		if(_next){_next(newchart)}return newchart;
	},
	'_as_flux-graph':function(tgt,_revertdata,_next){let midx=-1;let o=0;
		var metric1=(_revertdata['metric1']);
		if(!metric1){if(this['metric1_sel']){metric1=this['metric1_sel'].options[this['metric1_sel'].selectedIndex].value}}
		if(!metric1){metric1='Impression';}		
		for(o=0;o<this.source.OH.length;o++){if(this.source.OH[o]==metric1){midx=o;break}}		
		var time_cats=[];var series=[];let oseries={};let tmp;let k='';
		for(o=0;o<this.source.O.length;o++){
			if(time_cats.indexOf(this.source.O[o][0])<0){time_cats.push(this.source.O[o][0]);}
			for(k in this.source.OUTIDX){if(this.source.OUTIDX[k]==o){
				k=k.replace(this.source.O[o][0],'');
				if(!oseries[k]){oseries[k]={name:k,data:[]}}
			break}}}
		for(k=0;k<time_cats.length;k++){
			for(o in oseries){tmp=0;
				if(this.source.OUTIDX[time_cats[k]+o]){tmp=parseFloat(this.source.O[this.source.OUTIDX[time_cats[k]+o]][midx]);}
				oseries[o].data.push(tmp);
		}	}		
		for(o in oseries){series.push(oseries[o])}
		let newchart=Highcharts.chart(tgt,{series:series,credits:{enabled:false},
			chart:{type:'streamgraph',zoomType : false,marginBottom:30},
			title:{floating:true,align:'left',text:metric1},subtitle:false,				
			xAxis:{maxPadding:0,margin:20,crosshair:true,
				type:'category',categories:time_cats,
				labels:{align:'left',reserveSpace:false,rotation:270},
				lineWidth:0,tickWidth:0},
			yAxis:{visible:false,startOnTick:false,endOnTick:false},
			legend:{enabled:false},
			plotOptions:{series:{label:{minFontSize:5,maxFontSize:15,style:{color:'rgba(255,255,255,0.75)'}}}},
		});
		this._add_metric('metric1_sel',metric1);if(_next){_next(newchart)}return newchart;
	},
	'_as_bubble':function(tgt,_next){
		let newchart=false;
		/*Highcharts.chart(tgt, {
			if(){tmpui=it3.ins(this.ui_group_time,'option',['value',tmp[c].name],tmp[c].name);}
			else{tmpui=it3.ins(this.ui_group_time,'option',['value',tmp[c].name],tmp[c].name);}
		*/
		this._add_metric('metric1_sel');	
		this._add_metric('metric2_sel');	
		this._add_metric('metric3_sel');	
		return newchart;
	},
	'_as_bubble-graph':function(tgt,_reverdata,_next){let SS=this.source;let midx1=-1;let midx2=-1;let midx3=-1;let o=0;		
		var metric1=(this['vmetric1_sel']||'Impression');var metric2=(this['vmetric2_sel']||'Clicks');var metric3=(this['vmetric3_sel']||'CTR');		
		for(o=0;o<SS.OH.length;o++){if(SS.OH[o]==metric1){midx1=o;}if(SS.OH[o]==metric2){midx2=o;}if(SS.OH[o]==metric3){midx3=o;}}		
		var time_cats=[];var series=[];let oseries={};let tmp;let k='';
		for(o=0;o<SS.O.length;o++){
			if(time_cats.indexOf(SS.O[o][0])<0){time_cats.push(SS.O[o][0]);}
			for(k in SS.OUTIDX){if(SS.OUTIDX[k]==o){
				//k=k.replace(this.source.O[o][0],'');
				time_cats.push(k);
				if(!oseries[k]){oseries[k]={name:k,data:[]}}
			break}}}
		for(k=0;k<time_cats.length;k++){
			for(o in oseries){tmp={x:0,y:0,z:0};
				if(time_cats[k]==o){
					tmp.x=parseFloat(SS.O[SS.OUTIDX[time_cats[k]]][midx3]);
					tmp.y=parseFloat(SS.O[SS.OUTIDX[time_cats[k]]][midx2]);
					tmp.z=parseFloat(SS.O[SS.OUTIDX[time_cats[k]]][midx1]);
					tmp.name=time_cats[k];
					oseries[o].data=tmp;
		}	}	}
		for(o in oseries){series.push(oseries[o].data)}
		let newchart=Highcharts.chart(tgt,{series:[{data:series}],legend:{enabled:false},credits:{enabled:false},
			chart:{type:'bubble',plotBorderWidth:1,zoomType:false},	
			title:{floating:true,text:metric1,align:'left'},		
			xAxis:{title:{text:metric3},gridLineWidth:1,accessibility:{rangeDescription:metric3},labels:{format:'{value}'}},
			yAxis:{title:{text:metric2},maxPadding:0.2,accessibility:{rangeDescription:metric2},labels:{format:'{value}',startOnTick:false,endOnTick:false}},
			plotOptions:{series:{dataLabels:{enabled:true,format:'{point.name}'}}},
			accessibility:{point:{
				descriptionFormatter:function(point){var index=point.index+1;
					return index+', '+point.name+', '+metric1+': '+point.z +
						'g, sugar: '+point.x + 'g, '+metric3+': '+point.y+'%.';
			}	}	},
			tooltip:{useHTML:true,headerFormat:'<table>',
				pointFormat: '<tr><th colspan="2"><h3>{point.name}</h3></th></tr>' +
					'<tr><th>'+metric3+':</th><td>{point.x}</td></tr>' +
					'<tr><th>'+metric2+':</th><td>{point.y}</td></tr>' +
					'<tr><th>'+metric1+':</th><td>{point.z}</td></tr>',
				footerFormat: '</table>',followPointer: true
		}});	
		this._add_metric('metric1_sel');	
		this._add_metric('metric2_sel');	
		this._add_metric('metric3_sel');
		if(_next){_next(newchart)}return newchart;
	},
	'_as_xy-graph':function(tgt,_revertdata,_next){
		if(!this.metrics){this.metrics=_revertdata._metrics};
		if(!this.metrics_type){this.metrics_type=_revertdata._metrics_type};		
		var ctype='spline';
		if(_revertdata){if(_revertdata.grouped){if(_revertdata.grouped.Campaign=='grouped'){ctype='column'}}}
		if(!this.metrics){if(this.source.OH){this.metrics=[];let metric={};this.metrics_type={};
			for(let i=0;i<this.source.OH.length;i++){
				this.metrics_type[this.source.OH[i]]=ctype;
				if(i!=0){metric[this.source.OH[i]]=false;}
				else{metric[this.source.OH[i]]=true;}
				this.metrics.push(metric);
		}	}	}
		var metrics=this.source.oo.def.cols;
		let m=null;let midx=0;var mseries=[];var maxis=[];var maxis2={};let o=0;
		let cats=[];
		//for(o=0;o<this.source.OH.length;o++){
			for(let k in this.source.OUTIDX){
				//if(this.source.OUTIDX[k]==o){
					cats.push(k);
			//}
			}
		//}
		for(m in metrics){if(metrics[m].axis){if((metrics[m].axis!='date')&&(metrics[m].axis!='string')){let d=[];
			
			for(o=0;o<this.source.OH.length;o++){if(this.source.OH[o]==metrics[m].name){midx=o;break}}
			for(o=0;o<this.source.O.length;o++){
				let v=(typeof this.source.O[o][midx]=='number')?this.source.O[o][midx]:parseFloat(parseFloat(this.source.O[o][midx].replace(/%/g,'').replace(/€/g,'')).toFixed(2));
				if(ctype!='bar'){d.push([this.source.O[o][0],v]);}else{d.push([v]);}
			}
			if(!maxis2[metrics[m].axis]){maxis2[metrics[m].axis]=maxis.length;
				maxis.push({title:false,labels:{style:{color:Highcharts.getOptions().colors[mseries.length]}}});
			}
			let vis=false;
			if(metrics[m].name=='Impression'){vis=true}
			if(metrics[m].name=='Clicks'){vis=true}
			if(_revertdata){
				if(_revertdata.xyrevert){
					vis=_revertdata.xyrevert[metrics[m].name].show;
				}
			}
			mseries.push({name:metrics[m].name,data:d,yAxis:maxis2[metrics[m].axis],visible:vis,type:this.metrics_type[metrics[m].name],opacity:0.8,				
			events:{legendItemClick:function(x){it3.fix(x.browserEvent);if(!it3.data.report_static){
				let S=this.chart.series[this.index];let O=S.options;delete O.lineWidth;
				if(this.visible){if(O.type=='areaspline'){O.type='spline';}else if(O.type=='spline'){O.type='column';}else if(O.type=='column'){O.type='scatter';}
					else if(O.type=='scatter'){O.type='areaspline';}else if(O.type=='hidden'){O.type='areaspline';}
					S.setOptions(O);S.update();if(O.type=='spline'){S.hide()}return false;}
			}}	}	});
		}}}
		let newchart=Highcharts.chart(tgt,{yAxis:maxis,series:mseries,chart:{zoomType : false},credits:{enabled:false},
			title:false,subtitle:false,legend:{enabled:true},
			xAxis:{categories:cats/*,title:false*/,showLastLabel:true,
				labels:{format:'{value}'},maxPadding:0.02},
			tooltip:{shared:true,crosshairs:true},
			plotOptions:{spline:{marker:{enable:false}}},
			boost:{enabled:false}
		});
		if(_next){_next(newchart)}return newchart;
	},
};



