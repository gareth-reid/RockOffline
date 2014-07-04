Author: Gareth Reid
Usage: This will save to local cache every time the form is submited.
	   The form will automatically be populated if the same id is assigned to data-id-val
	   When the form is submitted and it is online it will hit the action specified in the form declaration

Steps:
**Requires jquery
1. Include the two files:

bundles.Add(new ScriptBundle("~/Scripts/RockOffline")
      .Include("~/Scripts/RockOffline.js")
      .Include("~/Scripts/RockOfflineInit.js"));

	  OR
	  	     
        <script src="~/Scripts/RockOffline.js" type="text/javascript"></script>
        <script src="~/Scripts/RockOfflineInit.js" type="text/javascript"></script>

2. 
Add the attributes the form you want to use offline.
	a. set class to persist-local -to tell the form to save offline
	b. set dataidval to an id -something like blah-ENTITYID, just needs to be unique so you can edit multiple
	!!would prefer data-id-val but most mvc form helpers dont allow this

<form class="persist-local" dataidval="consent-form-@Model.Id">


