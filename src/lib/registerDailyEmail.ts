const updateStrategyEmail = async (
  email: string,
  composer_id: string,
  subscribe: boolean
) => {
  // TODO: implementing sending api request to backend to register user for sending
  const url = new URL(
    `/api/external/strategies/${composer_id}/subscribed-notification`,
    process.env.NEXT_PUBLIC_BASE_URL
  );
  try {
    url.searchParams.append("email", email);
    url.searchParams.append("subscribe", subscribe.toString());
    const res = await fetch(url, {
      method: "PATCH",
    });

    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

export default updateStrategyEmail;
