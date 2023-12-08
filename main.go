package main

import (
	"encoding/json"
	"fmt"
	"github.com/dongfg/status/client/config"
	"github.com/dongfg/status/client/gen"
	"github.com/dongfg/status/client/log"
	"time"
)

func main() {
	cfg, err := config.LoadConfiguration("config.yaml")
	if err != nil {
		return
	}
	var endpoints []gen.EndpointGen
	for _, endpoint := range cfg.Endpoints {
		if endpoint.IsEnabled() {
			time.Sleep(777 * time.Millisecond)
			result := endpoint.EvaluateHealth()
			url := endpoint.URL
			if endpoint.Version != "" {
				url = "Running Version: " + endpoint.Version
			}
			endpoints = append(endpoints, gen.EndpointGen{
				Key:     endpoint.Key(),
				Name:    endpoint.Name,
				URL:     url,
				Results: log.SaveResultLog(endpoint, result, cfg.MaxDays),
			})
			if cfg.Debug {
				rb, _ := json.Marshal(result)
				fmt.Println(string(rb))
			}
		}
	}
	gen.Gen(endpoints, cfg.MaxDays)
}
