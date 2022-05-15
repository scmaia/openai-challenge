import './Decoration.scss';
import {useState} from 'react';

interface IDecorationProps {
    mood:string
}

const Decoration:React.FC<IDecorationProps> = ({ mood }) => {

    // const [prompt, setPrompt] = useState('');

    const animations = ['slow', 'medium', 'fast'];

    // const dynamicSvgAnimation = (svgEl) => {
    //     const pathsList = svgEl.getElementsByClassName('svg-path');
    //     [... pathsList].forEach( path => {
    //         const randomAnimation = animations[Math.floor(Math.random() * (animations.length - 1))];
    //         path.classList.add(randomAnimation);
    //     })
    // };

    const testSvg =
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="131.066"
      height="109.078"
      version="1.1"
      viewBox="0 0 34.678 28.86"
    >
      <g
        fill="none"
        fillOpacity="0.192"
        stroke="#000"
        strokeLinejoin="round"
        transform="translate(-4.6 -4.897)"
      >
        <path
          strokeWidth="0.265"
          d="M30.173 14.79a7.297 7.297 0 01-7.297 7.298 7.297 7.297 0 01-7.296-7.297 7.297 7.297 0 017.296-7.297 7.297 7.297 0 017.297 7.297z"
        ></path>
        <path
          strokeWidth="0.154"
          d="M12.874 10.452a4.098 4.394 0 01-4.098 4.394 4.098 4.394 0 01-4.098-4.394 4.098 4.394 0 014.098-4.394 4.098 4.394 0 014.098 4.394z"
        ></path>
        <path
          strokeWidth="0.114"
          d="M14.965 21.397a3.132 3.132 0 01-3.132 3.133A3.132 3.132 0 018.7 21.397a3.132 3.132 0 013.133-3.132 3.132 3.132 0 013.132 3.132z"
        ></path>
        <path
          strokeWidth="0.07"
          d="M10.451 31.16a1.872 1.971 0 01-1.872 1.97 1.872 1.971 0 01-1.873-1.97 1.872 1.971 0 011.873-1.972 1.872 1.971 0 011.872 1.971z"
        ></path>
        <path
          strokeWidth="0.114"
          d="M39.222 8.086a3.132 3.132 0 01-3.132 3.132 3.132 3.132 0 01-3.133-3.132 3.132 3.132 0 013.133-3.133 3.132 3.132 0 013.132 3.133z"
        ></path>
        <path
          strokeWidth="0.157"
          d="M25 29.089a4.097 4.59 0 01-4.096 4.59 4.097 4.59 0 01-4.096-4.59 4.097 4.59 0 014.096-4.59 4.097 4.59 0 014.097 4.59z"
        ></path>
        <path
          strokeWidth="0.07"
          d="M36.384 18.932a1.872 1.971 0 01-1.872 1.971 1.872 1.971 0 01-1.872-1.97 1.872 1.971 0 011.872-1.972 1.872 1.971 0 011.872 1.971z"
        ></path>
      </g>
    </svg>


    // dynamicSvgAnimation(testSvg)    

    return (
        <section className="decoration">
          {testSvg}
        </section>
    );
};

export default Decoration;