let close = document.getElementById("close");
let news = document.getElementById("news");
let supply = document.getElementById("supply");


const newsAlert = true;
const supplyChain = false;

close.addEventListener("click", () => 
    window.close()
    , false);



if (!newsAlert) {
    news.style.display = "none";
} 
else {
    news.style.display = "block";
}

if (!supplyChain) {
    supply.style.display = "none";
} 
else {
    supply.style.display = "block";
}



document.getElementById('test').style.display = 'none';

// close.addEventListener("mouseover", () =>
//     )