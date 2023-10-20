package main

import (
	"encoding/json"
	"fmt"
	"github.com/dongfg/status/client/config"
	"time"
)

func main() {
	cfg, err := config.LoadConfiguration("config.yaml")
	if err != nil {
		return
	}
	for _, endpoint := range cfg.Endpoints {
		if endpoint.IsEnabled() {
			time.Sleep(777 * time.Millisecond)
			result := endpoint.EvaluateHealth()
			rb, _ := json.Marshal(result)
			fmt.Println(string(rb))
		}
	}
}
