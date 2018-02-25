var channel;
function f(id){
	return document.querySelector(id);
}

function auth(){
	if(f('#in').value){
		localStorage.setItem('cname', f('#in').value);
		location.href="";
		
	}else{
		f('#in').style.borderColor= "red";
	}
}

function which(){
	var  rea= localStorage.getItem('cname');
	if(rea){
		Pusher.logToConsole = true;
		var pusher = new Pusher('e6a821f2402fdaa0e1ff', {
			authEndpoint: 'auth.php',
			cluster: 'eu',
			encrypted: true
		});

		channel = pusher.subscribe('private-mychannel');
		channel.bind('myevent', function(data) {
			var dat= JSON.parse(localStorage.getItem('dat'));
			if(!dat){
				dat=[];
			}
			dat.push({name:""+data.name, idea:""+data.idea});
			localStorage.setItem('dat', JSON.stringify(dat));
			//location.href="";
			outAll();
		});
		f('.logmain').style.display="none";
		f('.hw').innerHTML= rea;
		outAll();
	}else{
		f('.inmain').style.display="none";
	}
}

function outAll(){
	var dat= JSON.parse(localStorage.getItem('dat'));
	var  rea= localStorage.getItem('cname');
	if(dat){
		var acc="";
		dat.map(function(item){
			if(typeof(item)!="undefined"){
				if(item.name==rea){
					acc=acc+ '<div align="right"><article class="art2" align="right">'+ item.idea +	'</article></div>';
				}else{
					acc=acc+ '<article class="art1"><span>'+ item.name +' </span>'+ item.idea +'</article>';
				}
			}
		})
		f('#disp').innerHTML=acc;
	}
}

function triggerItem(){
	var ing= f('#inq').value;
	var  rea= localStorage.getItem('cname');
	var dat= JSON.parse(localStorage.getItem('dat'));
	if(!dat){
		dat=[];
	}
	if(ing){
		
		var triggered = channel.trigger('client-myevent', { name: rea, idea:ing });
		dat.push({name:""+rea, idea:""+ing});
		localStorage.setItem('dat', JSON.stringify(dat));
		f('#inq').value="";
		f('#inq').focus();
		outAll();
	}
}

function conn(){
	Pusher.logToConsole = true;
		var pusher = new Pusher('e6a821f2402fdaa0e1ff', {
			authEndpoint: 'auth.php',
			cluster: 'eu',
			encrypted: true
		});

		var channel = pusher.subscribe('private-mychannel');
		channel.bind('myevent', function(data) {
			var dat= JSON.parse(localStorage.getItem('dat'));
			if(!dat){
				dat=[];
			}
			dat.push({name:""+data.name, idea:""+data.idea});
			localStorage.setItem('dat', JSON.stringify(dat));
			//location.href="";
		});
}

function logout(){
		localStorage.removeItem('cname');
		localStorage.removeItem('dat');
		location.href="";
}
