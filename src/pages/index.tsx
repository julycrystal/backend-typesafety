import { useGetUsersQuery } from "../generated/graphql";

const Index = () => {
  const { data } = useGetUsersQuery();

  if (!data) return <div>Loading!</div>;

  return (
    <div>
      {data.users.map((user) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>id: {user.id}</span>
            <span>email: {user.email}</span>
            <span>posts: </span>
            {user.posts.map((post) => {
              return (
                <div>
                  Title: {post.title}
                  Published: {post.pubblished}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Index;
