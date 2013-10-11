// JavaScript Document
function set(name,cursel,n){
	for(i=1;i<=n;i++){
		var menu=document.getElementById(name+i);
		var con=document.getElementById(name+"_"+i);
		menu.className=i==cursel?"navhover":""
		con.style.display=i==cursel?"block":"none";
	} 
}
function setOther(name,cursel,n){
	for(i=1;i<=n;i++){
		var menu=document.getElementById(name+i);
		var con=document.getElementById(name+"_"+i);
		var other=document.getElementById(name+"_o"+i);
		menu.className=i==cursel?"navhover":""
		//con.style.display=i==cursel?"block":"none";
		other.style.display=i==cursel?"none":"none";
	} 
}
 
 