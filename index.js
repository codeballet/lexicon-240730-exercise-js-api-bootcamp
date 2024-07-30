/////////////
// Generic //
/////////////

// Write h1 heading in the DOM
const bodyRef = document.querySelector("body");

const h1Ref = document.createElement("h1");
h1Ref.innerText = "API Exercises";

// fetch stuff from APIs function
async function fetchThings(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

// log things from APIs in the console function
async function logThings(url, attribute) {
    try {
        let things = await fetchThings(url);
        for (let thing of things) {
            if (attribute) {
                console.log(thing[attribute]);
            } else {
                console.log(thing);
            }
        }
    } catch (err) {
        console.log(err);
    }
}

// Render list items in the DOM function
async function writeThings(url, uiRef, attributes) {
    try {
        let things = await fetchThings(url);
        for (let thing of things) {
            const liRef = document.createElement("li");
            if (attributes.length === 1) {
                liRef.innerText = `${thing[attributes[0]]}`;
            } else {
                for (let attribute of attributes) {
                    liRef.innerText += `${attribute}: ${thing[attribute]}, `;
                }
            }
            uiRef.appendChild(liRef);
        }
    } catch (err) {
        console.log(err);
    }
}

////////////////
// Exercise 1 //
////////////////

// 1.1: Acquire pokemons from API //

const pokemonsUrl = "https://santosnr6.github.io/Data/pokemons.json";

// 1.2: Log pokemons in the console //

logThings(pokemonsUrl);

// 1.3: Write pokemon names to the DOM //

const h2PokemonsRef = document.createElement("h2");
h2PokemonsRef.innerText = "Exercise 1: Pokemons";

const uiPokemonsRef = document.createElement("ui");

bodyRef.appendChild(h1Ref);
bodyRef.appendChild(h2PokemonsRef);
bodyRef.appendChild(uiPokemonsRef);

writeThings(pokemonsUrl, uiPokemonsRef, ["name"]);

////////////////
// Exercise 2 //
////////////////

// 2.1: Request dogs with fetch from API //

const dogsUrl = "https://majazocom.github.io/Data/dogs.json";

// 2.2: Render the names of the dogs one and one in the console

logThings(dogsUrl, "name");

// 2.3: Render the dogs in the DOM //

const h2DogsRef = document.createElement("h2");
h2DogsRef.innerText = "Exercise 2: Dogs";

const uiDogsRef = document.createElement("ui");

bodyRef.appendChild(h2DogsRef);
bodyRef.appendChild(uiDogsRef);

writeThings(dogsUrl, uiDogsRef, ["name", "sex", "breed", "img", "present"]);

////////////////
// Exercise 3 //
////////////////

// 3.1: Request all the books from the API

const booksUrl = "https://majazocom.github.io/Data/books.json";

// 3.2: Render all the books to the DOM that have less pages than 500

const h2BooksRef = document.createElement("h2");
h2BooksRef.innerText = "Exercise 3: Books";

const uiBooksRef = document.createElement("ui");

bodyRef.appendChild(h2BooksRef);
bodyRef.appendChild(uiBooksRef);

async function writeBooks() {
    try {
        let books = await fetchThings(booksUrl);
        for (let book of books) {
            if (book.pages < 500) {
                console.log(book);
                const liBookRef = document.createElement("li");
                liBookRef.innerText = `Title: ${book.title}, ISBN: ${book.isbn}, Author: ${book.author}, Pages: ${book.pages}, Genre: ${book.genre}.`;
                uiBooksRef.appendChild(liBookRef);
            }
        }
    } catch (err) {
        console.log(err);
    }
}

writeBooks();

////////////////
// Exercise 4 //
////////////////

// 4.1: Request all the visitors to a work-event from the API

const visitorsUrl = "https://majazocom.github.io/Data/attendees.json";

// 4.2: Render only the ones that are attending to the DOM

const h2VisitorsRef = document.createElement("h2");
h2VisitorsRef.innerText = "Exercise 4: Attending Visitors";

const uiVisitorsRef = document.createElement("ui");

bodyRef.appendChild(h2VisitorsRef);
bodyRef.appendChild(uiVisitorsRef);

async function writeAttendingVisitors(api, parent) {
    try {
        let visitors = await fetchThings(api);
        visitors.forEach((visitor) => {
            if (visitor.attending) {
                const liVisitorRef = document.createElement("li");
                liVisitorRef.innerText = visitor.name;
                parent.appendChild(liVisitorRef);
            }
        });
    } catch (err) {
        console.log(err);
    }
}

writeAttendingVisitors(visitorsUrl, uiVisitorsRef);

// 4.3: Render only the ones that are attending and have some allergy to the DOM

const h2AllergyRef = document.createElement("h2");
h2AllergyRef.innerText = "Exercise 4: Attending Visitors with Allergy";

const uiAllergyRef = document.createElement("ui");

bodyRef.appendChild(h2AllergyRef);
bodyRef.appendChild(uiAllergyRef);

async function writeAllergyVisitors(api, parent) {
    try {
        let visitors = await fetchThings(api);
        visitors.forEach((visitor) => {
            if (visitor.attending && visitor.allergies.length > 0) {
                const liAllergyRef = document.createElement("li");
                liAllergyRef.innerText = visitor.name;
                parent.appendChild(liAllergyRef);
            }
        });
    } catch (err) {
        console.log(err);
    }
}

writeAllergyVisitors(visitorsUrl, uiAllergyRef);
