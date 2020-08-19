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

/** @constant
    @type {object}
    @global
    @description hold a reference to html element with specified selector.
*/
const nav = document.querySelector('#navbar__list');

/** @constant
    @type {object array}
    @global
    @description array of all section html elements in the page.
*/
const sections = document.querySelectorAll('section');

/** @constant
    @type {object}
    @global
    @description object to the selected html element.
*/
const topButton = document.querySelector('#top');

/** @constant
    @type {object}
    @global
    @description object to the selected html element.
*/
const navBar = document.querySelector('#navBar');

/** @constant
    @type {object}
    @global
    @description object to the selected html element.
*/
const footer  = document.querySelector('footer');

/** @constant
    @type {object}
    @global
    @description object to the selected html element.
*/
const baseTitleText = 'Lanind Page Project';

/** @constant
    @type {object}
    @global
    @description object to the selected html element.
*/
const title = document.querySelector('title');

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

/**
 * @callback OnButtonClickHandler
 * @description handle on button click event
 */
onButtonClickHandler = () => {
	window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
});

}

topButton.addEventListener('click',onButtonClickHandler);

/**
* @description Make hidden go to top button visiable
*/
buttonVisible= ()=>{
	topButton.style.visibility = 'visible';
}


/**
* @description Toggle active secition specified by anchor id
* @param {string} id
*/
toggleActivateSectionByAnchorId = (id) =>{
	removeActiveClassFromAllSections();
	const element = document.getElementById(id);
	element.classList.add('active');
}

/**
* @description Gets the last item of an array
* @param {array} array
* @returns {object} Array's last item
*/
lastArrayItem = (array) => {
	return array[array.length-1];
}


/**
* @description Convert CodePoint to emoji for display in html from javascript
*/
fromCodePointToEmoji = (value) => {
	return String.fromCodePoint(value);
}


/**
* @description Gets anchor element by href value
* @param {string} value - href value of the anchor
* @returns {HTMLCollection object} temp - Array's last item
*/
getAnchorByHrefValue = (value) => {
	let temp = null;
	const anchors = document.getElementsByTagName('a');

	for (let i = 0; i < anchors.length; i++) {
		anchors[i].getAttribute('href')===`#${value}`?temp = anchors[i]:temp
	}

	return temp;
}

/**
* @description Toggles active class on target anchor
* @param {HTMLCollection object} temp - target for toggling active class
*/
toggleActiveLinkClass = (temp) =>{
		if(temp!==null){
		removeActiveLinkClassFromAllAnchors();
		temp.classList.add('active-link');
	}
}

/**
* @description Toggles active class on target anchor
* @param {string} value - id of target anchor
*/
toggleActiveOnSelectedAnchor= (value) => {

	const selected = getAnchorByHrefValue(value);
	toggleActiveLinkClass(selected);
}

/**
* @description Removes active-link cllass from all anchors on the page
*/
removeActiveLinkClassFromAllAnchors = () => {
	const nasElems = document.getElementsByTagName('a');
	for (let i = 0; i < nasElems.length; i++) {
		nasElems[i].classList.remove('active-link');
	}
}

/**
* @description Hide navigation bar
*/
hideNavBar = () =>{
	navBar.style.display='none';
}

/**
* @description Shows navigation bar
*/
showNavBar = () => {
	navBar.style.display='block';
}

/**
* @description Removes active class from all section on page
*/
removeActiveClassFromAllSections = () => {
	for (let i = 0; i < sections.length; i++) {
		sections[i].classList.remove('active');
	}
}

/**
* @description Toggles active class on target anchor
* @param {object} target - reference to target anchor
*/
toggleMoreLess = (target) => {

	if(target.value==='more⤵'){
		target.value= `less${fromCodePointToEmoji(0x2934)}`;
	}else{
		target.value=`more${fromCodePointToEmoji(0x2935)}`;
	}
}

/**
* @description Toggles show class and hide class on parent of target input
* @param {object} target - reference to target input
*/
toggleShowHide = (target) => {

	if(target.nodeName==='INPUT'){
		const items =target.parentNode.children;

		for (let i = 1; i < items.length-1; i++) {
			items[i].classList.toggle('hide-content');
		}
	}
}


/**
* @description Toggles show class and hide class on parent of target input
* @param {object} target - reference to target input
*/
collapse = (event) => {
	const target = event.target;
	toggleMoreLess(target);
	toggleShowHide(target);
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/


/**
* @description Builds the navigation bar dynamically according to number of section on page
* @param {object} target - reference to target input
*/
BuildNavBar = () => {
for (let i = 0; i < sections.length; i++) {

	sections[i].children[0].children[0].textContent=sections[i].getAttribute('data-nav');
	sections[i].addEventListener('click',collapse)
	nav.appendChild(createNavListItem(sections[i]));
}
document.querySelector('a').classList.add('active-link');
nav.addEventListener('click', anchorClickEventHandler);
}

/**
* @description Cretes anchor for target section
* @param {object} section - reference to section
* @returns {HTML element} anchorItem - anchor element with specified attributes
*/
createAnchor = (section) => {
	const anchorItem = document.createElement('a');
	anchorItem.classList.add('menu__link');
	anchorItem.setAttribute('href',`#${section.id}`);
	anchorItem.textContent=section.getAttribute('data-nav');
	return anchorItem;
}

/**
* @description Creates anchor for target section
* @param {object} section - reference to section
* @returns {HTML element} navListItem - created list item html element
*/
createNavListItem = (section) => {
	const navListItem =document.createElement('li');
	navListItem.appendChild(createAnchor(section));
	return navListItem;
}

/**
 * End Main Functions
 * Begin Events
 *
*/

// Scroll to section on link click

/**
 * @callback anchorClickEventHandler
 * @description handle on anchor event
 */
anchorClickEventHandler = (event) => {
	event.preventDefault();
	const destinationId = `#${event.target.href.split('#')[1]}`;
    window.scrollTo(0, document.querySelector(destinationId).offsetTop);
}



/**
 * @description Toggle show hide depdening on scroll event
 */
toggleShowHideOnScrollEventStop = (event) => {
	showNavBar();
	setTimeout(hideNavBar,500);
}
window.addEventListener('scroll',toggleShowHideOnScrollEventStop);


// Set sections as active
/**
 * @callback handleIntersection
 * @description invoke when target reached threshold specified for IntersectionObserverEntry
 * @param {IntersectionObserverEntry objects} entries - each entry represent a change for one observed target element
 */
handleIntersection = (entries) => {

entries.map((entry) => {

	const targetId = entry.target.getAttribute('id');
	const nodeName = entry.target.nodeName;

    if (entry.isIntersecting && nodeName === 'SECTION') {
		toggleActiveOnSelectedAnchor(targetId);
	    toggleActivateSectionByAnchorId(targetId);
	    title.textContent=entry.target.children[0].children[0].textContent
	}else if(entry.isIntersecting && nodeName === 'HR'){
		buttonVisible();
	}
  });

}

/**
* @description Represent an intersection observer
* @constructor
* @param {callback} handleIntersection - callback function for interction event
* @param {object} Options for interction observer
*/
const observer = new IntersectionObserver(handleIntersection,{
 	rootMargin: '0px',
 	threshold:  [0.5, 0.75, 1]
});


/**
 * @description start observe all identified objects for intersection monitoring
 */

observeTargetIntlization = () => {
for (let i = 0; i < sections.length; i++) {
	observer.observe(sections[i]);
}
observer.observe(footer);
observer.observe(topButton);
observer.observe(document.querySelector('#end'));
}


// Build menu
BuildNavBar();

//intilize the observe method on targets
observeTargetIntlization();