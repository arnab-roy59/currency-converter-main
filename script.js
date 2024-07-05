
const dropDowns= document.querySelectorAll(".dropDown select");
const btn=document.querySelector("form button");
const fromCurr= document.querySelector(".from select");
const toCurr= document.querySelector(".to select");
const msg=document.querySelector(".msg");
// const swap= document.querySelector("#swap");


// for (code in countryList) {
//     console.log(code,countryList[code]);
// }
try{

for(let select of dropDowns){
    for(currCode in countryList){
        let newOption= document.createElement("option");
        newOption.innerText= currCode;
        newOption.value= currCode;
        if (select.name==="from" && currCode==="USD") {
            newOption.selected= "selected";
        }else if (select.name==="to" && currCode==="INR") {
                newOption.selected= "selected";
            }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        flag(evt.target);
        convert();
    });
    
}

// swap.addEventListener("click",(evt)=>{
    
//     let temp=fromCurr['value'];
//     fromCurr.value= toCurr['value'];
//     toCurr.value= temp;
//     flag(evt.target);
//     convert();
// });
let flag=(element)=>{
    let currCode= element.value;
    let countryCode= countryList[currCode];
    let newSrc="https://flagsapi.com/"+"countryCode"+"/shiny/64.png";
    let img= element.parentElement.querySelector("img");
    img.src=newSrc;
   
};

let convert=async()=>{
    
    let amount=document.querySelector(".amount input");
    let amtVal= amount.value;
    if(amtVal===""||amtVal<1){
        amtVal=1;
        amount.value="1";
    }
    const URL= `https://api.currencyapi.com/v3/latest?apikey=cur_live_E0dW4D9JlKqMIy2yZE2racqBoA1Co3fx8f0lBRP7`;
    let response= await fetch(URL);
    console.log(response);
    let data1 = await response.json();
    let fromRate=data1.data[fromCurr.value].value;
    let toRate=data1.data[toCurr.value].value;
    console.log(toRate);
    let baseCurr=amtVal/fromRate;
    let finalAmount= baseCurr*toRate;
    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
}
btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    convert();
});
window.addEventListener("load",()=>{
    convert();
});
}catch(err){
    alert(err+" refresh the page!");
}




