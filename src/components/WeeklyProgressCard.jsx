const WeeklyProgressCard = ({ weeklyActivity, weeklyMinutes, weeklyAttempts, uiStrings }) => {
  const maxMinutes = Math.max(...(weeklyActivity?.map((d) => d.minutes) || [0]), 1);

  return (
    <div className="bg-card text-card-foreground rounded-xl shadow-sm p-6 border border-border">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-foreground">
          {uiStrings.weeklyActivity || 'Weekly Activity'}
        </h3>
        <span className="text-sm text-muted-foreground">
          {weeklyMinutes || 0} min · {weeklyAttempts || 0} practices
        </span>
      </div>
      <div className="flex items-end justify-between gap-2 h-24">
        {(weeklyActivity || []).map((day, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full bg-muted rounded-t-lg h-full relative min-h-[40px]">
              <div
                className="absolute bottom-0 w-full rounded-t-lg bg-primary transition-all"
                style={{ height: `${(day.minutes / maxMinutes) * 100}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">{day.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyProgressCard;
