document.addEventListener('DOMContentLoaded', function () {
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  let slides = Array.from(track.querySelectorAll('.video-slide'));
  const slideCount = slides.length;
  const gap = 24; // match the CSS gap
  const slideWidth = slides[0].offsetWidth + gap;

  // Clone first and last slides
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slideCount - 1].cloneNode(true);

  // Add classes for detection if needed
  firstClone.classList.add('clone');
  lastClone.classList.add('clone');

  // Append/prepend clones
  track.insertBefore(lastClone, slides[0]);
  track.appendChild(firstClone);

  // Update slides after adding clones
  slides = Array.from(track.querySelectorAll('.video-slide'));

  // Set initial scroll position to first actual slide
  track.scrollLeft = slideWidth;

  let isTransitioning = false;

  // Adjust after scroll ends if needed
  const handleScrollLoop = () => {
    const maxScrollLeft = slideWidth * (slideCount + 1);

    if (track.scrollLeft <= 0) {
      // Jump to real last
      track.scrollLeft = slideWidth * slideCount;
    } else if (track.scrollLeft >= maxScrollLeft) {
      // Jump to real first
      track.scrollLeft = slideWidth;
    }
  };

  // Next
  nextBtn.addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;
    track.scrollBy({ left: slideWidth, behavior: 'smooth' });

    setTimeout(() => {
      handleScrollLoop();
      isTransitioning = false;
    }, 400); // should match scroll animation duration
  });

  // Prev
  prevBtn.addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;
    track.scrollBy({ left: -slideWidth, behavior: 'smooth' });

    setTimeout(() => {
      handleScrollLoop();
      isTransitioning = false;
    }, 400);
  });

  // Optional: adjust on manual scroll (if user drags track manually)
  track.addEventListener('scroll', handleScrollLoop);
});
