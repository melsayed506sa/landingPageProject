/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const ulElement = document.querySelector('#navbar__list');
const sections = document.querySelectorAll('section');
let objectsForSections=[];
const headingEle=document.querySelector(".main__hero");
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
const removeActiveClasses= ()=> {
    const allNavItems = document.querySelectorAll('.nav-item');
    for(let i=0;i<allNavItems.length;i++){
        allNavItems[i].classList.remove('active');
        sections[i].classList.remove('your-active-class');
    }
};

const defineCurrentSection=(scrollingNum)=>{
    objectsForSections.forEach((objectItem,index)=>{
        if(scrollingNum>=0 && scrollingNum<=200){
            removeActiveClasses();
        }
        else if(scrollingNum>=objectItem.minView && scrollingNum<=objectItem.maxView){
            removeActiveClasses();
            sections[index].classList.add('your-active-class');
            const liElementIndex = Number(sections[index].getAttribute('data-nav'))-1
            ulElement.childNodes[liElementIndex].classList.add('active');
        }
    })
};
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const buildingNavBar = ()=>{
        sections.forEach((section,index)=>{
        //creating the li elements
        const liElement = document.createElement('li');
        liElement.setAttribute('data-nav',`${index+1}`);
        liElement.classList.add('nav-item');
        liElement.innerHTML = `Section ${index+1}`;
        ulElement.appendChild(liElement); //append
    });
};
// Add class 'active' to section when near top of viewport
const clickOnAnyEleFunc = ()=>{
    ulElement.childNodes.forEach((liElement,index)=>{
        liElement.addEventListener('click',(evt)=>{
            removeActiveClasses();
            const currentSection = sections[index];
            currentSection.classList.add('your-active-class');
            currentSection.scrollIntoView({behavior:"smooth"});//scroll into the section
            evt.target.classList.add('active');// Set section as active
        });
    })
};
//build an array of objects to get the Dimensions Of the section
const makeObjectsForSections = ()=>{
    //change the dimensions of the section when we resize the window
    window.addEventListener('resize',()=>{
        objectsForSections=[];  //renew the array and make it empty
        sections.forEach((sec,index)=>{
            const sectionHeight = sec.getBoundingClientRect().height;
            objectsForSections.push({
                minView:index*sectionHeight,
                maxView:(index+1)*sectionHeight
            });
    });
    });
};
// Scroll to anchor ID using scrollTO event

//activate the sections while scrolling in the page
const scrollingFunc = ()=>{
    window.addEventListener('scroll',()=>{
        const scrolling = window.scrollY;
        defineCurrentSection(scrolling);
    });
};
//make the up button and its functionality
const upBox =()=>{
    //creating the box and append it to the page
    const box = document.createElement('div');
    box.innerHTML="UP";
    box.classList.add('up-box');
    document.body.appendChild(box);

    //creating its functionality
    box.addEventListener('click',()=>{
        headingEle.scrollIntoView({behavior:'smooth',block:'end'});
    })
    //remove the down button while we are at the top of the page
    window.addEventListener('scroll',()=>{
        window.scrollY>380 ? box.classList.remove('sleep') : box.classList.add('sleep'); //Ternary Operator
    })
};
/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildingNavBar();

// Scroll to section and add active class  by clicking on any nav li element
clickOnAnyEleFunc();

//make the objectsForSections array
makeObjectsForSections();

//scrolling in the page
scrollingFunc();

//inserting the up button
upBox();








