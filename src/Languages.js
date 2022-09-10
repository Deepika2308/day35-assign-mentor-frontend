//display languages of a mentor
export function Languages({ languages }) {
  return (
    <div>
      <span className="fw-bold">Spoken Languages:</span>
      {languages.map((lang, index) => {
        return <div key={index}>{`${lang}`}</div>;
      })}
    </div>
  );
}
