import React from "react";

const InsightsPanel = ({ insights }) => (
  <div className="insights-panel">
    <h3>Insights</h3>
    <div className="insight-row">
      <span>Total Tasks: <strong>{insights.totalOpen + insights.dueSoon}</strong></span>
      <span>Completed: <strong>{insights.completed}</strong></span>
    </div>
    <div className="insight-row">
      <span>Pending: <strong>{insights.totalOpen}</strong></span>
      <span>Due Soon: <strong>{insights.dueSoon}</strong></span>
    </div>
    <p className="insight-text">{insights.summary}</p>
  </div>
);

export default InsightsPanel;
