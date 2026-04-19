const BASE_URL = "https://api.exchangerate-api.com/v4/latest";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for(let select of dropdowns){
    for(let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.value = currCode;
        newOption.innerText = currCode;
        if(select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

select.addEventListener("change",(evt) => {
    updateFlag(evt.target)
});
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];

    let img = element.parentElement.querySelector("img");
    

    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    img.src = newSrc;
};
btn.addEventListener("click", async(evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    // console.log(amtVal);
    if (amtVal==="" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    // console.log(fromCurr.value ,toCurr.value );
    const URL = `${BASE_URL}/${fromCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
      let rate = data.rates[toCurr.value];
    let finalAmount = amtVal * rate;

    let msg = document.querySelector(".msg");
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
});
   

    