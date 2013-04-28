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
		this.afficheLaSyntheseTpl = Handlebars.compile($(
				"#afficher-les-depenses-tpl").html());
		this.allerAPageCreationParticipantTpl = Handlebars.compile($(
				"#aller-a-la-page-creation-de-participant-tpl").html());
		var self = this;
		$('body').append(this.afficheLaSyntheseTpl()).append(
				this.allerAPageCreationParticipantTpl());

	}
};

app.initialize();
