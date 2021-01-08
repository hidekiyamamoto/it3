it3.dowloadbig=function(data,fn){
	let fileStream=streamSaver.createWriteStream(fn);
	let writer = fileStream.getWriter();
	let encoder=new TextEncoder();
	let uint8array = encoder.encode(JSON.stringify(data) + "\n\n");
	writer.write(uint8array);
	writer.close();};
it3.data={
	sleep:function(milliseconds)=>{return new Promise(resolve => setTimeout(resolve, milliseconds));},
	is_dbnull:function(v){
		if(v==undefined){return true}
		if(v==null){return true}
		if(v==0){return true}		
		//if(v=='0'){return true}
		//if(v=='-'){return true}
		//if(v=='NA'){return true}
		return false
	},
	pad:function(num,size){var s=num+"";while(s.length<size){s="0"+s;}return s;},
	formatLocal:function(num){let s=num.toLocaleString('IT-it');let x=s.indexOf(',');if((x==s.length-2)&&(x>-1)){s=s+'0'}return s;},
	formatLocalInt:function(num){num=Math.round(num);return num.toLocaleString('IT-it');},
	formatLocalFloat:function(num){return num.toLocaleString('IT-it', {minimumFractionDigits: 2});},
	formatPerc:function(num){return parseFloat(num).toLocaleString('IT-it')+'%';},
	formatVal:function(num,mrk){let symb='€';
		if((mrk=='IT')||(mrk=='ITA')||(mrk=='ES')||(mrk=='ESP')||(mrk=='FR')||(mrk=='FRA')||(mrk=='DE')||(mrk=='DEU')){symb='€'}
		else if((mrk=='UK')||(mrk=='GBR')){symb='£'}
		else if((mrk=='US')||(mrk=='USA')){symb='$'}
		if(typeof num=='string'){num=parseFloat(num);}
		return num.toLocaleString('IT-it', {minimumFractionDigits: 2})+symb;
	},
	removeFormat:function(v){if(typeof v==='string'){return (v.replace('%','').replace('€','').replace(/£/g,'').replace(/\$/g,'').replace(/\./g,'').replace(',','.')*1);}
		else if(typeof v==='number'){return v}else{return 0;}
	},
};
it3.data.weekstart=1;