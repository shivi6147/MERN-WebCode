// Navbar Details
const home = document.createElement('a');
home.setAttribute('class', 'navbar-brand font-weight-bold');
home.style.margin = "10px";
home.style.color = '#F5F5F5';
home.style.padding = "5px";
home.innerText = 'HOME';

const inputSearch = document.createElement('input')
inputSearch.setAttribute('type', 'search')
inputSearch.setAttribute('id', 'search-input')
inputSearch.setAttribute('aria-label', 'search')
inputSearch.style.color = '#000000';
inputSearch.setAttribute('placeholder', 'Search by book name')
inputSearch.setAttribute('class', 'form-control me-2')

const btnSearch = document.createElement('button')
btnSearch.setAttribute('type', 'submit')
btnSearch.setAttribute('class', 'btn btn-outline-success')
btnSearch.style.color = '#F5F5F5';
btnSearch.innerText = "Search"

const formItem = document.createElement('form')
formItem.setAttribute('class', 'd-flex')
formItem.margin = '10px'
formItem.append(inputSearch, btnSearch)

const navItem = document.createElement('nav');
navItem.setAttribute('class', 'container-fluid');
navItem.append(home, formItem);

const navDiv = document.createElement('nav');
navDiv.setAttribute('class', 'navbar navbar-light bg-dark');
// navDiv.style.backgroundColor = '#FFE6E6'
navDiv.append(navItem);

//Body Details

// First Parent Div
const parentFirstDiv = document.createElement('div');
parentFirstDiv.setAttribute('class', 'bookList-div')
parentFirstDiv.setAttribute('id', 'bookList')
parentFirstDiv.style.display = 'flex';
parentFirstDiv.style.flexWrap = 'wrap';
// parentFirstDiv.style.justifyContent = 'space-between';
parentFirstDiv.style.backgroundColor = 'grey';

//Second Parent Div
const btnClose = document.createElement('button')
btnClose.setAttribute('type', 'submit')
btnClose.setAttribute('class', 'btn btn-outline-danger')
btnClose.innerText = "Hide Character"

const parentSecondDiv = document.createElement('div');
parentSecondDiv.setAttribute('id', 'characterDetails')
parentSecondDiv.setAttribute('class', 'card');
parentSecondDiv.style.display = "none";
parentSecondDiv.style.backgroundColor = "#E4DCCF";

// Main Parent Div
const parentDiv = document.createElement('div');
parentDiv.append(parentFirstDiv, parentSecondDiv);


//API call

const fetchBooks = async () => {
    const response = await fetch("https://www.anapioficeandfire.com/api/books");
    const responseJSON = await response.json();
    responseJSON.forEach((book) => {
        const bookDiv = document.createElement('div')
        bookDiv.setAttribute('class', 'card')
        bookDiv.setAttribute('id', book.isbn)
        bookDiv.style.margin = "25px"
        bookDiv.style.padding = "10px"
        bookDiv.style.backgroundColor = "#E4DCCF"
        bookDiv.style.border = "1px solid green"

        const btnShowChar = document.createElement('button')
        btnShowChar.setAttribute('type', 'submit')
        btnShowChar.setAttribute('class', 'btn btn-outline-success')
        btnShowChar.setAttribute('id', 'show-char')
        // btnShowChar.style.display = 'inline'
        btnShowChar.innerText = "Show Characters"

        const labelDiv = document.createElement('label')
        labelDiv.setAttribute('class', 'label-control')
        labelDiv.style.width = "20rem"
        labelDiv.style.margin = "10px"
        labelDiv.style.padding = "10px"
        labelDiv.innerHTML = `
            Book Name: ${book.name}<br/>
            Publisher Name: ${book.publisher}<br/>
            Release Date: ${book.released} <br/>
            isbn : ${book.isbn}<br/>
            Total pages: ${book.numberOfPages}<br/>
            `

        //Show Character
        btnShowChar.addEventListener('click', (e) => {
            e.preventDefault();
            var listOfTopFiveChar = "<b>List of Characters of: " + book.name + "</b><br><br>";
            var bookDetails = document.getElementById('bookList');
            var charDetails = document.getElementById('characterDetails');
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            if (charDetails.style.display === 'none') {
                charDetails.style.display = 'flex';
                charDetails.style.width = '30%';
                charDetails.style.margin = '25px';
                charDetails.style.height = "40%";
                charDetails.style.padding = '10px';
                charDetails.style.border = '1px solid green';
                bookDetails.style.float = 'left';
                bookDetails.style.width = '70%';
                bookDetails.style.display = 'inline';
            }
            charDetails.innerHTML = "";

            var data = async () => {
                for (i = 0; i < 5; i++) {
                    var url = book.characters[i];
                    const response = await fetch(url);
                    var jsonResponse = await response.json();
                    console.log(jsonResponse);
                    listOfTopFiveChar += i + 1 + ": Name: " + jsonResponse.name + "<br>" + "Gender: " + jsonResponse.gender + "<br><br>";
                }
                charDetails.innerHTML = listOfTopFiveChar;
                charDetails.append(btnClose);
            }
            //Hide Character
            btnClose.addEventListener('click', (e) => {
                e.preventDefault();
                if (charDetails.style.display === 'flex') {
                    charDetails.style.display = 'none';
                    bookDetails.style.width = '100%';
                    bookDetails.style.display = 'flex';
                }
            });
            data();
        });
        bookDiv.append(labelDiv, btnShowChar);
        parentFirstDiv.append(bookDiv);
    })

    //Search Implementation
    btnSearch.addEventListener('click', (e) => {
        e.preventDefault();
        const elements = e.target.elements;
        var found = 0;
        var search_val = document.getElementById('search-input').value;
        responseJSON.forEach((book) => {
            if (book.name.toLowerCase() === search_val.toLowerCase()) {
                console.log(book);
                document.getElementById(book.isbn).scrollIntoView();
                document.getElementById(book.isbn).style.backgroundColor = "yellow";
                setTimeout(function () {
                    document.getElementById(book.isbn).style.backgroundColor = "#E4DCCF";
                }, 2000);
                found = 1;
            }
        });
        if (found === 0) {
            alert("Not Found")
        }
    })
}

fetchBooks();

document.body.append(navDiv, parentDiv);