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






// floating-texts animation
let currentText = null;

const textLinks = document.querySelectorAll('.floating-texts a');

textLinks.forEach((link) => {
  const textEl = link.querySelector('.animated-text');

  link.addEventListener('mouseenter', () => {
    // Hide previously active text
    if (currentText && currentText !== textEl) {
      gsap.to(currentText, { opacity: 0, scale: 0.8, duration: 0.3, ease: "power2.in" });
    }

    // Show new hovered text
    gsap.to(textEl, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" });
    currentText = textEl;
  });

  link.addEventListener('mouseleave', () => {
    gsap.to(textEl, { opacity: 0, scale: 0.8, duration: 0.4, ease: "power2.in" });
    
    // Only clear if it's the same
    if (currentText === textEl) {
      currentText = null;
    }
  });
});





// circle style design
document.addEventListener('DOMContentLoaded', function() {
  const mainCards = document.querySelectorAll('.main-card');
  const subcardsContainer = document.getElementById('subcards-container');
  const centerText = document.getElementById('center-text'); // Add this ID to your HTML
  
  // Define subcards for each category
  const subcardsData = {
    wedding: [
      { title: "Zerogravity Photography", img: "assests/zg photography.png" },
      { title: "Knot stories", img: "assests/knotstories.png" },
      { title: "Vermilion Decores", img: "assests/vermilion.png" },
      { title: "Divine Cateres", img: "assests/divine.png" }
    ],
    design: [
      { title: "Alpha Design", img: "assests/alphadesign.png" },
      { title: "Alpha Albums", img: "assests/alphadesign.png" }
    ],
    printing: [
      { title: "ZG photograpgy Frame", img: "assests/zgframe.png" },
    ],
    packaging: [
      { title: "Alpha Packaging", img: "assests/alphapackage.png" },
      { title: "Pinkribbon Shop", img: "assests/pinkribbon.png" }
    ],
    digital: [
      { title: "Zerogravity Marketing", img: "assests/zgdigital.png" }
    ],
    technology: [
      { title: "Zerogravity Tech", img: "assests/zgtech.png" }
    ]
  };
  
  mainCards.forEach(card => {
    card.addEventListener('click', function(e) {
      e.stopPropagation();
      const category = this.getAttribute('data-category');
      
      // Animate out center text if visible
      if (centerText.style.opacity !== '0') {
        gsap.to(centerText, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            centerText.style.display = 'none';
          }
        });
      }
      
      // Animate out existing subcards if any
      const existingSubcards = subcardsContainer.querySelectorAll('.subcard');
      if (existingSubcards.length > 0) {
        gsap.to(existingSubcards, {
          opacity: 0,
          y: 20,
          duration: 0.2,
          stagger: 0.05,
          onComplete: () => {
            subcardsContainer.innerHTML = '';
            createNewSubcards(category, this);
          }
        });
      } else {
        createNewSubcards(category, this);
      }
    });
  });
  
  function createNewSubcards(category, clickedCard) {
    if (subcardsData[category]) {
      // Clear container
      subcardsContainer.innerHTML = '';
      
      // Set container size based on subcard count
      if (subcardsData[category].length === 1) {
        subcardsContainer.style.gridTemplateColumns = '1fr';
        subcardsContainer.style.gridTemplateRows = '1fr';
        subcardsContainer.style.width = '180px';
        subcardsContainer.style.height = '180px';
      } else if (subcardsData[category].length === 2) {
        subcardsContainer.style.gridTemplateColumns = '1fr';
        subcardsContainer.style.gridTemplateRows = 'repeat(2, 1fr)';
        subcardsContainer.style.width = '180px';
        subcardsContainer.style.height = '360px';
      } else {
        subcardsContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
        subcardsContainer.style.gridTemplateRows = 'repeat(2, 1fr)';
        subcardsContainer.style.width = '360px';
        subcardsContainer.style.height = '360px';
      }
      
      // Create and animate in new subcards
      subcardsData[category].forEach((subcard, index) => {
        const subcardElement = document.createElement('div');
        subcardElement.className = 'subcard';
        subcardElement.style.opacity = '0';
        subcardElement.style.transform = 'translateY(20px) scale(0.9)';
        subcardElement.innerHTML = `
          <img src="${subcard.img}" alt="${subcard.title}">
          <span>${subcard.title}</span>
        `;
        subcardsContainer.appendChild(subcardElement);
        
        // Animate in with GSAP
        gsap.to(subcardElement, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          delay: index * 0.1,
          ease: "back.out(1.2)"
        });
      });
      
      // Show container
      subcardsContainer.style.display = 'grid';
      
      // Animate clicked card
      gsap.to(clickedCard, {
        zIndex: 15,
        scale: 1.05,
        duration: 0.3
      });
      
      // Reset other cards
      document.querySelectorAll('.main-card').forEach(c => {
        if (c !== clickedCard) {
          gsap.to(c, {
            zIndex: 5,
            scale: 1,
            duration: 0.3
          });
        }
      });
    }
  }
  
  // Click outside to close subcards and show center text again
  document.addEventListener('click', function() {
    if (subcardsContainer.style.display === 'grid') {
      gsap.to(subcardsContainer.querySelectorAll('.subcard'), {
        opacity: 0,
        y: 20,
        duration: 0.2,
        stagger: 0.05,
        onComplete: () => {
          subcardsContainer.style.display = 'none';
          // Show center text again
          centerText.style.display = 'block';
          gsap.to(centerText, {
            opacity: 1,
            duration: 0.3
          });
        }
      });
      
      // Reset all cards
      document.querySelectorAll('.main-card').forEach(card => {
        card.style.zIndex = '5';
      });
    }
  });
  
  // Prevent subcards container from closing when clicking inside it
  subcardsContainer.addEventListener('click', function(e) {
    e.stopPropagation();
  });
});


