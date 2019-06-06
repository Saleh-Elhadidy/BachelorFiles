# Represents an event object (resembels a picture/post/like/tag)
class Event:
    def __init__(self, PeopleList, Time):
        self.people = PeopleList
        self.event_time = Time

    def __str__(self):
        return "The list of people is this event are %s" % (self.people)

