require('dotenv').config();

const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const NewsAPI = require('newsapi');



const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

const NLU = new NaturalLanguageUnderstandingV1({
    version: '2021-03-25',
    authenticator: new IamAuthenticator({
        apikey: process.env.NLU_API_KEY,
    }),
    serviceUrl: 'https://api.au-syd.natural-language-understanding.watson.cloud.ibm.com',
});


let newsSearch;


const target = process.argv[2];


const newsParams = {
    qInTitle: target,
    language: 'en',
    domains: 'nytimes.com, wsj.com, washingtonpost.com, bbc.com/news, '
    // category: 'business',
    // sortBy: 'relevancy',
    // sources: 'New York Times'
}

newsapi.v2.everything(newsParams)
    .then(response => {
        console.log(JSON.stringify(response, null, 2));
        newsSearch = response.articles;

        let docScore = 0, targetScore = 0;
        let arrLength = (newsSearch.length > 5) ? 5 : newsSearch.length;

        let analyse = new Promise((resolve, reject) => {
            for (let i = 0; i < arrLength; i++) {
                const analyseParams = {
                    'url': newsSearch[i].url,
                    'features': {
                        'sentiment': {
                            // 'targets': [
                            //     target
                            // ],
                            'document': true
                        },
                    }
                };

                NLU.analyze(analyseParams)
                    .then(analysisResults => {
                        // console.log(JSON.stringify(analysisResults, null, 2));
                        docScore += analysisResults.result.sentiment.document.score;
                        // targetScore += analysisResults.result.sentiment.targets[0].score;
                        // console.log(analysisResults.result.sentiment.targets[0].score);
                        // console.log(score);

                        if (i == (arrLength - 1)) {
                            resolve(docScore, targetScore)
                        }
                    })
                    .catch(err => {
                        console.log('error:', err);
                    });

            }
        });

        analyse.then((docScore, targetScore) => {
            console.log('Document score of ' + target + ': ' + docScore/(arrLength));
            // console.log('Score of ' + target + ': ' + targetScore / 5);
        });

    })

    .catch(err => {
        console.log('error:', err);
    });