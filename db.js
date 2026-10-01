import Database from "better-sqlite3"
const db = new Database('./data/database.db')

export const getBookById = (id) => db.prepare(`SELECT * FROM books WHERE id = ?`).get(id)
export const getBooksByAuthor = (author) => db.prepare(`SELECT * FROM books WHERE author = ?`).all(author)
export const getBooksByYear = (year) => db.prepare(`SELECT * FROM books WHERE publishYear = ?`).all(year)
export const SaveBook = (author, title, publishYear, copies) => db.prepare(`INSERT INTO books (author, title, publishYear, copies) VALUES (?, ?, ?, ?)`).run(author, title, publishYear, copies)
export const UpdateBook = (id, author, title, publishYear, copies) => db.prepare(`UPDATE books SET author = ?, title = ?, publishYear = ?, copies = ? WHERE id = ?`).run(id, author, title, publishYear, copies)
export const DeleteBook = (id) => db.prepare(`DELETE FROM books WHERE id = ?`).run(id)