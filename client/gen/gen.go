package gen

import (
	"encoding/json"
	"fmt"
	"github.com/dongfg/status/client/core"
	"os"
)

type EndpointGen struct {
	// Name of the endpoint. Can be anything.
	Name string `yaml:"name"`

	// URL to send the request to
	URL string `yaml:"url"`

	// Results of health check
	Results []*core.Result `json:"results"`
}

func Gen(endpoints []EndpointGen) {
	rb, _ := json.Marshal(endpoints)
	genFile := "logs/log.js"
	_ = os.WriteFile(genFile, []byte(fmt.Sprintf("const endpoints = %s;", string(rb))), 0644)
}
