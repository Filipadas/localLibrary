const Author = require("../models/author");
const Book = require("../models/book");

// Display list of all Authors.
exports.author_list = async (req, res, next) => {
  try {
    if (!global.mongodbConnected) {
      return res.render("catalog/author_list", { title: "Author List", author_list: [] });
    }

    const list_authors = await Author.find().sort([['family_name', 'ascending']]).exec();
    res.render("catalog/author_list", { title: "Author List", author_list: list_authors });
  } catch (err) {
    console.error("Error in author list:", err.message);
    return res.render("catalog/author_list", { title: "Author List", author_list: [] });
  }
};

// Display detail page for a specific Author.
exports.author_detail = async (req, res, next) => {
  try {
    if (!global.mongodbConnected) {
      const err = new Error("Author not found");
      err.status = 404;
      return next(err);
    }

    const [author, author_books] = await Promise.all([
      Author.findById(req.params.id).exec(),
      Book.find({ author: req.params.id }, "title summary").exec(),
    ]);

    if (author == null) {
      const err = new Error("Author not found");
      err.status = 404;
      return next(err);
    }

    res.render("catalog/author_detail", {
      title: author.name,
      author,
      author_books,
    });
  } catch (err) {
    return next(err);
  }
};

// Display Author create form on GET.
exports.author_create_get = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author create GET");
};

// Handle Author create on POST.
exports.author_create_post = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author create POST");
};

// Display Author delete form on GET.
exports.author_delete_get = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author delete GET");
};

// Handle Author delete on POST.
exports.author_delete_post = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author delete POST");
};

// Display Author update form on GET.
exports.author_update_get = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author update GET");
};

// Handle Author update on POST.
exports.author_update_post = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author update POST");
};
