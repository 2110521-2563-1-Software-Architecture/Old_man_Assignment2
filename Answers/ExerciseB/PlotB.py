import matplotlib.pyplot as plt
import os
THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))

xaxis = range(1,4097)
RestGet = []
RestInsert = []
RestList = []
GRPCGet = []
GRPCInsert = []
GRPCList = []

Rest1 = open(os.path.join(THIS_FOLDER, 'RESTGet4096.txt'),'r')
Rest2 = open(os.path.join(THIS_FOLDER, 'RESTInsert4096.txt'),'r')
Rest3 = open(os.path.join(THIS_FOLDER, 'RESTList4096.txt'),'r')
GRPC1 = open(os.path.join(THIS_FOLDER, 'GRPCGet4096.txt'), 'r')
GRPC2 = open(os.path.join(THIS_FOLDER, 'GRPCInsert4096.txt'), 'r')
GRPC3 = open(os.path.join(THIS_FOLDER, 'GRPCList4096.txt'), 'r')

for line in Rest1:
    time = line.strip()   
    ftime = float(time)
    RestGet.append(ftime/1000000)

for line in Rest2:
    time = line.strip()   
    ftime = float(time)
    RestInsert.append(ftime/1000000)

for line in Rest3:
    time = line.strip()   
    ftime = float(time)
    RestList.append(ftime/1000000)

for line in GRPC1:
    time = line.strip()   
    ftime = float(time)
    GRPCGet.append(ftime*1000)

for line in GRPC2:
    time = line.strip()   
    ftime = float(time)
    GRPCInsert.append(ftime*1000)

for line in GRPC3:
    time = line.strip()   
    ftime = float(time)
    GRPCList.append(ftime*1000)

plt.xlabel('Number of Call(s)')
plt.ylabel('Response Time (millisec)')

plt.plot(xaxis, RestGet , label = 'RestAPI Get')
plt.plot(xaxis, RestInsert , label = 'RestAPI Insert') 
plt.plot(xaxis, RestList , label = 'RestAPI List') 
plt.plot(xaxis, GRPCGet , label = 'GRPC Get') 
plt.plot(xaxis, GRPCInsert , label = 'GRPC Insert') 
plt.plot(xaxis, GRPCList , label = 'GRPC List') 

plt.title('Comparison of Response Time in b)')

plt.legend()
plt.show() 