const BookInstance = require("../models/bookInstance");

// Display list of all BookInstances.
exports.bookinstance_list = async (req, res, next) => {
  try {
    if (!global.mongodbConnected) {
      return res.render("catalog/bookinstance_list", {
        title: "BookInstance List",
        bookinstance_list: [],
      });
    }

    const list_bookinstances = await BookInstance.find().populate("book").exec();
    res.render("catalog/bookinstance_list", {
      title: "BookInstance List",
      bookinstance_list: list_bookinstances,
    });
  } catch (err) {
    console.error("Error in bookinstance list:", err.message);
    return res.render("catalog/bookinstance_list", {
      title: "BookInstance List",
      bookinstance_list: [],
    });
  }
};

// Display detail page for a specific BookInstance.
exports.bookinstance_detail = async (req, res, next) => {
  try {
    if (!global.mongodbConnected) {
      const err = new Error("BookInstance not found");
      err.status = 404;
      return next(err);
    }

    const bookinstance = await BookInstance.findById(req.params.id).populate("book").exec();
    if (bookinstance == null) {
      const err = new Error("BookInstance not found");
      err.status = 404;
      return next(err);
    }

    res.render("catalog/bookinstance_detail", {
      title: `Copy: ${bookinstance.book.title}`,
      bookinstance,
    });
  } catch (err) {
    return next(err);
  }
};

// Display BookInstance create form on GET.
exports.bookinstance_create_get = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance create GET");
};

// Handle BookInstance create on POST.
exports.bookinstance_create_post = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance create POST");
};

// Display BookInstance delete form on GET.
exports.bookinstance_delete_get = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance delete GET");
};

// Handle BookInstance delete on POST.
exports.bookinstance_delete_post = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance delete POST");
};

// Display BookInstance update form on GET.
exports.bookinstance_update_get = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance update GET");
};

// Handle bookinstance update on POST.
exports.bookinstance_update_post = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance update POST");
};
