
> General

We will probably lean on these in coding exercises. 

	Array.forEach()
	Array.map()
	Array.filter()
	Array.some()
	Array.every()
	Array.find()
	Array.findIndex()
	Array.reduce()
	Array.from() 

Sets are data types with no duplicates, so you can do something like this:

	const ages = [11, 12, 13, 11]
	dups_gone = [...new Set(ages)];

Inheritance means using the extends keyword to further modify objects into a special use case. 

	class ColorTriangle extends Triangle {
	  constructor(a, b, color) {
	    super(a, b); // CALLS THE SUPERCLASS CONSTRUCTOR
	    this.color = color; // EXTENSION
	  }

You can always put stuff in an array and iterate through it if you want to check something. You can use a for loop or any of the array methods: 
	
	// checking arguments to a triangle object

	for (let side of [a, b, c]) {
		if (!Number.isFinite(side) || side < 0))
		throw new Error("WTF dude?")
	}

hen you are adding an event listener *and using an object method* as a callback function, you need to bind it to the object or else it will run on the global window object.

Things to remember about jQuery

* Selecting elements using $('') returns a jQuery object, not a DOM NodeList.
* If you have multiple elements to iterate through you use $('').get() because that returns an array
* You can update multiple attributes at a time for an element by passing in an object as a method argument

		const newAttributes = {
			src: 'https://...',
			alt: 'hello'
		}

		$('img').attr(newAttributes)

* You can update multiple styles at a time by passing in an object as a method argument (just like above, but with styles)
* When you are selecting things with jQuery, you are working on an object, so you can do method chaining
* You can create a new jQuery object with $() as well

		$('h1') // finds object
		$('<h1>') // creates object


Try / Catch is useful if you do something after the error like this. In this case, we are getting a random dog if the user enters something bad. 

	async function getDogByBreed(breed) {
	  try {
	    const url = `https://dog.ceo/api/breed/${breed}/images/random`;
	    const res = await axios.get(url);
	    const img = document.querySelector("#dog");
	    img.src = res.data.message;
	  } catch (e) {
	    alert("BREED NOT FOUND!");
	    getRandomDog();
	  }
	}
