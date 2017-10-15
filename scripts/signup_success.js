var xmlns = "http://www.w3.org/2000/svg",
  select = function(s) {
    return document.querySelector(s);
  },
  selectAll = function(s) {
    return document.querySelectorAll(s);
  },
  container = select(".container"),
  dottedPath = select("#dottedPath");


TweenMax.set(container, {
  position: "absolute",
  top: "70%",
  left: "50%",
  xPercent: -50,
  yPercent: -50
});
TweenMax.set("svg", {
  visibility: "visible"
});

TweenMax.set([".smallHand", "#bigHand"], {
  drawSVG: "100% 100%"
});

var tl = new TimelineMax({ repeat: -1 });
tl
  .from(".messageOutline", 1, {
    y: -300,
    transformOrigin: "50% 50%",
    ease: Elastic.easeOut.config(0.5, 0.8)
  })
  .from(
    "#messageFlap",
    1.2,
    {
      y: -500,
      ease: Elastic.easeOut.config(0.5, 0.93)
    },
    "-=1"
  )
  .from(".smallHand", 0.5, {
    y: 50,
    ease: Elastic.easeInOutBack,
    scale: 1.2
  })
  .from(
    ".smallHand",
    0.6,
    {
      alpha: 0
    },
    "-=0.5"
  )
  .to(
    "#emailGroup",
    0.2,
    {
      scale: 0.8,
      repeat: 1,
      yoyo: true,
      ease: Power1.easeInOut,
      transformOrigin: "50% 50%"
    },
    "-=0.3"
  )
  .staggerTo(
    ".ring",
    2,
    {
      cycle: {
        attr: [{ r: 160 }, { r: 140 }, { r: 120 }]
      }
    },
    0.125,
    "-=0.1"
  )
  .staggerTo(
    ["#hideRing", "#showRing"],
    2,
    {
      cycle: {
        attr: [{ r: 160 }, { r: 140 }]
      }
    },
    0.5,
    "-=2.29"
  )
  .staggerTo(
    ".ring",
    1,
    {
      alpha: 0
    },
    0.125,
    "-=1.9"
  );

tl.timeScale(1);

