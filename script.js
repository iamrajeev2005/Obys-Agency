function locomotive() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
function loaderAnim() {
  var tl = gsap.timeline();
  tl.from(".loader .text h1,.loader .text h2", {
    y: "200%",
    duration: 0.8,
    stagger: 0.2,
    dealy: 0.5,
  });

  const counter = document.querySelector(".loader .text1 .count h5");
  var grow = 0;
  setInterval(() => {
    if (grow < 100) {
      counter.innerHTML = grow++;
    } else {
      counter.innerHTML = grow;
    }
  }, 30);

  tl.to(".loader", {
    y: "-100%",
    display: "none",
    duration: 1,
    delay: 2.5,
  });
  gsap.to(".loader .texts .text3 h2", {
    opacity: 1,
    duration: 0.6,
    AnimationName: "fontChange",
  });
  tl.from(".page1", {
    y: "100%",
    duration: 1,
    delay: -1,
  });
  tl.from(
    ".page1 .hero-texts h1,.page1 .hero-texts h2,.page1 .hero-texts h3,.page1 .hero-texts h4",
    {
      y: "100%",
      duration: 0.5,
      stagger: 0.2,
      delay: -0.5,
    }
  );
}

function crsrAnim() {
  document.addEventListener("mousemove", function (e) {
    gsap.to(".cursor", {
      left: e.x,
      top: e.y,
      ease: "power4",
    });
  });
}

function videoCrsr() {
  document
    .querySelector(".video-container")
    .addEventListener("mouseenter", function () {
      gsap.to(".cursor", {
        display: "none",
        opacity: 0,
      });
      document
        .querySelector(".video-container")
        .addEventListener("mousemove", function (dets) {
          gsap.to(".video-cursor", {
            left: dets.x - 380,
            top: dets.y - 230,
          });
        });
    });

  document
    .querySelector(".video-container")
    .addEventListener("mouseleave", function () {
      gsap.to(".cursor", {
        opacity: 1,
        display: "block",
      });
      gsap.to(".video-cursor", {
        left: "70%",
        top: "-17%",
      });
    });
  var flag = 0;
  var videoContainer = document.querySelector(".video-container");
  var video = document.querySelector(".video-container video");
  videoContainer.addEventListener("click", function () {
    if (flag == 0) {
      video.style.opacity = 1;
      video.play();
      document.querySelector(
        ".video-container .video-cursor"
      ).innerHTML = `<i class="ri-pause-line"></i>`;
      gsap.to(".video-container .video-cursor", {
        scale: 0.5,
      });
      flag = 1;
    } else {
      video.style.opacity = 0;
      video.pause();
      document.querySelector(
        ".video-container .video-cursor"
      ).innerHTML = `<i class="ri-play-fill"></i>`;
      gsap.to(".video-container .video-cursor", {
        scale: 1,
      });
      flag = 0;
    }
  });
}

function heroAnim() {
  const flagImg = document.querySelector("#flag");
  document.addEventListener("mousemove", function (e) {
    gsap.to(flagImg, {
      x: e.x - 380,
      y: e.y - 380,
    });
  });
  document.querySelector("#line3").addEventListener("mouseenter", function () {
    gsap.to(flagImg, {
      opacity: 1,
    });
  });
  document.querySelector("#line3").addEventListener("mouseleave", function () {
    gsap.to(flagImg, {
      opacity: 0,
    });
  });
}

Shery.makeMagnet(".page1 nav .nav-1 .svg svg,.page1 nav .nav-2 a");

loaderAnim();
crsrAnim();
heroAnim();
locomotive();
videoCrsr();
