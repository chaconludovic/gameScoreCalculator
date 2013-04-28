// Wait for Cordova to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
//
function onDeviceReady() {
	gestionDeLAjoutDeParticipant();
	// gestionDeLaSuppressionDeTousLesParticipants();
	afficherTousLesParticipants();

}

function gestionDeLAjoutDeParticipant() {
	$("#ajouterParticipant")
			.click(
					function() {
						var idProjetCourant = window.localStorage
								.getItem("idProjetCourant");
						var db = window.openDatabase("Database", "1.0",
								"Cordova Demo", 200000);
						db
								.transaction(
										function(tx) {
											tx
													.executeSql(
															'INSERT INTO PARTICIPANT (nom_participant, projet_id) VALUES (?,?)',
															[
																	$(
																			"#participant")
																			.val(),
																	idProjetCourant ],
															errorCB);
										}, errorCB);
					});
}

// function gestionDeLaSuppressionDeTousLesParticipants() {
// $("#supprimerTousLesParticipants").click(
// function() {
// var db = window.openDatabase("Database", "1.0", "Cordova Demo",
// 200000);
// db.transaction(function(tx) {
// tx.executeSql('DELETE FROM PARTICIPANT', [], errorCB);
// }, errorCB);
// });
// }

function afficherTousLesParticipants() {
	var idProjetCourant = window.localStorage.getItem("idProjetCourant");
	var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
	db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM PARTICIPANT WHERE projet_id = ?",
				[ idProjetCourant ], function(tx, results) {
					var len = results.rows.length;
					for ( var i = 0; i < len; i++) {
						$('#afficherLesParticipants').after(
								'<p>' + results.rows.item(i).nom_participant
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
		this.ajouterParticipantTpl = Handlebars.compile($(
				"#ajouter-un-participant-tpl").html());
		this.allerAPageCreationDepenseTpl = Handlebars.compile($(
				"#aller-a-la-page-creation-depense-tpl").html());
		this.afficherTousLesParticipantsTpl = Handlebars.compile($(
				"#afficher-les-participants-li-tpl").html());
		var self = this;
		$('body').append(this.ajouterParticipantTpl()).append(
				this.afficherTousLesParticipantsTpl()).append(
				this.allerAPageCreationDepenseTpl());

	}
};

app.initialize();
