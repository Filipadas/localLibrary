const Book = require("../models/book");
const BookInstance = require("../models/bookInstance");
const Author = require("../models/author");
const Genre = require("../models/genre");

exports.index = async (req, res, next) => {
  try {
    const [book_count, book_instance_count, book_instance_available_count, author_count, genre_count] = await Promise.all([
      Book.countDocuments({}).exec(),
      BookInstance.countDocuments({}).exec(),
      BookInstance.countDocuments({ status: "Available" }).exec(),
      Author.countDocuments({}).exec(),
      Genre.countDocuments({}).exec(),
    ]);

    res.render("catalog/index", {
      title: "Local Library Home",
      data: {
        book_count,
        book_instance_count,
        book_instance_available_count,
        author_count,
        genre_count,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// Display list of all books.
exports.book_list = async (req, res, next) => {
  try {
    const list_books = await Book.find({}, "title author").populate("author").exec();
    res.render("catalog/book_list", { title: "Book List", book_list: list_books });
  } catch (err) {
    return next(err);
  }
};

// Display detail page for a specific book.
exports.book_detail = async (req, res, next) => {
  try {
    const [book, book_instance_list] = await Promise.all([
      Book.findById(req.params.id).populate("author").populate("genre").exec(),
      BookInstance.find({ book: req.params.id }).exec(),
    ]);

    if (book == null) {
      const err = new Error("Book not found");
      err.status = 404;
      return next(err);
    }

    res.render("catalog/book_detail", {
      title: book.title,
      book,
      book_instance_list,
    });
  } catch (err) {
    return next(err);
  }
};

// Display book create form on GET.
exports.book_create_get = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book create GET");
};

// Handle book create on POST.
exports.book_create_post = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book create POST");
};

// Display book delete form on GET.
exports.book_delete_get = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book delete GET");
};

// Handle book delete on POST.
exports.book_delete_post = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book delete POST");
};

// Display book update form on GET.
exports.book_update_get = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book update GET");
};

// Handle book update on POST.
exports.book_update_post = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book update POST");
};
