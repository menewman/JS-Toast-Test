showToast = function()
{
	if (!toasterExists())
	{
		createToasterIfNoToaster();
	}

	var newToast = populateEmptyToast();
	appendEmptyToast();

	setTimeout(function() {
		hideToast(newToast);
	}, getToastDuration());
}

populateEmptyToast = function()
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

createToasterIfNoToaster = function()
{
	var toaster = document.createElement("div");
	toaster.className = "toaster";
	toaster.appendChild(createEmptyToast());
	document.body.appendChild(toaster);
}

toasterExists = function()
{
	return typeof getToaster() !== "undefined";
}

getText = function()
{
	return document.getElementById("textbox").value;
}

getToastDuration = function()
{
	return (document.getElementById("numberbox").value || 2) * 1000;
}

getToastType = function()
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

getToasts = function()
{
	return document.getElementsByClassName("toast");
}

hideToast = function(toastToHide)
{
	if (!toastToHide)
	{
		return;
	}

	_dom.removeClass(toastToHide, "visible");

	setTimeout(destroyEmptyToasts, 750);
}

destroyEmptyToasts = function()
{
	var toaster = getToaster();
	var toasts = getToasts();

	for (var i = toasts.length - 2; i >= 0; i--)
	{
		removeToastifInvisible(toaster, toasts[i]);
	}
}

removeToastifInvisible = function(toaster, toast)
{
	if (!_dom.hasClass(toast, "visible"))
	{
		toaster.removeChild(toast);
	}
}

getToaster = function()
{
	return document.getElementsByClassName("toaster")[0];
}

createEmptyToast = function()
{
	var toast = document.createElement("div");
	toast.className = "toast";
	return toast;
}

appendEmptyToast = function()
{
	document.getElementsByClassName("toaster")[0].appendChild(createEmptyToast());
}

clearToasts = function()
{
	if (!toasterExists())
	{
		return;
	}

	var toaster = getToaster();
	var toasts = getToasts();

	for (var i = toasts.length - 1; i >= 0; i--)
	{
		toaster.removeChild(toasts[i]);
	}

	appendEmptyToast();
}