1. Include the two files:

bundles.Add(new ScriptBundle(DumbFormState)
      .Include("~/Scripts/DumbFormState.js")
      .Include("~/Scripts/OfflineForms.js"));

	  OR

	  <script src="~/Scripts/DumbFormState.js" />
	  <script src="~/Scripts/OfflineForms.js" />

2. 
Add the attributes the form you want to use offline.
	a. set class to persist-local -to tell the form to save offline
	b. set data-id-val to an id -something like blah-ENTITYID, just needs to be unique so you can edit multiple

<form class="persist-local" data-id-val="consent-form-@Model.Id">

NOTE: in the init.js file -this will submit if online

$('.persist-local').submit(function () {        
        if (navigator.onLine) {
            return true; //submit
        }
        return false;
    });

4. You can open the form and set the id in data-id-val in the form element. The fields will automatically be populated, so resubmit your form)
	or leave the form open and just resubmit.

