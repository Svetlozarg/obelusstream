export default function MovieInfoBox({
  title = '',
  vote = '',
  year = '',
  description = '',
  quality = 'HD',
  runtime = 60,
  country = '',
  genre = '',
}) {
  return (
    <div className="movieInfoBox">
      <h4>{title}</h4>
      <div className="movieInfoBox-flex">
        <p className="quality">{quality}</p>
        <p className="vote">IMDb: {vote}</p>
        <p>{year}</p>
        <p>{runtime}mm</p>
      </div>
      <p>{description}</p>
      <p className="country">
        <span>Country:</span> {country}
      </p>
      {genre !== '' && (
        <p className="genre">
          <span>Genre:</span>{' '}
          {genre?.map((item, i) => {
            if (i === genre.length - 1) {
              return <>{item.name}</>;
            } else {
              return <>{item.name}, </>;
            }
          })}
        </p>
      )}
    </div>
  );
}
