import { FaStar } from "react-icons/fa";
import { addToCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { ref, inView } = useInView({
    triggerOnce: true, // التأثير يظهر مرة واحدة
    threshold: 0.2, // يجب أن يظهر 20% من العنصر لكي يتفاعل
  });

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(addToCart(product));
    toast.success("Product Added Successfully!");
  };

  return (
    <Link to={`/product/${product.id}`}>
      <motion.div
        ref={ref}
        className="bg-white p-4 shadow-lg rounded-lg relative border transform transition-transform duration-500"
        style={{ perspective: "1000px" }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1, y: 0, rotateY: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{
          rotateY: [0, 10, -10, 0],
          scale: 1.05,
          transition: { duration: 0.6, ease: "easeInOut" },
        }}
        whileTap={{ scale: 0.95, rotate: -1 }}
      >
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-contain mb-4"
          style={{ transformStyle: "preserve-3d" }}
          initial={{ scale: 0.9, rotateZ: 10 }}
          animate={{ scale: 1, rotateZ: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{
            scale: 1.2,
            rotateZ: -10,
            transition: { duration: 0.4 },
          }}
        />
        <motion.h3
          className="text-lg font-semibold text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          whileHover={{
            scale: 1.1,
            rotateZ: [0, -2, 2, 0],
            transition: { duration: 0.3 },
          }}
        >
          {product.name}
        </motion.h3>
        <p className="text-gray-500 text-center">${product.price}</p>
        <div className="flex justify-center items-center mt-2">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              whileHover={{
                scale: 1.2,
                rotateZ: -20,
                transition: { duration: 0.3 },
              }}
            >
              <FaStar className="text-yellow-500" />
            </motion.div>
          ))}
        </div>
        <motion.div
          className="absolute right-2 bottom-4 flex items-center justify-center w-8 h-8 bg-red-600 group text-white text-sm rounded-full hover:w-32 hover:bg-red-700 transition-all"
          onClick={(e) => handleAddToCart(e, product)}
          whileHover={{
            scale: 1.2,
            rotateZ: [0, -5, 5, 0],
            transition: { duration: 0.4 },
          }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="group-hover:hidden">+</span>
          <span className="hidden group-hover:block">Add to cart</span>
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
