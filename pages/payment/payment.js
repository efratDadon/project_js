const dom = {
    cart: document.getElementById("cart"),

}

const callProducts = (callbackFunc = () => { }) => {
    $.ajax({
        url: "../../data/menu.json",
        success: (result) => {
            callbackFunc(result);

        }
    });
}

const password = JSON.parse(localStorage.getItem('password'));
const user = JSON.parse(localStorage.getItem(password, ""))
const cartItemsContainer = document.getElementById("cart-items");

// קביעת משתנה למחיר כולל
let totalPrice = 0;

// הצגת מחיר כולל בדף
const totalPriceElement = document.getElementById("totalPriceElement");
var flag = null//משתנה לבדיקה אם יש מוצרים בסל או שהוא עדיין ריק


const drawPrice = (products) => {
    totalPrice = 0; // אתחול מחיר כולל
    products.forEach(p => {
        const cartItem = user.cart.find((item) => item.id === p.id);
        if (cartItem) {
            flag = 1;
            console.log(cartItem);
            const productDiv = document.createElement('div');
            const dishDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
        <h3>${p.name}</h3>
        <p>מחיר: ${p.price}</p>
        <img src="${p.image}">`
            dishDiv.appendChild(productDiv);
            const addToCart = document.createElement('button');
            const addor = document.createElement('div');
            addToCart.classList = "fas fa-plus";
            const num = document.createElement('button');
            const removefromcart = document.createElement('button');
            removefromcart.classList = "fas fa-minus";
            addor.appendChild(addToCart);
            addor.appendChild(num);
            addor.appendChild(removefromcart);
            dishDiv.appendChild(addor);




            num.innerHTML = cartItem.count
            const cartItemIndex1 = user.cart.findIndex(item => item.id === cartItem.id);


            addToCart.onclick = () => {
                cartItem.count = cartItem.count + 1
                num.innerHTML = cartItem.count;
                user.cart[cartItemIndex1].count = cartItem.count
                localStorage.setItem(password, JSON.stringify(user));
                totalPrice += cartItem.price * 1
                localStorage.setItem("totalPrice", totalPrice)
                totalPriceElement.textContent = `המחיר הכולל לתשלום: ${totalPrice} ש"ח`;

            };

            removefromcart.onclick = () => {
                if (cartItem.count <= 1) {
                    removefromcart()

                }
                else {
                    cartItem.count = cartItem.count - 1
                    num.innerHTML = cartItem.count;
                    localStorage.setItem(password, JSON.stringify(user));
                    user.cart[cartItemIndex1].count = cartItem.count
                    totalPrice -= cartItem.price * 1
                    localStorage.setItem("totalPrice", totalPrice)
                    totalPriceElement.textContent = `המחיר הכולל לתשלום: ${totalPrice} ש"ח`;

                };
            }
            cartItemsContainer.appendChild(dishDiv);



            totalPrice += cartItem.count * cartItem.price;

            const deletebutton = document.createElement('button');
            deletebutton.innerHTML = 'הסרה ';
            cartItemsContainer.appendChild(deletebutton);
            dishDiv.appendChild(deletebutton);
            deletebutton.onclick = function () {
                const cartItemIndex = user.cart.findIndex(item => item.id === p.id);
                if (cartItemIndex !== -1) {
                    totalPrice -= user.cart[cartItemIndex].price * user.cart[cartItemIndex].count
                    localStorage.setItem("totalPrice", totalPrice)
                    totalPriceElement.textContent = `המחיר הכולל לתשלום: ${totalPrice} ש"ח`;

                    // מחיקת המוצר ממערך ה-cart
                    user.cart.splice(cartItemIndex, 1);
                    localStorage.setItem(password, JSON.stringify(user));

                    localStorage.setItem(password, JSON.stringify(user));
                    dishDiv.remove();



                }

            }
            dishDiv.classList.add('dishDiv');
            deletebutton.classList.add('deletebutton');


            cartItemsContainer.appendChild(dishDiv);

            const totalPriceElement = document.getElementById('totalPriceElement');
            totalPriceElement.textContent = `המחיר הכולל לתשלום: ${totalPrice} ש"ח`;


        }
        if (flag === null) {
            const undifind = document.createElement('span')
            undifind.innerHTML = "הסל שלך עדיין ריק"
        }

    });

    return cartItemsContainer;
}

callProducts(drawPrice);
