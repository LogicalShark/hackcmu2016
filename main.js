function tableInsert(num)
{
	var myFirebaseRef = new Firebase("https://maple-6845a.firebaseio.com/");
	for(var n=0; n<6; n++)
	{
		myFirebaseRef.child("worldID/"+n+"data/table/").on("value", function(snapshot) {
			for(var x = 0; x<num; x++)
			{
				var time = snapshot.val()[x][0];
				var image = "http://maplestory.io"+snapshot.val()[x][1];
				var name = snapshot.val()[x][2];
				var price = snapshot.val()[x][3];
				var world = snapshot.val()[x][4];

				var table = document.getElementById("table");
				var row = table.insertRow(1);
				var c0 = row.insertCell(0);
				c0.innerHTML = "<img src='"+image+"' height:35px width:35px> "+name;
				var c1 = row.insertCell(1);
				c1.innerHTML = price+"";
				var c2 = row.insertCell(2);
				c2.innerHTML = world+"";
				var c3 = row.insertCell(3);
				c3.innerHTML = time+"";
				var c4 = row.insertCell(4);
				c4.innerHTML = "<span onclick='this.parentElement.parentElement.style.display=\"none\"' class='w3-closebtn w3-padding w3-margin-right w3-medium'>X</span>"
			}
		});
	}
}
function barsInsert()
{
	var myFirebaseRef = new Firebase("https://maple-6845a.firebaseio.com/");
	avgs = [0,0,0,0,0,0];
	worlds=["Scania","Windia","Bera","Khroa","MYBCKN","GRAZED"];
	// for(var n=0; n<6; n++)
	// {
	// 	myFirebaseRef.child("worldID/"+n+"data/stability/").on("value", function(snapshot) {
	// 		var world = snapshot.val()[0][1];
	// 		var avg = snapshot.val()[0][2];
	// 		var dev = snapshot.val()[0][3];
	// 		avgs[n] = avg;
	// 	});
	// 	alert("avgs " + n + " is " + avgs[n]);
	// }
	// for(var o=0; o<6; o++)
	// {
	// 	avgs[o] = document.getElementById(worlds[o]+"dum").innerHTML;
	// 	alert(avgs[o]+" avgs " + o);
	// }
	for(var m=0; m<6; m++)
	{
		myFirebaseRef.child("worldID/"+m+"data/stability/").on("value", function(snapshot) {
			var name = snapshot.val()[0][0];
			var world = snapshot.val()[0][1];
			var avg = snapshot.val()[0][2];
			var dev = snapshot.val()[0][3];
			var bar = document.getElementById(world);
			var bar2 = document.getElementById(world+"dev");
			var barmax = 50000;
			avg = 100*(avg/barmax);
			dev = 100*(dev/barmax);
			oavg = avg;
			odev = dev;
			if(oavg>100)
				avg = 100;
			if(odev>100)
				dev = 100;
			bar.style="width:"+avg+"%";
			var text = document.getElementById(world+"text");
			text.innerHTML="Average Price:"+Math.round(oavg*barmax/100);
			bar2.style="width:"+dev+"%";
			var text2 = document.getElementById(world+"textdev");
			text2.innerHTML="StdDev:"+Math.round(odev*barmax/100);
			if(odev==0)
			{
				text2.innerHTML="StdDev:0";
			}
		});
	}
}
// var time;
// var image;
// var name;
// var price;
// var world;
