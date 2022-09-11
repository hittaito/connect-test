package chat

import (
	msg "connect-test/generated/schemas/v1"
	"connect-test/generated/schemas/v1/chatconnect"
	"connect-test/mq"
	"context"
	"encoding/json"
	"fmt"

	connect "github.com/bufbuild/connect-go"
	"github.com/google/uuid"
)

type myMessageService struct {
	mq         mq.RabbitMq
	stopSignal chan string
}

func (s *myMessageService) Fetch(ctx context.Context, req *connect.Request[msg.ChatStart]) (*connect.Response[msg.ChartHistory], error) {
	return nil, nil
}
func (s *myMessageService) Send(ctx context.Context, req *connect.Request[msg.ChatRequest]) (*connect.Response[msg.ChatSended], error) {
	fmt.Printf("L29 %v\n", req.Msg)
	err := s.mq.Send(ctx, mq.Message{
		ChatId:    uuid.NewString(),
		UserName:  req.Msg.UserName,
		Text:      req.Msg.Text,
		GroupName: req.Msg.GroupName,
	})
	if err != nil {
		fmt.Println(err)
	}
	res := connect.NewResponse(&msg.ChatSended{
		Ok: err == nil,
	})
	return res, nil
}

func (s *myMessageService) Read(ctx context.Context, req *connect.Request[msg.ChatStart], stream *connect.ServerStream[msg.ChatResponse]) error {
	msgs, err := s.mq.Receive(ctx)
	if err != nil {
		return err
	}

	quit := make(chan string)
	go func() {
		for {
			select {
			case dd := <-msgs:
				var resp mq.Message
				err := json.Unmarshal(dd.Body, &resp)
				if err != nil {
					fmt.Println(err)
					quit <- "stop"
				}

				err = stream.Send(&msg.ChatResponse{
					ChatId:   resp.ChatId,
					Text:     resp.Text,
					UserName: resp.UserName,
				})
				if err != nil {
					fmt.Println(err)
					quit <- "stop"
				}
			case name := <-s.stopSignal:
				if name == req.Msg.UserName {
					quit <- "stop"
					return
				}
			}
		}
	}()
	<-quit
	return nil
}
func (s *myMessageService) Stop(ctx context.Context, req *connect.Request[msg.ChatStart]) (*connect.Response[msg.ChatSended], error) {
	s.stopSignal <- req.Msg.UserName
	return nil, nil
}
func NewSevice() (chatconnect.ChatServiceHandler, error) {
	m, err := mq.New()
	if err != nil {
		return nil, err
	}
	sig := make(chan string)
	return &myMessageService{
		mq:         m,
		stopSignal: sig,
	}, nil
}
