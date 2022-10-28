import MemberCard from '../components/MemberCard';

export default function CastMembers({ cast }) {
  return (
    <div>
      <h2 className='related-title'>Cast Members</h2>
      <div
        className='cast-members'
        style={
          cast.length < 10
            ? {
                overflowX: 'hidden',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                rowGap: '2rem',
              }
            : { overflowX: 'scroll' }
        }
      >
        {cast.map((member, i) => {
          if (member.known_for_department === 'Acting') {
            const split = member?.character?.split('/');
            if (member.profile_path) {
              return (
                <div className='cast-member-card' key={member.cast_id}>
                  <MemberCard
                    name={member.original_name}
                    character={split[0]}
                    img={
                      'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' +
                      member.profile_path
                    }
                  />
                </div>
              );
            }
          }
        })}
      </div>
    </div>
  );
}
