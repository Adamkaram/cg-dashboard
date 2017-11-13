package jsonerror

//go:generate go run gen.go

import (
	"encoding/json"
)

var defaultResponse = InternalServerErrorResponse

var fallbackResponseBytes []byte

func init() {
	b, err := json.Marshal(defaultResponse)
	if err != nil {
		panic(err)
	}
	fallbackResponseBytes = b
}

type Response struct {
	Error `json:"error"`
	// Err is the original error that caused this response to exist.
	Err error `json:"-"`
}

// WithErr saves err to r and is a record of the original error.
func (r Response) WithErr(err error) Response {
	r.Err = err
	return r
}

type Error struct {
	Code    string `json:"code"`
	Message string `json:"message,omitempty"`
}
