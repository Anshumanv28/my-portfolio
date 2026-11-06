import evalReport from "@/data/artemis-eval-latest.json";

// Source of truth: the latest real eval run written by
// A.R.T.E.M.I.S's own harness (scripts/eval_agent.py -> eval_reports/*.json).
// Re-copy a newer eval_reports/*.json over src/data/artemis-eval-latest.json
// to refresh these numbers after a planner/prompt change.

type EvalMetrics = {
  total_cases: number;
  task_success_rate: number;
  routing_accuracy: number;
  tool_selection_accuracy: number;
  avg_step_count: number;
  avg_duration_s: number;
  total_prompt_tokens: number;
  total_completion_tokens: number;
  total_tokens: number;
  total_cost_usd: number;
  pricing_unavailable_count: number;
  failure_breakdown: Record<string, number>;
};

const metrics = evalReport.metrics as EvalMetrics;

function pct(n: number) {
  return `${Math.round(n * 100)}%`;
}

function fraction(rate: number, total: number) {
  return `${Math.round(rate * total)}/${total}`;
}

const avgCostPerTask = metrics.total_cost_usd / metrics.total_cases;

export const artemisEval = {
  generatedAt: evalReport.generated_at as string,
  totalCases: metrics.total_cases,
  taskSuccessRate: pct(metrics.task_success_rate),
  taskSuccessFraction: fraction(metrics.task_success_rate, metrics.total_cases),
  routingAccuracy: pct(metrics.routing_accuracy),
  routingFraction: fraction(metrics.routing_accuracy, metrics.total_cases),
  toolSelectionAccuracy: pct(metrics.tool_selection_accuracy),
  toolSelectionFraction: fraction(metrics.tool_selection_accuracy, metrics.total_cases),
  avgStepCount: metrics.avg_step_count.toFixed(1),
  avgDurationS: metrics.avg_duration_s.toFixed(1),
  totalTokens: metrics.total_tokens.toLocaleString("en-US"),
  totalCostUsd: `$${metrics.total_cost_usd.toFixed(4)}`,
  avgCostPerTaskUsd: `$${avgCostPerTask.toFixed(4)}`,
  avgCostPerTaskHeadline: avgCostPerTask < 0.001 ? "<$0.001 avg. cost/task" : `$${avgCostPerTask.toFixed(4)} avg. cost/task`,
  failureBreakdown: metrics.failure_breakdown,
};
