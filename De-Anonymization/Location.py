class Location:
    def __init__(self, Room, Slot,Student):
        self.Room = Room
        self.Slot = Slot
        self.tutorial = Student.tut_number
        self.Student = Student
        self.friends = Student.friends

    def __str__(self):
        return "The student's name is %s , The intrests are %s" % (self.Room,self.Slot)