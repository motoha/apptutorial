
import Link from 'next/link';
import React from 'react';
import './index.css';
const TopProducts: React.FC = (props) => { 
    return (
        <>
            <div className='topSelling_box'>
                {/* <h3>{props.title}</h3> */}

                <div className='items d-flex align-items-center'>

                    <div className='img'>
                        <Link href={'/'}>
                            <img src='/images/1.jpg' className='w-100' />
                        </Link>
                    </div>


                    <div className='info px-3'>
                    <Link href={'/'}><h6>Nestle Original Coffee-Mate Coffee Creamer</h6></Link>
                        {/* <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly /> */}
                        <div className='d-flex align-items-center'>
                            <span className='price text-g font-weight-bold'>$28.85</span> <span className='oldPrice'>$32.8</span>
                        </div>
                    </div>
                </div>


                <div className='items d-flex align-items-center'>

                    <div className='img'>
                    <Link href={'/'}>
                            <img src='/images/1.jpg' className='w-100' />
                        </Link>
                    </div>


                    <div className='info px-3'>
                    <Link href={'/'}><h6>Nestle Original Coffee-Mate Coffee Creamer</h6></Link>
                        {/* <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly /> */}
                        <div className='d-flex align-items-center'>
                            <span className='price text-g font-weight-bold'>$28.85</span> <span className='oldPrice'>$32.8</span>
                        </div>
                    </div>
                </div>


                <div className='items d-flex align-items-center'>

                    <div className='img'>
                    <Link href={'/'}>
                            <img src='/images/1.jpg' className='w-100' />
                        </Link>
                    </div>


                    <div className='info px-3'>
                    <Link href={'/'}><h6>Nestle Original Coffee-Mate Coffee Creamer</h6></Link>
                        {/* <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly /> */}
                        <div className='d-flex align-items-center'>
                            <span className='price text-g font-weight-bold'>$28.85</span> <span className='oldPrice'>$32.8</span>
                        </div>
                    </div>
                </div>




            </div>
        </>
    )
}

export default TopProducts;