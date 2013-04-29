// Wait for Cordova to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
//
function onDeviceReady() {
	// dropTables();
	populateDB();
}

function dropTables() {
	var db = openDatabase("Database", "1.0", "Cordova Demo", 200000);
	db.transaction(function(tx) {
		tx.executeSql('DROP TABLE IF EXISTS DEPENSE');
	}, txFail);
	db.transaction(function(tx) {
		tx.executeSql('DROP TABLE IF EXISTS PARTICIPANT');
	}, txFail);
	db.transaction(function(tx) {
		tx.executeSql('DROP TABLE IF EXISTS PROJET');
	}, txFail);
}

function populateDB() {
	var db = openDatabase("Database", "1.0", "Cordova Demo", 200000);
	db
			.transaction(
					function(tx) {
						tx
								.executeSql(
										"CREATE TABLE IF NOT EXISTS PROJET (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nom);",
										sqlFail);
					}, txFail, creationTableParticipant);

}
function creationTableParticipant() {
	var db = openDatabase("Database", "1.0", "Cordova Demo", 200000);
	db
			.transaction(
					function(tx) {
						tx
								.executeSql(
										"CREATE TABLE IF NOT EXISTS PARTICIPANT (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nom_participant, projet_id INTEGER, FOREIGN KEY (projet_id) REFERENCES PROJET (id));",
										sqlFail);
					}, txFail, creationTableDepense);
}
function creationTableDepense() {
	var db = openDatabase("Database", "1.0", "Cordova Demo", 200000);
	db
			.transaction(
					function(tx) {
						tx
								.executeSql(
										"CREATE TABLE IF NOT EXISTS DEPENSE (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, montant DOUBLE ,participant_id INTEGER, FOREIGN KEY (participant_id) REFERENCES PARTICIPANT (id));",
										sqlFail);
					}, txFail, txWin);
}
function sqlFail(tx, err) {
	alert("SQL failed: " + err.code);
}
function txFail(err) {
	alert("TX failed: " + err.message);
}
function sqlWin(tx, response) {
	console.log("SQL succeeded: " + response.rows.length + " rows.");
}
function txWin(tx) {
	console.log("TX succeeded.");
}
var app = {

	initialize : function() {
		Handlebars
				.registerHelper(
						'afficherLienProjetCourant',
						function() {
							var idProjetCourant = window.localStorage
									.getItem("idProjetCourant");
							if (idProjetCourant != null) {
								var str = '<h1><a href="synthese.html">Aller au projet courant</a></h1>';
								return new Handlebars.SafeString(str);
							}
						});
		this.allerAGestionDesProjetsTpl = Handlebars.compile($(
				"#aller-a-la-gestion-des-projets-tpl").html());
		this.allerAProjetCourantTpl = Handlebars.compile($(
				"#aller-au-projet-courant-tpl").html());

		$('body').append(this.allerAGestionDesProjetsTpl()).append(
				this.allerAProjetCourantTpl());
	}
};

app.initialize();