// Wait for Cordova to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
//
function onDeviceReady() {
	validationProjet();
	afficherTousLesProjets();
}

function validationProjet() {
	$("#validerLeProjet")
			.click(
					function() {
						if ($("#nomDuProjet").val() == '') {
							return;
						}
						var db = window.openDatabase("Database", "1.0",
								"Cordova Demo", 200000);
						db
								.transaction(function(tx) {
									tx
											.executeSql(
													"SELECT * FROM PROJET",
													[],
													function(tx, results) {
														var len = results.rows.length;
														db
																.transaction(
																		function(
																				tx) {
																			tx
																					.executeSql(
																							"INSERT INTO PROJET (id, nom) VALUES (?, ?);",
																							[
																									(len + 1),
																									$(
																											"#nomDuProjet")
																											.val() ],
																							function() {
																								var curlink = document
																										.getElementById("validerLeProjet");
																								curlink.href = curlink.href
																										+ "?idProjet="
																										+ (len + 1);
																							},
																							errorCB);
																		},
																		errorCB);
													}, errorCB);
								});

					});
}

function afficherTousLesProjets() {
	var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
	db
			.transaction(function(tx) {
				tx
						.executeSql(
								"SELECT * FROM PROJET",
								[],
								function(tx, results) {
									var len = results.rows.length;
									for ( var i = 0; i < len; i++) {
										var urlSynthese = '<h3><a href="synthese.html" onclick="window.localStorage.setItem(\'idProjetCourant\', '
												+ results.rows.item(i).id
												+ ');">'
												+ results.rows.item(i).nom
												+ '</a></h3><br/>';
										$('#afficherLesProjets').after(
												urlSynthese);
									}
								}, errorCB);
			});
}

// Transaction error callback
//
function errorCB(err) {
	alert("Error processing SQL: " + err.code);
}

var app = {

	initialize : function() {

		this.nomDuProjetTpl = Handlebars
				.compile($("#nom-du-projet-tpl").html());
		this.allerAPageCreationParticipantTpl = Handlebars.compile($(
				"#aller-a-la-page-creation-de-participant-tpl").html());
		this.afficherTousLesProjetsTpl = Handlebars.compile($(
				"#afficher-les-projets-li-tpl").html());
		var self = this;
		$('body').append(this.nomDuProjetTpl()).append(
				this.allerAPageCreationParticipantTpl()).append(
				this.afficherTousLesProjetsTpl());

	}
};

app.initialize();
