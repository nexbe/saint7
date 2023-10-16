const header = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_APP_TOKEN}`,
};

const httpLink = `${process.env.NEXT_PUBLIC_APP_URL}/api/upload`;

export const uploadFile = async (data) => {
  const res = await fetch(httpLink, {
    method: "POST",
    headers: header,
    body: data,
  });
  return res;
};
