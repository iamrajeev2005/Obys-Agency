function loaderAnim(){
    gsap.from(".loader .text h1", {
      y: "200%",
      duration: .8,
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

    gsap.to(".loader", {
      y: "-100%",
      display: "none",
      duration: 0.6,
      delay: 4,
    });
    gsap.to(".loader .texts .text3 h2", {
      opacity: 1,
      duration: 0.6,
      delay: 1.5,
      AnimationName: "fontChange",
    });
    gsap.from(".page1", {
      y: "100%",
      duration: 0.6,
      delay: 3.8,
    });
}
loaderAnim();