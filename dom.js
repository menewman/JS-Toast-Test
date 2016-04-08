_dom = (function(){
	function applyClass(element, classToAdd) {
		if (!classToAdd || !element)
		{
			return;
		}

		var classes = element.className.split(" ");
		if (classes.indexOf(classToAdd) === -1)
		{
			classes.push(classToAdd);
		}
		element.className = classes.join(" ");
	}

	function removeClass(element, classToRemove) {
		if (!classToRemove || !element)
		{
			return;
		}

		var classes = element.className.split(" ");
		while (classes.indexOf(classToRemove) > -1)
		{
			classes.splice(classes.indexOf(classToRemove), 1)
		}
		element.className = classes.join(" ");
	}

	function hasClass(element, classToCheck)
	{
		return element.className.split(" ").indexOf(classToCheck) > -1;
	}

	return {
		applyClass: applyClass,
		removeClass: removeClass,
		hasClass: hasClass
	};
})();
