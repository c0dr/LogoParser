#LogoParser

##About
This is a nodejs app which allows you to parse logos from most of the websites on the web.
It has a simple http api, which allows you to retrieve the logos very easily.

It was created at the Data Münster Hackathon, which was supported by Intuit, in just a few hours so the code might need some cleanup :)

It works for about 80-90% of the pages of the web. The others need some work, the code is there but JSom behaves a bit strange. For the demo we used a different script which goes a step further. Using machine learning we go through all images of the page to see which image is most likely the logo.

##Use
`git clone https://github.com/c0dr/LogoParser.git`

`npm install`

`node logos.js //Start the server `

The server then listens at localhost:1337. With ?url=xyz. you can specify the url to parse. The server will then return the logo url. If no logo can be found, it shows a placeholder image.

##License
MIT

