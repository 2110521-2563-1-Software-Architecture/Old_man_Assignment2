# Software Architecture Assignment2
-----
**Members**
1. คณิสร เข็มทอง 6030064821
2. วชิรฉัตร สวัสดิวัตน์ ณ อยุธยา 6030506921
3. ธียศ ศิริเสรีวรรณ 6031027821
4. นนทกร เกตุนิรัตน์ 6031028421
5. นนทกร ตะบูนพงศ์ 6031029021
-----
**Answer**
1. Graph
Single client with a small call to insert a book item, a bigger call to insert a list of multiple book items.
<img src='/Answers/ExerciseA/GraphInA.PNG'>

Multiple clients with different kind of calls.

<img src='/Answers/ExerciseB/GraphInB.PNG'>

Vary the number of concurrent calls from 1 to 4096 calls.

<img src='/Answers/ExerciseC/GraphInC.PNG'>

2. Discussion
gRPC ใช้ HTTP2 ที่สนับสนุนการส่งข้อมูลแบบพร้อมกันหลายๆอัน แต่ REST ใช้ HTTP1.1 ที่รับส่งข้อมูลแบบ Request-Response หรือก็คือทีละครั้ง ดังนั้นโดยปกติแล้ว gRPC จะมี Response Time ที่ดีกว่า 

3. Comparision
Language neutral: gRPC และ REST รองรับได้หลายภาษาทั้งคู่ แต่RESTมีมานานกว่า gRPC--
Ease of use: ถึงแม้ Rest API จะถูกใช้งานอย่างแพร่หลาย แต่เมื่อเทียบกันแล้ว gRPC มี Line of Codes ที่น้อยกว่า-- 
Performance: gRPC ชนะขาดลอย

4. ผลลัพธ์เป็นไปในทิศทางเดียวกันโดยที่ gRPC มี Performance ที่ดีกว่าในทุกๆด้าน
