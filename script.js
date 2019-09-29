(function() {
  // invocation

  scrolling();
  fixMenu();
  cardShine();

  /// parallax

  function scrolling() {
    const parallax = document.querySelector(".parallax");
    const par1 = document.querySelector(".col-2");
    const par2 = document.querySelector(".col-3");

    window.addEventListener("scroll", function() {
      let scrolledHeight = window.pageYOffset;
      let winWidth = parallax.offsetWidth;
      let limit = parallax.offsetTop + parallax.offsetHeight;

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

  /////card shining

  function cardShine() {
    function atvImg() {
      var d = document,
        de = d.documentElement,
        bd = d.getElementsByTagName("body")[0],
        htm = d.getElementsByTagName("html")[0],
        win = window,
        imgs = d.querySelectorAll(".atvImg"),
        totalImgs = imgs.length,
        supportsTouch = "ontouchstart" in win || navigator.msMaxTouchPoints;

      if (totalImgs <= 0) {
        return;
      }

      // build HTML
      for (var l = 0; l < totalImgs; l++) {
        var thisImg = imgs[l],
          layerElems = thisImg.querySelectorAll(".atvImg-layer"),
          totalLayerElems = layerElems.length;

        if (totalLayerElems <= 0) {
          continue;
        }

        while (thisImg.firstChild) {
          thisImg.removeChild(thisImg.firstChild);
        }

        var containerHTML = d.createElement("div"),
          shineHTML = d.createElement("div"),
          shadowHTML = d.createElement("div"),
          layersHTML = d.createElement("div"),
          layers = [];

        thisImg.id = "atvImg__" + l;
        containerHTML.className = "atvImg-container";
        shineHTML.className = "atvImg-shine";
        shadowHTML.className = "atvImg-shadow";
        layersHTML.className = "atvImg-layers";

        for (var i = 0; i < totalLayerElems; i++) {
          var layer = d.createElement("div"),
            imgSrc = layerElems[i].getAttribute("data-img");
          backColor = layerElems[i].getAttribute("data-color");
          name = layerElems[i].getAttribute("data-name");

          layer.className = "atvImg-rendered-layer";
          layer.setAttribute("data-layer", i);
          layer.style.backgroundImage = "url(" + imgSrc + ")";
          layer.style.background = backColor;
          layersHTML.appendChild(layer);
          layers.push(layer);
        }

        containerHTML.appendChild(shadowHTML);
        containerHTML.appendChild(layersHTML);
        containerHTML.appendChild(shineHTML);
        thisImg.appendChild(containerHTML);

        var w =
          thisImg.clientWidth || thisImg.offsetWidth || thisImg.scrollWidth;
        thisImg.style.transform = "perspective(" + w * 3 + "px)";

        if (supportsTouch) {
          win.preventScroll = false;

          (function(_thisImg, _layers, _totalLayers, _shine) {
            thisImg.addEventListener("touchmove", function(e) {
              if (win.preventScroll) {
                e.preventDefault();
              }
              processMovement(e, true, _thisImg, _layers, _totalLayers, _shine);
            });
            thisImg.addEventListener("touchstart", function(e) {
              win.preventScroll = true;
              processEnter(e, _thisImg);
            });
            thisImg.addEventListener("touchend", function(e) {
              win.preventScroll = false;
              processExit(e, _thisImg, _layers, _totalLayers, _shine);
            });
          })(thisImg, layers, totalLayerElems, shineHTML);
        } else {
          (function(_thisImg, _layers, _totalLayers, _shine) {
            thisImg.addEventListener("mousemove", function(e) {
              processMovement(
                e,
                false,
                _thisImg,
                _layers,
                _totalLayers,
                _shine
              );
            });
            thisImg.addEventListener("mouseenter", function(e) {
              processEnter(e, _thisImg);
            });
            thisImg.addEventListener("mouseleave", function(e) {
              processExit(e, _thisImg, _layers, _totalLayers, _shine);
            });
          })(thisImg, layers, totalLayerElems, shineHTML);
        }
      }

      function processMovement(
        e,
        touchEnabled,
        elem,
        layers,
        totalLayers,
        shine
      ) {
        var bdst = bd.scrollTop || htm.scrollTop,
          bdsl = bd.scrollLeft,
          pageX = touchEnabled ? e.touches[0].pageX : e.pageX,
          pageY = touchEnabled ? e.touches[0].pageY : e.pageY,
          offsets = elem.getBoundingClientRect(),
          w = elem.clientWidth || elem.offsetWidth || elem.scrollWidth, // width
          h = elem.clientHeight || elem.offsetHeight || elem.scrollHeight, // height
          wMultiple = 320 / w,
          offsetX = 0.52 - (pageX - offsets.left - bdsl) / w, //cursor position X
          offsetY = 0.52 - (pageY - offsets.top - bdst) / h, //cursor position Y
          dy = pageY - offsets.top - bdst - h / 2, //@h/2 = center of container
          dx = pageX - offsets.left - bdsl - w / 2, //@w/2 = center of container
          yRotate = (offsetX - dx) * (0.07 * wMultiple), //rotation for container Y
          xRotate = (dy - offsetY) * (0.1 * wMultiple), //rotation for container X
          imgCSS = "rotateX(" + xRotate + "deg) rotateY(" + yRotate + "deg)", //img transform
          arad = Math.atan2(dy, dx), //angle between cursor and center of container in RAD
          angle = (arad * 180) / Math.PI - 90; //convert rad in degrees

        //get angle between 0-360
        if (angle < 0) {
          angle = angle + 360;
        }

        //container transform
        if (elem.firstChild.className.indexOf(" over") != -1) {
          imgCSS += " scale3d(1.07,1.07,1.07)";
        }
        elem.firstChild.style.transform = imgCSS;

        //gradient angle and opacity for shine
        shine.style.background =
          "linear-gradient(" +
          angle +
          "deg, rgba(255,255,255," +
          ((pageY - offsets.top - bdst) / h) * 0.4 +
          ") 0%,rgba(255,255,255,0) 80%)";
        shine.style.transform =
          "translateX(" +
          offsetX * totalLayers -
          0.1 +
          "px) translateY(" +
          offsetY * totalLayers -
          0.1 +
          "px)";

        //parallax for each layer
        var revNum = totalLayers;
        for (var ly = 0; ly < totalLayers; ly++) {
          layers[ly].style.transform =
            "translateX(" +
            offsetX * revNum * ((ly * 2.5) / wMultiple) +
            "px) translateY(" +
            offsetY * totalLayers * ((ly * 2.5) / wMultiple) +
            "px)";
          revNum--;
        }
      }

      function processEnter(e, elem) {
        elem.firstChild.className += " over";
      }

      function processExit(e, elem, layers, totalLayers, shine) {
        var container = elem.firstChild;

        container.className = container.className.replace(" over", "");
        container.style.transform = "";
        shine.style.cssText = "";

        for (var ly = 0; ly < totalLayers; ly++) {
          layers[ly].style.transform = "";
        }
      }
    }

    atvImg();

    var atv = document.getElementsByClassName("atvImg-layers");

    for (var i = 0; i < atv.length; i++) {
      var image = document.createElement("img");
      image.src = "images/Card.png";
      window.innerWidth > 498
        ? (image.style.height = "200px")
        : (image.style.height = "150px");
      var child = atv[i].firstElementChild.children[0];
      atv[i].insertBefore(image, child);
    }

    var credit = document.getElementsByClassName("credit")[0];

    var children = credit.children;
    var centerCard = children[0];
    centerCard.style.transform = "scale(1.2) perspective(900px)";
    centerCard.style.zIndex = 30;
  }
})();
