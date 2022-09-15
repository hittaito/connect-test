package mq

import (
	"context"
	"encoding/json"

	amqp "github.com/rabbitmq/amqp091-go"
)

type Message struct {
	ChatId    string
	Text      string
	UserName  string
	GroupName string
}

func Send(ctx context.Context, ch Channnel, m Message) error {
	b, _ := json.Marshal(m)

	err := ch.ExchangeDeclare("msg", "fanout", true, false, false, false, nil)
	if err != nil {
		return err
	}

	return ch.PublishWithContext(ctx, "msg", "", false, false, amqp.Publishing{
		ContentType: "text/plain",
		Body:        []byte(b),
	})
}
func Receive(ctx context.Context, ch Channnel) (<-chan amqp.Delivery, error) {
	q, err := ch.QueueDeclare("", false, false, true, false, nil)
	if err != nil {
		return nil, err
	}

	err = ch.ExchangeDeclare("msg", "fanout", true, false, false, false, nil)
	if err != nil {
		return nil, err
	}
	err = ch.QueueBind(q.Name, "", "msg", false, nil)
	if err != nil {
		return nil, err
	}

	msgs, err := ch.Consume(q.Name, "", true, false, false, false, nil)
	if err != nil {
		return nil, err
	}

	return msgs, nil
}
