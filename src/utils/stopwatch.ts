class StopWatch {
  taskName: string = "";
  startTime: number = 0;
  history: { taskName: string; timeCost: number }[] = [];

  start(taskName: string) {
    this.taskName = taskName;
    this.startTime = performance.now();
  }

  stop() {
    const timeCost = performance.now() - this.startTime;
    console.log("Task: %s, cost: %dms", this.taskName, timeCost);
    this.history.push({ taskName: this.taskName, timeCost });
  }

  prettyPrint() {
    console.table(this.history);
  }
}

export default StopWatch;
