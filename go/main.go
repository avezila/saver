package main

import (
	"./saver"

	"golang.org/x/net/context"
)

func main() {
	s, err := saver.New()
	if err != nil {
		panic(err)
	}
	_, err = s.Save(context.Background(), &saver.Raw{"asd", []byte("ahaha")})
	if err != nil {
		panic(err)
	}
}
