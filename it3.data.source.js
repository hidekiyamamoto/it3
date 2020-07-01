// it3.data.source
/* ######################################################################################################################################## */
/* ######################################################################################################################################## */
/* ######################################################################################################################################## */
/*
	togliere j_adapter per ogni righa db e metterne uno a livello di datasource
	UI:
	
*/
it3.data.Datasource=function(report,name,data,oo,_Tdata){this.D=data;this.uid=it3.uid();this.R=report;this.name=name;
	this._Tdata=_Tdata;
	this.oo=oo;this.O=[];this.G={};this.F={};this.ui=null;this.out_adapter={};this.init();};it3.data.ReportData.prototype={
	init:function(){let _this=this;let tmp=null;let tmpui=null;let c=0;
		if(this.oo.add_date_segments_from_col){
			for(c=0;c<this.D.length;c++){tmp=this.D[c];
				d_date=new Date(tmp[this.oo.add_date_segments_from_col]);
				d_date.setMinutes(Math.abs(d_date.getTimezoneOffset()));
				this.D[c]['year']=d_date.getFullYear();this.D[c]['month']=this.D[c]['year']+'-'+it3.data.pad(d_date.getMonth()+1,2);
				this.D[c]['2weeks']=this.week_selector(d_date);this.D[c]['week']=this.week_selector(d_date);
				this.D[c]['day']=d_date.getFullYear()+'-'+it3.data.pad(d_date.getMonth()+1,2)+'-'+it3.data.pad(d_date.getDate(),2);	
		}	}
		this._ui_init();},
	week_selector:function(odate){var out='';let date=new Date(odate);
		date.setHours(0);date.setMinutes(0);date.setSeconds(0);date.setMilliseconds(0);
		let d=date.getDay();while(d!=it3.data.weekstart){date=new Date(date.setDate(date.getDate()-1));d=date.getDay();}
		let y=date.getFullYear();let m=date.getMonth()+1;
		if(m<10){out=y+' 0'+m;}else{out=y+' '+m;}
		if(date.getDate()<10){out=out+' 0'+date.getDate()+' -';}
		else{out=out+' '+date.getDate()+' -';}
		var start = new Date(date.getFullYear(), 0, 0);
		var diff = (date - start) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
		var oneDay = 1000 * 60 * 60 * 24;
		var day = Math.floor(diff / oneDay);
		out=date.getFullYear()+'/W'+it3.data.pad(Math.floor(day/7)+1,2);
		return out;},
	_regroup:function(){this.O=[];let db_r=0;let c=0;let r=0;
		//this.G={};
		//let oo=this.ui_group_time.options;
		//for(let o=0;o<oo.length;o++){this.G[oo[o].value]=oo[o].selected?'grouped':'ungrouped';}
		var db_row=null;var json_file=null;var j_row=null;
		let out_ridx=null;this.OUTIDX={};
		let COLS=this.oo.def.cols;
		for(db_r=0;db_r<this.D.length;db_r++){db_row=this.D[db_r];json_file=db_row.json_file;
			for(r=0;r<json_file.rows.length;r++){j_row=json_file.rows[r];
				//Get out_row_index for this json line
				out_ridx=this.make_idx(db_row,j_row,db_row.j_adapter);
				//Create line if not exists
				if(this.OUTIDX[out_ridx]==undefined){this.OUTIDX[out_ridx]=this.O.length;this.O[this.OUTIDX[out_ridx]]=JSON.parse(JSON.stringify(this.oo.def.empty));}
				//Fill columns with op or fn
				for(c=0;c<COLS.length;c++){
						this.OPS[COLS[c].op].call(this,db_row,j_row,this.OUTIDX[out_ridx],db_row.j_adapter,COLS[c],c);
		}	}	}
		let rem=[];	
		for(r=0;r<this.O.length;r++){
			for(c=0;c<COLS.length;c++){
				//if(COLS[c].x_op){this.O[r][c]=COLS[c].x_op.call(this,this.O[r],COLS[c]);}
				if(COLS[c].x_op){			
					this.O[r][c]=it3.data.X.X_OPS[COLS[c].x_op].call(this,this.O[r],COLS[c]);
				}
				if(COLS[c].x_fn){
					if((typeof COLS[c].x_fn)=='function'){this.O[r][c]=COLS[c].x_fn(this.O[r]);}
					else{this.O[r][c]='todo'}
				}	
				if(COLS[c].filterable){
					if(!it3.inoe(this.F[COLS[c].name])){
						if(this.O[r][c]!=this.F[COLS[c].name]){
							this.O[r]=null;for(db_r in this.OUTIDX){if(this.OUTIDX[db_r]==r){delete this.OUTIDX[db_r];rem.push(r)}}
							c=10000;
						}
					}
				}
			}if(this.O[r]!=null){
			if(!this.final_accept[this.oo.def.final_accept](this.O[r],this.oo.def.final_accept_args)){
				this.O[r]=null;for(db_r in this.OUTIDX){if(this.OUTIDX[db_r]==r){delete this.OUTIDX[db_r];rem.push(r)}}
		}	}	}
		this.O=this.O.filter(function(value,index,arr){return value != null;});
		rem=rem.sort(function(a,b){return b-a});
		for(db_r in this.OUTIDX){for(r=0;r<rem.length;r++){
			if(this.OUTIDX[db_r]>=rem[r]){this.OUTIDX[db_r]=this.OUTIDX[db_r]-1;}
		}	}
		//Insert titles
		this.O.unshift([]);for(c=0;c<COLS.length;c++){this.O[0].push(COLS[c].name)}
		//Clean grouped columns (they make no sense)
		let col=null;for(r=0;r<this.O.length;r++){
			for(col in this.G){if(this.G[col]=='ungrouped'){this.O[r][this.out_adapter[col.replace(/ /g,'').toLowerCase()]]='#--hide';}}
			this.O[r]=this.O[r].filter(function(value,index,arr){return value != '#--hide';});}
		this.OH=this.O.shift();
	},
	final_accept:{check_non_empty_col:function(output_row,v){for(let k in v){if(it3.data.is_dbnull(output_row[v[k]])){return false}}return true;}},
	make_idx:function(db_row,j_row,j_adapter){var c;var k;var xx=[];
		for(k in this.G){if(this.G[k]=='grouped'){let kmin=k.toLowerCase();
				if(this.dbidx_tuplets[kmin]){xx.push(db_row[this.dbidx_tuplets[kmin]]);}
				else if(db_row[kmin]){xx.push(db_row[kmin]);}
				else if(j_adapter[this.tuplets[k]]){xx.push((j_row[j_adapter[this.tuplets[k]]])||'');}
		}	}return xx.join('-');},
	dbidx_tuplets:{'canale':'account_type','formato':'sp_o_sb','mrk':'marketplace','profile':'partner'},
	tuplets:{'Campaign':'campaignName','adGroup':'adGroupName','Canale':'account_type','Formato':'sp_o_sb',
		'keyword text':'keywordText','match Type':'matchType','targeting Expression':'targetingExpression',
		'targeting Text':'targetingText','targeting Type':'targetingType','sku':'sku','ASIN':'asin',
		'other ASIN':'otherAsin','currency':'currency'},
	OPS:{formula:function(){return null},
		normal:function(db_row,j_row,out_r_idx,j_adapter,C,c_idx){let v=j_row[j_adapter[C.source_col||C.name.replace(/ /g,'')]];
			if(v){this.O[out_r_idx][c_idx]=v}},
		dbnormal:function(db_row,j_row,out_r_idx,j_adapter,C,c_idx){let v=db_row[C.source_col||C.name.replace(/ /g,'')];
			if(v){this.O[out_r_idx][c_idx]=v}},
		sum:function(db_row,j_row,out_r_idx,j_adapter,C,c_idx){let v=j_row[j_adapter[C.source_col]];
			if(j_adapter[C.source_col]){if(v){this.O[out_r_idx][c_idx]=this.O[out_r_idx][c_idx]+parseFloat(j_row[j_adapter[C.source_col]]);}}}},
	/* ------------------------------------------------------------------------------------------------------------------- */
	/* ------------------------------------------------------------------------------------------------------------------- */
	destroy:function(ev){this.O=null;this.OH=null;this.G=null;this.D=null;this.source_option=null;
		this.out_adapter=null;this.emptyline=null;this.name=null;this.uid=null;
		delete this.O;delete this.OH;delete this.G;delete this.D;
		it3.clearchilds(document.getElementById(this.uid));},
	make_graph:function(gtype,_revertdata,_next){var ok=false;var err=false;
		if(gtype=='flux-graph'){var x=this.OH[0];if((x=='year')||(x=='month')||(x=='2 weeks')||(x=='week')||(x=='day')){ok=true}
		else{err='A time grouping is necessary for the stream graph';}}else{ok=true;}
		if(ok){return new it3.data.Graph(this,gtype,_revertdata,_next);}else{return {is_msg:true,msg:err}}},
	download_all_data:function(){
		let NEWD=[];let TR=[];
		NEWD.push(['subprofile','partner','ac_type','marketplace','r-date','SPorSB'].concat(this.D[0].json_file.cols));
		for(let x=0;x<this.D.length;x++){
			TR=[this.D[x].subprofile_id,this.D[x].partner,this.D[x].account_type,this.D[x].marketplace,this.D[x].create_date,this.D[x].sp_o_sb];
			for(let jr=0;jr<this.D[x].json_file.rows.length;jr++){
				NEWD.push(TR.concat(this.D[x].json_file.rows[jr]));
			}
		}
	},
	/*UI*/
	_ui_init:function(){
		this.guid='g'+this.uid;
		//fill out adapter and draw ui;
		this.ui=it3.ins(this.R.grouping_target,'div',['id',this.guid,'class','report-source-ui']);
		//this.ui_group_time=it3.ins(this.ui,'select',['class','form-control']);
		//this.ui_group_time.addEventListener('change',function(ev){_this._ui_group_handler(ev);});
		//it3.ins(this.ui_group_time,'option',['value',''],'ALL');
		this.ui_group_normal=it3.ins(this.ui,'div',['class','report-grouping']);
		tmp=this.oo.def.cols;let filtertemp;
		for(c=0;c<tmp.length;c++){this.out_adapter[tmp[c].name.replace(/ /g,'').toLowerCase()]=c;let _c=c;
			if(tmp[c].filterable){
				this.F[tmp[c].name]=false;
				filtertemp=it3.ins(this.ui,'input',['title','filter '+tmp[c].name,'class','form-control filter '+tmp[c].name,'placeholder','all','onchange','DASH.current_source.F[\''+tmp[c].name+'\']=this.value'],false,this.ui.firstChild);
			}if(tmp[c].groupable){this.G[tmp[c].name]='ungrouped';				
				if(tmp[c].g_exclusive){
					//if(tmp[c].name=='week'){tmpui=it3.ins(this.ui_group_time,'option',['value',tmp[c].name,'selected','selected'],tmp[c].name);}
					//else{tmpui=it3.ins(this.ui_group_time,'option',['value',tmp[c].name],tmp[c].name);}
				}else{
					tmpui=it3.ins(this.ui_group_normal,'div',['id',this.uid+'_gbutt'+c,'class','mdc-chip disabled-chip'],tmp[c].name);
					tmpui.addEventListener('click',function(ev){_this._ui_group_handler(ev,_c);});
	}	}	}
	},
	_ui_group_handler:function(ev,c,exclusive){it3.fix(ev);		
		if(ev.target.classList.contains('mdc-chip')){ev.target.classList.toggle('selected');}
		var oo=document.querySelectorAll('#'+this.guid+' .mdc-chip');
		for(let o=0;o<oo.length;o++){this.G[oo[o].innerHTML]=oo[o].classList.contains('selected')?'grouped':'ungrouped';}	
		this._regroup();if(this.R.current_gitem){this.R.current_gitem._ui_onregroup(this.G,this.F);}},
	_ui_revert_groups:function(grouped,filtered,forceregroup){this.G=grouped;this.F=filtered;
		//this.ui_group_time.options.forEach(e=>{
		//	if(this.G[e.value]=='grouped'){e.setAttribute('selected','selected');}else{e.removeAttribute('selected');}});
		let bb=document.querySelectorAll('#'+this.guid+' .report-grouping .mdc-chip');
		bb.forEach(e=>{e.classList.remove('disabled-chip');if(this.G[e.innerHTML]=='grouped'){e.classList.add('selected');}
		else{e.classList.remove('selected');}});
		for(let k in filtered){if(filtered[k]){
			if(!it3.inoe(filtered[k])){
				document.querySelector('#'+this.guid+' .filter.'+k).value=filtered[k];
			}
		}}
		if(forceregroup){this._regroup(true);}},
};