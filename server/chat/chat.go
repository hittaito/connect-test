package chat

import (
	msg "connect-test/generated/schemas/v1"
	"connect-test/generated/schemas/v1/chatconnect"
	"context"
	"time"

	connect "github.com/bufbuild/connect-go"
)

type myMessageService struct{}

func (s *myMessageService) Send(ctx context.Context, req *connect.Request[msg.ChatRequest]) (*connect.Response[msg.ChatResponse], error) {
	res := connect.NewResponse(&msg.ChatResponse{
		Id:   "1",
		User: "hiroshi",
		Text: "Hello connect world",
	})
	return res, nil
}

func (s *myMessageService) Read(ctx context.Context, req *connect.Request[msg.ChatRequest], stream *connect.ServerStream[msg.ChatResponse]) error {
	resCount := 5
	for i := 0; i < resCount; i++ {
		err := stream.Send(&msg.ChatResponse{
			Id:   "2",
			Text: "Hello response",
			User: "takashi",
		})
		if err != nil {
			return err
		}
		time.Sleep(time.Second)
	}
	return nil
}
func NewSevice() chatconnect.ChatServiceHandler {
	return &myMessageService{}
}
