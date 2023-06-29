import React from 'react';
import { motion } from 'framer-motion';

const Item = ({ key, image, name, price }) => {
  return (
    <motion.div
      className="select-none w-48 h-52 bg-white rounded-xl shadow-lg flex flex-col justify-between p-4 cursor-pointer"
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
    >
      <div className="flex justify-center items-center">
        <img src={"/uploads/" + image} alt={name} className="w-32 h-32" />
      </div>
      <div className="text-center mt-1">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600 overflow-hidden overflow-ellipsis whitespace-nowrap">฿{price}</p>
      </div>
    </motion.div>
  );
};

export default Item;
