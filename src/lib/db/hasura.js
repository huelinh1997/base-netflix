async function fetchGraphQL(operationsDoc, operationName, variables, token) {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
    method: "POST",
    headers: {
      // "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables,
      operationName,
    }),
  });

  return await result.json();
}

export async function isNewUser(token, issuer) {
  const operationsDoc = `
  query isNewUser ($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}}) {
      id
      email
      issuer
      publicAddress
    }
  }
`;
  const response = await fetchGraphQL(
    operationsDoc,
    "isNewUser",
    { issuer },
    token
  );
  return response?.data?.users?.length === 0 ? true : false;
}

export async function createNewUser(token, metadata) {
  const operationsDoc = `
  mutation createUser ($issuer: String!, $email: String!, $publicAddress: String!) {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      returning {
        email
        id
        issuer
        publicAddress
      }
    }
  }
`;
  const { email, issuer, publicAddress } = metadata;
  const response = await fetchGraphQL(
    operationsDoc,
    "createUser",
    { issuer, email, publicAddress },
    token
  );
  return response;
}

export async function findVideoIdByUser(token, userId, videoId) {
  const operationsDoc = `
  query findVideoIdByUser ($userId: String!, $videoId: String!) {
    user_history(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}) {
      id
      favourited
      userId
      videoId
      watched
    }
  }
`;
  const response = await fetchGraphQL(
    operationsDoc,
    "findVideoIdByUser",
    { userId, videoId },
    token
  );
  return response?.data?.user_history;
}

export async function updateUserHistory(
  token,
  { userId, videoId, favourited, watched }
) {
  const operationsDoc = `
  mutation updateUserHistory ($userId: String!, $videoId: String!, $favourited: Int! , $watched: Boolean!) {
    update_user_history(
      where: {
        userId: {_eq: $userId}, 
        videoId: {_eq: $videoId}},
      _set: { favourited: $favourited, watched: $watched}) {
      returning {
        favourited
        id
        userId
        videoId
        watched
      }
    }
  }
`;
  const response = await fetchGraphQL(
    operationsDoc,
    "updateUserHistory",
    { userId, videoId, favourited, watched },
    token
  );
  return response;
}

export async function createUserHistory(
  token,
  { userId, videoId, favourited, watched }
) {
  const operationsDoc = `
  mutation createUserHistory ($userId: String!, $videoId: String!, $favourited: Int! , $watched: Boolean!) {
    insert_user_history(objects: {favourited: $favourited, userId: $userId, videoId: $videoId, watched: $watched}) {
      returning {
        userId,
        videoId
        favourited
        watched,
        id
      }
    }
  }
`;

  const response = await fetchGraphQL(
    operationsDoc,
    "createUserHistory",
    { userId, videoId, favourited, watched },
    token
  );
  return response;
}

export async function getWatchedAgain(userId, token) {
  const operationsDoc = `
  query watchedAgain ($userId: String!) {
    user_history(
      where: {
        watched: {_eq: true}, 
        userId: {_eq: $userId}
      }) {
      videoId
    }
  }
`;
  const response = await fetchGraphQL(
    operationsDoc,
    "watchedAgain",
    { userId },
    token
  );
  return response?.data?.user_history || [];
}

export async function getMyListVideo(userId, token, favourited = 1) {
  const operationsDoc = `
  query myList ($userId: String!, $favourited: Int!) {
    user_history(
      where: {
        userId: {_eq: $userId}, 
        favourited: {_eq: $favourited}
      }) {
      videoId
    }
  }
`;

  const response = await fetchGraphQL(
    operationsDoc,
    "myList",
    { userId, favourited },
    token
  );
  return response?.data?.user_history || [];
}
