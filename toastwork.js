showToast = function()
{
	if (!toasterExists())
	{
		createToasterIfNoToaster();
	}

	var toasts = getToasts();
	var lastToast = toasts[toasts.length - 1];
	lastToast.innerText = getText();
	lastToast.className = "toast visible " + getToastType();
	lastToast.onclick = function() {
		hideToast(lastToast);
	};

	appendEmptyToast();

	setTimeout(function() {
		hideToast(lastToast);
	}, getToastDuration());
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

	var classNames = toastToHide.className.split(" ");
	while (classNames.indexOf("visible") > -1)
	{
		classNames.splice(classNames.indexOf("visible"), 1);
	}
	toastToHide.className = classNames.join(" ");

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
	if (toast.className.split(" ").indexOf("visible") === -1)
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