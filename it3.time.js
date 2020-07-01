it3.time={
	monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
	
	parseYear:function(v,_defaultyear){
		
	},
	parseMonth:function(v,_defaultyear){
		
	},
	parseDay:function(v,_defaultyear,_defaultmonth){
		if(typeof v=='object'){
			if(a instanceof Date){
				
			}
		}else if(typeof v=='string'){
			
		}else if(typeof v=='number'){
			
		}
	},
	setzerotime:function(d){d.setHours(0);d.setMinutes(0);d.setSeconds(1);},
	setfulltime:function(d){d.setHours(23);d.setMinutes(59);d.setSeconds(59);},
	monthstarter:function(d){while(d.getDate()!=1){d.setDate(d.getDate()-1);}},
	weekstarter:function(d,f){while(d.getDay()!=parseInt(f)){d.setTime(it3.data.sane.backtime(d,-1));}},
	default_weekstart:1;
};

it3.data.sane={
	backtime:function(a,b){var day=(24*3600*1000);return (a.getTime()-day*b);},
	setdmdm:function(ds,Ds,Ms,de,De,Me){ds.setMonth(Ms,Ds);de.setMonth(Me,De);},
	get:function(sel){let flag=sel.indexOf(':')>-1;
		let a=flag?sel.split(':')[0]:sel[0];let b=flag?sel.split(':')[1]:sel[1];
		var st=new Date();var ed=new Date()
		if(this.op[a]){sel=sel.substr(1);
			if(typeof this.op[a]=='function'){this.op[a](b,st,ed)}
			else if(this.op[a][b]){sel=sel.substr(1);this.op[a][b](sel,st,ed);}}
		else{console.log('No sane function')}
		this.setzerotime(st);this.setfulltime(ed);return {s:st,e:ed};},
	op:{'-':{'d':function(c,s,e){s.setDate(s.getDate()-parseInt(c))},
			'w':function(c,s,e){s.setTime(it3.data.sane.backtime(s,7*parseInt(c)));it3.data.sane.weekstarter(s,it3.data.weekstart);it3.data.sane.weekstarter(e,it3.data.weekstart);e.setDate(e.getDate()-1)},
			'm':function(c,s,e){s.setMonth(s.getMonth()-(parseInt(c)%12));s.setFullYear(s.getFullYear()-(Math.trunc(parseInt(c)/12)));it3.data.sane.monthstarter(s);
				it3.data.sane.monthstarter(e);e.setDate(e.getDate()-1)},
			'M':function(c,s,e){s.setMonth(s.getMonth()-(parseInt(c)%12));s.setFullYear(s.getFullYear()-(Math.trunc(parseInt(c)/12)));it3.data.sane.monthstarter(s);
								e.setMonth(e.getMonth()-(parseInt(c)%12)+1);e.setFullYear(e.getFullYear()-(Math.trunc(parseInt(c)/12)));it3.data.sane.monthstarter(e);
								e.setDate(e.getDate()-1);},
			'y':function(c,s,e){it3.data.sane.setdmdm(s,1,0,e,31,11);s.setFullYear(s.getFullYear()-parseInt(c));e.setFullYear(s.getFullYear());},
			't':function(c,s,e){s.setMonth(s.getMonth()-((parseInt(c)*3)%12));s.setFullYear(s.getFullYear()-(Math.trunc((parseInt(c)*3)/12)));},
			'q':function(c,s,e){s.setMonth(s.getMonth()-((parseInt(c)*4)%12));s.setFullYear(s.getFullYear()-(Math.trunc((parseInt(c)*4)/12)));},
			's':function(c,s,e){s.setMonth(s.getMonth()-((parseInt(c)*6)%12));s.setFullYear(s.getFullYear()-(Math.trunc((parseInt(c)*6)/12)));},},
		'c':{
			'q':function(c,s,e){let t;if(!c){c=1}it3.data.sane.setdmdm(s,1,3*(c-1),e,1,3*(c-1)+3);e.setDate(e.getDate()-1);},
		},p:{
			'q':function(c,s,e){let t;s.setFullYear(s.getFullYear()-1);e.setFullYear(e.getFullYear()-1);if(!c){c=1}it3.data.sane.setdmdm(s,1,3*(c-1),e,1,3*(c-1)+3);e.setDate(e.getDate()-1);},
		}
		,'d':function(c,s,e){s.setDate(1);s.setMonth(0);s.setTime(it3.data.sane.backtime(s,-parseInt(c)+1));e.setTime(it3.data.sane.backtime(s,-1));},
		'w':function(c,s,e){it3.data.sane.setdmdm(s,1,0,e,1,0);it3.data.sane.weekstarter(s,it3.data.weekstart);
				s.setTime(it3.data.sane.backtime(s,(1-parseInt(c))*7));e.setTime(it3.data.sane.backtime(s,-7));},
		'm':function(c,s,e){it3.data.sane.setdmdm(s,1,parseInt(c)-1,e,1,parseInt(c));},
		't':function(c,s,e){c=parseInt(c);if(c==1){it3.data.sane.setdmdm(s,1,0,e,1,3);}
				else if(c==2){it3.data.sane.setdmdm(s,1,3,e,1,6);}
				else if(c==3){it3.data.sane.setdmdm(s,1,6,e,1,9);}
				else if(c==4){it3.data.sane.setdmdm(s,1,9,e,1,0);e.setFullYear(e.getFullYear()+1);}},
		'q':function(c,s,e){c=parseInt(c);if(c==1){it3.data.sane.setdmdm(s,1,0,e,1,4);}
				else if(c==2){it3.data.sane.setdmdm(s,1,4,e,1,8);}
				else if(c==3){it3.data.sane.setdmdm(s,1,8,e,1,0);e.setFullYear(e.getFullYear()+1);}},
		'fw':function(arg,s,e){},
		's':function(arg,s,e){
				if(arg[0]=='1'){it3.data.sane.setdmdm(s,1,0,e,1,6);}
				else{it3.data.sane.setdmdm(s,1,6,e,1,0);e.setFullYear(s.getFullYear()+1);}},
		'x':function(arg,s,e){
			if(arg=='n'){
				s.setFullYear(2019);
				e.setFullYear(2019);
				it3.data.sane.setdmdm(s,1,10,e,1,12);
			}},
}	};