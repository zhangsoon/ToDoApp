
import globalModel from "./global";
import authModel from "./auth";
import taskModel from "./task"


export function registerModels(app) {
  app.model(globalModel());
  app.model(authModel());
  app.model(taskModel())
}
