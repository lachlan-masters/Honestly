chrome.runtime.onMessage.addListener((msg, sender, response) => {
    if (msg.name == 'analyseNews') {
        console.log('Analysing news...');

        const newsTarget = msg.target;

        const newsKey = '807678d4a7c443bb8647c18ad0aaf330';
        const nluKey = '2sBoCDo3iH28KmUkxkgHuIhwbnnntysy6AkEwZFZx_Cs';

        const newsAPI = `https://newsapi.org/v2/everything?qInTitle=${newsTarget}&language=en&domains=nytimes.com, wsj.com, washingtonpost.com, bbc.com/news&apiKey=${newsKey}`;

        let newsSearch;

        fetch(newsAPI).then(res => {
            console.log(res);
            /* If error, return */
            if (res.status !== 200) {
                console.log('Error: Bad response fetching news.');
                return;
            }

            /* Continue if no error */
            res.json().then(data => {
                console.log(data);
                newsSearch = data.articles;

                let docScore = 0, targetScore = 0;
                let arrLength = (newsSearch.length > 5) ? 5 : newsSearch.length;

                let analyse = new Promise((resolve, reject) => {
                    for (let i = 0; i < arrLength; i++) {
                        let newsUrl = newsSearch[i].url;
                        const nluAPI = `https://api.au-syd.natural-language-understanding.watson.cloud.ibm.com/instances/577a13f5-8e66-4f26-b07a-3438011f322a/v1/analyze?version=2021-03-25&url=${newsUrl}&features=sentiment`
                        let apiHeaders = new Headers();
                        apiHeaders.append('Content-Type', 'application/json');
                        apiHeaders.append('Authorization', `Basic ${btoa(`apikey:${nluKey}`)}`)
                        

                        fetch(nluAPI, {
                            method: 'post',
                            headers: apiHeaders 
                        }).then(analysisResults => {
                            analysisResults.json().then(resultData => {
                                // console.log(resultData);
                                docScore += resultData.sentiment.document.score;

                                if (i == (arrLength - 1)) {
                                    resolve(docScore, targetScore)
                                }
                            });
                            
                        }).catch(err => {
                            console.log('error:', err);
                        });
                    }
                });

                analyse.then((docScore, targetScore) => {
                    console.log('Document score of ' + newsTarget + ': ' + docScore/(arrLength));
                    response({score: docScore/arrLength})
                    // console.log('Score of ' + target + ': ' + targetScore / 5);
                });
            })
        }).catch(err => {
            console.log('error:', err);
        });


    }

    return true;
});


const wikiCrossCheck = async name => {
    var url = "https://en.wikipedia.org/w/api.php"; 
    var params = {
        action: "query",
        list: "prefixsearch",
        pssearch: name,
        format: "json"
    };
    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
    return fetch(url)
        .then(function(response){return response.json();})
        .then(function(response) {
            var pages = response.query.prefixsearch;
            // console.log(pages);
            // console.log("as"+pages[0].title);
            if (pages.length > 0) return pages[0].title;
        })
        .catch(function(error){console.log(error);});
}


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status == 'loading' && tab.active) {
        // search for name
        
        // set supply

        // search news
    }
})
