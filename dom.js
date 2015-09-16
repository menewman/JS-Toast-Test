_dom = {
	applyClass: function(element, classToAdd) {
		if (this.classNameOrElementDoesNotExist(classToAdd, element))
		{
			return;
		}

		var classes = element.className.split(" ");
		if (classes.indexOf(classToAdd) === -1)
		{
			classes.push(classToAdd);
		}
		element.className = classes.join(" ");
	},

	removeClass: function(element, classToRemove) {
		if (this.classNameOrElementDoesNotExist(classToRemove, element))
		{
			return;
		}

		var classes = element.className.split(" ");
		while (classes.indexOf(classToRemove) > -1)
		{
			classes.splice(classes.indexOf(classToRemove), 1)
		}
		element.className = classes.join(" ");
	},

	hasClass: function(element, classToCheck)
	{
		return element.className.split(" ").indexOf(classToCheck) > -1;
	},

	classNameOrElementDoesNotExist: function(className, element) {
		return !className || !element;
	}
}