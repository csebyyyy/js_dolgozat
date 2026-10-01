import express from 'express'
import * as db from './data/db.js'

const app = express()
const PORT = 3000;
app.use(express.json())

app.get('/api/books/author/:author', (req, res) => {
    const book = db.getBooksByAuthor(req.params.author);
    if(!book) {
        return res.status(404).json({"message": "No books found for this author"})
    }
    res.status(200).json(book)
})

app.get('/api/books/year/:year', (req, res) => {
    const book = db.getBooksByYear(+req.params.year);
    if(!book) {
        return res.status(404).json({"message": "No books found for this year"})
    }
    res.status(200).json(book)
})

app.post('/api/books', (req, res) => {
    const {author, title, publishYear, copies} = req.body;
    if (!author || !title || !publishYear || !copies) {
        return res.status(400).json({"message": "Author, title, publishYear and copies are required"})
    }
    const save = db.SaveBook(author, title, publishYear, copies)
    const id = save.lastInsertRowid;
    res.status(201).json({"message": "Book created successfully", id})
})

app.put('/api/books/:id', (req, res) => {
    const {author, title, publishYear, copies} = req.body;
    if (!author || !title || !publishYear || !copies) {
        return res.status(404).json({"message": "Author, title, publishYear and copies are required"})
    }
    const id = +req.params.id;
    const book = db.getBookById(id)
    if(!book) {
        return res.status(404).json({"message": "Book not found"})
    }
    db.UpdateBook(id, author, title, publishYear, copies)
    res.status(200).json({"message": "Book updated successfully"})
})

app.delete('/api/books/:id', (req, res) => {
    const book = db.getBookById(+req.params.id);
    if(!book) {
        res.status(404).json({"message": "Book not found"})
    }
    db.DeleteBook(+req.params.id)
    res.status(200).json({"message": "Book deleted successfully"})
})

app.listen(PORT, () => {
    console.log('Server runs on ' + PORT)
})