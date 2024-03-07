
const dom = {
  menu: document.getElementById("menu")
};

const password = JSON.parse(localStorage.getItem('password'));
const user = JSON.parse(localStorage.getItem(password, ""))
const cart = user.cart;


const callProducts = (url, callbackFunc = () => { }) => {
  $.ajax({
    url,
    success: (result) => {
      callbackFunc(result);
    }
  });
};

//יצירת מנה חדשה בתוך דיב למערך של התפריט
//לאחר יצירת הדיב של המנה המסוימת ,מכניסים אותו לתוך רשימת הקלאס של כל המנות -של התפריט
const getProduct = (product) => {
  const dishDiv = document.createElement('div');
  dishDiv.classList.add('dishDiv');

  const imgWrapper = document.createElement('div');
  imgWrapper.classList.add('imgWrapper');

  const img = document.createElement('img');
  img.src = `${product.image}`;
  imgWrapper.appendChild(img);

  dishDiv.appendChild(imgWrapper);

  const dataDiv = document.createElement('div');
  dataDiv.classList.add('dishData');
  dataDiv.innerHTML = product.description;
  dataDiv.style.display = 'none';

  img.onmouseover = () => {
    dataDiv.style.display = 'block'; // Show the description when mouse is moved over the image
  };

  img.onmouseout = () => {
    dataDiv.style.display = 'none'; // Hide the description when mouse moves away from the image
  };

  dishDiv.appendChild(dataDiv);

  const name_p = document.createElement('h1');
  name_p.innerHTML = product.name;
  dishDiv.appendChild(name_p);

  const price = document.createElement('p');
  price.innerHTML = "מחיר: " + product.price;
  dishDiv.appendChild(price);

  const addToCart = document.createElement('button');
  addToCart.innerHTML = "להוספה לסל";
  const icon = document.createElement('i')
  addToCart.classList = "fas fa-shopping-cart"


  addToCart.onclick = () => {
    alert('המוצר נוסף בהצלחה! להוספת כמות יש לעבור לסל')
    cart.push({ id: product.id, count: 1, price: product.price });
    console.log(cart)
    //מאחסן ע''י שימוש בלוקאלסטורג בתוך המשתנה קארט את הנתונים של הקארט מתוך הגייסון  
    user.cart = cart;
    localStorage.setItem(password, JSON.stringify(user));
    console.log(user)
    addToCart.disabled = true;
    console.log(cart)
  }
  dishDiv.appendChild(addToCart);

  return dishDiv;
};






const drawProducts = (products) => {
  products.forEach((product) => {
    dom.menu.appendChild(getProduct(product));
  });
};

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const dishDivs = document.querySelectorAll(".dishDiv");

  dishDivs.forEach((dishDiv) => {
    const name = dishDiv.querySelector("h1").textContent.toLowerCase();
    const description = dishDiv.querySelector(".dishData").textContent.toLowerCase();

    if (name.includes(searchTerm) || description.includes(searchTerm)) {
      dishDiv.style.display = "block"; // מראה את המנה אם היא מתאימה לחיפוש
    } else {
      dishDiv.style.display = "none"; // מסתיר את המנה אם היא לא מתאימה
    }
  });
});


callProducts("../../data/menu.json", drawProducts);

//סינון לפי קטגוריה
//מקבל רשימה של המוצרים המוכנים ועובר על המערך מוצרים ומצייר אותם-יוצר אותם 
// הוא מוסיף את האיבר הנוכחי לדיב הגדול של כל המוצרים -התפריט והוא נהיה הבן שלו
// const drawProducts = (products) => {

//   //מיון לפי סוגי מאכלים
//   const first = [];
//   const saled = [];
//   const mine = [];
//   const children = [];
//   const drink = [];
//   const desserts = [];

//   products.forEach(product => {
//     const category = product.category[0];

//     //עובר על על המוצרים ושומר את הקטגוריה של המוצר לתוך משתנה קטגוריה ואז לפי זה הוא מכניס את המוצר למערך המתאים   
//     if (category === "ראשונות") {
//       first.push(product);
//     } else if (category === "סלטים") {
//       saled.push(product);
//     } else if (category === "עיקריות") {
//       mine.push(product);
//     }
//     else if (category === "מנות ילדים") {
//       children.push(product);
//     }
//     else if (category === "שתיה") {
//       drink.push(product);
//     }
//     else if (category === "קינוחים") {
//       desserts.push(product);
//     }

//     dom.menu.innerHTML = '';
//     document.getElementById("type_first").innerHTML = "מנות ראשונות";
//     document.getElementById("type_saled").innerHTML = "סלטים";
//     document.getElementById("type_mine").innerHTML = "מנות עיקריות";
//     document.getElementById("type_children").innerHTML = "מנות ילדים";
//     document.getElementById("type_desserts").innerHTML = "קינוחים";
//     document.getElementById("type_drink").innerHTML = "שתיה";

//     //בודק שוב את הקטגוריה של המוצרים ומתאים אותם לכותרות של הסוגי מאכלים
//     first.forEach(product => {
//       document.getElementById("type_first").appendChild(getProduct(product));
//     });
//     saled.forEach(product => {
//       document.getElementById("type_saled").appendChild(getProduct(product));
//     });
//     mine.forEach(product => {
//       document.getElementById("type_mine").appendChild(getProduct(product));
//     });
//     children.forEach(product => {
//       document.getElementById("type_children").appendChild(getProduct(product));
//     });
//     desserts.forEach(product => {
//       document.getElementById("type_desserts").appendChild(getProduct(product));
//     });
//     drink.forEach(product => {
//       document.getElementById("type_drink").appendChild(getProduct(product));
//     });
//   });
// };


