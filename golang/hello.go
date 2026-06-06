package main

import (
	"fmt"
	"time"
)

func main(){
	now := time.Now()

	fmt.Println("Hello ASL!")
	fmt.Println(now.Format("2006-01-02"))

}