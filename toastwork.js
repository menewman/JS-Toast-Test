VanillaToast = (function() {

	var toaster;
	(function createToaster()
	{
		toaster = document.createElement("div");
		toaster.className = "toaster";
		toaster.appendChild(createEmptyToast());
		document.body.appendChild(toaster);
	})();

	function showToast()
	{
		setUpContainer();
		
		var newToast = populateEmptyToast();
		appendEmptyToast();

		setTimeout(function() {
			hideToast(newToast);
		}, getToastDuration());
	}

	function setUpContainer()
	{
		_dom.removeClass(toaster, "bottomLeft");
		_dom.removeClass(toaster, "bottomRight");
		_dom.removeClass(toaster, "topLeft");
		_dom.removeClass(toaster, "topRight");

		_dom.applyClass(toaster, getToastLocation());
	}

	function populateEmptyToast()
	{
		var toasts = getToasts();
		var newToast = toasts[toasts.length - 1];

		newToast.innerText = getText();
		_dom.applyClass(newToast, "visible");
		_dom.applyClass(newToast, getToastType());

		newToast.onclick = function() {
			hideToast(newToast);
		};

		return newToast;
	}

	function getText()
	{
		return document.getElementById("textbox").value;
	}

	function getToastDuration()
	{
		return (document.getElementById("numberbox").value || 2) * 1000;
	}

	function getToastType()
	{
		var success = document.getElementById('rSuccess');
		var error = document.getElementById('rError');
		var warning = document.getElementById('rWarning');
		var info = document.getElementById('rInfo');

		if (error.checked) return error.value;
		else if (warning.checked) return warning.value;
		else if (info.checked) return info.value;
		else return success.value;
	}

	function getToastLocation()
	{
		var bottomLeft = document.getElementById('rBottomLeft');
		var bottomRight = document.getElementById('rBottomRight');
		var topLeft = document.getElementById('rTopLeft');
		var topRight = document.getElementById('rTopRight');

		if (topLeft.checked) return topLeft.value;
		else if (topRight.checked) return topRight.value;
		else if (bottomLeft.checked) return bottomLeft.value;
		else return bottomRight.value;
	}

	function getToasts()
	{
		return toaster.getElementsByClassName("toast");
	}

	function hideToast(toastToHide)
	{
		if (!toastToHide)
		{
			return;
		}

		_dom.removeClass(toastToHide, "visible");

		setTimeout(function() {
			destroyEmptyToasts();
		}, 750);
	}

	function destroyEmptyToasts()
	{
		var toasts = getToasts();

		for (var i = toasts.length - 2; i >= 0; i--)
		{
			removeToastifInvisible(toaster, toasts[i]);
		}
	}

	function removeToastifInvisible(toaster, toast)
	{
		if (!_dom.hasClass(toast, "visible"))
		{
			toaster.removeChild(toast);
		}
	}

	function createEmptyToast()
	{
		var toast = document.createElement("div");
		toast.className = "toast";
		return toast;
	}

	function appendEmptyToast()
	{
		document.getElementsByClassName("toaster")[0].appendChild(createEmptyToast());
	}

	function clearToasts()
	{
		var toasts = getToasts();

		for (var i = toasts.length - 1; i >= 0; i--)
		{
			toaster.removeChild(toasts[i]);
		}
		appendEmptyToast();
	}

	return {
		showToast: showToast,
		clearToasts: clearToasts
	}
})();
