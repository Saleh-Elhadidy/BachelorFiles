class Dataset:
    def __init__(self, StudentA, StudentB):
        self.person1 = StudentA
        self.person2 = StudentB
        self.mutual_intrests = 0
        self.max_common_events = 0
        self.mutual_loc = 0
        self.mutual_tut = 0
        self.friends = 0
    def __str__(self):
        return "The student's name is %s , The intrests are %s" % (self.person1,self.person2)


