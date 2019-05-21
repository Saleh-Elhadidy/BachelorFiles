
import os
try:
	os.chdir(os.path.join(os.getcwd(), 'De-Anonymization'))
	print(os.getcwd())
except:
	pass


import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
%matplotlib inline
from sklearn.preprocessing import LabelEncoder
from sklearn import preprocessing
import numpy
import pandas
from keras.models import Sequential
from keras.layers import Dense
from keras.wrappers.scikit_learn import KerasClassifier
from keras.utils import np_utils
from sklearn.model_selection import cross_val_score
from sklearn.model_selection import KFold
from sklearn.preprocessing import LabelEncoder
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
import random

dataset = pd.read_csv('../Locations.csv')
chosen = []
i = 0
#while i < 894:
#    j = random.randint(0,4469)
#    #j = i
#    if j not in chosen:
#        dataset.set_value(j, 'fav_loc',5)
#        i+=1
#        chosen.append(j)
#    else:
#        continue

#%%
dataset.describe(include='all')

data = dataset.drop(columns=['Room'])
labels = dataset['Room']
classes = dataset['Room'].nunique()

dataset.head(5)

def encode_and_bind(original_dataframe, feature_to_encode):
    dummies = pd.get_dummies(original_dataframe[[feature_to_encode]])
    res = pd.concat([original_dataframe, dummies], axis=1)
    res = res.drop([feature_to_encode], axis=1)
    return(res) 


data = encode_and_bind(data,'Slot')
data = encode_and_bind(data,'Student')



encoder = LabelEncoder()
encoder.fit(labels)
encoded_Y = encoder.transform(labels)
# convert integers to dummy variables (i.e. one hot encoded)
dummy_y = np_utils.to_categorical(encoded_Y)

from sklearn.metrics import confusion_matrix, precision_score
from sklearn.model_selection import train_test_split
x_train, x_test, y_train, y_test = train_test_split(data,dummy_y, test_size=0.35, random_state=0,shuffle = True)


from keras.layers import Dense,Dropout
from keras.models import Sequential
from keras.regularizers import l2,l1,l1_l2
from keras.optimizers import SGD
model = Sequential()
model.add(Dense(16, input_dim=181, activation='relu'))
model.add(Dense(38, activation='softmax'))
model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
model.summary()


model_output = model.fit(x_train,y_train,epochs=150,steps_per_epoch=(2905//10),verbose=1,validation_data=(x_test,y_test),validation_steps=1564//10)

