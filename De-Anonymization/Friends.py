import pickle
from Dataset import Dataset
import sys
sys.setrecursionlimit(2500)
with open('Students.pickle', 'rb') as f:
    data = pickle.load(f)
# performing cross product between all students into Dataset type objects for the 1st dataset
cross_data = []
for i in range(0,len(data)-1):
    curr = data[i]
    for j in range(0,len(data)-1):
        if curr != data[j]:
            cross_data.append(Dataset(data[i],data[j]))
        else:
            continue

print(len(cross_data))



with open('CrossData.pickle', 'wb') as f:
    pickle.dump(cross_data, f, pickle.HIGHEST_PROTOCOL)



print("Done!")
