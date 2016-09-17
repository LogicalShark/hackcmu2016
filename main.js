function tableInsert(var num)
{
	var myFirebaseRef = new Firebase("https://maple-6845a.firebaseio.com/");
	for(var n=0; n<5; n++)
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
		myFirebaseRef.child("worldId/"+n+"Data/Stability/").on("value", function(snapshot) {
			var stability = document.getElementById("table");
		});

	}
}
// var time;
// var image;
// var name;
// var price;
// var world;
