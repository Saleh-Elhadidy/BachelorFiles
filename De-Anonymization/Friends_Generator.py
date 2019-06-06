import pickle
import csv
import sys
sys.setrecursionlimit(2500)
import time
with open('CrossData.pickle', 'rb') as f:
    data = pickle.load(f)
Friends = []
j = 0
ChangingStudent = None
StudentToCopy = None

# Writing the first dataset and determining friendship relations
with open('Friendship.csv', mode='a') as friends:
        friends_writer = csv.writer(friends,delimiter=',',quotechar=',',quoting=csv.QUOTE_MINIMAL,lineterminator='\r')
        friends_writer.writerow(['Tut_Common','City_Common','MutualEvents','MutualIntrests','Function','Friendship','id1','id2'])
# we first count the max mutual events/intrests of every dataset row (dataset objects contain 2 students cross product each other) to aid us in the formula calculation below 
for i in data:
    id1 = ""
    id2 = ""
    StudentA = i.person1
    StudentB = i.person2
    for index,x in enumerate(StudentA.name): # extracting IDs
        if x.isdigit():
            id1 = StudentA.name[index:len(StudentA.name)]
            break
    for index,x in enumerate(StudentB.name):
        if x.isdigit():
            id2 = StudentB.name[index:len(StudentB.name)]
            break
    mutual_intests = 0
    mutual_events_A = 0
    mutual_events_B=0
    for intrest1 in StudentA.my_intrests:
        for intrest2 in StudentB.my_intrests:
            if intrest1 == intrest2:
                mutual_intests+=1
                break
            else:
                continue
    
    for event in StudentA.events:
       for person in event.people:
           if StudentA == person:
               mutual_events_A+=1
               break
    
    for event in StudentB.events:
       for person in event.people:
           if StudentA == person:
               mutual_events_B+=1
               break
    tut_multiplier = 0
    loc_multiplier = 0
    max_mutualevents = max(mutual_events_A,mutual_events_B)
    if StudentA.tut_number == StudentB.tut_number: # similar tutorial and most visited location
        tut_multiplier = 1
    if StudentA.fav_loc == StudentB.fav_loc:
        loc_multiplier = 1
    func = (0.15*tut_multiplier) + (0.05*loc_multiplier) + (0.5*((max_mutualevents/12)**2)) + (0.3*(mutual_intests/2.5))
    #print(func)
    friendship = 0
    if(func>=0.56):
        friendship = 1
        i.person1.friends.append(i.person2)
    with open('Friendship.csv', mode='a') as friends:
        friends_writer = csv.writer(friends,delimiter=',',quotechar=',',quoting=csv.QUOTE_MINIMAL,lineterminator='\r')
        friends_writer.writerow([tut_multiplier,loc_multiplier,max_mutualevents,mutual_intests,func,friendship,id1,id2])

while j < len(data): # used to update the original friends pickle file (before cross product) to be used in 2nd dataset
   Friends.append(data[j].person1)
   j+=148





with open('Students.pickle', 'wb') as f:
    pickle.dump(Friends, f, pickle.HIGHEST_PROTOCOL)

print("done")