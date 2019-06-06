package com.testnav;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import android.widget.Toast;
import com.facebook.react.bridge.Arguments;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import android.graphics.Rect;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.ml.vision.FirebaseVision;
import com.google.firebase.ml.vision.common.FirebaseVisionImage;
import com.google.firebase.ml.vision.common.FirebaseVisionPoint;
import com.google.firebase.ml.vision.face.FirebaseVisionFace;
import com.google.firebase.ml.vision.face.FirebaseVisionFaceContour;
import com.google.firebase.ml.vision.face.FirebaseVisionFaceDetector;
import com.google.firebase.ml.vision.face.FirebaseVisionFaceDetectorOptions;
import com.google.firebase.ml.vision.face.FirebaseVisionFaceLandmark;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import java.util.Base64;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.ColorMatrix;
import android.graphics.ColorMatrixColorFilter;
import android.graphics.Paint;
import java.io.ByteArrayOutputStream;

public class Firebase extends ReactContextBaseJavaModule {

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";
  
    public Firebase(ReactApplicationContext reactContext) {
      super(reactContext);
    }
    @Override
    public String getName() {
      return "FirebaseModule";
    }
    @Override
    public Map<String, Object> getConstants() {
      final Map<String, Object> constants = new HashMap<>();
      constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
      constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
      return constants;
    }

    @ReactMethod
    public void show(String encodedImage, int duration, final Promise promise) {
      try{
        FirebaseVisionFaceDetectorOptions highAccuracyOpts =
        new FirebaseVisionFaceDetectorOptions.Builder()
                .setPerformanceMode(FirebaseVisionFaceDetectorOptions.FAST)
                .setLandmarkMode(FirebaseVisionFaceDetectorOptions.NO_LANDMARKS)
                .setClassificationMode(FirebaseVisionFaceDetectorOptions.NO_CLASSIFICATIONS)
                .build();
        byte[] decodedString = Base64.getDecoder().decode(encodedImage);
        final Bitmap decodedByte = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length); 
        FirebaseVisionImage image = FirebaseVisionImage.fromBitmap(decodedByte);
        FirebaseVisionFaceDetector detector = FirebaseVision.getInstance()
        .getVisionFaceDetector(highAccuracyOpts);
        Task<List<FirebaseVisionFace>> result =
        detector.detectInImage(image)
                .addOnSuccessListener(
                        new OnSuccessListener<List<FirebaseVisionFace>>() {
                            @Override
                            public void onSuccess(List<FirebaseVisionFace> faces) {
                              WritableMap map = Arguments.createMap();
                              if(faces.size() == 0){
                                ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
                                decodedByte.compress(Bitmap.CompressFormat.PNG, 100, outputStream);
                                String res = Base64.getEncoder().encodeToString(outputStream.toByteArray());
                                map.putString("res",res);
                                promise.resolve(map);
                              }
                              else{
                                Bitmap resultBitmap = null;
                                int count = 0;
                                for (FirebaseVisionFace face : faces) {
                                  //Toast.makeText(getReactApplicationContext(), faces.size(), 5).show();
                                    int cx =face.getBoundingBox().centerX();
                                    int cy =face.getBoundingBox().centerY();
                                    int width =face.getBoundingBox().width();
                                    int height =face.getBoundingBox().height();
                                    

                                    int startX = cx - width/2;
                                    int endX = cx + width/2;
                                    int startY = cy - height/2;
                                    int endY = cy + height/2;
                                    if(count == 0){
                                      resultBitmap = Bitmap.createBitmap(decodedByte.getWidth(), decodedByte.getHeight(), Bitmap.Config.ARGB_8888);
                                    }
                                    
                                    for(int i=0;i<decodedByte.getHeight();i++){
                                      for(int j=0;j<decodedByte.getWidth();j++){
                                        if(j >= startX && j <= endX && i >=startY && i <= endY ){
                                          int c = decodedByte.getPixel(j,i);
                                          resultBitmap.setPixel(j,i,(Color.rgb(0, 0, 0)));
                                        }
                                        else{
                                          if(count ==0){
                                            int pixel = decodedByte.getPixel(j,i);
                                            int redValue = Color.red(pixel);
                                            int blueValue = Color.blue(pixel);
                                            int greenValue = Color.green(pixel);
                                           resultBitmap.setPixel(j,i,(Color.rgb(redValue,greenValue,blueValue)));
                                          }

                                        }


                                      }
                                    }

                                    count+=1;
                                    
                                }
                                ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
                                resultBitmap.compress(Bitmap.CompressFormat.PNG, 100, outputStream);
                                String res = Base64.getEncoder().encodeToString(outputStream.toByteArray());
                                map.putString("res",res);
                                promise.resolve(map);
                              }
                                // [END get_face_info]
                                // [END_EXCLUDE]
                            }
                        })
                .addOnFailureListener(
                        new OnFailureListener() {
                            @Override
                            public void onFailure(@NonNull Exception e) {
                              Toast.makeText(getReactApplicationContext(), "Fail", 5).show();

                                // Task failed with an exception
                                // ...
                            }
                        });

      }catch(Exception e){
        Toast.makeText(getReactApplicationContext(), "Fail", 5).show();
        promise.reject(e);
      }
        
               // Toast.makeText(getReactApplicationContext(), message.substring(0, 20), duration).show();

    }

  }