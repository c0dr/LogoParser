#LogoParser

##About
This is a nodejs app which allows you to parse logos from most of the websites on the web.
It has a simple http api, which allows you to retrieve the logos very easily.

It was created at the Data Münster Hackathon, which was supported by Intuit, in just a few hours so the code might need some cleanup :)

It works for about 80-90% of the pages of the web. The others need some work, the code is there but JSom behaves a bit strange. In the hackathon it was supposed to be a python script, which does machine learning on all of the images on the page.

##Use
`git clone https://github.com/c0dr/LogoParser.git`

`npm install`

`node logos.js //Start the server `

The server then listens at localhost:1337. With ?url=xyz. you can specify the url to parse. The server will then return the logo url. If no logo can be found, it shows a placeholder image.

##License
MIT

