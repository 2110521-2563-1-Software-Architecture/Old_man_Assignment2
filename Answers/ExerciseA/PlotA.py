import matplotlib.pyplot as plt
import os
THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))

xaxis = [1,100]
RestTime = []
GRPCTime = []

Rest1 = open(os.path.join(THIS_FOLDER, 'RESTInsertOne.txt'),'r')
GRPC1 = open(os.path.join(THIS_FOLDER, 'GRPCInsertOne.txt'), 'r')
Rest2 = open(os.path.join(THIS_FOLDER, 'RESTInsert100.txt'),'r')
GRPC2 = open(os.path.join(THIS_FOLDER, 'GRPCInsert100.txt'), 'r')

for line in Rest1:
    time = line.strip()   
    ftime = float(time)
    RestTime.append(ftime/1000000)

for line in Rest2:
    time = line.strip()   
    ftime = float(time)
    RestTime.append(ftime/1000000)

for line in GRPC1:
    time = line.strip()   
    ftime = float(time)
    GRPCTime.append(ftime*1000)

for line in GRPC2:
    time = line.strip()   
    ftime = float(time)
    GRPCTime.append(ftime*1000)

plt.xlabel('Number of Call(s)')
plt.ylabel('Response Time (millisec)')

plt.plot(xaxis, RestTime , label = 'RestAPI') 
plt.plot(xaxis, GRPCTime , label = 'GRPC') 

plt.title('Comparison of Response Time in a)')

plt.legend()
plt.show() 