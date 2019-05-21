import pickle
from Location import Location
import csv
import random
import sys
sys.setrecursionlimit(2500)
with open('Students.pickle', 'rb') as f:
    # The protocol version used is detected automatically, so we do not
    # have to specify it.
    data = pickle.load(f)
Locs = []
for i in data:
    for j in i.incidents:
        Split = j.split(",")
        Room = Split[1]
        Slot = Split[0]
        Locs.append(Location(Room,Slot,i))
done = []
Places = ["Cairo",'Alexandria',"Paris","London","Madrid","Barcelona","Roma","Cicly","Prague","USA","Englnad","Canada","Liverpool","Brazil","NorthCoast"]

for i in range(150):
    if i ==0:
        chosenPlace = Places[random.randint(0,len(Places)-1)]
        Locs.insert(((i*30)+30+i),Location(chosenPlace,'Holiday',Locs[0].Student))
        done.append(Locs[0].Student.name)
        if len(Locs[0].Student.friends) >= 3:
            in1=0
            in2=0
            while in1 == in2:
                in1 = random.randint(0,(len(Locs[0].Student.friends)-1))
                in2 = random.randint(0,(len(Locs[0].Student.friends)-1))
            studentA = Locs[0].Student.friends[in1]
            studentB = Locs[0].Student.friends[in2]
            for index,letter in enumerate(studentA.name):
                if letter.isdigit():
                        id1 = studentA.name[index:len(studentA.name)]
                        break
            for index,letter in enumerate(studentB.name):
                if letter.isdigit():
                        id2 = studentB.name[index:len(studentB.name)]
                        break
            if studentA.name not in done:
                ind = -1
                done.append(studentA.name)
                for index,i in enumerate(Locs):
                    if i.Student.name == studentA.name:
                        ind = index
                        break
                    else:
                        continue
                while ind < len(Locs):
                    if Locs[ind].Student.name == studentA.name:
                        ind+=1
                    else:
                        print("Adding record for student ID:",id1)
                        Locs.insert(ind,Location(chosenPlace,'Holiday',studentA))
                        
                        #print("----First Friend----")
                        #print(Locs[ind-1].Student.name)
                        #print(Locs[ind].Student.name)
                        #print(Locs[ind+1].Student.name)
                        #print(ind)
                        break
            if studentB.name not in done:
                ind = -1
                done.append(studentB.name)
                for index,i in enumerate(Locs):
                    if i.Student.name == studentB.name:
                        ind = index
                        break
                    else:
                        continue
                while ind < len(Locs):
                    if Locs[ind].Student.name == studentB.name:
                        ind+=1
                    else:
                        print("Adding record for student ID:",id2)
                        Locs.insert(ind,Location(chosenPlace,'Holiday',studentB))
                        #print("----Second Friend----")
                        #print(Locs[ind-1].Student.name)
                        #print(Locs[ind].Student.name)
                        #print(Locs[ind+1].Student.name)
                        #print(ind)
                        break


              
        else:
            continue
    else:
        print("Trying to write for Student : ",Locs[(i*30)+5].Student.name,"Value of expressions is : ",((i*30)+5))
        if Locs[(i*30)+5].Student.name not in done:
            chosenPlace = Places[random.randint(0,len(Places)-1)]
            Locs.insert(((i*30)+30+i),Location(chosenPlace,'Holiday',Locs[(i*30)+5].Student))
            done.append(Locs[(i*30)+5].Student.name)
            if len(Locs[(i*30)+5].Student.friends) >= 3:
                in1=0
                in2=0
                while in1 == in2:
                    in1 = random.randint(0,(len(Locs[(i*30)+5].Student.friends)-1))
                    in2 = random.randint(0,(len(Locs[(i*30)+5].Student.friends)-1))
                studentA = Locs[(i*30)+5].Student.friends[in1]
                studentB = Locs[(i*30)+5].Student.friends[in2]
                for index,letter in enumerate(studentA.name):
                    if letter.isdigit():
                            id1 = studentA.name[index:len(studentA.name)]
                            break
                for index,letter in enumerate(studentB.name):
                    if letter.isdigit():
                            id2 = studentB.name[index:len(studentB.name)]
                            break
                if studentA.name not in done:
                    ind = -1
                    done.append(studentA.name)
                    #print("Searching for ID:",id1)
                    for index,i in enumerate(Locs):
                        if i.Student.name == studentA.name:
                            ind = index
                            break
                        else:
                            continue
                    while ind < len(Locs):
                        if Locs[ind].Student.name == studentA.name:
                            ind+=1
                        else:
                            #print("----Before Adding 1st Friend----")
                            #print(Locs[ind-1].Student.name)
                            #print(Locs[ind].Student.name)
                            #print(Locs[ind+1].Student.name)
                            #print(ind)
                            print("Adding record for student ID:",id1)
                            Locs.insert(ind,Location(chosenPlace,'Holiday',studentA))
                            
                            #print("----First Friend----")
                            #print(Locs[ind-1].Student.name)
                            #print(Locs[ind].Student.name)
                            #print(Locs[ind+1].Student.name)
                            #print(ind)
                            break
                if studentB.name not in done:
                    ind = -1
                    done.append(studentB.name)
                    #print("Searching for ID:",id2)
                    for index,i in enumerate(Locs):
                        if i.Student.name == studentB.name:
                            ind = index
                            break
                        else:
                            continue
                    while ind < len(Locs):
                        if Locs[ind].Student.name == studentB.name:
                            ind+=1
                        else:
                            #print("----Before Adding 2nd Friend----")
                            #print(Locs[ind-1].Student.name)
                            #print(Locs[ind].Student.name)
                            #print(Locs[ind+1].Student.name)
                            #print(ind)
                            print("Adding record for student ID:",id2)
                            Locs.insert(ind,Location(chosenPlace,'Holiday',studentB))
                            #print("----Second Friend----")
                            #print(Locs[ind-1].Student.name)
                            #print(Locs[ind].Student.name)
                            #print(Locs[ind+1].Student.name)
                            #print(ind)
                            break
with open('Locations.pickle', 'wb') as f:
    # Pickle the 'data' dictionary using the highest protocol available.
    pickle.dump(Locs, f, pickle.HIGHEST_PROTOCOL)