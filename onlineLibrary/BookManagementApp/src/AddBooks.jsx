import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function AddBooks({setBooks}) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    rating: "",
    category: "",
  });

  const [errors, setErrors] = useState({});

  const categories = [
    "Fiction",
    "Young Adult Fiction",
    "Religion",
    "Social Science",
    "Self-Help",
    "Young Adult Non-Fiction",
    "Uncategorized",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDropdownSelect = (category) => {
    setFormData({ ...formData, category });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title) newErrors.title = "Title is required.";
    if (!formData.author) newErrors.author = "Author is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";
    if (!formData.rating) newErrors.rating = "Rating is required.";
    if (!formData.category) newErrors.category = "Category is required.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setBooks((prevBooks) => [...prevBooks, formData])
      console.log("Form submitted successfully", formData);
      alert("Book added successfully!");
      setFormData({
        title: "",
        author: "",
        description: "",
        rating: "",
        category: "",
      });
      setErrors({});
    }
  };

  return (
    <div className="addbook-container bg-gray-200 min-h-screen py-10 px-6">
      <h2 className="text-center text-4xl font-bold mb-8 bg-gray-200">Add a Book</h2>

      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block font-bold mb-2 ml-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter title of the book"
            className={`w-full p-2 border ${
              errors.title ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        {/* Author */}
        <div className="mb-4">
          <label htmlFor="author" className="block font-bold mb-2 ml-2">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            placeholder="Enter author's name"
            className={`w-full p-2 border ${
              errors.author ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {errors.author && (
            <p className="text-red-500 text-sm">{errors.author}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block font-bold mb-2 ml-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Write about the book"
            className={`w-full p-2 border ${
              errors.description ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        {/* Ratings */}
        <div className="mb-4">
          <h3 className="font-bold mb-2 ml-2">Rating</h3>
          {[1, 2, 3, 4, 5].map((rating) => (
            <label key={rating} className="inline-flex items-center mr-4">
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={formData.rating === rating.toString()}
                onChange={handleInputChange}
                className="mr-2 ml-2"
              />
              {rating}
            </label>
          ))}
          {errors.rating && (
            <p className="text-red-500 text-sm">{errors.rating}</p>
          )}
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block font-bold mb-2 ml-2">Category</label>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              {formData.category || "Choose a category"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {categories.map((category) => (
                <Dropdown.Item
                  key={category}
                  onClick={() => handleDropdownSelect(category)}
                >
                  {category}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddBooks;
