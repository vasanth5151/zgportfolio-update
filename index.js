var page1content = document.querySelector("#page1_content");
var cursor = document.querySelector("#cursor");

page1content.addEventListener("mousemove",(dets)=>{
  gsap.to(cursor,{
    x:dets.x,
    y:dets.y
  })

})

page1content.addEventListener("mouseenter", ()=>{
  gsap.to(cursor,{
    scale:1,
    opacity:1
  })

})

page1content.addEventListener("mouseleave", ()=>{
  gsap.to(cursor,{
    scale:0,
    opacity:0
  })
  
})



// menubar
document.addEventListener('DOMContentLoaded', function() {
  const menuButton = document.getElementById('menu-button');
  const fullpageMenu = document.getElementById('fullpage-menu');
  const closeMenu = document.getElementById('close-menu');
  
  // Open menu
  menuButton.addEventListener('click', function() {
    fullpageMenu.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
  });
  
  // Close menu
  closeMenu.addEventListener('click', function() {
    fullpageMenu.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
  });
  
  // Close menu when clicking outside content
  fullpageMenu.addEventListener('click', function(e) {
    if (e.target === fullpageMenu) {
      fullpageMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});




// GSAP to be fully loaded animation
document.addEventListener('DOMContentLoaded', function() {
  // Check if SplitText is available
  if (typeof SplitText === 'undefined') {
      console.error('SplitText is not loaded. Please check the CDN link.');
      // Fallback: simple fade-in animation
      gsap.from(".hero_text h1", {
          duration: 1.5,
          opacity: 0,
          y: 50,
          ease: "power4.out",
          delay: 0.5
      });
      return;
  }

  try {
      // Initialize SplitText for the heading
      const childSplit = new SplitText(".hero_text h1", {
          type: "lines",
          linesClass: "split-child"
      });
      
      const parentSplit = new SplitText(".hero_text h1", {
          type: "lines",
          linesClass: "split-parent"
      });

      // Animate the text lines
      gsap.from(childSplit.lines, {
          duration: 1.5,
          yPercent: 150,
          ease: "power4.out",
          stagger: 0.1,
          delay: 0.4
      });

  } catch (error) {
      console.error('Error initializing SplitText:', error);
      // Fallback animation
      gsap.from(".hero_text h1", {
          duration: 1.5,
          opacity: 0,
          y: 50,
          ease: "power4.out",
          delay: 0.4
      });
  }
});


// GSAP to be fully loaded animation on scroll

window.addEventListener("load", function() {
  const paragraph1 = document.querySelector("#animated_paragraph1");
  const paragraph2 = document.querySelector("#about_head_text");
  const paragraph3 = document.querySelector("#animated_paragraph2");
  const paragraph4 = document.querySelector("#animated");
  const paragraph5 = document.querySelector("#animatedtech");
  const paragraph6 = document.querySelector("#center-text");

  gsap.from(paragraph1, {
    duration: 1.5,
    opacity: 0,
    y: 50,
    ease: "power4.out",
    scrollTrigger: {
      trigger: paragraph1,      // the element that triggers the animation
      start: "top 80%",        // when top of paragraph hits 80% of viewport height
      toggleActions: "play none none none", // play animation only once
    }
  });

  gsap.from(paragraph2, {
    duration: 1.5,
    opacity: 0,
    y: 50,
    ease: "power4.out",
    scrollTrigger: {
      trigger: paragraph2,      // the element that triggers the animation
      start: "top 80%",        // when top of paragraph hits 80% of viewport height
      toggleActions: "play none none none", // play animation only once
    }
  });

  gsap.from(paragraph3, {
    duration: 1.5,
    opacity: 0,
    y: 50,
    ease: "power4.out",
    scrollTrigger: {
      trigger: paragraph3,      // the element that triggers the animation
      start: "top 80%",        // when top of paragraph hits 80% of viewport height
      toggleActions: "play none none none", // play animation only once
    }
  });

  gsap.from(paragraph4, {
    duration: 1.5,
    opacity: 0,
    y: 50,
    ease: "power4.out",
    scrollTrigger: {
      trigger: paragraph4,      // the element that triggers the animation
      start: "top 80%",        // when top of paragraph hits 80% of viewport height
      toggleActions: "play none none none", // play animation only once
    }
  });

  gsap.from(paragraph5, {
    duration: 1.5,
    opacity: 0,
    y: 50,
    ease: "power4.out",
    scrollTrigger: {
      trigger: paragraph5,      // the element that triggers the animation
      start: "top 80%",        // when top of paragraph hits 80% of viewport height
      toggleActions: "play none none none", // play animation only once
    }
  });

  gsap.from(paragraph6, {
    duration: 1.5,
    opacity: 0,
    y: 50,
    ease: "power4.out",
    scrollTrigger: {
      trigger: paragraph6,      // the element that triggers the animation
      start: "top 80%",        // when top of paragraph hits 80% of viewport height
      toggleActions: "play none none none", // play animation only once
    }
  });
});

// paarticles js
document.addEventListener("DOMContentLoaded", () => {
  // particles.js example
  particlesJS("particles-js", {
    "particles": {
      "number": { "value": 50 },
      "color": { "value": "#ffffff" },
      "shape": { "type": "circle" },
      "opacity": { "value": 0.5 },
      "size": { "value": 3 },
      "line_linked": {
        "enable": true,
        "distance": 120,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": { "enable": true, "speed": 2, "out_mode": "out" }
    },
    "interactivity": {
      "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" } },
      "modes": { "repulse": { "distance": 100 }, "push": { "particles_nb": 4 } }
    },
    "retina_detect": true
  });
});

// services

document.addEventListener('DOMContentLoaded', function() {
 
  const navItems = document.querySelectorAll('.service_nav');
  const contentPanels = document.querySelectorAll('.service_content');
  
  // Initialize GSAP animations
  gsap.registerPlugin(Flip);
  
  // Set up click handlers for each nav item
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      const target = this.dataset.target;
      
      // Remove active class from all nav items
      navItems.forEach(nav => nav.classList.remove('active'));
      
      // Add active class to clicked nav item
      this.classList.add('active');
      
      // Get the state before changes
      const state = Flip.getState(contentPanels, {props: "opacity,visibility"});
      
      // Remove active class from all content panels
      contentPanels.forEach(panel => panel.classList.remove('active'));
      
      // Add active class to target content panel
      const targetPanel = document.querySelector(`.service_content[data-service="${target}"]`);
      targetPanel.classList.add('active');

      
      // Animate the transition
      Flip.from(state, {
        duration: 0.8,
        ease: "power2.inOut",
        absolute: true,
        nested: true,
        onComplete: () => {
        
          contentPanels.forEach(panel => {
            if (!panel.classList.contains('active')) {
              panel.style.position = 'absolute';
            }
          });
        }
      });
    });
  });
  
  // Initialize first panel
  const firstPanel = document.querySelector('.service_content active');
  if (firstPanel) {
    firstPanel.style.position = 'relative';
    firstPanel.style.opacity = '1';
    firstPanel.style.visibility = 'visible';
  }

  
    // Mobile/Tablet Read More functionality
  function setupReadMore() {
    if (window.innerWidth <= 1024) {
      const readMoreBtns = document.querySelectorAll('.read-more-btn');
      const rightSide = document.querySelector('.rightside_service');
      
      // Set initial position (up)
      rightSide.style.marginTop = '0';
      
      readMoreBtns.forEach(btn => {
        btn.style.display = 'inline-block';
        btn.addEventListener('click', function() {
          const text = this.previousElementSibling;
          text.classList.toggle('expanded');
          this.classList.toggle('expanded');
          
          // Calculate needed space
          const contentText = this.closest('.content_text');
          const contentHeight = contentText.scrollHeight;
          
          // Move rightside down when expanded
          if (text.classList.contains('expanded')) {
            rightSide.style.marginTop = `${contentHeight * 0.2}px`;
            this.textContent = 'Read Less';
          } else {
            rightSide.style.marginTop = '0';
            this.textContent = 'Read More';
          }
        });
      });
    } else {
      // Desktop cleanup
      document.querySelectorAll('.read-more-btn').forEach(btn => {
        btn.style.display = 'none';
      });
      document.querySelectorAll('.truncated-text').forEach(text => {
        text.classList.remove('expanded');
      });
      document.querySelector('.rightside_service').style.marginTop = '0';
    }
  }

  // Initialize
  setupReadMore();
  window.addEventListener('resize', setupReadMore);
      
  });






/* zero gravity 3d rotation */
select = e => document.querySelector(e);
selectAll = e => document.querySelectorAll(e);

const stage = select('.stage');
const tubeInner = select(".tube__inner");
const clone = document.getElementsByClassName("line"); // as need to update node list
const numLines = 10;
const fontSize = gsap.getProperty(':root', '--fontSize');
const angle = 360/numLines;
let radius = 0;
let origin = 0;

function set3D() {
    let width = window.innerWidth;
    let fontSizePx = (width/100)*fontSize;
    radius = (fontSizePx/2)/Math.sin((180/numLines)*(Math.PI/180)); // using Pythagoras Eq
    origin = `50% 50% -${radius}px`;
}

function clodeNode() {
    
    for (var i = 0; i < (numLines-1); i++) {
        let newClone = clone[0].cloneNode(true); // clone the header
        let lineClass = "line--"+(i+2); // create class name to append
        newClone.classList.add(lineClass); // add incremented line class
        tubeInner.appendChild(newClone); // append the clone
    }
    
    clone[0].classList.add("line--1"); // add line1 class to the first node
}

function positionTxt() {
	gsap.set('.line', {
		rotationX: function(index) {
			return -angle*index;
		},
		z: radius,
		transformOrigin: origin
	});
}

function setProps(targets) {
    targets.forEach( function(target) {
        let paramSet = gsap.quickSetter(target, "css");
        let degrees = gsap.getProperty(target, "rotateX");
        let radians = degrees * (Math.PI/180);
        let conversion = Math.abs(Math.cos(radians) / 2 + 0.5); // 1 - 0 half cosine wave
        let fontW = 200 + 700*conversion;
        let fontS = `${100 + 700*conversion}%`;

        paramSet({
            opacity: conversion+0.1, 
            // x: 300*conversion, 
            fontWeight: fontW, 
            fontStretch: fontS 
        });
        console.log(fontW);
    })
}

function scrollRotate() {
    gsap.to('.line', {
        scrollTrigger: {
            trigger: '.stage',        
            start: "top top",
            end: "bottom top",
            scrub: true,
            
        },
        rotateX: "+=1080",
        onUpdate: function() {
            setProps(this.targets());
        }
    })
    
    gsap.to('.tube', {
        scrollTrigger: {
            trigger: '.stage',
            scrub: true,
            start: "top top",
            end: "bottom top",
        },
        perspective: '1vw',
        ease: 'expo.out'
    })
}

function init() {
    clodeNode();
    set3D();
    window.onresize = () => {
        set3D();
        positionTxt();
    }
    positionTxt(); 
    setProps(gsap.utils.toArray(".line"));
    scrollRotate();
    gsap.to(stage, { autoAlpha: 1, duration: 2, delay: 2 });
}

window.onload = () => {
	init();
};

// Show the .tube only during scroll of .rotating-text-section
gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.create({
    trigger: ".rotating-text-section",
    start: "top top",
    end: "bottom top",
    onEnter: () => gsap.to(".tube", { opacity: 1, duration: 0.5 }),
    onLeave: () => gsap.to(".tube", { opacity: 0, duration: 0.5 }),
    onEnterBack: () => gsap.to(".tube", { opacity: 1, duration: 0.5 }),
    onLeaveBack: () => gsap.to(".tube", { opacity: 0, duration: 0.5 })
  });






// socila media showcase section

gsap.registerPlugin(CustomEase);
CustomEase.create("cubic", "0.83, 0, 0.17, 1");

let isAnimating = false;


function splitTextIntoSpans(selector) {
  let elements = document.querySelectorAll(selector);
  elements.forEach(element => {
    let text = element.innerText;
    let splitText = text
      .split("")
      .map(function(char) {
        return `<span>${char === " " ? "&nbsp;&nbsp;" : char}</span>`;
      })
      .join("");
    element.innerHTML = splitText;
  });
}

function initializeCards() {
  let cards = Array.from(document.querySelectorAll(".card"));
  gsap.to(cards, {
    y: i => -15 + 15 * i + "%",
    z: i => 15 * i,
    duration: 1,
    ease: "cubic",
    stagger: -0.1
  });
}

document.addEventListener("DOMContentLoaded", () => {
  splitTextIntoSpans(".copy h1");
  initializeCards();
  gsap.set("h1 span", { y: -200 });
  gsap.set(".slider .card:last-child h1 span", { y: 0 });
});

// Event listener for click events
document.addEventListener("click", () => {
   
  if (isAnimating) return;

  isAnimating = true;
  
  let slider = document.querySelector(".slider");
  let cards = Array.from(slider.querySelectorAll(".card"));
  let lastCard = cards.pop(); 
  let nextCard = cards[cards.length - 1]; 

 
  gsap.to(lastCard.querySelectorAll("h1 span"), {
    y: 200,
    duration: 0.75,
    ease: "cubic"
  });

  gsap.to(lastCard, {
    y: "+=150%",
    duration: 0.75,
    ease: "cubic",
    onComplete: () => {
      slider.prepend(lastCard);
    
      initializeCards();
     
      gsap.set(lastCard.querySelectorAll("h1 span"), { y: -200 });
     
      setTimeout(() => {
        isAnimating = false;
      }, 1000);
    }
  });

  // Animate the next card to move upwards and fade in
  gsap.to(nextCard.querySelectorAll("h1 span"), {
    y: 0,
    duration: 1,
    ease: "cubic",
    stagger: 0.05
  });
});






 // Scroll to Top BUTTON Functionality
document.addEventListener('DOMContentLoaded', function() {
  const scrollBtn = document.querySelector('.scroll-top');
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollBtn.classList.add('active');
    } else {
      scrollBtn.classList.remove('active');
    }
  });
  
  // Smooth scroll to top
  scrollBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Continuous rotation for the circle
  const rotatingText = document.querySelector('.rotating-text');
  let rotation = 0;
  
  function rotate() {
    rotation += 0.5;
    if (rotation >= 360) rotation = 0;
    rotatingText.style.transform = `rotate(${rotation}deg)`;
    requestAnimationFrame(rotate);
  }
  
  rotate();

});
