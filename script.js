(function() {
  // invocation

  scrolling();
  fixMenu();

  /// parallax

  function scrolling() {
    const parallax = document.querySelector(".parallax");
    const par1 = document.querySelector(".col-2");
    const par2 = document.querySelector(".col-3");

    window.addEventListener("scroll", function() {
      let scrolledHeight = window.pageYOffset;
      let winWidth = parallax.offsetWidth;
      let limit = parallax.offsetTop + parallax.offsetHeight;

      console.log(winWidth);
      if (
        winWidth > 800 &&
        scrolledHeight > parallax.offsetTop &&
        scrolledHeight <= limit
      ) {
        let sdvig = scrolledHeight - parallax.offsetTop;

        par1.style.transform = `translateY(${-sdvig / 2}px)`;
        par2.style.transform = `translateY(${-sdvig}px)`;
      }
    });
  }

  ///fixed menu

  function fixMenu() {
    let header = document.querySelector(".header--fix");

    window.addEventListener("scroll", function() {
      if (window.pageYOffset >= 100) {
        header.classList.add("fixed", "fadeInDown");
        header.classList.remove("fadeOutUp");
      } else {
        header.classList.remove("fixed", "fadeInDown");
        header.classList.add("fadeOutUp");
      }
    });
  }
})();
