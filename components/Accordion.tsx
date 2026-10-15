'use client'

import React from 'react';
import Image from 'next/image';

const CARD_CLASS =
    'card relative flex-1 h-[70vmin] cursor-pointer overflow-hidden transition-[flex] duration-700 ease-in-out';

// Collapsed cards sit at ~1/6 of the row, the expanded one at ~3/8.
const CARD_SIZES = '(max-width: 768px) 50vw, 40vw';

function Accordion() {
    const animation = (e: React.MouseEvent<HTMLDivElement>) => {
        document.querySelectorAll('.card').forEach(card => {
            card.classList.remove('animation')
        });
        e.currentTarget.classList.add('animation')
    };

    return (
        <div>
            <div className='flex w-full items-center justify-center'>Accordian Example</div>
            <div className='h-screen grid place-items-center'>
                <div className='flex w-full gap-[0.15rem] p-[0.15rem]'>
                    <div onClick={animation} className={CARD_CLASS}>
                        <Image
                            src="/ayomide.jpg"
                            alt="timi image"
                            fill
                            sizes={CARD_SIZES}
                            className='object-cover object-top'
                        />
                    </div>
                    <div onClick={animation} className={CARD_CLASS}>
                        <Image
                            src="/Timi.png"
                            alt="timi image"
                            fill
                            sizes={CARD_SIZES}
                            className='object-cover object-top'
                        />
                    </div>
                    <div onClick={animation} className={CARD_CLASS}>
                        <Image
                            src="/timi3.jpg"
                            alt="timi image"
                            fill
                            sizes={CARD_SIZES}
                            className='object-cover object-top'
                        />
                    </div>
                    <div onClick={animation} className={CARD_CLASS}>
                        <Image
                            src="/timi2.JPG"
                            alt="timi image"
                            fill
                            sizes={CARD_SIZES}
                            className='object-cover object-top'
                        />
                    </div>
                    <div onClick={animation} className={CARD_CLASS}>
                        <Image
                            src="/timi4.JPG"
                            alt="timi image"
                            fill
                            sizes={CARD_SIZES}
                            className='object-cover object-top'
                        />
                    </div>
                    <div onClick={animation} className={CARD_CLASS}>
                        <Image
                            src="/timi5.JPG"
                            alt="timi image"
                            fill
                            sizes={CARD_SIZES}
                            className='object-cover object-top'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Accordion;
