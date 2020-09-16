import matplotlib.pyplot as plt
import os
THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))

xaxis = [1,2,4,8,16,32,64,128,256,512,1024,2048,4096]
RestTime = []
GRPCTime = []

RestTimeFile = open(os.path.join(THIS_FOLDER, 'RESTConcurrent.txt'),'r')
GRPCTimeFile = open(os.path.join(THIS_FOLDER, 'GRPCConcurrent.txt'), 'r')

for line in RestTimeFile:
    time = line.strip()   
    ftime = float(time)
    RestTime.append(ftime/1000000)

for line in GRPCTimeFile:
    time = line.strip()   
    ftime = float(time)
    GRPCTime.append(ftime*1000)

plt.xlabel('Number of Concurrent Call(s)')
plt.ylabel('Response Time (millisec)')

plt.plot(xaxis, RestTime , label = 'RestAPI') 
plt.plot(xaxis, GRPCTime , label = 'GRPC') 

plt.title('Comparison of Response Time in c)')

plt.legend()
plt.show() 