
function toggleMenu() {
    var menuContent = document.getElementById("menuContent");
    var hamboorger = document.getElementById("hamboorger")

    if (menuContent.style.display === "" || menuContent.style.display === "none") {
        menuContent.style.display = "block"
        hamboorger.style.display = "none";
    } else {
        menuContent.style.display = "none"
        hamboorger.style.display = "block";
    }
}


const closeButton = document.getElementById('closeButton');
closeButton.style.display = "none";
setTimeout(() => {
    const imageElement = document.getElementById('myImage');
    imageElement.style.display = 'block';
    const closeButton = document.getElementById('closeButton');
    closeButton.style.display = "block";
    closeButton.addEventListener('click', () => {
        const imageContainer = document.getElementById('imageContainer')
        imageContainer.style.display = "none";
    });
}, 5000)


//מיועד למשתמש חדש
const form = document.getElementById("form");
//פונקציה-ארוע שקורה בעת לחיצה על הכפתור סמביט
form.onsubmit = function (event) {
    //מונעת את התנהלות ברירת המחדל של האירוע, שבמקרה זה היא שליחת הטופס הפעילה רענון של הדף.
    event.preventDefault();
    //משתנים שמוכנס אליהם התוכן של מזהה סוים
    const name = document.getElementById("name")
    const num = document.getElementById("num")
    const adress = document.getElementById("adress")
    const email = document.getElementById("email")
    const password = document.getElementById("password")
    const message = document.getElementById("message")
    const password1 = document.getElementById("password1")
    //מאמת אם הסיסמא נכונה ואם לא מציג הודעה למשתמש ומאפס את תוכן האלמנטים   
    if (password1.value != password.value) {
        alert('סיסמה שגויה')
        password.innerHTML = ""
        password1.innerHTML = ""
    }
    //הקוד מעביר את הערכים של האלמנטים לתוך אובייקט של user, המכיל את הנתונים שנמצאים בטופס    
    const user = {
        name: name.value,
        num: num.value,
        adress: adress.value,
        email: email.value,
        password: password.value,
        message: message.value,
        cart: []
    }
    //פקודה זו שומרת את האובייקט "משתמש" וממירה אותו לפורמט ג'ייסון כדי לשמור אות כמחרוזת בשביל שישמר בדפדפן בצורה נוחה    //שם המפתח הוא הסיסמא של המשתמש   
    localStorage.setItem(user.password, JSON.stringify(user))
    //מדפיס את הסיסמא של המשתמש 
    console.log(user)
    console.log(user.password);
    //הסיסמא של המשתמש נשמרת תחת המזהה של password   
    localStorage.setItem("password", user.password)
    //מאפס את הטופס לאחר שליחתו    
    form.reset();
}
//מיועד לכניסה
const form1 = document.getElementById("form1")
form1.onsubmit = function (event) {
    // פקודה זו מונעת את התנהלות ברירת המחדל של האירוע, שבמקרה זה היא שליחת הטופס הפעילה רענון של הדף.
    event.preventDefault()
    const password = document.getElementById("password2")
    console.log(password);
    //פקודה זו מכניסה למשתנה יוזר את הערך של המפתח של מאגר הנתונים המקומי עם הערך של הסיסמה שהוזן בטופס. במקרה זה, ערך הסיסמה משמש כמפתח במאגר הנתונים המקומי כדי למצוא את המשתמש המתאים לסיסמה זו.    
    const user = JSON.parse(localStorage.getItem(password.value))
    console.log(user);
    if (user === null) {
        alert('אינך רשום במערכת')
        form1.reset();
    } else {
        localStorage.setItem("password", user.password)
        console.log(localStorage.getItem("password"));
    }
    blue_nav.style.display = 'none';
    hello.style.display = 'block';
    hello.innerHTML += (user.name);

    alert(user.name + "שלום ל:")

    form1.reset();
}

const image = document.getElementById(".restaurant>a"); image.addEventListener("mouseover", function () {
    image.style.transform = "scale(1.2)";
}); image.addEventListener("mouseout", function () {
    image.style.transform = "scale(1)";
}); document.addEventListener('click', function (event) {
    var buttonContainer = document.getElementById('blue_nav');
    if (!buttonContainer.contains(event.target) && event.target.id !== 'user') {
        buttonContainer.style.display = 'none';
    }
});