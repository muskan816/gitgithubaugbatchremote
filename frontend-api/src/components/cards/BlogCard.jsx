// src/components/cards/BlogCard.jsx
import { motion } from "framer-motion";

const BlogCard = ({ image, title, readTime }) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="w-72 bg-white rounded-2xl overflow-hidden shadow-md shrink-0 cursor-pointer border border-gray-100"
    >
      <div className="h-40 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 flex flex-col gap-1">
        <h3 className="font-semibold text-gray-900 line-clamp-2">
          {title}
        </h3>
        <p className="text-xs text-gray-500 mt-1">{readTime}</p>
      </div>
    </motion.div>
  );
};

export default BlogCard;
