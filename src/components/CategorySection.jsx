import ManCategory from "../assets/Images/man.png";
import WomenCategory from "../assets/Images/woman.png";
import KidCategory from "../assets/Images/kid.png";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const categories = [
  {
    title: "Men",
    imageUrl: ManCategory,
  },
  {
    title: "Women",
    imageUrl: WomenCategory,
  },
  {
    title: "Kids",
    imageUrl: KidCategory,
  },
];

const CategorySection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 100, rotate: 10 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6"
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {categories.map((category, index) => (
        <motion.div
          key={index}
          className="relative h-64 transition-transform duration-300 hover:scale-105 hover:rotate-0 cursor-pointer"
          variants={itemVariants}
        >
          <img
            src={category.imageUrl}
            alt="imageCategory"
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
          <div className="absolute top-20 left-12">
            <p className="text-xl font-bold">{category.title}</p>
            <p className="text-gray-600">View All</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CategorySection;
