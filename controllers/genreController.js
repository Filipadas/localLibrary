const Genre = require("../models/genre");
const Book = require("../models/book");

// Display list of all Genre.
exports.genre_list = async (req, res, next) => {
  try {
    const list_genres = await Genre.find().sort("name").exec();
    res.render("catalog/genre_list", { title: "Genre List", genre_list: list_genres });
  } catch (err) {
    return next(err);
  }
};

// Display detail page for a specific Genre.
exports.genre_detail = async (req, res, next) => {
  try {
    const [genre, genre_books] = await Promise.all([
      Genre.findById(req.params.id).exec(),
      Book.find({ genre: req.params.id }).populate("author").exec(),
    ]);

    if (genre == null) {
      const err = new Error("Genre not found");
      err.status = 404;
      return next(err);
    }

    res.render("catalog/genre_detail", {
      title: genre.name,
      genre,
      genre_books,
    });
  } catch (err) {
    return next(err);
  }
};

// Display Genre create form on GET.
exports.genre_create_get = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre create GET");
};

// Handle Genre create on POST.
exports.genre_create_post = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre create POST");
};

// Display Genre delete form on GET.
exports.genre_delete_get = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete GET");
};

// Handle Genre delete on POST.
exports.genre_delete_post = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete POST");
};

// Display Genre update form on GET.
exports.genre_update_get = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update GET");
};

// Handle Genre update on POST.
exports.genre_update_post = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update POST");
};
