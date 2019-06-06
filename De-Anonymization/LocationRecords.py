import pickle
from Location import Location
import csv
with open('Locations.pickle', 'rb') as f:
    # The protocol version used is detected automatically, so we do not
    # have to specify it.
    data = pickle.load(f)
Locs = data
# writing the location predication dataset to a CSV file
with open('Locations.csv', mode='a') as locs:
        location_writer = csv.writer(locs,delimiter=',',quotechar=',',quoting=csv.QUOTE_MINIMAL,lineterminator='\r')
        location_writer.writerow(['Slot','Tutorial','Room','Student','fav_loc','friends','id'])
for i in Locs:
        id = ""
        temp = ""
        my_name = ""
        FriendsString = ""
        for index,letter in enumerate(i.Student.name):
                if letter.isdigit():
                        my_name = my_name + letter
                        id = i.Student.name[index:len(i.Student.name)]
                        break
        for friend in i.friends:
                for letter in friend.name:
                        if letter.isdigit():
                                temp = temp + letter
                        else:
                                continue
                
                temp = temp + ""
        if temp == "":
                temp = -1
        else:
                temp = int(temp)
        with open('Locations.csv', mode='a') as locs:
                location_writer = csv.writer(locs,delimiter=',',quotechar=',',quoting=csv.QUOTE_MINIMAL,lineterminator='\r')
                location_writer.writerow([i.Slot,i.tutorial,i.Room,i.Student.name,i.Student.fav_loc,temp,id])
    
