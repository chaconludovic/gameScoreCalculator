package com.eldoraludo.gameScoreCalculator;

import org.apache.cordova.Config;
import org.apache.cordova.DroidGap;

import android.os.Bundle;
import android.view.Menu;


public class gameScoreCalculator extends DroidGap {
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		// Set by <content src="index.html" /> in config.xml
		super.loadUrl(Config.getStartUrl());
		// super.loadUrl("file:///android_asset/www/index.html")
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.layout.main, menu);
		return true;
	}

}
