import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import Cards from "./Cards";

const ChatRoom = (props) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // Load the tsparticles bundle to ensure full feature set is available
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      background: {
        color: "linear-gradient(to bottom, #000000, #1E2F40)", // Background color for the universe effect
      },
      fpsLimit: 60, // Limit FPS for performance
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse",
          },
          onClick: {
            enable: true,
            mode: "push",
          },
        },
        modes: {
          repulse: {
            distance: 100,
            duration: 0.4,
          },
          push: {
            quantity: 4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff", // Color of the particles
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "out",
          },
          speed: 0.8,
          random: true,
          straight: false,
          bounce: false,
        },
        number: {
          density: {
            enable: true,
            area: 800, // Adjust area for more or fewer particles
          },
          value: 500, // Number of particles
        },
        opacity: {
          value: { min: 0.3, max: 0.7 }, // Particle opacity range
        },
        shape: {
          type: "circle", // Shape of particles
        },
        size: {
          value: { min: 1, max: 3 }, // Size range of particles
        },
      },
      detectRetina: true,
    }),
    []
  );

  return( <div><div className="chatroom-container">
    <div className="nav">
      <button>Home</button>
      <button>Register</button>
      <button>Login</button>
    </div>
    <Particles id={props.id} init={particlesLoaded} options={options} />
    <div className="centered-text"><h1>Welcome to Comniverse</h1>
    <p className="typewriter">Spreading smiles through miles..</p></div>
    
  </div>
  <section className="card-section my-4">
          <Cards />
  </section>
  </div>) ;
};

export default ChatRoom;
