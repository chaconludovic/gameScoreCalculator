// Wait for Cordova to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
//
function onDeviceReady() {
	afficherLaSynthese();
}

function afficherLaSynthese() {
	var idProjetCourant = window.localStorage.getItem("idProjetCourant");
	var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
	db
			.transaction(function(tx) {
				tx
						.executeSql(
								"SELECT PARTICIPANT.nom_participant as nom_participant , DEPENSE.montant as montant FROM PARTICIPANT , DEPENSE WHERE PARTICIPANT.id = DEPENSE.participant_id and PARTICIPANT.projet_id = ? ",
								[ idProjetCourant ],
								function(tx, results) {
									var len = results.rows.length;
									console
											.log("Recuperation participant/montant : "
													+ len + " rows found.");
									for ( var i = 0; i < len; i++) {
										$('#afficherLaSynthese')
												.after(
														'<p>'
																+ results.rows
																		.item(i).nom_participant
																+ ' '
																+ results.rows
																		.item(i).montant
																+ '</p>');
									}
								}, errorCB);
			});
}

// Transaction error callback
//
function errorCB(err) {
	console.log("Error processing SQL: " + err.code);
}

var app = {

	initialize : function() {
		Handlebars
				.registerHelper(
						'barNavigationDuBas',
						function(page1, page2, page3) {
							if (typeof (page1) != "string") {
								return;
							}

							var nombreArg = 0;
							for ( var i = 0; i < arguments.length; i++) {
								if (typeof (arguments[i]) == "string") {
									nombreArg += 1;
								}
							}
							var diviseurDeDiv = 100 / nombreArg;

							var boutons = '<div class="divBas" style="width: '
									+ diviseurDeDiv
									+ '%;"><button type="button" class="buttonBas" onclick="window.location = \''
									+ page1.split("|")[0] + '\';">'
									+ page1.split("|")[1] + '</button></div>';
							if (typeof (page2) == "string") {
								boutons += '<div class="divBas" style="width: '
										+ diviseurDeDiv
										+ '%;"><button type="button" class="buttonBas" onclick="window.location = \''
										+ page2.split("|")[0] + '\';">'
										+ page2.split("|")[1]
										+ '</button></div>';
							}
							if (typeof (page3) == "string") {
								boutons += '<div class="divBas" style="width: '
										+ diviseurDeDiv
										+ '%;"><button type="button" class="buttonBas" onclick="window.location = \''
										+ page3.split("|")[0] + '\';">'
										+ page3.split("|")[1]
										+ '</button></div>';
							}
							var str = '<div class="bas">' + boutons + '</div>';
							return new Handlebars.SafeString(str);
						});
		this.afficheLaSyntheseTpl = Handlebars.compile($(
				"#afficher-les-depenses-tpl").html());
		this.allerAPageCreationParticipantTpl = Handlebars.compile($(
				"#aller-a-la-page-creation-de-participant-tpl").html());
		this.barNavigationDuBas = Handlebars.compile($(
				"#bar-navigation-du-bas-tpl").html());
		var self = this;
		$('body').append(this.afficheLaSyntheseTpl()).append(
				this.allerAPageCreationParticipantTpl()).append(
				this.barNavigationDuBas());

	}
};

app.initialize();
