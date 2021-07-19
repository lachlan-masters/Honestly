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

const newsAlert = true;

var newsContainer = document.getElementById("news");

let companyNameString = 'Acme';
let companyEventString = 'Nuclear Warfare';

closeAll.addEventListener("click", () => 
    window.close()
    , false);

closeNews.addEventListener("click", () => {
    newsContainer.style.opacity = 0;
    setTimeout(() =>{
        news.style.display = "none";
    }, 200);
    }, false);

closeNoNews.addEventListener("click", () => 
    noNews.style.display = "none"
    , false);

if (!newsAlert) {
    news.style.display = "none";
    noNews.style.display = "block";
    noNewsCompany.innerText = companyNameString;
} 
else {
    news.style.display = "block";
    noNews.style.display = "none"
    companyName.innerText = companyNameString;
    companyEvent.innerText = companyEventString;
}

let supplyDetails = [
    {
        location: 'Penis St Trucks, Qld', 
        ratings: [
            {rating: 'Freshness', score: '10 fresh'}, 
            {rating: 'Ethics', score: '10 ethic'}
        ], 
        event: '🚗', 
        date: "27 Nov '21 - 30 Nov '21"
    },
    {
        location: 'Penis St Shipping, Qld', 
        ratings: [
            {rating: 'Freshness', score: '10 fresh'}, 
            {rating: 'Ethics', score: '10 ethic'}
        ], 
        event: '🚢', 
        date: "27 Nov '21 - 30 Nov '21"
    },
    {
        location: 'Vas Deferens Port, Qld', 
        ratings: [
            {rating: 'Freshness', score: '10 fresh'}, 
            {rating: 'Ethics', score: '10 ethic'}
        ], 
        event: '🚢', 
        date: "30 Nov '21 - 31 Nov '21"
    }
];

let ratingsDetails = [
    {
        ratingName: 'ESG Rating',
        ratingValue: 'B+'
    },
    {
        ratingName: 'Penis valuation',
        ratingValue: 'Huge'
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

let ratingsCounter = 0;

document.getElementById('ratings').innerHTML = ratingsDetails.map((node, index) =>
    `${index % 2 == 0 ? '<div class = "horizontal-no-margin-top">' : ''}
        <div class="ratingColumn ${index % 2 == 0 && "right-border"}">
            <h3>${node.ratingName}</h3>
            <p>${node.ratingValue}</h3>
        </div>
    ${index % 2 != 0 ? '</div>' : ''}`).join('');



document.getElementById('supply').innerHTML = supplyDetails.map((node, index) =>
    `<div class="horizontal">
        <div class="linear-border width75">
            <div class="scNodeDetails">
                <h3 class="scNodeHeading">${node.location}</h3>
                ${node.ratings.map(ratings => 
                    `<div class="horizontal">
                        <strong class="full-width">${ratings.rating}</strong>
                        <p class="full-width">${ratings.score}</p>
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
            <div class="date">
                <span>${node.date}</span>
            </div>
        </div>
    </div>
    <div class="threeDotsOuter" style="display:${index == supplyDetails.length - 1 ? "none" : "block"}">
        <div class="threeDotsInner"></div>
        <div class="threeDotsInner"></div>
        <div class="threeDotsInner"></div>
    </div>
    `).join('');

if (supplyDetails.length == 0){
    supply.style.display = "none";
    noSupply.style.display = "block"
    noSupplyCompanyName.innerText = companyNameString;
}else{
    supply.style.display = "block";
    noSupply.style.display = "none"
}