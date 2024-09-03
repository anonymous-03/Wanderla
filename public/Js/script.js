let cards=document.getElementsByClassName("card");

for(let card of cards){
    let data=card.getAttribute("data-card-id");
    card.addEventListener("click",()=>{
        window.location.href=`/listings/${data}`;
    })
}