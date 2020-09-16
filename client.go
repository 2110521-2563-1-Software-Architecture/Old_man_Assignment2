//   Copyright 2016, Google, Inc.
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//       http://www.apache.org/licenses/LICENSE-2.0
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"io"
	"log"
	"strconv"
	"time"

	pb "./books"

	"golang.org/x/net/context"
	"google.golang.org/grpc"
)

var (
	address = flag.String("address", "127.0.0.1:50051", "Address of service")
)

// GetClient attempts to dial the specified address flag and returns a service
// client and its underlying connection. If it is unable to make a connection,
// it dies.
func GetClient() (*grpc.ClientConn, pb.BookServiceClient) {
	conn, err := grpc.Dial(*address, grpc.WithTimeout(5*time.Second), grpc.WithInsecure())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	return conn, pb.NewBookServiceClient(conn)
}

func main() {
	flag.Parse()
	ctx := context.Background()
	cmd, ok := commands[flag.Arg(0)]
	if !ok {
		usage()
	} else {
		cmd.do(ctx, flag.Args()[1:]...)
	}
}

func usage() {
	fmt.Println(`client.go is a command-line client for this codelab's gRPC service

Usage:
  client.go list                            List all books
  client.go insert <id> <title> <author>    Insert a book
  client.go get <id>                        Get a book by its ID
  client.go delete <id>                     Delete a book by its ID
  client.go watch                           Watch for inserted books`)
}

var commands = map[string]struct {
	name, desc string
	do         func(context.Context, ...string)
	usage      string
}{
	"get": {
		name:  "get",
		desc:  "Retrieves the indicated book",
		do:    doGet,
		usage: "client.go get <id>",
	},
	"getOne": {
		name:  "getOne",
		desc:  "Capture one time",
		do:    doGetOne,
		usage: "client.go getOne",
	},
	"getLoop": {
		name:  "getLoop",
		desc:  "Captuer get 100 time",
		do:    doLoopGet,
		usage: "client.go getLoop",
	},
	"getLoop4096": {
		name:  "getLoop4096",
		desc:  "Captuer get 4096 time",
		do:    doLoopGet4096,
		usage: "client.go getLoop4096",
	},
	"list": {
		name:  "list",
		desc:  "Lists all books",
		do:    doList,
		usage: "client.go list",
	},
	"loopList": {
		name:  "loopList",
		desc:  "loopList all",
		do:    doLoopList,
		usage: "client.go loopList",
	},
	"loopList4096": {
		name:  "loopList4096",
		desc:  "LoopList 4096",
		do:    doLoopList4096,
		usage: "client.go loopList4096",
	},
	"insert": {
		name:  "insert",
		desc:  "Inserts the provided book",
		do:    doInsert,
		usage: "client.go insert <id> <title> <author>",
	},
	"insertOne": {
		name:  "doInsertOne",
		desc:  "Inserts Onetime and return time",
		do:    doInsertOne,
		usage: "client.go insertOne",
	},
	"insertList": {
		name:  "doInsertList",
		desc:  "Inserts List of Book",
		do:    doInsertList,
		usage: "client.go insertList",
	},
	"loopInsert4096": {
		name:  "loopInsert4096",
		desc:  "LoopInsert 4096",
		do:    doInsertList4096,
		usage: "client.go loopInsert4096",
	},
	"delete": {
		name:  "delete",
		desc:  "Deletes the indicated book",
		do:    doDelete,
		usage: "client.go delete <id>",
	},
	"watch": {
		name:  "watch",
		desc:  "Watches for inserted books",
		do:    doWatch,
		usage: "client.go watch",
	},
}

// printRespAsJson attempts to marshal the provided interface into its JSON
// representation, then prints to stdout.
func printRespAsJson(r interface{}) {
	b, err := json.MarshalIndent(r, "", "  ")
	if err != nil {
		log.Fatalf("printResp (%v): %v", r, err)
	}
	fmt.Println(string(b))
}

// doGet is a basic wrapper around the corresponding book service's RPC.
// It parses the provided arguments, calls the service, and prints the
// response. If any errors are encountered, it dies.
func doGet(ctx context.Context, args ...string) {
	if len(args) != 1 {
		log.Fatalf("usage: client.go get <id>")
	}
	id, err := strconv.ParseInt(args[0], 10, 64)
	if err != nil {
		log.Fatalf("Provided ID %v invalid: %v", args[0], err)
	}
	conn, client := GetClient()
	defer conn.Close()
	r, err := client.Get(ctx, &pb.BookIdRequest{int32(id)})
	if err != nil {
		log.Fatalf("Get book (%v): %v", id, err)
	}
	fmt.Println("Server response:")
	printRespAsJson(r)
}

// doDelete is a basic wrapper around the corresponding book service's RPC.
// It parses the provided arguments, calls the service, and prints the
// response. If any errors are encountered, it dies.
func doDelete(ctx context.Context, args ...string) {
	if len(args) != 1 {
		log.Fatalf("usage: client.go delete <id>")
	}
	id, err := strconv.ParseInt(args[0], 10, 64)
	if err != nil {
		log.Fatalf("Provided ID %v invalid: %v", args[0], err)
	}
	conn, client := GetClient()
	defer conn.Close()
	r, err := client.Delete(ctx, &pb.BookIdRequest{int32(id)})
	if err != nil {
		log.Fatalf("Get book (%v): %v", id, err)
	}
	fmt.Println("Server response:")
	printRespAsJson(r)
}

// doList is a basic wrapper around the corresponding book service's RPC.
// It parses the provided arguments, calls the service, and prints the
// response. If any errors are encountered, it dies.
func doList(ctx context.Context, args ...string) {
	conn, client := GetClient()
	defer conn.Close()
	rs, err := client.List(ctx, &pb.Empty{})
	if err != nil {
		log.Fatalf("List books: %v", err)
	}
	fmt.Printf("Server sent %v book(s).\n", len(rs.GetBooks()))
	printRespAsJson(rs)
}

// doInsert is a basic wrapper around the corresponding book service's RPC.
// It parses the provided arguments, calls the service, and prints the
// response. If any errors are encountered, it dies.
func doInsert(ctx context.Context, args ...string) {
	if len(args) != 3 {
		log.Fatalf("usage client.go insert <id> <title> <author>")
	}
	id, err := strconv.ParseInt(args[0], 10, 64)
	if err != nil {
		log.Fatalf("Provided ID %v invalid: %v", args[0], err)
	}
	book := &pb.Book{
		Id:     int32(id),
		Title:  args[1],
		Author: args[2],
	}
	conn, client := GetClient()
	defer conn.Close()
	r, err := client.Insert(ctx, book)
	if err != nil {
		log.Fatalf("Insert book (%v): %v", book, err)
	}
	fmt.Println("Server response:")
	printRespAsJson(r)
}

// doWatch is a basic wrapper around the corresponding book service's RPC.
// It parses the provided arguments, calls the service, and prints the
// response. If any errors are encountered, it dies.
func doWatch(ctx context.Context, args ...string) {
	conn, client := GetClient()
	defer conn.Close()
	stream, err := client.Watch(ctx, &pb.Empty{})
	if err != nil {
		log.Fatalf("Watch books: %v", err)
	}
	for {
		book, err := stream.Recv()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatalf("Watch books stream: %v", err)
		}
		fmt.Println("Server stream data received:")
		printRespAsJson(book)
	}
}

func subtractTime(time1, time2 time.Time) float64 {
	diff := time2.Sub(time1).Seconds()
	return diff
}

func doLoopList(ctx context.Context, args ...string) {
	var listTime [101]float64
	starttime := time.Now()
	for i := 0; i < 100; i++ {
		doList(ctx, "list")
		endtime := time.Now()
		var x = subtractTime(starttime, endtime)
		listTime[i] = x
	}
	fmt.Println(listTime)
}

func doLoopList4096(ctx context.Context, args ...string) {
	var listTime [4096]float64
	starttime := time.Now()
	for i := 0; i < 4096; i++ {
		doList(ctx, "list")
		endtime := time.Now()
		var x = subtractTime(starttime, endtime)
		listTime[i] = x
	}
	fmt.Println(listTime)
}

func doInsertOne(ctx context.Context, args ...string) {
	starttime := time.Now()
	doInsert(ctx, "1", "client", "author")
	endtime := time.Now()
	var x = subtractTime(starttime, endtime)
	fmt.Println(x)
}

func doInsertList(ctx context.Context, args ...string) {
	var listTime [101]float64
	starttime := time.Now()
	for i := 0; i < 100; i++ {
		// var v = strconv.Itoa(i)
		doInsert(ctx, strconv.Itoa(i), "client", "author")
		endtime := time.Now()
		var x = subtractTime(starttime, endtime)
		listTime[i] = x
	}
	fmt.Println(listTime)
}

func doInsertList4096(ctx context.Context, args ...string) {
	var listTime [4096]float64
	starttime := time.Now()
	for i := 0; i < 4096; i++ {
		doInsert(ctx, strconv.Itoa(i), "client", "author")
		endtime := time.Now()
		var x = subtractTime(starttime, endtime)
		listTime[i] = x
	}
	fmt.Println(listTime)
}

func doGetOne(ctx context.Context, args ...string) {
	starttime := time.Now()
	doGet(ctx, "1")
	endtime := time.Now()
	var x = subtractTime(starttime, endtime)
	fmt.Println(x)
}

func doLoopGet(ctx context.Context, args ...string) {
	var listTime [101]float64
	starttime := time.Now()
	for i := 1; i < 100; i++ {
		doGet(ctx, strconv.Itoa(i))
		endtime := time.Now()
		var x = subtractTime(starttime, endtime)
		listTime[i] = x
	}
	fmt.Println(listTime)
}

func doLoopGet4096(ctx context.Context, args ...string) {
	var listTime [4096]float64
	starttime := time.Now()
	for i := 1; i < 4096; i++ {
		doGet(ctx, strconv.Itoa(i))
		endtime := time.Now()
		var x = subtractTime(starttime, endtime)
		listTime[i] = x
	}
	fmt.Println(listTime)
}
