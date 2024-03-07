const totalPrice = localStorage.getItem("totalPrice")
const cost = document.getElementById("cost")
cost.textContent = `המחיר הכולל לתשלום: ${totalPrice} ש"ח`;
const invalidCheck3= document.getElementById("invalidCheck3")
const invalidCheck4= document.getElementById("invalidCheck4")
invalidCheck3.onchange = function(event){
    invalidCheck4.disabled=true

}
invalidCheck4.onchange = function(event){
    invalidCheck3.disabled=true
}

//מוסיף מחיר על המשלוח אם לוחץ
const shippingCheckbox = document.getElementById("invalidCheck3");

function updateTotalCost() {
  if (shippingCheckbox.checked) {
    cost.textContent = `המחיר הכולל לתשלום: ${parseInt(totalPrice) + 30} ש"ח`;
    localStorage.setItem("totalPrice",totalPrice)

  } else {
    cost.textContent = `המחיר הכולל לתשלום: ${totalPrice} ש"ח`;
  }
}

updateTotalCost();

shippingCheckbox.addEventListener("change", function() {
  updateTotalCost();
});