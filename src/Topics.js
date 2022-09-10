//dislay languages of a mentor
export function Topics({ topics }) {
  return (
    <div>
      <span className="fw-bold">Topics:</span>
      {topics.map((topic, index) => {
        return <div key={index}>{`${topic}`}</div>;
      })}
    </div>
  );
}
