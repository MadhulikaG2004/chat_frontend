import React from 'react';


const Cards = () => {
  return (
    <div className='flex flex-wrap justify-center'>
    <div className="max-w-sm rounded overflow-hidden shadow-lg card m-5">
      <div className="px-6 py-4">
        <img src="/images/private.png" alt="private" loading="lazy" ></img>
        <div className="text-xl mb-2">Keep it private and simple.</div>
        
      </div>
      
    </div>
    <div className="max-w-sm rounded overflow-hidden shadow-lg card m-5">
    <div className="px-6 py-4">
    <img src="/images/team.png" alt="connect" loading="lazy" ></img>
      <div className="text-xl mb-2">Connect with yours friends and collaborate with your teams.</div>
      
    </div>
    
  </div>
  <div className="max-w-sm rounded overflow-hidden shadow-lg card m-5">
  <div className="px-6 py-4">
  <img src="/images/moment.png" alt="share" loading="lazy" ></img>
    <div className="text-xl mb-2">Share every moment!</div>
    
  </div>
  
</div>
</div>
  );
};

export default Cards;
