package chat

import (
	msg "connect-test/generated/schemas/v1"
	"connect-test/generated/schemas/v1/chatconnect"
	"connect-test/mq"
	"context"
	"encoding/json"
	"fmt"
	"sync"

	connect "github.com/bufbuild/connect-go"
	"github.com/google/uuid"
)

type myMessageService struct {
	ch mq.Channnel
}

func (s *myMessageService) Fetch(ctx context.Context, req *connect.Request[msg.ChatStart]) (*connect.Response[msg.ChartHistory], error) {
	return nil, nil
}
func (s *myMessageService) Send(ctx context.Context, req *connect.Request[msg.ChatRequest]) (*connect.Response[msg.ChatSended], error) {
	err := mq.Send(ctx, s.ch, mq.Message{
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
	err := mq.Send(ctx, s.ch, mq.Message{
		ChatId:    uuid.NewString(),
		UserName:  "master",
		Text:      fmt.Sprintf("Join %s", req.Msg.UserName),
		GroupName: req.Msg.GroupName,
	})
	if err != nil {
		return err
	}

	msgs, err := mq.Receive(ctx, s.ch)
	if err != nil {
		return err
	}

	var wg sync.WaitGroup
	wg.Add(1)
	go func() {
		defer wg.Done()
		for {
			select {
			case dd := <-msgs:
				var resp mq.Message
				err := json.Unmarshal(dd.Body, &resp)
				if err != nil {
					fmt.Println(err)
					return
				}

				err = stream.Send(&msg.ChatResponse{
					ChatId:   resp.ChatId,
					Text:     resp.Text,
					UserName: resp.UserName,
				})
				if err != nil {
					fmt.Println(err)
					return
				}
			case <-ctx.Done():
				return
			}
		}
	}()
	wg.Wait()
	err = mq.Send(ctx, s.ch, mq.Message{
		ChatId:    uuid.NewString(),
		UserName:  "master",
		Text:      fmt.Sprintf("Leave %s", req.Msg.UserName),
		GroupName: req.Msg.GroupName,
	})

	return err
}
func (s *myMessageService) Stop(ctx context.Context, req *connect.Request[msg.ChatStart]) (*connect.Response[msg.ChatSended], error) {

	return nil, nil
}
func NewSevice(ch mq.Channnel) (chatconnect.ChatServiceHandler, error) {

	return &myMessageService{
		ch: ch,
	}, nil
}
