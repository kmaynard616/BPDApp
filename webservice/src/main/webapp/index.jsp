<html>
<body>
<h2>Choose file to upload</h2>
<form action="http://localhost:8080/webservice/v1/bpd/upload" method="post" enctype="multipart/form-data">
	<input name="file" id="filename" type="file" /><br><br>
	<p>message ID: <input type="text" name="messageId" size="10" /></p>
	<button name="submit" type="submit">Upload</button>
</form>
</body>
</html>
