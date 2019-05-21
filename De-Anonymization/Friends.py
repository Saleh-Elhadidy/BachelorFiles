import pickle
from Dataset import Dataset
import sys
sys.setrecursionlimit(2500)
with open('Students.pickle', 'rb') as f:
    # The protocol version used is detected automatically, so we do not
    # have to specify it.
    data = pickle.load(f)

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
    # Pickle the 'data' dictionary using the highest protocol available.
    pickle.dump(cross_data, f, pickle.HIGHEST_PROTOCOL)



print("Done!")
