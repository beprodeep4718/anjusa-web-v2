/**
 * Centralized image configuration for the application
 * This file manages all image references, making it easy to:
 * - Add/remove images
 * - Update image paths
 * - Switch to API/CDN-based images later
 */

export const artworkImages = [
  { id: 1, path: 'images/artwork/img1.webp', alt: 'Artwork 1' },
  { id: 2, path: 'images/artwork/img2.webp', alt: 'Artwork 2' },
  { id: 3, path: 'images/artwork/img3.webp', alt: 'Artwork 3' },
  { id: 4, path: 'images/artwork/img4.webp', alt: 'Artwork 4' },
  { id: 5, path: 'images/artwork/img5.webp', alt: 'Artwork 5' },
  { id: 6, path: 'images/artwork/img6.webp', alt: 'Artwork 6' },
  { id: 7, path: 'images/artwork/img7.webp', alt: 'Artwork 7' },
  { id: 8, path: 'images/artwork/img8.webp', alt: 'Artwork 8' },
  { id: 9, path: 'images/artwork/img9.webp', alt: 'Artwork 9' },
];

/**
 * Slide carousel images
 * Add more images here as needed
 */
export const slideImages = [
  { id: 8, path: 'images/slide/img8.jpg', alt: 'Slide 8' },
  { id: 9, path: 'images/slide/img9.jpg', alt: 'Slide 9' },
  { id: 10, path: 'images/slide/img10.jpeg', alt: 'Slide 10' },
  { id: 11, path: 'images/slide/img11.jpeg', alt: 'Slide 11' },
  { id: 12, path: 'images/slide/img12.jpeg', alt: 'Slide 12' },
  { id: 13, path: 'images/slide/img13.jpeg', alt: 'Slide 13' },
  { id: 14, path: 'images/slide/img14.jpeg', alt: 'Slide 14' },
];

/**
 * Outdoor location images
 * These are already managed in data.js, but you can reference them here if needed
 */
export const outdoorImages = [
  { id: 1, path: 'images/outdoor/outdoor-1.jpg', alt: 'Mayapur' },
  { id: 2, path: 'images/outdoor/outdoor-2.jpg', alt: 'Itachuna Rajbari' },
  { id: 3, path: 'images/outdoor/outdoor-3.jpg', alt: 'Princep Ghat Park' },
  { id: 4, path: 'images/outdoor/outdoor-4.jpg', alt: 'Balur Math' },
  { id: 5, path: 'images/outdoor/outdoor-5.jpeg', alt: 'Brindavanchandra Temple' },
];

/**
 * Get images by category
 * Usage: getImagesByCategory('artwork')
 */
export const getImagesByCategory = (category) => {
  const categories = {
    artwork: artworkImages,
    slide: slideImages,
    outdoor: outdoorImages,
  };
  return categories[category] || [];
};
