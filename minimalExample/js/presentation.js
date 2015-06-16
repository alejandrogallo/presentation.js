//© 2014-2015, Alejandro Agusti Martinez-Soria Gallo

//comment out this line if you want body margins
document.body.style.margin = "0";

function Presentation(){
	//objectAttributeName will be inside tags to establish the appearance order of the element
	//e.g. <img o="2" src="...."> You may change it for custom use  
	this.objectAttributeName = "o";
	this.objectsNumber=0;
	this.currentObject=1;
	this.firstObject = 1;
	this.objects = [];

	//definition of slides specific variables
	//every slide will be a section tag, good for html5 recognition, again you may change it
	this.slidesTagName="section";
	//the this.slides hast all the slides objects this.slides = [html Objects]
	this.slides = document.getElementsByTagName(this.slidesTagName);
	this.slidesNumber = this.slides.length;
	//initialization of slides
	this.currentSlide = 0;
	//first slide is the first index of this.slides, beginning at 0
	this.firstSlide = 0;


	this.hideSlide = function(slide){
		//use display and not visibility, so that the user does not have to scroll!
		slide.style.display="none";
	}
	this.showSlide = function(slide){
		slide.style.display = "block";
	}

	this.goToSlide = function(index){
		//general goTo function, for future use also
		var slide = this.slides[index];
		if (slide){
			this.hideSlide(this.slides[this.currentSlide]);
			//it means that the index is not out of bounds 
			//it will be true if slide is not undefined
			this.showSlide(slide);
			this.currentSlide = index;
		}
	}
	
	this.goToNextSlide = function(){
		var nextSlideId = this.currentSlide +1;
		if (nextSlideId < this.slidesNumber){
			this.goToSlide(nextSlideId);
			//putting right indices for object recognition
			this.objects = this.getObjects(this.currentSlide);
		}
	}
	this.goToLastSlide = function(){
		var lastSlideId = this.currentSlide-1 ; 
		if (lastSlideId >= this.firstSlide ){
			this.goToSlide(lastSlideId);
			//putting right indices for object recognition
			this.objects = this.getObjects(this.currentSlide);
			// here we have to advance the currentobject because we are going back
			this.currentObject = this.objectsNumber;
		}
	}
	this.goForward = function(){
		//general function to be called everytime the right arrow is pressed
		if (this.objectsNumber == this.currentObject){
			this.goToNextSlide();
		}
		else{
			this.showNextObjects();
		}
		console.log(this.currentObject);
	}
	this.goBackward = function(){
		//function to be called every time the left arrow is pressed
		if (this.currentObject == this.firstObject){
			this.goToLastSlide();
		}
		else{
			this.showLastObjects();
		}
		console.log(this.currentObject);
	}
	this.pressArrows = function(e){
		//we put the logic into pressArrows and add it into an eventListener afterwards (future mobile app compatibility?)
		var code = (e.keyCode ? e.keyCode : e.which);
		if (code == 37){
			console.log("Left arrow pressed");
			this.goBackward();
		}
		else if (code==39) {
			console.log("Right arrow pressed");
			this.goForward();
		}
	}
	
	

	//Objects specific functions ------------------- BEGIN
	this.objectFilter = function(elements){
		// input: array of html objects, output: filtered array (objects having attribute objectAttributeName)
		var oElements = [];
		for (var i = 0; i < elements.length; i++) {
			if (elements[i].hasAttribute(this.objectAttributeName) ){
				//console.log("Got it:");
				oElements.push(elements[i]);
				//console.log(elements[i]);
			} 
		};
		return oElements;
	}
	this.getObjects = function(slideId){
		//get objects inside a particular slide
		var elements = this.slides[slideId].getElementsByTagName('*');
		var filteredElements = this.objectFilter(elements);
		this.initObjectIndices(filteredElements);
		return filteredElements;
	}
	this.getAllObjects = function(){
		//of the document, use for initialisation
		var elements = document.getElementsByTagName('*');
		return this.objectFilter(elements);
	}
	this.initObjectIndices = function(elements){
		//this will be called in getObjects, to initialise the objects while in some particular slide
		var highestIndex = 0;
		for (var i = 0; i < elements.length; i++) {
			//we know they have o attribute
			var ind = parseInt(elements[i].getAttribute(this.objectAttributeName));
			highestIndex = Math.max(ind,highestIndex);
		};
		this.objectsNumber = highestIndex;
		this.currentObject = this.firstObject;
	}
	this.showNextObjects = function(){
		if (this.currentObject+1<=this.objectsNumber){
			this.currentObject+=1;
			for (var i = 0; i < this.objects.length; i++) {
				var o = parseInt(this.objects[i].getAttribute(this.objectAttributeName));
				if (o == this.currentObject){
					this.objects[i].style.visibility="visible";
				}
			};
		}
	}
	this.showLastObjects = function(){
		if (this.currentObject>this.firstObject){
			this.currentObject-=1;
			for (var i = 0; i < this.objects.length; i++) {
				var o = parseInt(this.objects[i].getAttribute(this.objectAttributeName));
				if (o == this.currentObject+1){
					this.objects[i].style.visibility="hidden";
				}
			};
		}
	}
	//Objects specific functions ------------------- END


	



	//INITIALISATION FUNCTIONS ------------------- BEGIN
	this.initObjects = function(){
		// first initialisation of th objects (hide them etc...)
		var objs = this.getAllObjects();
		for (var i = 0; i < objs.length; i++) {
			var o = parseInt(objs[i].getAttribute(this.objectAttributeName));
			console.log(o);
			//you may change this, only the objects for o>1 will be hidden (i.e. o="1" is irrelevant)
			if (o>1){
				// use visibilty so that the blank space is respected while not visible
				objs[i].style.visibility="hidden";
			}
		};
		this.objects = this.getObjects(this.firstSlide);
	}
	this.initKeyboardInput = function(){
		//add EventListener for the input of the user (right and left arrows)
		var presentation = this;
		document.addEventListener(
			"keydown", 
			function(event){
				presentation.pressArrows(event);
			}
		);
	}
	this.initSlidesStyle = function(){
		//you may change the default style of the slides
		for (var i = 0; i<this.slides.length; i++) {
			this.slides[i].style.height="100%";
			this.slides[i].style.display="none";
			this.slides[i].style.position="relative";
		}
	}
	this.initSlides = function(){
		this.initSlidesStyle();
		this.goToSlide(this.firstSlide);
	}
	this.init = function(){
		this.initObjects();
		this.initSlides();
		this.initKeyboardInput();
	}
	//INITIALISATION FUNCTIONS ------------------- END
}

var presentation = new Presentation();

presentation.init();