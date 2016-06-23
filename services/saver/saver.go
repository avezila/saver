package saver

import (
	"golang.org/x/net/context"
	"google.golang.org/grpc"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type Saver struct {
	collection *mgo.Collection
}

func New(server *grpc.Server) (*Saver, error) {
	session, err := mgo.Dial("saver-mongo")
	if err != nil {
		return nil, err
	}

	saver := &Saver{
		collection: session.DB("saver").C("bytes"),
	}
	RegisterSaverServer(server, saver)
	return saver, nil
}

func (s *Saver) Save(ctx context.Context, raw *Raw) (*Empty, error) {
	_, err := s.collection.Upsert(bson.M{"id": raw.Id}, raw)
	return nil, err
}

func (s *Saver) GetById(context.Context, *RawQuery) (*Raw, error) {
	return nil, nil
}
