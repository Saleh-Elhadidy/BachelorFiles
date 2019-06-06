
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

dataset = pd.read_csv('../Friendship.csv')

data = dataset.drop(columns=['Friendship','Function']) # remove friendship (output to be predicted) and function (to prevent data leakage)
labels = dataset['Friendship'] # correct labels
from sklearn.metrics import confusion_matrix, precision_score
from sklearn.model_selection import train_test_split
x_train, x_test, y_train, y_test = train_test_split(data,labels, test_size=0.2, random_state=0) # split into 80/20 train test

from keras.layers import Dense,Dropout
from keras.models import Sequential
from keras.regularizers import l2,l1,l1_l2
from keras.optimizers import SGD
model = Sequential()
#Hidden Layer-1
model.add(Dense(4,activation='relu',input_dim=6,kernel_regularizer=l2(0.01)))
model.add(Dense(4,activation = 'relu',kernel_regularizer=l2(0.01)))
model.add(Dense(1,activation='sigmoid'))
model.compile(loss='binary_crossentropy',optimizer='Adam',metrics=['accuracy'])
model.summary()
# Validation higher than training becuase in testing we use L2 regularizer while we don't use it in validation

model_output = model.fit(x_train,y_train,epochs=30,steps_per_epoch=(13231//30),verbose=1,validation_data=(x_test,y_test),validation_steps=((4410)//30))

train_score = model.evaluate(x_train, y_train, verbose=True)
test_score = model.evaluate(x_test, y_test, verbose=True)

print("Validation:", test_score[1])
print("Training:  ", train_score[1])
# plot the model
plt.plot(model_output.history['acc'])
plt.plot(model_output.history['val_acc'])
plt.title('Model Acc')
plt.ylabel('Acc')
plt.xlabel('epoch')
plt.legend(['train', 'validation'], loc='upper left')
plt.show()


model.save("Calssifier.h5")