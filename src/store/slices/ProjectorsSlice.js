import { createSlice } from '@reduxjs/toolkit';

const camera1st = '/images/home/camera1st.webp';
const camera2nd = '/images/home/camera2nd.webp';
const astronaut1st = '/images/home/astronaut1st.webp';
const astronaut2nd = '/images/home/astronaut2nd.webp';
const bulb1st = '/images/home/bulb1st.webp';
const bulb2nd = '/images/home/bulb2nd.webp';
const galaxy1st = '/images/home/galaxy1st.webp';
const galaxy2nd = '/images/home/galaxy2nd.webp';
const gshape1st = '/images/home/gshape1st.webp';
const gshape2nd = '/images/home/gshape2nd.webp';
const lamp1st = '/images/home/lamp1st.webp';
const lamp2nd = '/images/home/lamp2nd.webp';
const panda1st = '/images/home/panda1st.webp';
const panda2nd = '/images/home/panda2nd.webp';
const robot1st = '/images/home/robot1st.webp';
const robot2nd = '/images/home/robot2nd.webp';
const ripple1st = '/images/home/ripple1st.webp';
const ripple2nd = '/images/home/ripple2nd.webp';

export const ProjectorsSlice = createSlice({
  name: 'projectors',
  initialState: [
    {
      image: camera1st,
      hoverImage: camera2nd,
      discount: '40% OFF',
      description:
        '4 Little-Known Tricks to Fully Utilize the Power of Your HY-320 4K Projector 🎥⬇',
      stars: 42,
      originalPrice: 45000,
      discountedPrice: 26999,
    },
    {
      image: robot1st,
      hoverImage: robot2nd,
      discount: '35% OFF',
      description: 'Stronaut Galaxy Projector',
      stars: 38,
      originalPrice: 52000,
      discountedPrice: 33800,
    },
    {
      image: galaxy1st,
      hoverImage: galaxy2nd,
      discount: '48% OFF',
      description: 'Lightyear Galaxy Ceiling Projector',
      stars: 54,
      originalPrice: 38000,
      discountedPrice: 19760,
    },
    {
      image: lamp1st,
      hoverImage: lamp2nd,
      discount: '22% OFF',
      description: 'Modern Night Light Projector',
      stars: 67,
      originalPrice: 28500,
      discountedPrice: 22230,
    },
    {
      image: panda1st,
      hoverImage: panda2nd,
      discount: '25% OFF',
      description: "Panda Design Children's Projector",
      stars: 59,
      originalPrice: 32000,
      discountedPrice: 24000,
    },
    {
      image: gshape1st,
      hoverImage: gshape2nd,
      discount: '18% OFF',
      description: 'Artistic Shape Projector Lamp',
      stars: 63,
      originalPrice: 47500,
      discountedPrice: 38950,
    },
    {
      image: bulb1st,
      hoverImage: bulb2nd,
      discount: '32% OFF',
      description: 'Minimalist Bulb Projector',
      stars: 71,
      originalPrice: 25000,
      discountedPrice: 17000,
    },
    {
      image: ripple1st,
      hoverImage: ripple2nd,
      discount: '15% OFF',
      description: 'Ripple Effect Projector Lamp',
      stars: 46,
      originalPrice: 34500,
      discountedPrice: 29325,
    },
    {
      image: astronaut1st,
      hoverImage: astronaut2nd,
      discount: '28% OFF',
      description: 'Astronaut Cosmic Projector',
      stars: 52,
      originalPrice: 42000,
      discountedPrice: 30240,
    },
  ],
});

export default ProjectorsSlice.reducer;
