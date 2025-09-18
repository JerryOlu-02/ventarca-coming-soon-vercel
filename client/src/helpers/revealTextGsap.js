import gsap from "gsap";

const revealText = function (classes) {
  const titles = gsap.utils.toArray(classes);
  const tl = gsap.timeline({
    defaults: { duration: 1 },
  });

  titles.forEach((title, index) => {
    const delay = index * 0.08;

    tl.to(
      title,
      {
        y: "0%",
        duration: 1.5,
        ease: "cubic-text",
      },
      delay
    );
  });
};

export { revealText };
