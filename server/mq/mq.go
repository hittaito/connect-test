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

type RabbitMq interface {
	Send(context.Context, Message) error
	Receive(context.Context) (<-chan amqp.Delivery, error)
	Close() error
}

type rabbitmq struct {
	conn *amqp.Connection
	ch   *amqp.Channel
}

func (r *rabbitmq) Send(ctx context.Context, m Message) error {
	b, _ := json.Marshal(m)

	err := r.ch.ExchangeDeclare("msg", "fanout", true, false, false, false, nil)
	if err != nil {
		return err
	}

	return r.ch.PublishWithContext(ctx, "msg", "", false, false, amqp.Publishing{
		ContentType: "text/plain",
		Body:        []byte(b),
	})
}
func (r *rabbitmq) Receive(ctx context.Context) (<-chan amqp.Delivery, error) {
	q, err := r.ch.QueueDeclare("", false, false, true, false, nil)
	if err != nil {
		return nil, err
	}

	err = r.ch.ExchangeDeclare("msg", "fanout", true, false, false, false, nil)
	if err != nil {
		return nil, err
	}
	err = r.ch.QueueBind(q.Name, "", "msg", false, nil)
	if err != nil {
		return nil, err
	}

	msgs, err := r.ch.Consume(q.Name, "", true, false, false, false, nil)
	if err != nil {
		return nil, err
	}

	return msgs, nil
}
func (r *rabbitmq) Close() error {
	r.conn.Close()
	r.ch.Close()
	return nil
}

func New() (RabbitMq, error) {
	conn, err := amqp.Dial("amqp://guest:guest@localhost:5672")
	if err != nil {
		return nil, err
	}

	ch, err := conn.Channel()
	if err != nil {
		return nil, err
	}
	return &rabbitmq{
		conn: conn,
		ch:   ch,
	}, nil
}
