import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, x: 0, y: 40 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 40 },
};

const AnimatedLayout = ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element => {
  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.9, type: "easeInOut" }}
      className="relative"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedLayout;
