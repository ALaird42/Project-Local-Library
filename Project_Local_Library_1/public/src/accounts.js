// Note: Please do not change the name of the functions. The tests use those names to validate your code.

function findAccountById (accounts, id){
  for(let i =0; i<accounts.length; i++){
    if (accounts[i].id === id){
      return accounts[i]
    }
  }
}

const sortAccountsByLastName = (accounts) =>accounts.sort((account1, account2) => (account1.name.last.toLowerCase() > account2.name.last.toLowerCase() ? 1 : -1))

function getTotalNumberOfBorrows(account, books) {
  //get account id as its own variable
  const accountId = account.id
  //establish counter
  let counted = 0
  //loop through the books array
  books.forEach((book) => book.borrows.forEach((borrow) => {
    if (accountId === borrow.id){
      counted += 1;
    }
    return counted
  }))
  //return the count
  return counted
}

function getBooksPossessedByAccount(account, books, authors) {
  // access borrowed books in the account and return an array of the ids of each book where returned is false
  const accountId = account.id;
  const booksOutId =[];
  books.forEach((book) => book.borrows.forEach((borrow) => {
    if (accountId === borrow.id && borrow.returned === false){
      booksOutId.push(book.id)
    }
    return
  })); 
  //write books that have not been returned to a new array
  const outBooksInfo = [];
  books.forEach((book) => {
    for (let i =0; i<booksOutId.length; i++){
      if (booksOutId[i] === book.id){
        outBooksInfo.push(book)
      };
    } 
    return
  });
  //use author id from outBooksInfo to write authour infor to new array
  const outBookAuthors = [];
  authors.forEach((author) =>{
    for (let i = 0; i<outBooksInfo.length; i++){
      if (outBooksInfo[i].authorId === author.id){
        outBookAuthors.push(author)
      }
    }
    return
  });
  outBooksInfo.forEach((book) =>{
    for (let i =0; i<outBookAuthors.length; i++){
      book.author = outBookAuthors[i]
    };
    return
  });
  return outBooksInfo
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
