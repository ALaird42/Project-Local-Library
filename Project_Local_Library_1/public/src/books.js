// Note: Please do not change the name of the functions. The tests use those names to validate your code.

function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id)
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

function partitionBooksByBorrowedStatus(books) {
  const outBooks = books.filter((book) =>{
  if (isBookReturned(books, book.id) === false){
    return book
  }  
  })
  const inBooks = books.filter((book) =>{
    if (isBookReturned(books, book.id) === true){
      return book
    }
  })
 const bookStatusArray = [outBooks, inBooks];
 return bookStatusArray 
}

function getBorrowersForBook(book, accounts) {
  //pull out the borrows array from the book object
  const borrows = book.borrows
  //create empty array to be returned
  const returnedBorrows =[]
  //loop borrows array
  for (let i =0; i<borrows.length; i++){
    //loop the accounts array
    for (let j = 0; j<accounts.length; j++){
      //if borrows[i].id matches accounts[j].id, expand the borrows[i] and accounts[j] to a new object, and push that to the returedBorrows array
      if (borrows[i].id === accounts[j].id){
        const combined = {
          ...borrows[i],
          ...accounts[j]
        };
        returnedBorrows.push(combined)
      }
      if (returnedBorrows.length === 10){
        break
      }
    }
  }
  return returnedBorrows
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
