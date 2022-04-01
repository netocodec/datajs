# DataJS


### Current Version: 1.0

------------

#### Features

- Virtual DOM
- Value
- FOR loop


------------

### About this project

**DataJS** is was created to give some tools for the developers to use at maximum the HTML and CSS using only tags and atributtes.

Everything you need is just some code to show the data for you.
This libary does not require any other third-party libaries.


#### Example

```html
<html>
	<head>
		<title>DataJS Demo</title>
	</head>

	<body>
		<div data-for
			 data-fields="gender;`-`;name.title;name.first;name.last"
			 data-request-url="https://randomuser.me/api/"
			 data-request-method="GET"
			 data-request-value="results">
		</div>

		<div data-image="https://wallpapercave.com/wp/6xVGpvY.png"></div>

		<br>
		<div data-value="`Full Username: `;results[0].name.title;`. `;results[0].name.first;` `;results[0].name.last" data-request-url="https://randomuser.me/api/" data-request-method="GET">
		</div>

		<script src="datajs/main.min.js" type="text/javascript"></script>
		<script>
			new DataJS();
		</script>
	</body>
</html>
```

#### Documentation

[DataJS Documentation](https://netocodec.github.io/datajs/ "DataJS Documentation")

#### Warning

This project is new yet, it still needs some improvements.



------------

**File updated on: 01/04/2022**

