
import os
try:
	os.chdir(os.path.join(os.getcwd(), 'De-Anonymization'))
	print(os.getcwd())
except:
	pass
from keras.layers import Dense,Dropout
from keras.models import Sequential
from keras.regularizers import l2,l1,l1_l2
from keras.optimizers import SGD

import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.preprocessing import LabelEncoder
from sklearn import preprocessing
import numpy
import pandas
from keras.models import Sequential
from keras.wrappers.scikit_learn import KerasClassifier
from keras.utils import np_utils
from sklearn.model_selection import cross_val_score
from sklearn.model_selection import KFold
from sklearn.preprocessing import LabelEncoder
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
import random
import pickle
from sklearn.metrics import confusion_matrix, precision_score
from sklearn.model_selection import train_test_split
c = 0
for c in range(16):
    dataset = pd.read_csv('../Locations.csv')
    chosen = []
    i = 0
    with open('../Array1.pickle', 'rb') as f:
        # The protocol version used is detected automatically, so we do not
        # have to specify it.
        arr1 = pickle.load(f)
    with open('../Array2.pickle', 'rb') as f:
        # The protocol version used is detected automatically, so we do not
        # have to specify it.
        arr2 = pickle.load(f)
    with open('../Array3.pickle', 'rb') as f:
        # The protocol version used is detected automatically, so we do not
        # have to specify it.
        arr3 = pickle.load(f)
    with open('../Array4.pickle', 'rb') as f:
        # The protocol version used is detected automatically, so we do not
        # have to specify it.
        arr4 = pickle.load(f)

    SelectionArray = [500,1000,1500,1725,500,1000,1500,1725,500,1000,1500,1725,500,1000,1500,1725]

    data = dataset.drop(columns=['Room'])
    labels = dataset['Room']
    classes = dataset['Room'].nunique()
    encoder = LabelEncoder()
    encoder.fit(labels)
    encoded_Y = encoder.transform(labels)
    # convert integers to dummy variables (i.e. one hot encoded)
    dummy_y = np_utils.to_categorical(encoded_Y)

    X_train, X_test, y_train, y_test = train_test_split(data, dummy_y, test_size=0.2, random_state=2)
    X_train, X_val, y_train, y_val = train_test_split(X_train, y_train, test_size=0.3, random_state=2)


    j = 0
    while j < SelectionArray[c]:
        #dataset.set_value(j, 'fav_loc',c)
        if (X_train.index == arr4[i]).any():
            X_train.set_value(arr4[i], 'Student','Student5')
            if j%2 == 0:
                X_train.set_value(arr4[i], 'Slot',"Sun 5th")
            i+=1
            j+=1
        else:
            i+=1
       


    def encode_and_bind(original_dataframe, feature_to_encode):
        dummies = pd.get_dummies(original_dataframe[[feature_to_encode]])
        res = pd.concat([original_dataframe, dummies], axis=1)
        res = res.drop([feature_to_encode], axis=1)
        return(res) 




    X_train = encode_and_bind(X_train,'Slot')
    X_train = encode_and_bind(X_train,'Student')
    X_train = encode_and_bind(X_train,'friends')

    X_test = encode_and_bind(X_test,'Slot')
    X_test = encode_and_bind(X_test,'Student')
    X_test = encode_and_bind(X_test,'friends')

    X_val = encode_and_bind(X_val,'Slot')
    X_val = encode_and_bind(X_val,'Student')
    X_val = encode_and_bind(X_val,'friends')







    model = Sequential()
    model.add(Dense(128, input_dim=330, activation='relu'))
    model.add(Dense(64, activation='relu'))
    model.add(Dense(38, activation='softmax'))
    model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
    model.summary()


    model_output = model.fit(X_train,y_train,epochs=35,steps_per_epoch=(2500//10),verbose=1,validation_data=(X_val,y_val),validation_steps=1072//10)

    score, acc = model.evaluate(X_test, y_test)
    print('Test score:', score)
    print('Test accuracy:', acc)

    predictions = model.predict_classes(X_test)
    correct = 0
    wrong = 0
    for i in range(len(predictions)-1):
        if 1 == y_test[i][predictions[i]]:
            correct+=1
        else:
            wrong+=1

    if correct > wrong:
        print((correct/len(predictions))*100)
    else:
        print(correct)
        print(wrong)
    with open("Output.txt", "a") as text_file:
        text_file.write("Selection Arry is %d , Accuracy is %f \n" % (SelectionArray[c], acc))
