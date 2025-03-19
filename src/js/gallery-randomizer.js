function randomizeGalleryItems() {
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.style.width = '';

    const randomWidth = Math.floor(Math.random() * (450 - 275 + 1)) + 275;
    item.style.width = `${randomWidth}px`;
  });
}

export { randomizeGalleryItems };