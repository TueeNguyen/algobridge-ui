// fetching data from backend to get all the strategy that user wants to receive eail
export const getRegisteredEmailStrategyList = async (
  userEmail: string | undefined
) => {
  if (!userEmail) {
    return;
  }
  const url = new URL(
    "/api/external/strategies/subscribed-notification",
    process.env.NEXT_PUBLIC_BASE_URL
  );
  url.searchParams.append("email", userEmail);
  try {
    const data = await fetch(url);
    const emailStrategies: string[] = await data.json();
    return emailStrategies;
  } catch (e) {
    console.error(e);
    return;
  }
};
