package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	"connect-test/chat"
	"connect-test/generated/schemas/v1/chatconnect"

	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
)

func main() {
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt)
	defer stop()

	service := chat.NewSevice()

	mux := http.NewServeMux()
	path, handler := chatconnect.NewChatServiceHandler(service)
	mux.Handle(path, handler)
	// mux.Handle("/", )

	server := &http.Server{
		Addr:    ":8888",
		Handler: h2c.NewHandler(mux, &http2.Server{}),
	}

	go func() {
		<-ctx.Done()
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		server.Shutdown(ctx)
	}()

	fmt.Println("start server")
	log.Fatal(server.ListenAndServe())
}
