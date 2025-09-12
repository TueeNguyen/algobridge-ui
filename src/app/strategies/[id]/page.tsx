export default async function StrategiesPage() {
  const strategy = await fetch(
    "http://localhost:8000/strategies/6ZmvlOYcRH23MKF0AqoV"
  );
  const strategyData: StrategyDTO = await strategy.json();

  return (
    <div>
      <h1>{strategyData.name}</h1>
      <p>
        Created at:{" "}
        {new Date(strategyData.composer_created_at).toLocaleDateString()}
      </p>
      <p>Version: {strategyData.version_id}</p>
    </div>
  );
}
