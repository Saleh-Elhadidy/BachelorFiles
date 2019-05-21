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
import itertools
#4606 rows
import os
try:
	os.chdir(os.path.join(os.getcwd(), 'De-Anonymization'))
	print(os.getcwd())
except:
	pass
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
def normalize(dataset):
    dataNorm=((dataset-dataset.min())/(dataset.max()-dataset.min()))*1
    dataNorm["Slot"]=dataset["Slot"]
    dataNorm["Tutorial"]=dataset["Tutorial"]
    dataNorm["Room"]=dataset["Room"]
    dataNorm["Student"]=dataset["Student"]
    dataNorm["fav_loc"]=dataset["fav_loc"]
    dataNorm["id"]=dataset["id"]
    return dataNorm

def encode_and_bind(original_dataframe, feature_to_encode):
    dummies = pd.get_dummies(original_dataframe[[feature_to_encode]])
    res = pd.concat([original_dataframe, dummies], axis=1)
    res = res.drop([feature_to_encode], axis=1)
    return(res) 

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
# convert integers to dummy variables (i.e. one hot encoded)
dummy_y = np_utils.to_categorical(encoded_Y)
from sklearn.metrics import confusion_matrix, precision_score
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(data, dummy_y, test_size=0.2, random_state=2)
j = 0
X_train, X_val, y_train, y_val = train_test_split(X_train, y_train, test_size=0.3, random_state=2)

X_train = encode_and_bind(X_train,'Slot')
X_train = encode_and_bind(X_train,'Student')
#NewTestData = pd.read_csv('/NewCSV.csv')
X_test = encode_and_bind(X_test,'Slot')
X_test = encode_and_bind(X_test,'Student')
X_testNew = X_test.loc[X_test['Slot_Holiday']==1]

print(X_testNew)
#print(y_test[2])
count = 0
indexes = []
for index,row in X_test.iterrows():
	#print(index)
	#print(row['Slot'])
	if row['Slot_Holiday'] != 1:
		#print(index)
		indexes.append(count)
		#print(new_a)
		#print(y_test)
	count+=1
y_test = numpy.delete(y_test,indexes,0)
print(len(y_test)== len(X_testNew))
#print(y_test)