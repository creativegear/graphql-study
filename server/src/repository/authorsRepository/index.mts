const authors = [
  {
    id: '1',
    name: 'Kate Chopin',
  },
  {
    id: '2',
    name: 'Paul Auster',
  },
];

const findAllAuthors = () => authors;
const findAuthorById = (id: string) => authors.find((author) => author.id === id);

export const authorRepository = {
  findAllAuthors,
  findAuthorById
}