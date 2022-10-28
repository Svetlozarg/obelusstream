import { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

export default function IFrame({ id = '', season = '', episode = '' }) {
  // State for iframe loaded
  const [loaded, setLoaded] = useState(true);
  // State for loading
  const [loading, setLoading] = useState(true);

  // Create empty iframe if not loaded
  const createEmptyIframe = () => {
    if (document.getElementById('movieIframe').contentWindow.length === 0) {
      const parent = document.getElementById('movie-wrapper');

      const newDiv = document.createElement('div');

      const newP = document.createElement('p');
      const newText = document.createTextNode('Video has not been added yet');
      newP.appendChild(newText);

      newDiv.classList.add('empty-iframe');
      newDiv.appendChild(newP);
      parent.appendChild(newDiv);

      setLoaded(false);
    }
  };

  const createIframe = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      createEmptyIframe();
    }, 1500);
  };

  useEffect(() => {
    createIframe();
  }, []);

  return (
    <div className='movie-wrapper' id='movie-wrapper'>
      {loading && (
        <div className='iframe-loading' src=''>
          <div id='load'>
            <div>G</div>
            <div>N</div>
            <div>I</div>
            <div>D</div>
            <div>A</div>
            <div>O</div>
            <div>L</div>
          </div>
        </div>
      )}
      {loaded && (
        <iframe
          id='movieIframe'
          style={loading ? { display: 'none' } : { display: 'block' }}
          src={
            season && episode
              ? 'https://vidsrc.me/embed/' +
                id +
                '/' +
                season +
                '-' +
                episode +
                '/'
              : 'https://vidsrc.me/embed/' + id
          }
          frameBorder='0'
          allowFullScreen
        />
      )}
    </div>
  );
}
