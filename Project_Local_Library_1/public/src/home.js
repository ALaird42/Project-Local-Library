// Note: Please do not change the name of the functions. The tests use those names to validate your code.

function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function findBookById(books, id) {
  return books.find((book) => book.id === id)
}

function isBookReturned(books, id) {
  const found = findBookById(books, id)
  for (let i =0; i<found.borrows.length; i++){
    if (found.borrows[i].returned === false){
      return false
    }
  }
  return true
}

function getBooksBorrowedCount(books) {
  const outBooks = books.filter((book) =>{ 
    if (isBookReturned(books, book.id) === false){
      return book
    }  
  })
  return outBooks.length
}

function getMostCommonGenres(books) {
  //make an array with all book genres in it
  const genreArray = books.map((book) => book.genre);
  //sort genre array
  genreArray.sort((genreA, genreB) => (genreA > genreB ? 1 : -1));
  console.log(genreArray)
  let genreCount = {}

  for (let i =0; i<genreArray.length; i++){
    const key = genreArray[i];
    if (genreCount[key]){
      genreCount[key] ++
    } else {
      genreCount[key] = 1
    }
  }
  console.log(genreCount)
  const returnArray = []
 for (let item in genreCount){
   const genreObject = {name: item, count: genreCount[item]};
   returnArray.push(genreObject);
   if(returnArray.length === 5){
    break
  }
 }
 console.log(returnArray)
  returnArray.sort((arrayA, arrayB) => arrayA.count < arrayB.count ? 1 :-1)
  console.log(returnArray)
  return returnArray 
}

function getMostPopularBooks(books) {
  const returnArray =[]
  const bookPopularityContest =[]
  books.forEach((book) => bookPopularityContest.push({ name: book.title, count: book.borrows.length}));
  bookPopularityContest.sort((bookObjA, bookObjB) => bookObjA.count < bookObjB.count ? 1 : -1);
  for(let i =0; i<bookPopularityContest.length; i++){
    if (returnArray.length < 5){
      returnArray.push(bookPopularityContest[i])
    }
  }
  return returnArray
}


function getMostPopularAuthors(books, authors) {
  /*construct a sorted array of objects (most popular author - least popular author)
  each object is has a key of name with a value of the authors name (first last)
  each object also has a key of count, with a total count of each time the authors book was checked out*/
  //sort books by author
  books.sort((bookA, bookB) => bookA.authorId > bookB.authorId ? 1:-1)
  //generate an array of book author ids, where each Id is only recorded once
  const bookAuthorIds =[]
  //generate an object, where each key is the author id, and the value is the books filtered by that author id
  const booksByAuthor ={}
  for (let i =0; i<books.length; i++){
    if(!bookAuthorIds.includes(books[i].authorId)){
      bookAuthorIds.push(books[i].authorId)
    }
    for (let j =0; j<bookAuthorIds.length; j++){
      booksByAuthor[bookAuthorIds[j]] = books.filter((book) => bookAuthorIds[j] === book.authorId)
    }
  }
  //console.log(booksByAuthor)
  //build storage array for the count of each auhors borrows
  const borrowsPerAuthor = []
  //loop the booksByAythor object
  for(let author in booksByAuthor){
    //use reduce to sum the borrows.length of each author id, and push the result to the storage array
    let startingPoint = 0 
    borrowsPerAuthor.push(booksByAuthor[author].reduce((acc, book) => acc + book.borrows.length, startingPoint))
  }
  //sort authors by id
  authors.sort((authorA, authorB) => authorA.id > authorB.id ? 1:-1)
  //store each authors name to an array that corresponds to the bookAuthorIds array
  const bookAuthorNames = []
  for (let i =0; i<authors.length; i++){
    for (let j =0; j<bookAuthorIds.length; j++){
      if(!bookAuthorNames.includes(`${authors[i].name.first} ${authors[i].name.last}`) && bookAuthorIds[j] === authors[i].id){
        bookAuthorNames.push(`${authors[i].name.first} ${authors[i].name.last}`)
      }
    }
  }
  const bookCountObjs = []
  //generate an object with the authors name from bookAuthorNames and the count from borrowsPerAuthor, and push it to storage object
  for(let i =0; i<bookAuthorNames.length; i++){
    bookCountObjs.push({name: bookAuthorNames[i], count: borrowsPerAuthor[i]})
  }
  //sort bookCountObjs by the count
  bookCountObjs.sort((objA, objB) => objA.count < objB.count ? 1:-1);
  //push bookCountObjs to return array if there are less than 5 items in return array
  const returnArray =[]
  
  for (let i =0; i<bookCountObjs.length; i++){
     if(returnArray.length <5){
      returnArray.push(bookCountObjs[i])
    }
  }
  return returnArray
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
