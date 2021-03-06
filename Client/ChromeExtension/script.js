/** GET ELEMENTS */

const closeAll = document.getElementById("closeAll");
const news = document.getElementById("news");
const noNews = document.getElementById("noNews")
const supply = document.getElementById("supply");
const noSupply = document.getElementById("noSupply");
const companyName = document.getElementById("companyName");
const companyEvent = document.getElementById('newsEvent');
const closeNews = document.getElementById("closeNews");
const noNewsCompany = document.getElementById("noNewsCompany");
const closeNoNews = document.getElementById("closeNoNews");
const noSupplyCompanyName = document.getElementById("noSupplyCompanyName");


/** CONSTANTS */

const newsAlert = false;
const companyEventString = 'Nuclear Warfare';

// Give headings
// Separate

const supplyDetails = [
    {
        location: 'Overseas Factory', 
        ratings: [
            {rating: 'People', score: -1}, 
            {rating: 'Planet', score: 1}
        ], 
        event: '🏭', 
    },
    {
        location: 'Shipping Company', 
        ratings: [
            {rating: 'People', score: 1}, 
            {rating: 'Planet', score: 0}
        ], 
        event: '🚢', 
    },
    {
        location: 'Local Trucking', 
        ratings: [
            {rating: 'People', score: -1}, 
            {rating: 'Planet', score: 1}
        ], 
        event: '🚚', 
    }
];

const ratingsDetails = [
    {
        ratingName: 'ESG Rating',
        ratingValue: 'B+'
    },
    {
        ratingName: 'Some valuation',
        ratingValue: 'AAA'
    },
    {
        ratingName: 'GoodReads',
        ratingValue: 'Good read'
    },
    {
        ratingName: 'Rotten Tomatoes',
        ratingValue: 'Rotten'
    },
    {
        ratingName: 'Le Test',
        ratingValue: 'Oui'
    }
]

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
            // consosle.log(pages);
            // console.log("as"+pages[0].title);
            if (pages.length > 0) return pages[0].title;
        })
        .catch(function(error){console.log(error);});
}

const setup = async () => {

    (async () => {chrome.tabs.query({active: true, lastFocusedWindow: true}, async tabs => {
        let domain = tabs[0].url;
        let deconstructedUrl = domain.split('//')[1].split('.');
        let cn = deconstructedUrl[0] == 'www' ? deconstructedUrl[1] : deconstructedUrl[0];
        let companyNameString = cn.charAt(0).toUpperCase() + cn.slice(1);
        console.log(companyNameString);
        companyNameString = await wikiCrossCheck(companyNameString) || companyNameString;
        chrome.action.setIcon({path: "/images/data_32.png"});
        // return companyNameString;
        console.log(companyNameString);
        setEventListeners();
        // console.log('a');
        setNews(companyNameString);
        // console.log('b');
        // console.log('c');
        setScDetails(companyNameString);
        // console.log('d');
        setRatings();
    })})();

    /** EVENT LISTENERS */
    const setEventListeners = () => {
        closeAll.addEventListener("click", () => 
            window.close()
            , false);

        closeNews.addEventListener("click", () => {
            news.style.opacity = 0;
            setTimeout(() =>{
                news.style.display = "none";
            }, 200);
            }, false);

        closeNoNews.addEventListener("click", () => 
            noNews.style.display = "none"
            , false);
    }

    /** LOGIC */
    const setNews = (name) => {
        if (!newsAlert) {
            news.style.display = "none";
            noNews.style.display = "block";
            noNewsCompany.innerText = name;
        } 
        else {
            news.style.display = "block";
            noNews.style.display = "none"
            companyName.innerText = name;
            companyEvent.innerText = companyEventString;
        }
    }

    // const ratingsDetails = [
    //     {
    //         ratingName: 'ESG Rating',
    //         ratingValue: checkedRating
    //     },
    //     {
    //         ratingName: 'Value valuation',
    //         ratingValue: 'Good value'
    //     },
    //     {
    //         ratingName: 'GoodReads',
    //         ratingValue: 'Good read'
    //     },
    //     {
    //         ratingName: 'Rotten Tomatoes',
    //         ratingValue: 'Rotten'
    //     },
    //     {
    //         ratingName: 'Le Test',
    //         ratingValue: 'Oui'
    //     }
    // ]

    const setRatings = (rating) => {
        const ratingsDetails = [
            {
                ratingName: 'ESG Rating',
                ratingValue: 'BBB'
            },
            {
                ratingName: 'Carbon Footprint',
                ratingValue: 'Average'
            },
            {
                ratingName: 'Waste',
                ratingValue: 'Below Average'
            },
            {
                ratingName: 'Labour Standards',
                ratingValue: 'Above Average'
            },
            {
                ratingName: 'Rotten Tomatoes',
                ratingValue: '87%'
            }
        ]
        const ratings = document.getElementById('ratings');
        ratings.style.display = 'block';
        ratings.innerHTML = ratingsDetails.map((node, index) =>
        `${index % 2 == 0 ? '<div class = "horizontal-no-margin-top">' : ''}
            <div class="ratingColumn ${index % 2 == 0 && "right-border"}">
                <h3>${node.ratingName}</h3>
                ${node.ratingValue == 'Average' ? "<p class='full-width yellow' style='margin-bottom : 10px' >Average</p>" : ""}
                ${node.ratingValue == 'Below Average' ? '<p class="full-width dark-red" style="margin-bottom : 10px">Below Avg.</p>' : ""}
                ${node.ratingValue == 'Above Average' ? '<p class="full-width green" style="margin-bottom : 10px">Above Avg.</p>' : ""}
                ${node.ratingValue == 'BBB' ? '<p class="full-width yellow" style="margin-bottom : 10px">BBB</p>' : ""}
                ${node.ratingValue.includes('%') ? `<p class="full-width" style="margin-bottom : 10px">🍅 ${node.ratingValue}</p>` : ""}
            </div>
        ${index % 2 != 0 ? '</div>' : ''}`).join('');
    }

    const setSupplyChainDeets = () => {
        supply.innerHTML = `<h3 style='margin-bottom:10px'>ULTRABOOST 21 SHOES</h3>` + supplyDetails.map((node, index) =>
        `<div class="horizontal">
            <div class="linear-border width75">
                <div class="scNodeDetails">
                    <h3 class="scNodeHeading">${node.location}</h3>
                    ${node.ratings.map(ratings => 
                        `<div class="horizontal">
                            <strong class="full-width">${ratings.rating}</strong>
                            ${ratings.score == -1 ? "<p class='full-width dark-red'>Below Avg.</p>" : ""}
                            ${ratings.score == 0 ? '<p class="full-width yellow">Average</p>' : ""}
                            ${ratings.score == 1 ? '<p class="full-width green">Above Avg.</p>' : ""}
                        </div>
                        `).join('')
                    }
                </div>
            </div>
                <div class="scEmojiDate">
                    <div class="emoji">
                        <div class="scNodeEmoji">
                            <p>${node.event}</p>
                        </div>
                    </div>

            </div>
        </div>
        <div class="threeDotsOuter" style="display:${index == supplyDetails.length - 1 ? "none" : "block"}">
            <div class="threeDotsInner"></div>
            <div class="threeDotsInner"></div>
            <div class="threeDotsInner"></div>
        </div>
        `).join('');
    }

    const setScDetails = (name) => {
        if (supplyDetails.length == 0){
            supply.style.display = "none";
            noSupply.style.display = "block"
            noSupplyCompanyName.innerText = name;
        } else {
            setSupplyChainDeets();
            supply.style.display = "block";
            noSupply.style.display = "none"
        }
    }
}

setup();