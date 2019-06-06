# Used to generate the students intially and their intrests/tutorial's rooms and timeslots
from Student import Student
from Event import Event
import random
import pickle
from random import choices
gapList = ["9:45","11:45","1:30","3:30"]
StudentList = []
import sys
sys.setrecursionlimit(3000)
def generate_events(StudentA): # generates 60 events for each student where the first 35 are 100% random and the following 25 are based on the previous 35
        for i in range(60):
                choicesPeople = {}
                people_list = []
                if i >= 35: # counting how many times each students appeared when  >= 35 events
                        for event in StudentA.events:
                                for person in event.people:
                                        if person in choicesPeople:
                                                choicesPeople[person] = choicesPeople[person]+1
                                        else:
                                                choicesPeople[person] = 1

                start = 0
                end = 25
                num_people = -1
                if(i>=35): # events after 35 are based on the students appearing alot in the first 35
                        keys = list(choicesPeople.keys())
                        choiceList = list(choicesPeople.values())
                        candidates = []
                        
                        for index,choice in enumerate(choiceList,start=0):
                                if choice > 4:
                                        candidates.append(keys[index])
                        
                        probability = 1/len(candidates)
                        listProb = [probability]*len(candidates)
                        while end < start and num_people <= len(candidates):
                                start = random.randint(0,3)
                                end = random.randint(0,10)
                                if end > start:
                                        num_people = random.randint(start,end)
                        while j < num_people:
                                choosenStudent = (choices(candidates,listProb)[0])
                                if choosenStudent in people_list:
                                        continue
                                else:
                                        people_list.append(choosenStudent)
                                        j+=1
                                
                        event_time = gapList[random.randint(0,len(gapList)-1)]
                        to_gen = Event(people_list,event_time)
                        StudentA.events.append(to_gen)

                else: # first 35 randomly
                        while end < start:
                                start = random.randint(0,3)
                                end = random.randint(0,10)
                        num_people = random.randint(start,end)

                        j = 0
                        while j < num_people:
                                toAdd = StudentList[random.randint(0,len(StudentList)-1)]
                                if(toAdd==StudentA or toAdd in people_list):
                                        continue
                                else:
                                        people_list.append(toAdd)
                                        j+=1
                
                        event_time = gapList[random.randint(0,len(gapList)-1)]
                        to_gen = Event(people_list,event_time)
                        StudentA.events.append(to_gen)



for i in range(150):
    StudentList.append(Student("Student"+str(i),(i//25)+1)) # Student generation

for i in StudentList:       
        generate_events(i) # event generation for each student
Days = ['Sat','Sun','Mon','Tues','Wed','Thurs']
Slots = ['1st','2nd','3rd','4th','5th']
Rooms = ['C7.301','C7.302','C7.303','C7.304','C7.305','C7.306','C6.301','C6.302','C6.303','C6.304','C6.305','C6.306','C5.301','C5.302','C5.303','C5.304','C5.305','C5.306',
        'C5.301','C5.302','C5.303','C5.304','C5.305','C5.306','C2.301','C2.302','C2.303','C2.302','C2.301','C3.306','C3.305','C3.304','C3.303','C3.302','C3.301','C7.01','C7.02',
        'D4.301','D4.302','D4.303','D4.304','D4.305','D4.306','B4.301','B6.302','B6.303']
DaySlots =[]

for i in (Days): # concatinating Days and slot to form GUC time slots for the 2nd dataset
        for index2,j in enumerate(Slots):
                DaySlots.append(i+" "+Slots[index2])

chosen = []
Tutorial1_Dictionary = {}
Tutorial2_Dictionary = {}
Tutorial3_Dictionary = {}
Tutorial4_Dictionary = {}
Tutorial5_Dictionary = {}
Tutorial6_Dictionary = {}
done = False
# In the following part we choose rooms for each tutorial seperately for a duration of 1 week(30 Slots) starting from 1-->6  to make sure there are no duplicate tutorials
# We generate 1 student only since all other 24 students will have similar rooms as they are in simillar tutorials
for j in range(30):
        chosenRoom = Rooms[random.randint(0,len(Rooms)-1)]
        #print(chosen)
        Tutorial1_Dictionary.update({str(j):chosenRoom})
        StudentList[0].incidents.append(DaySlots[j] + "," + chosenRoom)
for j in range(30):
        done = False
        while not done:
                chosenRoom = Rooms[random.randint(0,len(Rooms)-1)]
                #print(chosen)
                if chosenRoom != Tutorial1_Dictionary.get(str(j)):
                        chosen.append(chosenRoom)
                        done = True
                        Tutorial2_Dictionary.update({str(j):chosenRoom})
                        StudentList[25].incidents.append(DaySlots[j] + "," + chosenRoom)

for j in range(30):
        done = False
        while not done:
                chosenRoom = Rooms[random.randint(0,len(Rooms)-1)]
                #print(chosen)
                if chosenRoom != Tutorial1_Dictionary.get(str(j)) and chosenRoom != Tutorial2_Dictionary.get(str(j)):
                        chosen.append(chosenRoom)
                        done = True
                        Tutorial3_Dictionary.update({str(j):chosenRoom})
                        StudentList[50].incidents.append(DaySlots[j] + "," + chosenRoom)

for j in range(30):
        done = False
        while not done:
                chosenRoom = Rooms[random.randint(0,len(Rooms)-1)]
                #print(chosen)
                if chosenRoom != Tutorial1_Dictionary.get(str(j)) and chosenRoom != Tutorial2_Dictionary.get(str(j)) and chosenRoom != Tutorial3_Dictionary.get(str(j)) :
                        chosen.append(chosenRoom)
                        done = True
                        Tutorial4_Dictionary.update({str(j):chosenRoom})
                        StudentList[75].incidents.append(DaySlots[j] + "," + chosenRoom)

for j in range(30):
        done = False
        while not done:
                chosenRoom = Rooms[random.randint(0,len(Rooms)-1)]
                #print(chosen)
                if chosenRoom != Tutorial1_Dictionary.get(str(j)) and chosenRoom != Tutorial2_Dictionary.get(str(j)) and chosenRoom != Tutorial3_Dictionary.get(str(j)) and chosenRoom != Tutorial4_Dictionary.get(str(j)) :
                        chosen.append(chosenRoom)
                        done = True
                        Tutorial5_Dictionary.update({str(j):chosenRoom})
                        StudentList[100].incidents.append(DaySlots[j] + "," + chosenRoom)


for j in range(30):
        done = False
        while not done:
                chosenRoom = Rooms[random.randint(0,len(Rooms)-1)]
                #print(chosen)
                if chosenRoom != Tutorial1_Dictionary.get(str(j)) and chosenRoom != Tutorial2_Dictionary.get(str(j)) and chosenRoom != Tutorial3_Dictionary.get(str(j)) and chosenRoom != Tutorial4_Dictionary.get(str(j)) and chosenRoom != Tutorial5_Dictionary.get(str(j)) :
                        chosen.append(chosenRoom)
                        done = True
                        Tutorial6_Dictionary.update({str(j):chosenRoom})
                        StudentList[125].incidents.append(DaySlots[j] + "," + chosenRoom)



for i in range(25): # copying the data of the student generated above to the rest of the students
        StudentList[i].incidents = StudentList[0].incidents
        StudentList[i+25].incidents = StudentList[25].incidents
        StudentList[i+50].incidents = StudentList[50].incidents
        StudentList[i+75].incidents = StudentList[75].incidents
        StudentList[i+100].incidents = StudentList[100].incidents
        StudentList[i+125].incidents = StudentList[125].incidents


with open('Students.pickle', 'wb') as f:
    # Pickle the 'data' dictionary using the highest protocol available.
    pickle.dump(StudentList, f, pickle.HIGHEST_PROTOCOL)
