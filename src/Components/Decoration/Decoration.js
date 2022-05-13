// import './Decoration.scss';
import {useState} from 'react';

function Decoration ({ mood }) {

    // const [prompt, setPrompt] = useState('');

    const animations = ['slow', 'medium', 'fast']

    const dynamicSvgAnimation = (svgEl) => {
        const pathsList = svgEl.getElementsByClassName('svg-path');
        [... pathsList].forEach( path => {
            const randomAnimation = animations[Math.floor(Math.random * (animations.length - 1))];
            path.classList.add(randomAnimation);
        })
    };

    const testSvg =
            <svg
                width="34.677929mm"
                height="28.860201mm"
                viewBox="0 0 34.677929 28.860201"
                version="1.1"
                id="test-svg"
                xmlns="http://www.w3.org/2000/svg"
                // xmlns:svg="http://www.w3.org/2000/svg"
            >
                <defs
                    id="defs2220" />
                <g
                    id="layer1"
                    transform="translate(-4.6007779,-4.8965933)">
                    <path
                    className='svg-path'
                    id="path2306"
                    style="fill:none;fill-opacity:0.192157;stroke:#000000;stroke-width:0.264583;stroke-linejoin:round"
                    d="m 30.173306,14.790837 a 7.2968125,7.2968125 0 0 1 -7.296813,7.296813 7.2968125,7.2968125 0 0 1 -7.296812,-7.296813 7.2968125,7.2968125 0 0 1 7.296812,-7.2968122 7.2968125,7.2968125 0 0 1 7.296813,7.2968122 z" />
                    <path
                    className='svg-path'
                    id="path2306-3"
                    style="fill:none;fill-opacity:0.192157;stroke:#000000;stroke-width:0.15387;stroke-linejoin:round"
                    d="M 12.874083,10.45219 A 4.0981851,4.3940015 0 0 1 8.775898,14.846192 4.0981851,4.3940015 0 0 1 4.6777129,10.45219 4.0981851,4.3940015 0 0 1 8.775898,6.0581889 4.0981851,4.3940015 0 0 1 12.874083,10.45219 Z" />
                    <path
                    className='svg-path'
                    id="path2306-3-1"
                    style="fill:none;fill-opacity:0.192157;stroke:#000000;stroke-width:0.113576;stroke-linejoin:round"
                    d="m 14.964947,21.397411 a 3.1322761,3.1322758 0 0 1 -3.132276,3.132276 3.1322761,3.1322758 0 0 1 -3.1322759,-3.132276 3.1322761,3.1322758 0 0 1 3.1322759,-3.132275 3.1322761,3.1322758 0 0 1 3.132276,3.132275 z" />
                    <path
                    className='svg-path'
                    id="path2306-3-1-5"
                    style="fill:none;fill-opacity:0.192157;stroke:#000000;stroke-width:0.0696565;stroke-linejoin:round"
                    d="M 10.451049,31.159363 A 1.8723633,1.9709686 0 0 1 8.5786858,33.130331 1.8723633,1.9709686 0 0 1 6.7063224,31.159363 1.8723633,1.9709686 0 0 1 8.5786858,29.188394 1.8723633,1.9709686 0 0 1 10.451049,31.159363 Z" />
                    <path
                    className='svg-path'
                    id="path2306-3-1-9"
                    style="fill:none;fill-opacity:0.192157;stroke:#000000;stroke-width:0.113576;stroke-linejoin:round"
                    d="M 39.221918,8.0856571 A 3.1322761,3.1322758 0 0 1 36.089642,11.217933 3.1322761,3.1322758 0 0 1 32.957366,8.0856571 3.1322761,3.1322758 0 0 1 36.089642,4.9533813 3.1322761,3.1322758 0 0 1 39.221918,8.0856571 Z" />
                    <path
                    className='svg-path'
                    id="path2306-3-1-96"
                    style="fill:none;fill-opacity:0.192157;stroke:#000000;stroke-width:0.157224;stroke-linejoin:round"
                    d="m 25.000893,29.088646 a 4.096508,4.5895357 0 0 1 -4.096508,4.589536 4.096508,4.5895357 0 0 1 -4.096508,-4.589536 4.096508,4.5895357 0 0 1 4.096508,-4.589536 4.096508,4.5895357 0 0 1 4.096508,4.589536 z" />
                    <path
                    className='svg-path'
                    id="path2306-3-1-5-1"
                    style="fill:none;fill-opacity:0.192157;stroke:#000000;stroke-width:0.0696565;stroke-linejoin:round"
                    d="m 36.384315,18.932272 a 1.8723633,1.9709686 0 0 1 -1.872364,1.970969 1.8723633,1.9709686 0 0 1 -1.872363,-1.970969 1.8723633,1.9709686 0 0 1 1.872363,-1.970969 1.8723633,1.9709686 0 0 1 1.872364,1.970969 z" />
                </g>
            </svg>


    dynamicSvgAnimation(testSvg)    

    return (
        <section className="decoration">

        </section>
    );
};

export default Decoration;