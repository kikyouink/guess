# codeing=utf-8
import random
import time


class Guess:
    number = ""
    success = False
    step = 0
    time_start = 0
    time_end = 0

    def get_number(self):
        list = [str(x) for x in range(0, 10)]
        while list[0] == "0":
            random.shuffle(list)
        self.number = "".join(list[:4])
        print("number is ready\n")

    def check_number(self, n):
        A, B = 0, 0
        for i in self.number:
            index1 = n.find(i)
            if index1 != -1:
                index2 = self.number.find(i)
                if index1 == index2:
                    A += 1
                else:
                    B += 1
        if A != 4:
            return str("{}A{}B".format(A, B))
        else:
            self.success = True
            return "\nAmazing! You only use {} step!".format(self.step)

    def start(self):
        self.get_number()
        self.time_start = time.time()
        while not self.success:
            self.step += 1
            n = input("step {} ,please enter a number : ".format(self.step))
            result = self.check_number(n)
            print(result + "\n")
        else:
            self.time_end = time.time()
            print("You only spend {:.2f}s!".format(self.time_end - self.time_start))


game = Guess()
game.start()

