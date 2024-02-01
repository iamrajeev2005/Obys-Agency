function loaderAnim(){
  var tl = gsap.timeline()
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
      delay:2.5
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
}
loaderAnim();