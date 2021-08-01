# Honestly

It’s time for us to do business and consume, Honestly.

## Contents

1. [Whats's the Problem?](#what's-the-problem?)
2. [Solution](#solution)
3. [Video](#video)
4. [Repo Breakdown](#repo-breakdown)
5. [Architectural Diagram](#architectural-diagram)
6. [Technology](#technology)
7. [Getting started](#getting-started)
8. [License](#license)

## What's the Problem?

Despite a growing demand from consumers for ethical, sustainable and transparent business practices, there exists no simple and effective means to reliably display how businesses operate. Thus, consumers are unable to easily identify and avoid practices that they may disagree with. This problem has been proliferated throughout covid, particularly with the rise in online shopping. 

For example, Anna, one of the young online shoppers we interviewed, was horrified to find out that his regular online purchases might support modern slavery, water wastage or excessive carbon emission. Yash is not alone, and as the global material footprint rose nearly 18 percent from 2010 to 2017 (UN), supply chain management is a bigger problem now than ever before. 


## Solution
### The Idea

Introducing “Honestly”! Honestly is an online browser extension aimed at passing supply chain transparency to consumers. It acts as an assistant throughout the shopping process, altering the user to any bad news that the brand has been linked to, displaying a list of relevant ratings compiled from external bodies, and aggregating and benchmarking supply chain data on the selected product against industry standards. This is all displayed in a purposefully impartial and digestible form, to support the user in their decision making process. 

Furthermore, for a small subscription fee, Honestly provides businesses a verified platform to share ethical or sustainable practices, thereby building positive brand value and attracting more customers. In particular, as 9 in 10 Australian consumers are more likely to “purchase ethical and sustainable products” (CouriersPlease Survey), there exists a legitimate business case for adoption.

### How it works

”Honestly” scrapes the business’ name from its domain, cross-checking this against the MediaWiki API. Beyond this, the vanilla frontend is connected up to our backend, run on a Node engine and stored in a Postgres Sequel database.
 
The critical news events are scraped by the News API, understood by the Watson Natural Language Understanding engine and cached for 12 hours.
 
The ratings are then stored in a industry-by-industry dictionary, scraped from various APIs and the web, and cached for 7 days.
 
The individual product information is pulled from its slug and cross checked against a dictionary supplied by the business. The data on that product’s supply chain is then plugged through a key into the business’ supply chain management software, and compared against industry benchmarks.
 
Our greater website is built in the Vue framework, authenticated with Auth0 and connected up to the same Sequel database on the backend.

### Existing Solutions
Almost no solutions encompassing our entire functionality exist. Thus, Honestly remains superior to any existing solution as it simply aggregates and displays essential metrics to users, rather than collecting or assessing data and passing judgements.

Good on you is an example of a relatively similar local solution. It acts as a rating platform that collects data and produces ethicality ratings on various fashion brands. Despite offering similar insights, organisations like Good on you often operate solely as a website, requiring users to actively seek out its information, rather than being passively updated throughout their regular browsing. Furthermore, they don’t offer users the ability to further research their findings, which Honestly allows through its newsAPI interface. As such, Honestly has the potential to become the go-to platform for Good on You and the many other certifying and rating organisations out there.

### References
- CouriersPlease. (2020). [New research reveals.](https://www.couriersplease.com.au/about/media-release) CouriersPlease.
- Division, U. (2021). — [SDG Indicators.](https://unstats.un.org/sdgs/report/2020/goal-12/) Retrieved 31 July 2021

## Video
[![thumbnail](https://user-images.githubusercontent.com/74993848/127760324-bc663874-6b81-4103-84fc-b1337f5cbb2f.png)](https://youtu.be/azpLSOzA82s)
*honestly - IBM Call for Code 2021 Entry*

## Repo Breakdown
Within this repo are three essential components: 
- `Client` contains the extension front end.
- `Sever` contains analysis such as integration of News API and Watson Natural Langauage Understanding.
- `Website` (which is currently a work in progress and hence is to be ignored).



## Architectural Diagram
![CFC_Subcomp_2021_Architectural_Diagram](https://user-images.githubusercontent.com/74993848/127756954-03944d9d-478c-4539-8a99-946fbf5ae7ef.png)

Honestly is run on a Node engine with a Sequel database. The critical news events are scraped by the News API and parsed by the Watson Natural Language Understanding engine. Ratings are pulled from various APIs and the web. The supply chain information of each individual product is plugged through a key into the business’ supply chain management software, and compared against industry benchmarks.

## Technology
**IBM Cloud Services**
- [IBM Watson Natural Language Understanding](https://www.ibm.com/cloud/watson-natural-language-understanding)
- [IBM Cloud Foundry](https://www.ibm.com/au-en/cloud/cloud-foundry)
- [IBM PostgreSQL Database](https://www.ibm.com/au-en/cloud/databases-for-postgresql)

**IBM Blockchain Services**
- [IBM Food Trust](https://www.ibm.com/au-en/blockchain/solutions/food-trust)

**News**
- [News API](https://newsapi.org/)

**Wikipedia**
- [MediaWiki](https://www.mediawiki.org/wiki/MediaWiki)

**Auth0**
- [Auth0 Universal Login](https://auth0.com/universal-login/)

**Ratings APIs**
- [ESG API](https://www.esgenterprise.com/esg-analytics/esg-api-developer/)

**Javascript**
- [Vue.js](https://vuejs.org/)
- [Node.js](https://nodejs.org/en/)

## Getting started

Use the following steps to get Honestly Extension up and running.

### Prerequisite

- Install [Google Chrome](https://www.google.com.au/intl/en_au/chrome/)
- Install [Node.js](https://nodejs.org/en/)
- Clone the [repository](https://github.com/lachlan-masters/Honestly).
- Setup a [NewsAPI key](https://newsapi.org/register) by creating an account
- Setup a [IBM Watson Natural Language Understanding Key](https://www.ibm.com/cloud/watson-natural-language-understanding) 

### Installing Extension onto Browser

1. Go to the [Chrome Extension Manager](chrome://extensions/).
2. Select 'Load Unpacked'.
3. Locate and select the ChromeExtension folder under `/CFC21/Client/ChromeExtension`.
4. Select the puzzle symbol located in the top right section of window.
5. Ensure the 'pin' is selected (next to the 'honestly' extension).

The extension is now loaded into the browser.

**Using the Extension**</br>
All data is currently hardcoded. Hence, for testing purposes, any website can be used for testing. In reality such data would be stored on a database, such that every website would yield a different window in the extension.

Thus, currently, the extension can be viewed from any website and hence click on the Honestly logo (is grey) in the extension bar. (the extension window is scrollable)

The initial window of the extension displays the name of the current website you are on, what would be shown if the website had no bad news detected, and if there is supply chain data to show. </br>

To see what a news alert would show, or if no supply chain data is supplied, complete the following:
1. Locate script.js: `cd Client/ChromeExtension/script.js
2. Edit line 18 such to `const newsAlert = true;`
3. Comment out (or delete) lines 25 to 48, such that variable supplyDetails is an empty array.
4. Save file
5. Move back to browser
6. Close and open extension

Its important to note that if a news alert was detected, the extension window would pop up, as to alert the user and ensuring the news alert doesn't go unnoticed.




### Testing News Analyser
For demonstrational purposes, the news analyser is setup such that, through using node, a single command line argment is used to specify what news to search for. Later in development the plan is to cache the news analysis results in a database (searching for more news every 12 hours), which would then be retrieved by the user in the browser through the use of PostrgreSQL. This demonstration illustrates how the integration of News API and sentiment analysis in Watson Natural Language Understanding can be used to analyse news events and determine what is deemed bad or negative. The use of other external libraries would be used to determine the common keyword of set bad articles to thus automatically determine the 'bad news' event.

1. From CFC21 repo: `cd Server`
2. Create a .env file `touch .env`
3. Add lines `NEWS_API_KEY=[News Key]` and `NLU_API_KEY=[NLU Key]`, where 'News Key' is the News API key organised in the prerequisites and 'NLU Key' is the IBM Watson Natural Language Understanding key organised in the prerequisites. 
4. `node app.js [ARGUMENT]`, where ARGUMENT is a news target to search for, such as, `Google`.

The result will show the news articles that were analysed by the Natural Language Understanding, and the average sentiment score of set articles. This score can range from 1 to -1. The more positive the score is, the more positive the article is. The more negative the score is, the more negative the article is.



## Authors
**Bangshuo Zhu** - University of Sydney </br>
**Harrison Adkin** - University of Sydney</br>
**Lachlan Masters** - University of Technology Sydney</br>
**Liam Mills** - University of Sydney</br>
**Nick Wright** - University of Technology Sydney</br>

## License

This solution is made available under the [Apache 2 License](LICENSE).
