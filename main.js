var myFirebaseRef = new Firebase("https://maple-6845a.firebaseio.com/");
for(var n 0; n<5; n++)
{
	myFirebaseRef.child("worldId/0Data/Table/").on("value", function(snapshot) {
		for(var x = 0; x<10; x++)
		{
			var time = snapshot.val()[x][0];
			var image = snapshot.val()[x][1];
			var name = snapshot.val()[x][2];
			var price = snapshot.val()[x][3];
			var world = snapshot.val()[x][4];
			var table = document.getElementById("table");
			var row = insertRow
			document.createElement("TR" "<td><img src='"+image+"' height:35px width:35px>"+name+"</td>     <td>"+price+"</td>      <td>"+world+"</td>      <td>"+time+"</td>      <td><span onclick='this.parentElement.parentElement.style.display='none'' class='w3-closebtn w3-padding w3-margin-right w3-medium'>X</span></td>"
		}
	});
}
// var time;
// var image;
// var name;
// var price;
// var world;
