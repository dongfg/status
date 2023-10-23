package config

import (
	"fmt"
	"github.com/dongfg/status/client/core"
	"gopkg.in/yaml.v3"
	"log"
	"os"
)

// Config is the main configuration structure
type Config struct {
	// Debug Whether to enable debug logs
	Debug bool `yaml:"debug,omitempty"`

	// MaxDays of results to keep
	MaxDays int `yaml:"maxDays,omitempty"`

	// Endpoints List of endpoints to monitor
	Endpoints []*core.Endpoint `yaml:"endpoints,omitempty"`
}

func LoadConfiguration(cfgPath string) (*Config, error) {
	// Read the file
	configBytes, err := os.ReadFile(cfgPath)
	if err != nil {
		log.Printf("Error reading configuration from %s: %s", cfgPath, err)
		return nil, fmt.Errorf("error reading configuration from file %s: %w", cfgPath, err)
	}

	var config *Config
	err = yaml.Unmarshal(configBytes, &config)
	if err != nil {
		log.Printf("Error parse configuration from %s: %s", cfgPath, err)
		return nil, fmt.Errorf("error parse configuration from file %s: %w", cfgPath, err)
	}
	if config.MaxDays == 0 {
		config.MaxDays = 30
	}
	return config, err
}
