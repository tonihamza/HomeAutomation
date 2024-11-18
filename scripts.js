// Select all menu links
const menuLinks = document.querySelectorAll('.menu-link');
const mainContainer = document.querySelector('.main-container');

// Handle navigation clicks
menuLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const target = link.getAttribute('data-target'); // Get target section
    const targetSection = document.getElementById(target);

    // Calculate the position of the target section
    const targetPosition = targetSection.offsetTop;

    // Smooth scroll effect by setting transform on the container
    mainContainer.style.transform = `translateY(-${targetPosition}px)`;
  });
});
