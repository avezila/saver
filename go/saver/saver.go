package saver

import (
	"golang.org/x/net/context"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type Saver struct {
	collection *mgo.Collection
}

func New() (*Saver, error) {
	session, err := mgo.Dial("mongo")
	if err != nil {
		return nil, err
	}

	return &Saver{
		collection: session.DB("saver").C("bytes"),
	}, nil
}

func (s *Saver) Save(ctx context.Context, raw *Raw) (*Empty, error) {
	_, err := s.collection.Upsert(bson.M{"id": raw.Id}, raw)
	return nil, err
}
