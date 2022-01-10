import { useGetTweetsQuery } from "../generated/graphql";

const Index = () => {
  const { data } = useGetTweetsQuery();

  if (!data) return <div>Loading!</div>;

  return (
    <div>
      {data.tweets.map((tweet) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "20px",
            }}
          >
            <span>
              <b>@</b> {tweet.user.userName}
            </span>
            <span>{tweet.content}</span>
            <span>👎🏽 {tweet.dislikes}</span>
            <span>{new Date(tweet.date).toLocaleDateString()}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Index;
