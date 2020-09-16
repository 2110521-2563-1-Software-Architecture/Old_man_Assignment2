import matplotlib.pyplot as plt
import numpy as np

with open('GRPCInsertOne.txt') as g1:
    lines = g1.readlines()
    y1 = [float(line.split()[0])*1000 for line in lines]

with open('GRPCInsert100.txt') as g2:
    lines = g2.readlines()
    y1.append([float(line.split()[0])*1000 for line in lines])

with open('RESTInsertOne.txt') as r1:
    lines = r1.readlines()
    y2 = [float(line.split()[0])*1000 for line in lines]

with open('RESTInsert100.txt') as r2:
    lines = r2.readlines()
    y2.append([float(line.split()[0])*1000 for line in lines])

x = [1,100]

plt.plot(x, y1, label='GRPC', color='g', marker='o')
plt.plot(x, y2, label='REST', color='r', marker='o')
plt.xlabel('Number of Insertion')
plt.ylabel('Response Time (Microsecond)')
plt.title('Graph A')
plt.legend()
plt.show()
plt.savefig('GraphA.png')