const cards=document.querySelectorAll(".memory-card");

let hasFlippedCard=false,lockBoard=false;
let firstCard,secondCard;
let cnt=0;
let d=new Date();
let t=d.getTime();
function flipCard(){
    if(lockBoard)
        return;
    this.classList.toggle('flip');

    if(!hasFlippedCard)
    {
        hasFlippedCard=true;
        firstCard=this;
    }
    else
    {
        hasFlippedCard=false;
        secondCard=this;
        checkForMatch();
    }
}
function checkForMatch()
{
    if(firstCard.dataset.framework===secondCard.dataset.framework && firstCard!=secondCard)
        {
            firstCard.removeEventListener("click",flipCard);
            secondCard.removeEventListener("click",flipCard);
            cnt++;
            if(cnt===8)
            {
                setTimeout(()=>{
                d=new Date();
                alert("You won\nYour Time: "+ (d.getTime()-t)/1000+"s");
                window.location.reload();
                },1000);
            }
        }
        else
        {
            lockBoard=true;
            setTimeout(()=>{
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");
            lockBoard=false;
            },1000);
        }    
}
(function shuffle(){
    cards.forEach(card=>{
        let ind=Math.floor(Math.random()*16);
        card.style.order=ind;
    });
})();
cards.forEach(card => card.addEventListener("click",flipCard));