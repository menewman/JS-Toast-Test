_toast = {
	showToast : function()
	{
		this.setUpContainer();

		var newToast = this.populateEmptyToast();
		this.appendEmptyToast();

		var that = this;
		setTimeout(function() {
			that.hideToast(newToast);
		}, this.getToastDuration());
	},

	setUpContainer : function()
	{
		if (!this.toasterExists())
		{
			this.createToasterIfNoToaster();
		}

		var toaster = this.getToaster();
		_dom.removeClass(toaster, "bottomLeft");
		_dom.removeClass(toaster, "bottomRight");
		_dom.removeClass(toaster, "topLeft");
		_dom.removeClass(toaster, "topRight");

		_dom.applyClass(toaster, this.getToastLocation());
	},

	populateEmptyToast : function()
	{
		var toasts = this.getToasts();
		var newToast = toasts[toasts.length - 1];

		newToast.innerText = this.getText();
		_dom.applyClass(newToast, "visible");
		_dom.applyClass(newToast, this.getToastType());

		var that = this;
		newToast.onclick = function() {
			that.hideToast(newToast);
		};

		return newToast;
	},

	createToasterIfNoToaster : function()
	{
		var toaster = document.createElement("div");
		toaster.className = "toaster";
		toaster.appendChild(this.createEmptyToast());
		document.body.appendChild(toaster);
	},

	toasterExists : function()
	{
		return typeof this.getToaster() !== "undefined";
	},

	getText : function()
	{
		return document.getElementById("textbox").value;
	},

	getToastDuration : function()
	{
		return (document.getElementById("numberbox").value || 2) * 1000;
	},

	getToastType : function()
	{
		var success = document.getElementById('rSuccess');
		var error = document.getElementById('rError');
		var warning = document.getElementById('rWarning');
		var info = document.getElementById('rInfo');

		if (error.checked) return error.value;
		else if (warning.checked) return warning.value;
		else if (info.checked) return info.value;
		else return success.value;
	},

	getToastLocation : function()
	{
		var bottomLeft = document.getElementById('rBottomLeft');
		var bottomRight = document.getElementById('rBottomRight');
		var topLeft = document.getElementById('rTopLeft');
		var topRight = document.getElementById('rTopRight');

		if (topLeft.checked) return topLeft.value;
		else if (topRight.checked) return topRight.value;
		else if (bottomLeft.checked) return bottomLeft.value;
		else return bottomRight.value;
	},

	getToasts : function()
	{
		return document.getElementsByClassName("toast");
	},

	hideToast : function(toastToHide)
	{
		if (!toastToHide)
		{
			return;
		}

		_dom.removeClass(toastToHide, "visible");

		var that = this;
		setTimeout(function() {
			that.destroyEmptyToasts();
		}, 750);
	},

	destroyEmptyToasts : function()
	{
		var toaster = this.getToaster();
		var toasts = this.getToasts();

		for (var i = toasts.length - 2; i >= 0; i--)
		{
			this.removeToastifInvisible(toaster, toasts[i]);
		}
	},

	removeToastifInvisible : function(toaster, toast)
	{
		if (!_dom.hasClass(toast, "visible"))
		{
			toaster.removeChild(toast);
		}
	},

	getToaster : function()
	{
		return document.getElementsByClassName("toaster")[0];
	},

	createEmptyToast : function()
	{
		var toast = document.createElement("div");
		toast.className = "toast";
		return toast;
	},

	appendEmptyToast : function()
	{
		document.getElementsByClassName("toaster")[0].appendChild(this.createEmptyToast());
	},

	clearToasts : function()
	{
		if (!this.toasterExists())
		{
			return;
		}

		var toaster = this.getToaster();
		var toasts = this.getToasts();

		for (var i = toasts.length - 1; i >= 0; i--)
		{
			toaster.removeChild(toasts[i]);
		}

		this.appendEmptyToast();
	}
}