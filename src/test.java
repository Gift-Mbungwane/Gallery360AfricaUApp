package com.zipidrivers;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.view.GestureDetectorCompat;

import com.facebook.react.ReactActivity;
import android.view.View;
import android.os.Bundle;
import android.view.MotionEvent;
import android.view.GestureDetector;

public class MainActivity extends ReactActivity {
  private GestureDetectorCompat mGestureDetector;

  private class GestureListener extends GestureDetector.SimpleOnGestureListener {
    @Override
    public boolean onDown(MotionEvent event) {
      return true;
    }
  }

  @Override
  public onSingleTap(MotionEvent e) {
    if(getSupportActionBar() != null && getSupportActionBar().isShowing()) {
      hideSystemUI();
    }  else {
      showSystemUI();
    }
    return true;
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is
   * used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "zipidriver";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // binding = ActivityMainBinding.inflate(getLayoutInflater());
    // setContentView(binding.getRoot());
    mGestureDetector = new gestureDetectorCompat(this, new GestureListener());
    hideSystemUI();
    hideSystemBars();

  }

  private void hideSystemBars() {
    WindowInsetsControllerCompat windowInsetsController = ViewCompat
        .getWindowInsetsController(getWindow().getDecorView());
    if (windowInsetsController == null) {
      return;
    }
    // Configure the behavior of the hidden system bars
    windowInsetsController.setSystemBarsBehavior(
        WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
    // Hide both the status bar and the navigation bar
    windowInsetsController.hide(WindowInsetsCompat.Type.systemBars());
  }

  private void hideSystemUI() {
    // Set the IMMERSIVE flag.
    // Set the content to appear under the system bars so that the content
    // doesn't resize when the system bars hide and show.
    View decorView = getWindow().getDecorView();
    int uiOptions = View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
        | View.SYSTEM_UI_FLAG_FULLSCREEN;

    // int uiOptions = View.SYSTEM_UI_FLAG_LAYOUT_STABLE
    // | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
    // | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
    // | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION // hide nav bar
    // | View.SYSTEM_UI_FLAG_FULLSCREEN // hide status bar
    // | View.SYSTEM_UI_FLAG_IMMERSIVE;
    decorView.setSystemUiVisibility(uiOptions);

  }

  private void showSystemUI() {
    View decorView = getWindow().getDecorView();
    int uiOptions = View.SYSTEM_UI_FLAG_LAYOUT_STABLE | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN;
    decorView.setSystemUiVisibility(uiOptions);
  }

  @Override
  public boolean onTouchEvent(MotionEvent event) {
    mGestureDetector.onTouchEvent(event);
    return super.onTouchEvent(event);
  }

}
