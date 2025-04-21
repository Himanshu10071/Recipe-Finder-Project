// /**
//  * Format cooking time to a more readable format
//  * @param {number} minutes - Time in minutes
//  * @returns {string} Formatted time
//  */
// export const formatCookingTime = (minutes) => {
//   if (!minutes) return 'N/A';
  
//   if (minutes < 60) {
//     return `${minutes} min`;
//   }
  
//   const hours = Math.floor(minutes / 60);
//   const remainingMinutes = minutes % 60;
  
//   if (remainingMinutes === 0) {
//     return `${hours} hr`;
//   }
  
//   return `${hours} hr ${remainingMinutes} min`;
// };

// /**
//  * Truncate text to a specific length and add ellipsis
//  * @param {string} text - Text to truncate
//  * @param {number} maxLength - Maximum length
//  * @returns {string} Truncated text with ellipsis if needed
//  */
// export const truncateText = (text, maxLength = 100) => {
//   if (!text) return '';
  
//   if (text.length <= maxLength) return text;
  
//   return text.slice(0, maxLength) + '...';
// };

// /**
//  * Check if an object is empty
//  * @param {object} obj - Object to check
//  * @returns {boolean} True if empty, false otherwise
//  */
// export const isEmptyObject = (obj) => {
//   return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
// };

// /**
//  * Generate a random hex color
//  * @returns {string} Random hex color
//  */
// export const getRandomColor = () => {
//   return '#' + Math.floor(Math.random() * 16777215).toString(16);
// }; 