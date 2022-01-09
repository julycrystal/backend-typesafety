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
              margin: "20px",
            }}
          >
            <span>
              <b>id:</b> {user.id}
            </span>
            <span>
              <b>email:</b> {user.email}
            </span>
            <span>
              <b>posts:</b>{" "}
            </span>
            {user.posts.map((post) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "10px",
                  }}
                >
                  <span>
                    <b>Title:</b> {post.title}
                  </span>
                  <span>
                    <b>Published:</b> {String(post.pubblished)}
                  </span>
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
