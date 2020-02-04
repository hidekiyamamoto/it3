//it3.js by Hideki Yamamoto - special thanks to : ` 
window._UA=navigator.userAgent.toLowerCase();window.tempfix=false;
window.HOST=document.location.protocol.toString()+'//'+document.location.hostname.toString();
it3={NS:'it3',$$:function(e){if(typeof e=='string'){e=document.getElementById(e);}return e;},$$c:function(e){return document.getElementsByClassName(e);},
	_uid:0,uid:function(_pfx){/*{R:'string'}*/this._uid++;if(!_pfx){_pfx='uid'}return _pfx+'-'+this._uid},fix:function(ev){ev.stopPropagation();ev.preventDefault();},
/* ----------------------------------------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------------------- BROWSER UTILS --- */
	isIE:document.ActiveXObject,isIE9:_UA.indexOf('msie 9')>-1,isIE10:_UA.indexOf('msie 10')>-1,
	toggleFullScreen:function(){/*{R:'void',DESC:{}}*/
		var d=document;var de=d.documentElement;if((d.fullScreenElement&&d.fullScreenElement!==null)||(!d.mozFullScreen&&!d.webkitIsFullScreen)){if(de.requestFullScreen){de.requestFullScreen();}else if(de.mozRequestFullScreen){de.mozRequestFullScreen();}else if(de.webkitRequestFullScreen){de.webkitRequestFullScreen(Element.ALLOWKEYBOARDINPUT);}}else{if(d.cancelFullScreen){d.cancelFullScreen();}else if(d.mozCancelFullScreen){d.mozCancelFullScreen();}else if(d.webkitCancelFullScreen){d.webkitCancelFullScreen();}}},
querystring:function(key,qs){if(this.inoe(qs)){if(History){if(History.getState){qs=History.getState().url;}}if(!qs){qs=location.href}}qs=qs.slice(qs.indexOf('?'));if(!key){return qs;}if(key==''){return '';}var deft_="";key=key.replace(/[\[]/,'\\\[').replace(/[\]]/,'\\\]');var regex=new RegExp('[\\?&]'+key+'=([^&#]*)');qs=regex.exec(qs);if(qs==null){return deft_;}else{return decodeURIComponent(qs[1]);}},
 downloadbig:function(data,fn){
	let fileStream=streamSaver.createWriteStream(fn);
	let writer = fileStream.getWriter();
	let encoder=new TextEncoder();
	let uint8array = encoder.encode(data + "\n\n");
	writer.write(uint8array);
	writer.close();},
/* ----------------------------------------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------------------- STRING UTILS ---  */
	inoe:function(v){/*{R:'boolean',DESC:'returns true if value Is Null Or Empty, false otherwise',v:{T:'string',DESC:'the value to test'}}*/
		if(!v){return true}return (v==null||v==='');},
	starts:function(v,m){/*{R:'boolean',DESC:'returns true if value starts with match, false otherwise',v:{T:'string',DESC:'the value to test'},v:{t:'string',desc:'the match to test the value against'}}*/
		return v.indexOf(m)==0;},
	ends:function(v,m){/*{R:'boolean',DESC:'returns true if value ends with match, false otherwise',v:{T:'string',DESC:'the value to test'},v:{t:'string',desc:'the match to test the value against'}}*/
		return v.length>=m.length&&v.substr(v.length-m.length)===m;},
/* ----------------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------- DHTML UTILS --- */
	att:function(e,a,_v){/*{R:'value',DESC:'gets or sets an attribute in any document node',e:{T:'node',DESC:'The element from to read or set the attribute'},a:{T:'string',DESC:'the name of the attribute'},_v:{T:'value',DESC:'If provided, the element\'s attribute will be set to this value'}}*/
		if(e){if(_v){e.setAttribute(a,_v);}else{return e.getAttribute(a)}}return false},getdoc:function(n){while(n.nodeType!=9){n=n.parentNode;}return n;},
	ins:function(p,tag,aa,_html,b){var i;var elm=document.createElement(tag);if(_html){elm.innerHTML=_html;}p=this.$$(p);if(aa){for(i=0;i<aa.length;i+=2){this.att(elm,aa[i],aa[i+1]);}}if(p){if(b==true){return p.insertBefore(elm,p.firstChild);}else if(b){return p.insertBefore(elm,b);}else{return p.appendChild(elm);}}else{return elm}},
	insvg:function(p,tag,aa,_html,b){var i;var elm=document.createElementNS('http://www.w3.org/2000/svg',tag);if(_html){elm.innerHTML=_html;}p=this.$$(p);if(aa){for(i=0;i<aa.length;i+=2){
		elm.setAttribute(aa[i],aa[i+1]);
	}}if(p){if(b==true){return p.insertBefore(elm,p.firstChild);}else if(b){return p.insertBefore(elm,b);}else{return p.appendChild(elm);}}else{return elm}},
	move:function(elm,p,atbegin){p=this.$$(p);elm=this.$$(elm);if(atbegin){p.insertBefore(elm,p.firstChild)}else{p.appendChild(elm.parentNode.removeChild(elm));}},
	clearchilds:function(elm){/*{R:'void'}*/
		elm=this.$$(elm);if(elm&&elm.hasChildNodes&&elm.removeChild){while(elm.hasChildNodes()){elm.removeChild(elm.firstChild);}}},
/* ----------------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------- XPATH + XML + XHR UTILS --- */
	selone:function(xpath,n,_doc){if(!n){return null;};if(this.isIE){return n.selectSingleNode(xpath);}else{if(!_doc){_doc=this.getdoc(n);}var xx=_doc.evaluate(xpath,n,null,XPathResult.ANY_TYPE,null);if(xx.resultType==1){return xx.numberValue}else{return xx.iterateNext();}}},
	sel:function(xpath,n,_doc){if(!n){return [];};var x=null;var xx=new Array();var xxx=null;if(this.isIE){if(this.isIE9||this.isIE10){x=this._IE9sel(xpath,n);}else{x=n.selectNodes(xpath);}xxx=x.nextNode();while(xxx){xx[xx.length]=xxx;xxx=x.nextNode();}return xx;}
		else{if(!_doc){_doc=this.getdoc(n);}x=_doc.evaluate(xpath,n,null,XPathResult.ANY_TYPE,null);if(x.resultType!=4){xx=[x.numberValue]}else{xxx=x.iterateNext();while(xxx){xx[xx.length]=xxx;xxx=x.iterateNext();}}return xx;}},
		_IE9sel:function(xpath,n){var xml='<?xml version="1.0" encoding="utf-8" ?>\n'+this.xml(n,false);var xD=new ActiveXObject("Microsoft.XMLDOM");var objNodeList;xD.loadXML(xml);if(xD.parseError.errorCode!=0){var myErr=xD.parseError;throw new Error(myErr.reason+'\n Parsing :\n'+xml);}else{xD.setProperty("SelectionLanguage", "XPath");try{return xD.documentElement.selectNodes(xpath);}catch(tex){var i=0;}}},
	xmlparse:function(xml){var xD=false;try{var xP=new DOMParser();xD=xP.parseFromString(xml,"text/xml");}catch(zz){try{xD=new ActiveXObject("Microsoft.XMLDOM");xD.async=false;xD.loadXML(xml);}catch(z){return zz.message;}}return xD;},
	load:function(url,_elm,_onfinish,_onstep,_onerror,_mem){var req=this._req();var $this=this;req.onreadystatechange=function(ev){
		$this._doload(ev,_elm,_onfinish,_onstep,_onerror,_mem);};if(!_elm){req.open("GET",url,true);req.send('');}
		else{var hasfile=false;if(!hasfile){req.open("POST",url,true);req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    		console.log('todo:serialize');req.send($this.serialize(_elm))}
			else{console.log('todo:file upload');}}return false;},
	_req:function(){var rq=false;if(window.XMLHttpRequest&&!(window.ActiveXObject)){try{rq=new XMLHttpRequest();}catch(exk){rq=false;}}else if(window.ActiveXObject){try{rq=new ActiveXObject("Msxml2.XMLHTTP");}catch(ex){try{rq=new ActiveXObject("Microsoft.XMLHTTP");}catch(exx){rq=false;}}}if(!rq){console.log('This browser is neither w3c or mozilla compatible*[2008], uno.xml javascript framework will not work.');}return rq;},
 	_doload:function(ev,_elm,_onfinish,_onstep,_onerror,_mem){var req=(ev.currentTarget||ev.target||ev.srcElement);if(req.readyState>1&&req.readyState<4){if(req.status==200){if(_onstep)_onstep(req);}
		}else if(req.readyState==4){if(req.status==200){_onfinish(req,_mem);}else{console.log('Request failed');console.log(req);if(_onerror){_onerror(req)}}}},
/* ----------------------------------------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- FILES PRELOAD and CACHING --- */
	preloaded:{},preload:function(t,prop,_next,_reserved){/*{R:'void',DESC:'preloads resources froma uri, optionally posting data, then retrieves and stores selected prop from the response in the preloaded object list',t:{T:'string||string array',DESC:'one or more uris to preload'},prop:{T:'string',DESC:'the name of the property to store from the response'},_next:{T:'function',DESC:'If provided, will be called when all the resources have been preloaded'},_reserved:{T:'reserved',DESC:'reserved'}}*/
		if(!_reserved){if(t instanceof Array){this.Rpreloading=t;this.preload(false,prop,_next,true);
		}else{if(this.preloaded[t]){_next(this.preloaded)}else{var $this=this;
			this.load(t,false,function(req){$this.preloaded[t]=req[prop];_next($this.preloaded);});}}
		}else{var x;var flag=true;for(x=0;x<this.Rpreloading.length;x++){
			if(!this.preloaded[this.Rpreloading[x]]){var $this=this;var k=this.Rpreloading[x];flag=false;
				this.load(k,false,function(req){$this.preloaded[k]=req[prop];$this.preload(false,prop,_next,true);});
		break}}if(flag){delete this.Rpreloading;_next(this.preloaded);}}},
/* ----------------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------ JSON RENDER ENGINE --- */
rrgx0:new RegExp('<!--TT{([^>]*)}TT-->'),rrgx1:new RegExp('<!--JS{([^>]*)}JS-->'),rrgx2:new RegExp('JS-([^=]+)="([^"]*)"'),
	rrgxLAST:new RegExp('<!--LOAD{([^>]*)}LOAD-->'),rrgxSCRIPT:/<script\b[^>]*>([\s\S]*?)<\/script>/gm,
	/*var rxs=/(<|%3C)script[\s\S]*?(>|%3E)[\s\S]*?(<|%3C)(\/|%2F)script[\s\S]*?(>|%3E)/gi;*/
	render:function(tgt,tpl,data,_mode){if(!_mode){_mode='normal'}var out=this._render(tpl,data);this._renderfill(tgt,out[0],_mode,out[1]);},
	_render:function(t,d){/*{R:'string',DESC:'performs evaluation of specially marked string templates, using an object instance as data',t:{T:'string',DESC:'the starting template string'},d:{T:'object','the object onto wich evaluate template expression against (referred as this in the template)'}}*/
		var rnd=Math.floor(Math.random()*1000000000).toString();t=t.replace(/%UNIQUEID/g,rnd);
		var tmp='';var rr=null;var jj=[];d.tmpfn=function(j){try{return eval(j)}catch(ex){return ex.message}};
		rr=this.rrgx0.exec(t);while(rr!=null){t=t.replace(rr[0],this.preloaded[rr[1]]);rr=this.rrgx0.exec(t);}
		rr=this.rrgx1.exec(t);while(rr!=null){tmp=d.tmpfn(rr[1]);t=t.replace(rr[0],tmp);rr=this.rrgx1.exec(t);}
		rr=this.rrgx2.exec(t);while(rr!=null){tmp=d.tmpfn(rr[2]);t=t.replace(rr[0],rr[1]+'="'+tmp+'"');rr=this.rrgx2.exec(t);}
		rr=this.rrgxLAST.exec(t);while(rr!=null){t=t.replace(rr[0],'');jj[jj.length]=rr[1];rr=this.rrgxLAST.exec(t);}
		rr=this.rrgxSCRIPT.exec(t);while(rr!=null){try{eval(rr[1])}catch(ex){console.log('ERROR evaluating:'+ex.message)}rr=this.rrgxSCRIPT.exec(t);}
	delete d.tmpfn;return [t,jj]},
	_renderfill:function(tgt,s,m,jj){tgt=this.$$(tgt);if(tgt.nodeName.toLowerCase()=='table'){console.log('todo:target is table')}
		else{if(m=='normal'){tgt.get(0).innerHTML=s;}else{var n=document.createElement('div');n.innerHTML=s;
			if(m=='append'){tgt.appendChild(n);}else if(m=='insert'){tgt.insertBefore(n,tgt.firstChild);}else{console.log('unsupported mode')}
		}}if(jj.length>0){var $this=this;var post=function(){$this._renderpost(jj);};setTimeout(post,100);}},
	_renderpost:function(jj){for(var j=0;j<jj.length;j++){try{eval(jj[j])}catch(ex){console.log('Error postloading render: '+ex.message);}}},
/* ----------------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------ HTML5 AUTOCOMPLETE --- */
	actbremove:function(elm){elm=this.$$(elm);if(elm){if(this._actbs[elm.id]){delete this._actbs[elm.id]; return true}}return false},
	actb:function(elm){elm=this.$$(elm);var auid=this.uid();if(this.inoe(elm.id)){elm.id=auid;}if(this._actbs[elm.id]){return this._actbs[elm.id]}else{
		var $this=this;var ACTB={uid:auid,TEXTBOX:elm,GHOST:null,min:3,enabled:true,clear:$this._ACTBclear,onkeypress:$this._ACTBonkeypress,setvalue:$this._ACTBsetvalue,suggest:$this._ACTBsuggest,onsuggest:$this._ACTBonsuggest,setenabled:$this._ACTBsetenabled,_init:$this._ACTBinit};ACTB._init(this);
		this._actbs[elm.id]=ACTB;return this._actbs[elm.id]}},_actbs:{},
	_ACTBinit:function($){this.GHOST=$.ins(this.TEXTBOX.parentNode,'div',['style','position:absolute;display:none;z-index:100','class','autocompleteghost']);
		this.TEXTBOX.setAttribute('onkeyup','it3.actb(this.id).onkeypress()');
		this.TEXTBOX.setAttribute('onblur','setTimeout(\'it3.actb(\\\''+this.TEXTBOX.id+'\\\').clear()\',250);return true;');},
	_ACTBclear:function(){clearTimeout(window.autoctimeout);this.GHOST.style.display='none';it3.clearchilds(this.GHOST);},
	_ACTBonkeypress:function(){clearTimeout(window.autoctimeout);var $this=this;
		window.autoctimeout=setTimeout(function(){var v=$this.TEXTBOX.value.split(' ');$this.suggest(v[v.length-1]);},500);},
	_ACTBsuggest:function(w){if(this.enabled){this.clear();if(w.length>=this.min){this.GHOST.style.display='';var $this=this;f$.db.autocomplete(w,function(r){$this.onsuggest(r,$this)})}}},
	_ACTBsetvalue:function(w){var vv=this.TEXTBOX.value.split(' ');if(vv.length<2){this.TEXTBOX.value=w}else{this.TEXTBOX.value='';for(var v=0;v<vv.length-1;v++){this.TEXTBOX.value+=vv[v]+' '}this.TEXTBOX.value+=w}this.clear();},
	_ACTBonsuggest:function(w,$this){if($this.enabled){it3.ins($this.GHOST,'button',
		['class','actbresult',
		'onclick','it3.fix(event);var ACTB=it3.actb(\''+$this.TEXTBOX.id+'\');ACTB.setvalue(\''+w.replace('\'','\\\'')+'\');ACTB.TEXTBOX.focus();if(ACTB.TEXTBOX.onsubmit){ACTB.TEXTBOX.onsubmit()}'],w)}},
	_ACTBsetenabled:function(enabled){this.enabled=enabled;if(!enabled){this.clear()}},
/* ----------------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------ HTML5 JSON TABLE FACTORY --- */
	tableremove:function(elm){elm=this.$$(elm);if(elm){if(this._tables[elm.id]){delete this._tables[elm.id]; return true}}return false},
	table:function(elm){elm=this.$$(elm);var tuid=this.uid();if(this.inoe(elm.id)){elm.id=tuid;}if(this._tables[elm.id]){return this._tables[elm.id]}else{
		this._tables[elm.id]=new this.Table(tuid,elm);return this._tables[elm.id]}},_tables:{},
/* ----------------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------ BUFFER UTILS------------ --- */
	makebloblink:function(content,filename,contentType,linkid){if(!contentType)contentType='application/octet-stream';
		var blob=new Blob([content],{'type': contentType});var link=window.document.createElement('a');link.id=linkid;
		link.href=window.URL.createObjectURL(blob);link.download=filename;link.innerHTML='<i class="icon ion-android-download"></i> Download export';return link;}
/* ----------------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------ DATA STRUCTURES -------- --- */
	
};

/* ----------------------------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- HTML5 JSON TABLE --- */
it3.Table=function(uid,elm){this.uid=uid;this.TABLE=elm;this.cols={};this.ignore={};this.colstot=0;this.ignorecol={};this.fncol={};this.hidden={};this.init();};
it3.Table.prototype={
	init:function(){//th parse and rebuild + tabletools
		var th=this.TABLE.getElementsByTagName('th');
		//tr parse and typeguess
		//layout + foot
		var TID=this.TABLE.id;
		//table tools
		var tools=it3.ins(this.TABLE.parentNode,'div',['class','html5tabletools','style','position:relative;top:-25px;'],false,this.TABLE);
		it3.ins(tools,'button',['onclick','if(this.classList.contains(\'nocheck\')){this.classList.remove(\'nocheck\');this.firstChild.classList.remove(\'ion-android-checkbox-outline-blank\');this.firstChild.classList.add(\'ion-android-checkbox\');'+it3.NS+'.table(\''+TID+'\').selectall();}else{this.classList.add(\'nocheck\');this.firstChild.classList.add(\'ion-android-checkbox-outline-blank\');this.firstChild.classList.remove(\'ion-android-checkbox\');'+it3.NS+'.table(\''+TID+'\').selectnone();}','class','nocheck'],'<i class="icon ion-android-checkbox-outline-blank"></i>');
		it3.ins(tools,'button',['onclick',it3.NS+'.table(\''+TID+'\').invertsel();this.previousElementSibling.classList.add(\'nocheck\');this.previousElementSibling.firstChild.classList.add(\'ion-android-checkbox-outline-blank\');this.previousElementSibling.firstChild.classList.remove(\'ion-android-checkbox\');'],'<i class="icon ion-arrow-swap"></i> Inverti selezione');
		it3.ins(tools,'button',['id',this.TABLE.id+'cpb'],'<i class="fa fa-copy"></i> Copia');		
		it3.ins(tools,'button',['onclick',it3.NS+'.table(\''+TID+'\').xls()'],'<i class="fa fa-file-excel-o"></i> Esporta excel');
		it3.ins(tools,'button',['onclick',it3.NS+'.table(\''+TID+'\').csv()'],'<i class="icon ion-android-document"></i> Esporta csv');
		if(window.clipexport){window.clipexport.destroy();}window.clipexport=new Clipboard('#'+TID+'cpb',{text:function(trigger){return it3.table(TID).copy();}});
		//sort controls
		
		//scroll event
		this.TABLE.parentNode.setAttribute('onscroll',it3.NS+'.table(\''+this.TABLE.id+'\').onscroll(this)');setTimeout(it3.NS+'.table(\''+this.TABLE.id+'\').onscroll('+it3.NS+'.$$(\''+this.TABLE.id+'\').parentNode)',25);
	},	
	reset:function(){console.log('todo');},
	onscroll:function(Tparent){var s='transform:translate(Xpx,Ypx);background-color:#0F0;border-bottom:1px solid #0F0';
		Tparent.firstChild.setAttribute('style','position:relative;top:-25px;'+('transform:translate(Xpx,Ypx);').replace('X',Tparent.scrollLeft).replace('Y',(Tparent.scrollTop)));
		var ee=Tparent.getElementsByTagName('tr')[0];if(ee){ee=ee.getElementsByTagName('th');for(var e =0;e<ee.length;e++){ee[e].setAttribute('style',s.replace('X',0).replace('Y',(-25+Tparent.scrollTop)));}}},
	add:function(json){var x;var out='';var d=json;for(x in d){if(!this.cols[x]){if(!this.ignorecol[x]){
		this.cols[x]={idx:this.colstot};this.colstot++;it3.ins(this.TABLE.tHead.rows[0],'th',false,'<b>'+x+'</b>');}}}
		setTimeout('var id=\''+this.TABLE.id+'\';it3.table(id).onscroll(it3.$$(id).parentNode)',25);
		var tr=document.getElementsByClassName(this.uid+d['$key'].replace(/ /g,''))[0];if(tr){it3.clearchilds(tr);}
		else {tr=document.createElement('tr');tr=this.TABLE.tBodies[0].insertRow(tr);tr.classList.add(this.uid+d['$key'].replace(/ /g,''));tr.setAttribute('onclick','this.classList.toggle("selected")');}
		var td=document.createElement('td');if(!d['doctitle']){d['doctitle']=d.$key.substr(d.$key.indexOf('-')+1).replace('*','.');}
		td.innerHTML='<a target="_blank" onclick="it3.fix(event);return app.dialog(\''+d['$key']+'\');return false;" href="'+HOST+'/?'+d['url']+'" /><i class="fa fa-external-link"></i></a><a href="#" onclick="it3.fix(event);return app.details(\''+d['$key']+'\')" draggable="true" ondragstart="app.drag(\''+d['$key']+'\',\''+d[f$.db.docnamefield].replace('\'','\\\'')+'\')" ondragover="event.preventDefault()" ondrop="fix(event);app.drop(\''+d['$key']+'\',\''+d[f$.db.docnamefield]+'\')"> '+d[f$.db.docnamefield]+'</a>';
		tr.appendChild(td);for(var o in this.cols){if(!this.ignorecol[o]){td=document.createElement('td');
			if(this.fncol[o]){td.innerHTML=this.fncol[o](d);}else if(d[o]){if(d[o].join){td.innerHTML=d[o].join(', ')} 
			else if(typeof d[o]=='number'){td.innerHTML=d[o].toLocaleString()}
			else if(typeof d[o]=='string'){d[o]=d[o].replace(/<.*\/>/g,' ');d[o]=d[o].replace(/\s/g,' ');
					d[o]=d[o].replace(/<([^>]+)\/>/g,' ');d[o]=d[o].replace(/(<([^>]+)>)/ig,'');d[o]=d[o].replace(/<link .*>/g,' ');
				if(d[o].length>100){d[o]=d[o].substring(0,95)+'[...]'}td.innerText=d[o]}
			}else{td.innerText='';}tr.appendChild(td);}}},
	addcol:function(prop,alias,sort,filter,sample){
		
	},
	remove:function(d){var k=d.$key||(d.key||d.toString());var tr=document.getElementsByClassName(this.uid+k.replace(/ /g,''))[0];if(tr){tr.parentElement.removeChild(tr)}},
	csv:function(){var sss=this.copy();var lnk=it3.$$(this.TABLE.id+'dl');if(lnk){lnk.parentNode.removeChild(lnk)};
		lnk=it3.makebloblink(sss,'risultati.csv','text/csv',this.TABLE.id+'dl');this.TABLE.parentNode.firstChild.appendChild(lnk);},
	xls:function(){var ccc=this.cols;var rc=0;var c;var cc=[];for(c in ccc){cc[cc.length]=c}
		var hh='<ss:Row>';for(c=0;c<cc.length;c++){if(!this.hidden[cc[c]]){hh+='<ss:Cell><ss:Data ss:Type="String">';hh+=cc[c]+'</ss:Data></ss:Cell>';rc++;}}hh+='</ss:Row>\n';
		var rrr=this.TABLE.tBodies[0].getElementsByClassName('selected');if(rrr.length<1){rrr=this.TABLE.tBodies[0].getElementsByTagName('tr');}
		var r=0;var rr=rrr[r];var tc=[];while(rr){tc=rr.getElementsByTagName('td');if(tc.length>0){hh+='<ss:Row>';
		for(c=0;c<tc.length;c++){hh+='<ss:Cell><ss:Data ss:Type="String">';hh+=tc[c].innerText.replace(/&/g,'&amp;')+'</ss:Data></ss:Cell>';}hh+='</ss:Row>\n';}r++;rr=rrr[r];}
		var lnk=it3.$$(this.TABLE.id+'dl');if(lnk){lnk.parentNode.removeChild(lnk)};lnk=it3.makebloblink('<?xml version="1.0"?><ss:Workbook xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">\n<ss:Worksheet ss:Name="Sheet1">\n<ss:Table>\n\n'+
		hh +'</ss:Table></ss:Worksheet></ss:Workbook>','risultati.xls','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',this.TABLE.id+'dl');
		this.TABLE.parentNode.firstChild.appendChild(lnk);},
	copy:function(){var ccc=this.cols;var rc=0;var c;var cc=[];for(c in ccc){cc[cc.length]=c}
		var hh='';for(c=0;c<cc.length;c++){if(!this.hidden[cc[c]]){hh+='"'+cc[c].replace(/"/g,'\"')+'",';rc++;}}hh=hh.substr(0,hh.length-1);hh+='\n';
		var rrr=this.TABLE.tBodies[0].getElementsByClassName('selected');if(rrr.length<1){rrr=this.TABLE.tBodies[0].getElementsByTagName('tr');}
		var r=0;var rr=rrr[r];var tc=[];var tmps;while(rr){tc=rr.getElementsByTagName('td');if(tc.length>0){
		for(c=0;c<tc.length;c++){tmps='"'+tc[c].innerText.replace(/"/g,'""')+'"';if(tmps=='""'){tmps=''}hh+=tmps+','}hh=hh.substr(0,hh.length-1);hh+='\n';}r++;rr=rrr[r];}
		return hh;},
	getsel:function(){console.log('todo')},
	selectall:function(){var $t=this.TABLE.tBodies[0].getElementsByTagName('tr');for(var i=0;i<$t.length;i++){$t[i].classList.add('selected');}},
	selectnone:function(){var $t=this.TABLE.tBodies[0].getElementsByTagName('tr');for(var i=0;i<$t.length;i++){$t[i].classList.remove('selected');}},
	invertsel:function(){var $t=this.TABLE.tBodies[0].getElementsByTagName('tr');for(var i=0;i<$t.length;i++){$t[i].classList.toggle('selected');}},
	sort:function(idx,_desc){console.log('todo')},
	filter:function(_idx){console.log('todo')},
	togglecol:function(idx,_forcevisible){}
};
if(window.it3_onload){window.it3_onload();}
if(window.noloadcopy!=true){
it3.ins(document.head,'script',['src','https://cdn.jsdelivr.net/gh/zenorocha/clipboard.js/dist/clipboard.min.js']);
}
/*
	date : YYYYMMDD DD/MM/YY MM/DD/YY
	time :
	datetime :
	currency : 
	number :
	string
*/
/*
	filter : single - range - text
*/


if(!window.X){window.X={};}
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

it3.data={};
it3.data.weekstart=1;
//var basicurl='https://xingu.tech/u/subprofiles?onload=loadprofiles&mode=json&xtoken=%XTOKEN'.replace('%XTOKEN',encodeURIComponent(window.XTOKEN));


it3.data.Graph=function(source,ghtype,_page,_metric,_metrics,_metrics_type,_grouped){
	this.source=source;this.ghtype=ghtype;
	this.page=_page;this.metric=_metric;this.metrics=_metrics;this.metrics_type=_metrics_type;this.grouped=_grouped;
	this.gitem=null;this.xobj=null;this.init();};
it3.data.Graph.prototype={
	init:function(){
		this.source._regroup(true);
		if(!this.page){this.page=this.source.R.current_page}
		if(!this.metric){this.source.mx1sel.options[this.source.mx1sel.selectedIndex].value}
		if(!this.grouped){this.grouped=JSON.parse(JSON.stringify(this.source.G));}		
		if(!this.metrics){this.metrics=[];var metric={};this.metrics_type={};
			for(let i=0;i<R.sources[0].OH.length;i++){
				this.metrics_type[R.sources[0].OH[i]]='spline'
				if(i!=0){metric[R.sources[0].OH[i]]=false;}
				else{metric[R.sources[0].OH[i]]=true;}
				this.metrics.push(metric);
		}	}
		var temp_obj={"x":0,"y":0,"w":6,"h":7};
		if(this.ghtype=='xy'){this.ghtype='chart-line';}
		this.gitem=this.page.grid.addItem(temp_obj);
		var _this=this;
		sleep(250).then(()=>{
			var tgt=document.getElementById(_this.gitem.id);
			if(!tgt){console.log('timeout with vue grid problem')}
			_this.xobj=_this['_as_'+this.ghtype](tgt);
			tgt.click();
		});
	},
	_as_table:function(tgt){
		let t=it3.ins(tgt,'table',['class','report-table'],'<thead><tr><th>'+this.source.OH.join('</th><th>')+'</th></tr></thead><tbody></tbody>');
		let xobj=$(t).DataTable({data:this.source.O,"paging":false,dom: 'Bfirtp', colReorder: true,
			buttons:[{extend: 'copy', text: '<i class="fa fa-copy"></i>'},{extend: 'excel', text: '<i class="fa fa-file-excel"></i>'},
			{extend: 'colvis', text: '<i class="fa fa-eye"></i>'}]});
		tgt.insertBefore(xobj.buttons().container()[0],tgt.firstChild);
		return xobj;},
	_as_bacon:function(tgt){let midx=-1;let o=0;	
		for(o=0;o<this.source.OH.length;o++){if(this.source.OH[o]==this.metric){midx=o;break}}		
		var time_cats=[];var series=[];let oseries={};let tmp;let k='';
		for(o=0;o<this.source.O.length;o++){
			if(time_cats.indexOf(this.source.O[o][0])<0){time_cats.push(this.source.O[o][0]);}
			for(k in this.source.OUTIDX){if(this.source.OUTIDX[k]==o){
				k=k.replace(this.source.O[o][0],'');
				if(!oseries[k]){oseries[k]={name:k,data:[]}}
			break}}}
		for(k=0;k<time_cats.length;k++){
			for(o in oseries){tmp=0;
				if(this.source.OUTIDX[time_cats[k]+o]){tmp=this.source.O[this.source.OUTIDX[time_cats[k]+o]][midx];}
				oseries[o].data.push(tmp);
		}	}
		for(o in oseries){series.push(oseries[o])}
		let newchart=Highcharts.chart(tgt,{series:series,
			chart:{type:'streamgraph',marginBottom:30},
			title:{floating:true,align:'left',text:this.metric},subtitle:false,				
			xAxis:{maxPadding:0,margin:20,crosshair:true,
				type:'category',categories:time_cats,
				labels:{align:'left',reserveSpace:false,rotation:270},
				lineWidth:0,tickWidth:0},
			yAxis:{visible:false,startOnTick:false,endOnTick:false},
			legend:{enabled:false},
			plotOptions:{series:{label:{minFontSize:5,maxFontSize:15,style:{color:'rgba(255,255,255,0.75)'}}}},
		});
		return newchart;
	},
	'_as_chart-line':function(tgt){var ctype='spline';
		var metrics=this.source.oo.def.cols;
		let m=null;let midx=0;var mseries=[];var maxis=[];var maxis2={};let o=0;
		let cats=[];
		for(m in metrics){if(metrics[m].axis){if((metrics[m].axis!='date')&&(metrics[m].axis!='string')){let d=[];
			for(o=0;o<this.source.OH.length;o++){if(this.source.OH[o]==metrics[m].name){midx=o;break}}			
			for(o=0;o<this.source.O.length;o++){let v=(typeof this.source.O[o][midx]=='number')?this.source.O[o][midx]:parseFloat(parseFloat(this.source.O[o][midx].replace(/%/g,'').replace(/€/g,'')).toFixed(2));
				if(ctype!='bar'){d.push([this.source.O[o][0],v]);}else{d.push([v]);}
				if(this.metrics[metrics[m].name]){let k='';for(k in this.source.OUTIDX){if(this.source.OUTIDX[k]==o){cats.push(k);break}}}
			}
			if(!maxis2[metrics[m].axis]){maxis2[metrics[m].axis]=maxis.length;
				maxis.push({title:false,labels:{style:{color:Highcharts.getOptions().colors[mseries.length]}}});
			}
			mseries.push({name:metrics[m].name,data:d,yAxis:maxis2[metrics[m].axis],visible:this.metrics[metrics[m].name],type:this.metrics_type[metrics[m].name],opacity:0.5,				
			events:{legendItemClick:function(x){it3.fix(x.browserEvent);
				let S=this.chart.series[this.index];let O=S.options;delete O.lineWidth;
				if(this.visible){if(O.type=='areaspline'){O.type='spline';}else if(O.type=='spline'){O.type='column';}else if(O.type=='column'){O.type='scatter';}
					else if(O.type=='scatter'){O.type='areaspline';}else if(O.type=='hidden'){O.type='areaspline';}
					S.setOptions(O);S.update();if(O.type=='spline'){S.hide()}return false;}
			}	}	});
		}}}	
		let newchart=Highcharts.chart(tgt,{yAxis:maxis,series:mseries,chart:{zoomType:'xy'},
			title:false,subtitle:false,legend:{enabled:true},
			xAxis:{categories:cats,title:false,showLastLabel:true,
				labels:{format:'{value}'},maxPadding:0.02},
			tooltip:{shared:true,crosshairs:true},
			plotOptions:{spline:{marker:{enable:false}}},
			boost:{enabled:false}
		});
		return newchart;
	},
	destroy:function(removegitem){this.xobj.destroy();
		it3.clearchilds(this.gitem.id);
		if(removegitem){this.page.grid.removeItem(this.gitem);}},
};
/* ################################################################################################################################################################### */
/* ################################################################################################################################################################### */

it3.data.ReportData=function(report,name,data,oo){this.uid=it3.uid();this.R=report;this.D=data;this.name=name;
	//this.oo=extend({add_date_segments_from_col:'create_date',def:{cols:[{name:'name'}]}},oo);
	this.oo=oo;this.O=[];this.G={};this.ui=null;this.ui_gtarget={};this.out_adapter={};
	this.activegraphs=[];
	this.graphs={'chart-line':false,'bacon':false,'chart-pie':false,'dot-circle':false,'table':true},
	this.init();}
it3.data.ReportData.prototype={
	init:function(){let tmp=null;
		if(this.oo.add_date_segments_from_col){let db_r=0;
			//todo:add columns to cols def
			for(db_r=0;db_r<this.D.length;db_r++){tmp=this.D[db_r];
				d_date=new Date(tmp[this.oo.add_date_segments_from_col]);	
				this.D[db_r]['year']=d_date.getFullYear();
				this.D[db_r]['month']=d_date.getFullYear()+'-'+(d_date.getMonth()+1);
				this.D[db_r]['2weeks']=this.week_selector(d_date);
				this.D[db_r]['week']=this.week_selector(d_date);
				this.D[db_r]['day']=d_date.getFullYear()+'-'+(d_date.getMonth()+1)+'-'+d_date.getDate();	
		}	}
		//fill out adapter and draw ui;		
		this.ui=it3.ins(this.R.sources_ui,'div',['id',this.uid,'class','report-source-ui']);
		let tmpui=null;let _this=this;
		this.mx1sel=it3.ins(this.ui,'select',['style','display:none']);
		this.ui_group_time=it3.ins(this.ui,'span',['style','white-space:nowrap;']);
		this.ui_group_normal=it3.ins(this.ui,'span',['style','margin: 0 9% 0 5%;white-space:nowrap;']);
		this.ui_gtarget=it3.ins(this.ui,'div',['style','width:100%;']);
		let c=0;tmp=this.oo.def.cols;
		for(c=0;c<tmp.length;c++){this.out_adapter[tmp[c].name.replace(/ /g,'').toLowerCase()]=c;let _c=c;
			if(tmp[c].axis){if((tmp[c].axis!='date')&&(tmp[c].axis!='string')){
				it3.ins(this.mx1sel,'option',['value',tmp[c].name],tmp[c].name);
			}}
			if(tmp[c].groupable){this.G[tmp[c].name]='ungrouped';
				if(tmp[c].g_exclusive){
					tmpui=it3.ins(this.ui_group_time,'div',['id',this.uid+'_gbutt'+c,'class','report-grouping mdc-chip g_exclusive disabled-chip'],tmp[c].name);
					tmpui.addEventListener('click',function(ev){_this._group_handler(ev,_c,true);});
				}else{
					tmpui=it3.ins(this.ui_group_normal,'div',['id',this.uid+'_gbutt'+c,'class','report-grouping mdc-chip disabled-chip'],tmp[c].name);
					tmpui.addEventListener('click',function(ev){_this._group_handler(ev,_c);});
	}	}	}	this._regroup()},
	week_selector:function(odate){var out='';var date=new Date(odate);
		date.setHours(0);date.setMinutes(0);date.setSeconds(0);date.setMilliseconds(0);
		var d=date.getDay();while(d!=it3.data.weekstart){date=new Date(date.setDate(date.getDate()-1));d=date.getDay();}
		var y=date.getFullYear();var m=date.getMonth()+1;
		//out=y+' '+monthNames[m]+' '+date.getDate()+' -';
		if(m<10){out=y+' 0'+m;}
		else{out=y+' '+m;}
		if(date.getDate()<10){out=out+' 0'+date.getDate()+' -';}
		else{out=out+' '+date.getDate()+' -';}
		date=new Date(date.setDate(date.getDate()+6));
		if(date.getFullYear()!=y){out=out+' '+date.getFullYear();}
		if(date.getMonth()<9){if((date.getMonth()+1)!=m){out=out+' 0'+(date.getMonth()+1);}}
		else{if((date.getMonth()+1)!=m){out=out+' '+(date.getMonth()+1);}}
		if(date.getDate()<10){return out+' 0'+date.getDate();}
		else{return out+' '+date.getDate();}},
	destroy:function(ev){let i;
		this.O=null;this.OH=null;this.G=null;this.D=null;this.source_option=null;this.out_adapter=null;this.emptyline=null;
		this.name=null;this.uid=null;
		delete this.O;delete this.OH;delete this.G;delete this.D;
		//for(let x=0;x<this.activegraphs.length;x++){this.activegraphs[x].destroy();}
		//for(let p=0;p<this.vue_graphs.length;p++){this.vue_graphs[p].parentElement.removeChild(this.vue_graphs[p]);}		
		it3.clearchilds(document.getElementById(this.uid));
		
	},
	_toggle_graph:function(ev,gtype){this.add_graph(gtype);},
	_group_handler:function(ev,c,exclusive){let Cname=this.oo.def.cols[c].name;
		if(c && ev){
			if(exclusive){let orig=window.current_groupes[Cname];
				var ee=document.querySelectorAll('#'+this.uid+' .g_exclusive');
				for(let e=0;e<ee.length;e++){ee[e].classList.remove('selected');window.current_groupes[ee[e].innerHTML]='ungrouped';}			
				if(orig=='ungrouped'){window.current_groupes[Cname]='grouped';ev.target.classList.add('selected');}else{window.current_groupes[Cname]='ungrouped'}
			}else{
				if(window.current_groupes[Cname]=='ungrouped'){window.current_groupes[Cname]='grouped'}else{window.current_groupes[Cname]='ungrouped'}
				ev.target.classList.toggle('selected');
			}
		}
		this._regroup();
		if(this.R.current_gitem){this.R.current_gitem.xobj.destroy();
			var elm=document.getElementById(this.R.current_gitem.gitem.id);it3.clearchilds(elm);
			this.R.current_gitem.xobj=this.R.current_gitem['_as_'+this.R.current_gitem.ghtype](elm);			
		}
		/*if(window.editItem &&  !newGraph){
			var item=document.getElementById(window.editItem.id);var p_item=item.parentElement;
			var gtype=window.editItem.obj.xtype.toString();
			if(gtype=='table'){it3.clearchilds(item);}
			window.editItem.obj.destroy();this.add_graph(gtype,false,true,p_item,window.editItem);
		}*/
	},
	_regroup:function(){this.O=[];let db_r=0;let c=0;let r=0;
		var db_row=null;var json_file=null;var j_row=null;
		var out_ridx=null;this.OUTIDX={};
		var chips_parent=[document.querySelector('#g_exclusive-groups-chips-target'), document.querySelector('#groups-chips-target')];
		let COLS=this.oo.def.cols;
		for(db_r=0;db_r<this.D.length;db_r++){db_row=this.D[db_r];
			json_file=db_row.json_file;
			for(r=0;r<json_file.rows.length;r++){
				j_row=json_file.rows[r];
				//Get out_row_index for this json line
				out_ridx=this.make_idx(db_row,j_row,db_row.j_adapter);
				//Create line if not exists
				if(this.OUTIDX[out_ridx]==undefined){this.OUTIDX[out_ridx]=this.O.length;this.O[this.OUTIDX[out_ridx]]=JSON.parse(JSON.stringify(this.oo.def.empty));}
				//Fill columns with op or fn
				for(c=0;c<COLS.length;c++){
					if(COLS[c].op){
						if(this.OPS[COLS[c].op]){this.OPS[COLS[c].op].call(this,db_row,j_row,this.OUTIDX[out_ridx],db_row.j_adapter,COLS[c],c);}
		}	}	}	}
		//Run final functions (x_fn and x_op) and clear "zero" rows
		let rem=[];
		for(r=0;r<this.O.length;r++){
			for(c=0;c<COLS.length;c++){
				if(COLS[c].x_op){this.O[r][c]=COLS[c].x_op.call(this,this.O[r],COLS[c]);}
				if(COLS[c].x_fn){var xtype=typeof COLS[c].x_fn;
					if(xtype=='function'){this.O[r][c]=COLS[c].x_fn(this.O[r]);}
					else{this.O[r][c]='todo'}
			}	}
			if(!this.oo.def.final_accept_row(this.O[r])){this.O[r]=null;for(db_r in this.OUTIDX){if(this.OUTIDX[db_r]==r){delete this.OUTIDX[db_r];rem.push(r)}}}
		}
		this.O=this.O.filter(function(value,index,arr){return value != null;});
		rem=rem.sort(function(a,b){return b-a});
		for(db_r in this.OUTIDX){for(r=0;r<rem.length;r++){
			if(this.OUTIDX[db_r]>=rem[r]){this.OUTIDX[db_r]=this.OUTIDX[db_r]-1;}
		}	}
		//Insert titles
		this.O.unshift([]);for(c=0;c<COLS.length;c++){this.O[0].push(COLS[c].name)}
		//Clean grouped columns (they make no sense)
		let col=null;for(r=0;r<this.O.length;r++){
			for(col in window.current_groupes){if(window.current_groupes[col]=='ungrouped'){this.O[r][this.out_adapter[col.replace(/ /g,'').toLowerCase()]]='#--hide';}}
			this.O[r]=this.O[r].filter(function(value,index,arr){return value != '#--hide';});}
		this.OH=this.O.shift();
	},
	make_idx:function(db_row,j_row,j_adapter){var c;var k;var xx=[];
		//for(k in this.G){
			//if(this.G[k]=='grouped'){let kmin=k.toLowerCase();
		if(window.editItem){window.current_groupes=window.editItem.grouped;}else{window.current_groupes=this.G;}
		for(k in window.current_groupes){
			if(window.current_groupes[k]=='grouped'){let kmin=k.toLowerCase();				
				if(kmin=='canale'){xx.push(db_row.account_type);}
				else if(kmin=='formato'){xx.push(db_row.sp_o_sb);}
				else if(kmin=='mrk'){xx.push(db_row.marketplace);}
				else if(db_row[kmin]){xx.push(db_row[kmin]);}
				else if(j_adapter[this.tuplets[k]]){xx.push((j_row[j_adapter[this.tuplets[k]]])||'');}
		}	}return xx.join('-');},
	tuplets:{'Campaign':'campaignName','adGroup':'adGroupName','Canale':'account_type','Formato':'sp_o_sb',
		'keyword text':'keywordText','match Type':'matchType','targeting Expression':'targetingExpression',
		'targeting Text':'targetingText','targeting Type':'targetingType','sku':'sku','ASIN':'asin',
		'other ASIN':'otherAsin','currency':'currency'},
	OPS:{
		normal:function(db_row,j_row,out_r_idx,j_adapter,C,c_idx){let v=j_row[j_adapter[C.source_col||C.name.replace(/ /g,'')]];
			if(v){this.O[out_r_idx][c_idx]=v}},
		dbnormal:function(db_row,j_row,out_r_idx,j_adapter,C,c_idx){let v=db_row[C.source_col||C.name.replace(/ /g,'')];
			if(v){this.O[out_r_idx][c_idx]=v}},
		sum:function(db_row,j_row,out_r_idx,j_adapter,C,c_idx){let v=j_row[j_adapter[C.source_col]];
			if(j_adapter[C.source_col]){if(v){this.O[out_r_idx][c_idx]=this.O[out_r_idx][c_idx]+parseFloat(j_row[j_adapter[C.source_col]]);}}}},
	/* ------------------------------------------------------------------------------------------------------------------- */
	/* ------------------------------------------------------------------------------------------------------------------- */
	make_graph:function(gtype){var ok=false;var err=false;
		if(gtype=='bacon'){var x=this.OH[0];if((x=='year')||(x=='month')||(x=='2 weeks')||(x=='week')||(x=='day')){ok=true}
		else{err='A time grouping is necessary for the stream graph';}}else{ok=true;}
		if(ok){return new it3.data.Graph(this,gtype);}else{return {is_msg:true,msg:err}}
	},
	revert_groups:function(grouped,forceregroup){this.G=grouped;let bb=document.querySelectorAll('#'+this.ui.id+' .report-grouping');
		bb.forEach(e=>{e.classList.remove('disabled-chip');if(this.G[e.innerHTML]=='grouped'){e.classList.add('selected');}else{e.classList.remove('selected');}});
		if(forceregroup){this._regroup(true);}},
};

/* #################################################################################### */
/* #################################################################################### */
/* #################################################################################### */
/* #################################################################################### */

it3.data.Report=function(target){this.uid=it3.uid('rep');
	this.element=it3.ins(target,'div',['id',this.uid]);
	this.sources=[];this.pages=[];this.gitems=[];
	this.ui=null;this.ui_preview=null;
	this.content=null;
	this.current_page=false;this.current_source=false;this.current_gitem=false;
	this.init();};
it3.data.Report.prototype={
	init:function(){let _this=this;this.mode='edit';
		this.ui=it3.ins(this.element,'div',['class','report-ui']);
		this.report_menu=it3.ins(this.ui,'div',['class','report-menu'],it3.data.T.report_menu);
		let bb=document.querySelectorAll('#'+this.uid+' .it3-mb');
		bb.forEach(e=>{e.addEventListener('click',function(ev){_this.menu_button(ev)})});		
		this.sources_sel=document.querySelector('#'+this.uid+' .source-select');
		this.sources_sel.addEventListener('change',function(ev){_this.source_sel_handler(ev)});		
		this.brands_sel=document.querySelector('#'+this.uid+' .new-src-brand');
		this.rem_src_butt=document.querySelector('#'+this.uid+' .remove_source');
		this.rem_src_butt.addEventListener('click',function(ev){_this.rem_source(ev)});
		
		this.sources_ui=it3.ins(this.ui,'div',['class','report-sources']);
		this.ui_preview=it3.ins(this.element,'div');		
		this.ui_pages_nav=it3.ins(this.element,'div',['class','report-pages-nav']);		
		this.content=it3.ins(this.element,'div');
		this.add_page();
		window.ONPROFILES=function(data){for (d=0;d<data.length;d++){
			it3.ins(_this.brands_sel,'option',['value',data[d].id],data[d].display_name);
		}};
		var basicurl='https://xingu.tech/u/subprofiles?onload=ONPROFILES&mode=json&xtoken=%XTOKEN'.replace('%XTOKEN',encodeURIComponent('simpletoken'));
		it3.ins(document.head,'script',['src',basicurl]);
	},
	source_sel_handler:function(ev){
		var sv=ev.target.options[ev.target.selectedIndex].getAttribute('value');
		var se=document.querySelector('#'+this.uid+' .new-src-menu');		
		if(sv=='insert-new-src'){se.style.display='';this.rem_src_butt.style.display='none';}
		else{se.style.display='none';this.rem_src_butt.style.display='';this.select_source(ev);}
	},
	menu_button:function(ev){	
		var action=ev.target.innerHTML;
		if(action=='New...'){
			
		}else if(action=='Add page'){
			this.add_page(ev)
		}else if(action=='Remove page'){
			
		}else if(action=='Print'){
			window.print()
		}else if(action=='Table'){
			this.add_gitem('table');
		}else if(action=='XY graph'){
			this.add_gitem('chart-line');
		}else if(action=='Flux graph'){
			this.add_gitem('bacon');
		}else if(action=='Download Excel Tables'){
			//Download Excel Tables
			X.advReporting.download(ev);
		}else{			
			console.log('Unimplemented');	
			console.log(ev.target.innerHTML);
		}
	},
	/**/
	destroy:function(){for(let x=0;x<this.sources.length;x++){this.sources[x].destroy();}
		//todo:destroy grid
		it3.clearchilds(this.element);window.R=false;	
	},
	toggle_graph_buttons:function(edit){
		var idx=R.sources_sel.selectedIndex;var graph_buttons=R.sources_ui.children[idx].children;
		for(let gb_idx=0;gb_idx<graph_buttons.length-1;gb_idx++){			
			if(graph_buttons[gb_idx].localName!='span'){
				if(graph_buttons[gb_idx].disabled==true){graph_buttons[gb_idx].disabled=false;}
				else{graph_buttons[gb_idx].disabled=true;}
				if(graph_buttons[gb_idx].localName!='select'){graph_buttons[gb_idx].classList.toggle('advertising-reports-disaled-buttons');}
			}else{
				for(let c=0;c<graph_buttons[gb_idx].children.length;c++){
					graph_buttons[gb_idx].children[c].classList.toggle('disabled-chip');					
	}	}	}	},
	toggle_report_buttons:function(){
		if(R.sources_sel.disabled==true){R.sources_sel.disabled=false;}else{R.sources_sel.disabled=true;}
		var BB=document.querySelectorAll('advertising-reports-buttons');
		BB.forEach(function(b){if(b.disabled==true){b.disabled=false;}else{b.disabled=true;}b.classList.toggle('disabled')});		
		let page_nav=document.querySelectorAll('.page-thumb');
		page_nav.forEach((n)=>{if(n.disabled){n.disabled=false;n.children[1].disabled=false;}else{n.disabled=true;n.children[1].disabled=true;}})
	},
	/* SOURCES */
	add_source:function(name,data,oo){
		if(window.editItem){document.getElementById(window.editItem.id).click();}
		let i=new it3.data.ReportData(this,name,data,oo);		
		this.sources.push(i)-1;let _this=this;
		i.source_option=it3.ins(this.sources_sel,'option',['value',this.sources.length],name);
		let a=window.current_groupes;
		window.current_groupes=R.sources[R.sources.length-1].G;
		if(R.sources.length>1){window.current_groupes=a;}
		this.select_source({target:this.sources_sel});
		return i;},
	rem_source:function(ev,name){if(!name){name=this.current_source.name.toString();}		
		for(i=0;i<this.sources.length;i++){if(this.sources[i].name==name){
			this.sources_sel.removeChild(this.sources[i].source_option);
			this.sources[i].destroy();break;}}
		R.sources.splice(i,1);},	
	add_gitem:function(ghtype,sourcename){this.select_source(false,sourcename);
		var xx=this.current_source.make_graph(ghtype);
		if(xx.is_msg){console.log(xx.err);return false;}else{
			this.gitems.push(xx);var _this=this;
			setTimeout(function(){_this.select_gitem(false,xx)},300);
			return xx;}},
	_remove_gitem:function(id){var gx=0;var XI;	/*only called by buttons*/		
		for(var gx=0;gx<this.gitems.length;gx++){if(this.gitems[gx].gitem.id==id){XI=this.gitems[gx];break;}}
		if(XI==this.current_gitem){this.unselect_all();this.current_gitem=false;}XI.destroy(false);this.gitems.splice(gx,1);},
	unselect_all:function(){
		let oo=document.querySelectorAll('.chart_times,.highcharts-button-symbol,.highcharts-button-box,.dt-buttons,.dataTables_filter');
		oo.forEach(function(o){o.style.display='none'});
		oo=document.querySelectorAll('.dataTables_wrapper');oo.forEach(function(o){o.style.top='0'});	
		oo=document.querySelectorAll('#'+this.uid+' .report-grouping');oo.forEach(e=>{e.classList.add('disabled-chip');});	
		for(var i=0;i<this.gitems.length;i++){			
			if(this.gitems[i].ghtype=='chart-line'){
				for(var s=0;s<this.gitems[i].xobj.series.length;s++){
					oo=this.gitems[i].xobj.series[s].options;oo.showInLegend=false;
					this.gitems[i].xobj.series[s].setOptions(oo);
				}this.gitems[i].xobj.legend.update();
	}	}	},
	select_gitem:function(id,_gitem,keep_selection){var gid='';if(this.current_gitem){gid=this.current_gitem.gitem.id;}
		if(!_gitem){for(var gx=0;gx<this.gitems.length;gx++){
			if(this.gitems[gx].gitem.id==id){this.current_gitem=this.gitems[gx];break;}}
		}else{this.current_gitem=_gitem}
		if(this.current_gitem){
			if(gid==this.current_gitem.gitem.id){
				if(!keep_selection){this.unselect_all();this.current_gitem=false;}
			}else{gid=this.current_gitem.gitem.id;
				this.unselect_all();
				var selector='# .chart_times,# .highcharts-button-symbol,# .highcharts-button-box,# .dt-buttons,# .dataTables_filter';
				selector=selector.replace(/#/g,'#'+gid);oo=document.querySelectorAll(selector);oo.forEach(function(o){o.style.display=''});				
				oo=document.querySelectorAll('# .dataTables_wrapper'.replace(/#/g,'#'+gid));oo.forEach(function(o){o.style.top='35px'});				
				oo=document.querySelectorAll('#'+this.uid+' .report-grouping');oo.forEach(e=>{e.classList.remove('disabled-chip');});	
				this.select_page(false,this.current_gitem.page);
				this.select_source(false,false,this.current_gitem.source);
				this.current_source.revert_groups(this.current_gitem.grouped);
				document.getElementById(this.current_gitem.gitem.id).previousSibling.style.display='';
				if(this.current_gitem.xobj.series){
				for(var s=0;s<this.current_gitem.xobj.series.length;s++){
					oo=this.current_gitem.xobj.series[s].options;oo.showInLegend=true;
					this.current_gitem.xobj.series[s].setOptions(oo);}
				this.current_gitem.xobj.legend.update();}
			}			
		}else{this.unselect_all();this.current_gitem=false;}
	},
	select_page:function(id,_page){console.log(id);if(!_page){
		for(var gx=0;gx<this.pages.length;gx++){
			if(this.pages[gx].id==id){
				this.current_page=this.pages[gx];
				break;
		}	}	}else{this.current_page=_page}
		this.current_page.element=document.getElementById(this.current_page.id);
		var pp=document.querySelectorAll('.report-page');
		pp.forEach(function(e){e.style.display=(e.id==id)?'':'none'});
		if(this.current_page.element){
		this.current_page.element.style.display='';
		pp=document.querySelectorAll('.page-thumb');
		pp.forEach(function(e){e.classList.remove('selected')});
		this.current_page.thumb.classList.add('selected');}
	},
	select_source:function(ev,name,_source){var idx=-1;if(_source){this.current_source=_source}
		else if(ev){if(typeof ev.target!='number'){idx=ev.target.options[ev.target.selectedIndex].getAttribute('value');}else{idx=ev.target;}
			this.current_source=this.sources[idx-1];}
		else if(name){for(var gx=0;gx<this.sources.length;gx++){
			if(this.sources[gx].name==name){this.current_source=this.sources[gx];break;}}}
		if(!this.current_source){if(this.sources.length>0){this.current_source=this.sources[0];}else{console.log('No source to select')}}
		if(this.current_source){
			var xx=document.querySelectorAll('.report-source-ui');xx.forEach(function(elm){elm.style.display='none'});
			this.current_source.ui.style.display='';
		}else{
			this.sources_sel.selectedIndex=0;
			this.source_sel_handler({target:this.sources_sel});
		}				
	},
	add_page:function(){var id=this.uid+it3.uid('pid');
		var E=it3.ins(this.content,'div',['id',id,'class','report-page'],it3.data.T.vuegrid);
		var G=new Vue({el:E,
			data:{draggable:true,resizable:true,index:0,layout:[]},
			methods:{
				itemTitle:function(item){var result=item.i;if(item.static){result+=" - Static";}return result;},				        
				removeItem:function(item){R._remove_gitem(item.id);this.layout.splice(this.layout.indexOf(item),1);},
				editItem:function(item,event){
					if(!event.target.classList.contains('dt-button')){if(!event.target.parentElement.classList.contains('dt-button')){
						R.select_gitem(item.id);
				}}},
				addItem:function(obj){var c;
				
				
				
				
				//var sel=document.getElementById('source-select').selectedOptions[0].innerHTML;			
				



				var item={"x":obj.x,"y":obj.y,"w":obj.w,"h":obj.h,"i":this.index+"","id":it3.uid('gid')/*,"metrics":obj.metrics,"grouped":obj.grouped,"source":sel,"metric_type":obj.metric_type*/};
					this.index++;this.layout.push(item);
					return item;},
				resizedEvent:function(i, newX, newY, newHPx, newWPx){	
					for(let x=0;x<this.layout.length;x++){if(this.layout[x].i==i){
						R.select_gitem(this.layout[x].id,false,true);
						if(R.current_gitem.xobj.reflow){R.current_gitem.xobj.reflow();}
						sleep(250).then(()=>{R.current_gitem.xobj.reflow();sleep(1000).then(()=>{R.current_gitem.xobj.reflow();});});
		}	}	}	}	});
		let pthumb=it3.ins(this.ui_pages_nav,'div',['id',id+'-page-ref','class','page-thumb'],);
		it3.ins(pthumb,'span',[],'Page '+(this.pages.length+1));
		let idx=this.pages.push({id:id,title:'Page '+(this.pages.length+1),element:E,thumb:pthumb,grid:G})-1;
		let self=this;//this.template.push({'page':(this.pages.length),'sources':[],'current_page':false});
		pthumb.addEventListener('click',function(ev){self.select_page(id)});
		let r=it3.ins(pthumb,'button',['id',id+'remove-page-button','class','mdc-icon-button material-icons'],'clear');
		r.addEventListener('click',function(ev){self.remove_page(ev,id)});
		this.select_page(id);},
		
	remove_page:function(ev,id){let p;let i;ev.stopPropagation();
			for(p=0;p<R.pages.length;p++){if(id==R.pages[p].element.id){break;}}			
			var pelm=R.pages[p].element;let p_elm=pelm.parentElement;			
			//let n=p_elm.children.indexOf(elm)+1;
			for(i=0;i<R.pages[p].grid.layout.length;i++){
				let item=R.pages[p].grid.layout[i];
			
				var elm=document.getElementById(item.id);
				if(elm){elm.parentElement.removeChild(elm);}				
				item.obj.destroy();
			}p_elm.removeChild(pelm);
			//if(p==R.pages.length-1 && R.pages.length!=1){R.show_page(R.pages[p-1].element.id);}			
			for(let h=p;h<R.pages.length-1;h++){R.pages[h]=R.pages[h+1];}
			R.pages.pop();			
			let page_nav=document.querySelectorAll('.page-thumb');
			for(i=0;i<R.pages.length;i++){R.pages[i].title='Page '+(i+1);page_nav[i].firstChild.innerHTML='Page '+(i+1);}
			if(R.pages.length==0){R.add_page();}
	},
	/* ########################################################################################################################################## */
	
	
	/*LOAD - SAVE*/
	toJSON:function(){
		var JOUT={sources:[],pages:[]};var s=0;var gi=0;
		for(s=0;s<this.sources.length;s++){JOUT.sources.push({name:this.sources[s].name,D:this.sources[s].D,oo:this.sources[s].oo,selection_info:this.sources[s].selection_info});}
		for(s=0;s<this.pages.length;s++){JOUT.pages[s]=[];
			for(gi=0;gi<this.pages[s].grid.layout.length;gi++){if(true){
				JOUT.pages[s].push({x:this.pages[s].grid.layout[gi].x,y:this.pages[s].grid.layout[gi].y,w:this.pages[s].grid.layout[gi].w,h:this.pages[s].grid.layout[gi].h,
				sname:this.pages[s].grid.layout[gi].source,gruping:this.pages[s].grid.layout[gi].grouped,
				gtype:this.pages[s].grid.layout[gi].obj.xtype,goo:''});
			}}
		}
		return JOUT;
	},fromJSON:function(target,JIN){
		
	},
};


it3.data.ReportTemplate=function(){
	this.items={};/*{customeroverride(because normal is set at creation),from_exp,to_exp,template,viz:[{G:'grouping...',viztype,vizopts,pageandgridstyle}]}<button @click="editItem(item)" class="chart_times" style="position:absolute;left:50%;">EDIT</button>*/
};

it3.data.T={vuegrid:`<grid-layout :layout="layout"
                         :col-num="12"
                         :row-height="30"
                         :is-draggable="draggable"
                         :is-resizable="resizable"
                         :vertical-compact="true"
                         :use-css-transforms="true" >
<grid-item v-for="item in layout" :key="item.id"
	   :static="item.static"
	   :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i"
	   @resize="resizedEvent"
	   drag-ignore-from="th"
><button @click="removeItem(item)" class="chart_times fa fa-times"></button><div v-bind:id="item.id" @click="editItem(item,event)" class="report-viz">
</div></grid-item></grid-layout>`,
	report_menu:`<div class="form-inline"><div style="display:inline-block;">
<button class="btn btn-sm btn-primary dropdown-toggle waves-effect waves-light" type="button" data-toggle="dropdown"
  aria-haspopup="true" aria-expanded="false">File</button>
<div class="dropdown-menu">
  <a class="it3-mb dropdown-item" href="#">New...</a>
  <a class="it3-mb dropdown-item" href="#">Open...</a>
  <a class="it3-mb dropdown-item" href="#">Save...</a>
  <a class="it3-mb dropdown-item" href="#">Download Xingu Report</a>
  <a class="it3-mb dropdown-item" href="#">Download Excel Tables</a>
  <a class="it3-mb dropdown-item" href="#">Print</a>
  <a class="it3-mb dropdown-item" href="#">Preview</a>
  <div class="dropdown-divider"></div>
  <a class="it3-mb dropdown-item" href="#">Separated link</a>
</div></div><div style="display:inline-block;">
<button class="btn btn-sm btn-primary dropdown-toggle waves-effect waves-light" type="button" data-toggle="dropdown"
  aria-haspopup="true" aria-expanded="false">Page</button>
<div class="dropdown-menu rmenu_page-menu">
  <a class="it3-mb dropdown-item" href="#">Add page</a>
  <a class="it3-mb dropdown-item" href="#">Clone current</a>
  <a class="it3-mb dropdown-item" href="#">Remove current</a>
  <div class="dropdown-divider"></div>
  <a class="it3-mb dropdown-item" href="#">Separated link</a>
</div></div><div style="display:inline-block;">
<button class="btn btn-sm btn-primary dropdown-toggle waves-effect waves-light" type="button" data-toggle="dropdown"
  aria-haspopup="true" aria-expanded="false">Insert</button>
<div class="it3-mb dropdown-menu rmenu_page-menu">
  <a class="it3-mb dropdown-item" href="#">Text element</a>
  <a class="it3-mb dropdown-item" href="#">Table</a>
  <a class="it3-mb dropdown-item" href="#">XY graph</a>
  <a class="it3-mb dropdown-item" href="#">Flux graph</a>
  <a class="it3-mb dropdown-item" href="#">Cake graph</a>
  <a class="it3-mb dropdown-item" href="#">Bubble graph</a>
  <div class="dropdown-divider"></div>
  <a class="it3-mb dropdown-item" href="#">Remove selected item</a>
</div>
<select class="source-select form-control">
	<option value="insert-new-src">Add source...</option>
	<option value="iVv">Add source...</option>
</select><button style="display:none" class="remove_source btn btn-sm btn-outline-white waves-effect waves-light" type="button"><i class="fa fa-times"></i></button>
</div>
<div class="new-src-menu form-inline" style="margin-left:8px;">
<select class="new-src-brand form-control mr-sm-2" style="width:150px">
</select>
<select class="new-src-type form-control mr-sm-2">
	<option value="-w6" selected="selected">6 Weeks</option>
	<option value="-w12">12 Weeks</option>
	<option value="-w24">24 Weeks</option>
	<option value="curr-y">Current Year</option>
	<option value="prev-y">Previous Year</option>
	<option value="q1">Q1</option>
	<option value="q2">Q2</option>
	<option value="q3">Q3</option>
	<option value="q4">Q4</option></select>
<select class="new-src-type form-control mr-sm-2"><option value="" disabled=""></option><option value="adGroup">AdGroup</option><option value="keyword">Keyword</option><option value="campaign">Campaign</option><option value="targets">Targets</option><option value="productAd">ProductAd</option><option value="otherAsin">OtherAsin</option></select>
<button class="btn btn-outline-white btn-sm waves-effect waves-light">Add</button></div></div>`,
};

//NEW-OPEN-FROM-TEMPLATE-EXPORT
//SOURCES-ADDSOURCE-SAVE-PREVIEW-ADDPAGE-REMPAGE



/*
window.NS={};
NS.Bottiglia=function(target){this.name='B';this.cc='';this.target=target;this.init()}
NS.Bottiglia.prototype={
	init(){
		this.button=it3.ins(document.body,'div',[],'ciao');
		var gh=this.resized;let _this=this;
		elm.addEventListener('click',function(ev){_this.resized(ev)});
	},
	get_name:function(){return this.name},
	get_fake:function(){return 'ciao'},
	resized:function(ev){
		console.log(ev);
		console.log(this.get_fake());
	}
};
var T= new Bottiglia();*/




/*
async function AT(a,b){
	await sleep(3000);
	return (a+b);
};
var c=await AT(1,1);
console.log(c);
*/




/* ------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------- */

