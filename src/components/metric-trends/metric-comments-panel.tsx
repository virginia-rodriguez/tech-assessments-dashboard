type MetricCommentsPanelProps = {
  monthLabel?: string;
  responseCount?: number;
  comments: string[];
};

export function MetricCommentsPanel({
  monthLabel,
  responseCount,
  comments,
}: MetricCommentsPanelProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Comments</h2>
      <p className="mt-1 text-sm text-slate-600">
        {monthLabel && typeof responseCount === "number"
          ? `${monthLabel} • ${responseCount} scored response(s)`
          : "Select a month to inspect comments."}
      </p>

      <div className="mt-4 space-y-3">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <blockquote
              key={`${monthLabel ?? "unknown"}-${index}`}
              className="rounded-md border-l-4 border-sky-500 bg-slate-50 p-3 text-sm text-slate-700"
            >
              {comment}
            </blockquote>
          ))
        ) : (
          <p className="text-sm text-slate-500">No comments for the selected client/month.</p>
        )}
      </div>
    </div>
  );
}
