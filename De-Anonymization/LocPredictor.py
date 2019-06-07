from keras.layers import Dense,Dropout
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
from keras.callbacks import EarlyStopping
from sklearn.preprocessing import StandardScaler
import os
try:
	os.chdir(os.path.join(os.getcwd(), 'De-Anonymization'))
	print(os.getcwd())
except:
	pass
dataset = pd.read_csv('../Locations.csv')
chosen = []
i = 0
# Normalizing the friends record
def normalize(dataset):
    dataNorm=((dataset-dataset.min())/(dataset.max()-dataset.min()))*1
    dataNorm["Slot"]=dataset["Slot"]
    dataNorm["Tutorial"]=dataset["Tutorial"]
    dataNorm["Room"]=dataset["Room"]
    dataNorm["Student"]=dataset["Student"]
    dataNorm["fav_loc"]=dataset["fav_loc"]
    dataNorm["id"]=dataset["id"]
    return dataNorm
# One hot encoding of any required column
def encode_and_bind(original_dataframe, feature_to_encode):
    dummies = pd.get_dummies(original_dataframe[[feature_to_encode]])
    res = pd.concat([original_dataframe, dummies], axis=1)
    res = res.drop([feature_to_encode], axis=1)
    return(res) 
# removing the columns to be predicted
data = dataset.drop(columns=['Room'])
#data[['friends']] = StandardScaler().fit_transform(data[['friends']])
x_array = np.array(data['friends'])
normalized_X = preprocessing.normalize([x_array])
data['friends'] = normalized_X[0]
labels = dataset['Room']
classes = dataset['Room'].nunique()
encoder = LabelEncoder()
encoder.fit(labels)
encoded_Y = encoder.transform(labels)
# convert integers to one hot encoded labels
dummy_y = np_utils.to_categorical(encoded_Y)
from sklearn.metrics import confusion_matrix, precision_score
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(data, dummy_y, test_size=0.2, random_state=2)
j = 0

X_train, X_val, y_train, y_val = train_test_split(X_train, y_train, test_size=0.3, random_state=2)
#print(y_test[2])
count = 0
indexes = []
'''
Data anonymization, 257 is 20% of training we multiply to get 20% increments

while j < 257*3:
	index = random.randint(0,5000)
	if (X_train.index == index).any():
            X_train.set_value(index,'friends',-1)
            #X_train.set_value(index,'Student','HiddenStudent')
            j+=1
j = 0
while j < 110*3:
	index = random.randint(0,5000)
	if (X_val.index == index).any():
            X_val.set_value(index,'friends',-1)
            #X_val.set_value(index,'Student','HiddenStudent')
            j+=1
j = 0
while j < 2000:
    if (X_test.index == j).any():
        #X_test.set_value(j,'Tutorial',-1)
        #X_test.set_value(j,'Student','HiddenStudent')
        break
    j+=1
'''
# One hot encoding
X_train = encode_and_bind(X_train,'Slot')
X_train = encode_and_bind(X_train,'Student')
#NewTestData = pd.read_csv('/NewCSV.csv')
X_test = encode_and_bind(X_test,'Slot')
X_test = encode_and_bind(X_test,'Student')
# Making validation set only have holiday records
#X_testNew = X_test.loc[(X_test['Slot_Holiday']==1)]
#for index,row in X_test.iterrows():

#    if (row['Slot_Holiday'] != 1 and count not in indexes):
		#print(index)
#        indexes.append(count)
		#print(new_a)
		#print(y_test)
#    count+=1
#y_test = numpy.delete(y_test,indexes,0)
X_val = encode_and_bind(X_val,'Slot')
X_val = encode_and_bind(X_val,'Student')
with open("Output3.txt", "a") as text_file:
    early_stopping = EarlyStopping(monitor='val_loss', patience=2)
    for count in range(1):
        model = Sequential()
        #model.add(Dense(64, input_dim=186, activation='relu',kernel_regularizer=l2(0.03)))
        model.add(Dense(32,input_dim=184, activation='relu',kernel_regularizer=l2(0.03)))
        model.add(Dense(classes, activation='softmax'))
        model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
        model.summary()
        model_output = model.fit(X_train,y_train,epochs=100,steps_per_epoch=(2579//10),verbose=1,callbacks=[early_stopping],validation_data=(X_val,y_val),validation_steps=1105//10)


        plt.plot(model_output.history['acc'])
        plt.plot(model_output.history['val_acc'])
        plt.title('Model Acc')
        plt.ylabel('Acc')
        plt.xlabel('epoch')
        plt.legend(['train', 'validation'], loc='upper left')
        plt.show()
        score, acc = model.evaluate(X_test, y_test)
        print('Test score:', score)
        print('Test accuracy:', acc)
        predictions = model.predict_classes(X_test)
        correct = 0
        wrong = 0
        model.save("CalssifierBase22.h5")
        for i in range(len(predictions)-1):
            if 1 == y_test[i][predictions[i]]:
                correct+=1
            else:
                wrong+=1

        if correct > wrong:
            print((correct/len(predictions))*100)

        #if count <=20:
        #    text_file.write("40 Dual Privacy! , 32 Nodes!, Accuracy is! %f \n" % (acc))
        #    text_file.flush()
        #    os.fsync(text_file.fileno())
        #else:
        #    text_file.write("60 Privacy! , 128 Nodes!, Accuracy is! %f \n" % (acc))
        #    text_file.flush()
        #    os.fsync(text_file.fileno())
