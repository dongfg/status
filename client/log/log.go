package log

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/dongfg/status/client/core"
	"os"
	"time"
)

// SaveResultLog of endpoint health check
func SaveResultLog(endpoint *core.Endpoint, result *core.Result, maxDays int) []*core.Result {
	_ = os.Mkdir("web/logs", 0755)
	logFile := fmt.Sprintf("web/logs/%s.json", endpoint.Key())
	var results []*core.Result
	if _, err := os.Stat(logFile); errors.Is(err, os.ErrNotExist) {
		results = make([]*core.Result, 0)
	} else {
		fileBytes, _ := os.ReadFile(logFile)
		_ = json.Unmarshal(fileBytes, &results)
	}
	results = append(results, result)

	var filtered []*core.Result
	deleteDate := time.Now().AddDate(0, 0, -maxDays)
	for _, c := range results {
		if c.Timestamp.After(deleteDate) {
			filtered = append(filtered, c)
		}
	}

	resultsBytes, _ := json.Marshal(filtered)
	_ = os.WriteFile(logFile, resultsBytes, 0644)
	return filtered
}
