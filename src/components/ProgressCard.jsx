// Displays daily goal target progress

const ProgressCard = ({ 
  goalMinutes, 
  completedMinutes,
  uiStrings
}) => {
  const progressPercentage = calculateProgressPercentage(completedMinutes, goalMinutes);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border-l-4 border-orange-600">
      {/* Header */}
      <CardHeader 
        title={uiStrings.todaysGoal}
        completedMinutes={completedMinutes}
        goalMinutes={goalMinutes}
        uiStrings={uiStrings}
      />

      {/* Progress Bar */}
      <ProgressBar percentage={progressPercentage} />

      {/* Message */}
      <p className="text-sm text-gray-600">
        {progressPercentage === 0 
          ? `${uiStrings.todaysGoal}: ${goalMinutes} ${uiStrings.minutes}`
          : `${completedMinutes} ${uiStrings.minutes} completed!`
        }
      </p>
    </div>
  );
};

const CardHeader = ({ title, completedMinutes, goalMinutes, uiStrings }) => (
  <div className="flex items-center justify-between mb-3">
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    <span className="text-sm text-orange-600 font-medium">
      {completedMinutes} / {goalMinutes} {uiStrings.minutes}
    </span>
  </div>
);

const ProgressBar = ({ percentage }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
    <div
      className="bg-gradient-to-r from-orange-500 to-red-500 h-2.5 rounded-full transition-all duration-500"
      style={{ width: `${percentage}%` }}
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin="0"
      aria-valuemax="100"
    />
  </div>
);

const calculateProgressPercentage = (completed, goal) => {
  if (goal === 0) return 0;
  const percentage = (completed / goal) * 100;
  return Math.min(percentage, 100);
};

export default ProgressCard;
