const books = [
  {
    id: '1',
    title: 'The Awakening',
    authorId: '1',
  },
  {
    id: '2',
    title: 'City of Glass',
    authorId: '2',
  },
  {
    id: '3',
    title: 'Harry Potter',
    authorId: '1',
  },
];

const findAllBooks = () => books;
const findBookById = (id: string) => books.find((book) => book.id === id);
const findBooksByAuthorId = (authorId: string) => books.filter((book) => book.authorId === authorId);
const updateBook = (id: string, newTitle: string) => {
  const book = findBookById(id)
  book.title = newTitle
  return book;
}

export const bookRepository = {
  findAllBooks,
  findBookById,
  findBooksByAuthorId,
  updateBook
}