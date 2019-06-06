import random       
# Class representing student object
class Student:
    intrests = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14] # Array of intrests to use to randomise
    def __init__(self, name, t_number):
        self.name = name
        self.tut_number = t_number
        self.generate_intrests()
        self.events = []
        self.incidents = []
        self.fav_loc = random.randint(1,9)
        self.friends =[]
        #print("Name is :" + self.name + " ","Tutorial is: " + str(self.tut_number) + "",self.my_intrests)
    def __str__(self):
        return "The student's name is %s , The intrests are %s , Tutorial is %d" % (self.name,self.my_intrests,self.tut_number)
    def generate_intrests(self):
        self.my_intrests = []
        i = 0
        while i < 5: # choose 5  unique intrests
            chosen = self.intrests[random.randint(0,(len(self.intrests)-1))]
            if(len(self.my_intrests)==0):
                self.my_intrests.append(chosen)
                i+=1
            elif(len(self.my_intrests)>0 and (chosen not in self.my_intrests)):
                self.my_intrests.append(chosen)
                i+=1
            else:
                continue


