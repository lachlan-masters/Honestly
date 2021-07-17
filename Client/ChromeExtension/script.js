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

const newsAlert = true;
const supplyChain = true;

let companyNameString = 'Acme';
let companyEventString = 'Nuclear Warfare';

closeAll.addEventListener("click", () => 
    window.close()
    , false);

closeNews.addEventListener("click", () => 
    news.style.display = "none"
    , false);

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

if (!supplyChain) {
    supply.style.display = "none";
    noSupply.style.display = "block"
} 
else {
    supply.style.display = "block";
    noSupply.style.display = "none"
}



document.getElementById('test').style.display = 'none';

// close.addEventListener("mouseover", () =>
//     )