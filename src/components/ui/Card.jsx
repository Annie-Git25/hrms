import React from 'react';

const Card = ({ title, description, children }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 w-full max-w-md mx-auto">
      {title && <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h2>}
      {description && <p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>}
      {children}
    </div>
  );
};

export default Card;
