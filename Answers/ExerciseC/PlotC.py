import matplotlib.pyplot as plt

xaxis = [1,2,4,8,16,32,64,128,256,512,1024,2048,4096]
RestTime = []
GRPCTime = []

RestTimeFile = open('C:/Users/World/Desktop/SoftArc/Assignment2/Old_man_Assignment2/Answers/ExerciseC/RESTConcurrent.txt','r')
GRPCTimeFile = open('C:/Users/World/Desktop/SoftArc/Assignment2/Old_man_Assignment2/Answers/ExerciseC/GRPCConcurrent.txt' , 'r')

for line in RestTimeFile:
    time = line.strip()   
    ftime = float(time)
    RestTime.append(ftime/1000000)

for line in GRPCTimeFile:
    time = line.strip()   
    ftime = float(time)
    GRPCTime.append(ftime*1000)

plt.xlabel('Number of Concurrent Call(s)')
plt.ylabel('Response Time (milli sec)')

plt.plot(xaxis, RestTime , label = 'RestAPI') 
plt.plot(xaxis, GRPCTime , label = 'GRPC') 

plt.title('Comparison of Response Time in c)')

plt.legend()
plt.show() 



