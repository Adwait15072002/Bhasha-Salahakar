const ProgressCard = ({ goalMinutes, completedMinutes, uiStrings }) => {
  const progressPercentage = Math.min(goalMinutes ? (completedMinutes / goalMinutes) * 100 : 0, 100);

  return (
    <div className="bg-card text-card-foreground rounded-xl shadow-lg p-6 border border-border border-l-4 border-l-primary">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">{uiStrings.todaysGoal}</h3>
        <span className="text-sm text-primary font-medium">
          {completedMinutes} / {goalMinutes} {uiStrings.minutes}
        </span>
      </div>
      <div className="w-full bg-muted rounded-full h-2.5 mb-4">
        <div
          className="bg-primary h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <p className="text-sm text-muted-foreground">
        {progressPercentage === 0
          ? `${uiStrings.todaysGoal}: ${goalMinutes} ${uiStrings.minutes}`
          : `${completedMinutes} ${uiStrings.minutes} completed!`}
      </p>
    </div>
  );
};

export default ProgressCard;
