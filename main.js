var myFirebaseRef = new Firebase("https://maple-6845a.firebaseio.com/");
myFirebaseRef.child("location/city").on("value", function(snapshot) {
  alert(snapshot.val());  // Alerts "San Francisco"
});
<!--<tr>
      <td><img src="url" height:35px width:35px>name</td>
      <td>price</td>
      <td>world</td>
      <td>time</td>
      <td><span onclick="this.parentElement.parentElement.style.display='none'" class="w3-closebtn w3-padding w3-margin-right w3-medium">X</span></td>
    </tr>
 -->  