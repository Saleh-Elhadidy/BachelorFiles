import pickle
import csv
import sys
sys.setrecursionlimit(2500)
import time
with open('CrossData.pickle', 'rb') as f:
    # The protocol version used is detected automatically, so we do not
    # have to specify it.
    data = pickle.load(f)
Friends = []
j = 0
ChangingStudent = None
StudentToCopy = None


with open('Friendship.csv', mode='a') as friends:
        friends_writer = csv.writer(friends,delimiter=',',quotechar=',',quoting=csv.QUOTE_MINIMAL,lineterminator='\r')
        friends_writer.writerow(['Tut_Common','City_Common','MutualEvents','MutualIntrests','Function','Friendship','id1','id2'])
for i in data:
    id1 = ""
    id2 = ""
    StudentA = i.person1
    StudentB = i.person2
    for index,x in enumerate(StudentA.name):
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
    #print("Mutual Intrests" + str(mutual_intests))
    #print("Mutual events " + str(max_mutualevents))
    #print(StudentA.tut_number == StudentB.tut_number)
    if StudentA.tut_number == StudentB.tut_number:
        tut_multiplier = 1
    if StudentA.fav_loc == StudentB.fav_loc:
        loc_multiplier = 1
    func = (0.25*tut_multiplier) + (0.15*loc_multiplier) + (0.5*((max_mutualevents/12)**2)) + (0.2*(mutual_intests/2.5))
    #print(func)
    friendship = 0
    if(func>=0.56):
        friendship = 987
        i.person1.friends.append(i.person2)
    with open('Friendship.csv', mode='a') as friends:
        friends_writer = csv.writer(friends,delimiter=',',quotechar=',',quoting=csv.QUOTE_MINIMAL,lineterminator='\r')
        friends_writer.writerow([tut_multiplier,loc_multiplier,max_mutualevents,mutual_intests,func,friendship,id1,id2])

while j < len(data):
   Friends.append(data[j].person1)
   j+=148





with open('Students.pickle', 'wb') as f:
    # Pickle the 'data' dictionary using the highest protocol available.
    pickle.dump(Friends, f, pickle.HIGHEST_PROTOCOL)

print("doneF")
# 10%*same tutorial 10%*similar fav loc 30%*similar intrests 50%*max mutual events
#    3 max intrests 3/max(3)
#
#
# 0.096
#