---
title: "Spacing"
layout: "docs"
menu:
  docs:
    parent: "patterns"
---
# Spacing!

Margins and Paddings.fsf

{{< code lang="markup" >}}
<!DOCTYPE html>
<html lang="en">
<head>

<script>
	// Just a lil’ script to show off that inline JS gets highlighted
	window.console && console.log('foo');
</script>
<meta charset="utf-8" />
<link rel="shortcut icon" href="favicon.png" />
<title>Prism</title>
<link rel="stylesheet" href="style.css" />
<link rel="stylesheet" href="themes/prism.css" data-noprefix />
<script src="prefixfree.min.js"></script>

<script>var _gaq = [['_setAccount', 'UA-33746269-1'], ['_trackPageview']];</script>
<script src="https://www.google-analytics.com/ga.js" async></script>
</head>
<body>
{{< /code >}}

{{< code lang="css" >}}
@import url(http://fonts.googleapis.com/css?family=Questrial);
@import url(http://fonts.googleapis.com/css?family=Arvo);

@font-face {
	src: url(http://lea.verou.me/logo.otf);
	font-family: 'LeaVerou';
}

/*
 Shared styles
 */

section h1,
#features li strong,
header h2,
footer p {
	font: 100% Rockwell, Arvo, serif;
}

/*
 Styles
 */

* {
	margin: 0;
	padding: 0;
	font-weight: normal;
}

body {
	font: 100%/1.5 Questrial, sans-serif;
	tab-size: 4;
	hyphens: auto;
}

a {
	color: inherit;
}
{{< /code >}}
