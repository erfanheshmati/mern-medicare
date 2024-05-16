import React, { useState } from 'react'
import { AiFillStar } from 'react-icons/ai'

export default function FeedbackFrom() {

    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)

    const [reviewText, setReviewText] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        // later we will use our api
    }

    return (
        <form>
            <h3 className='text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0'>
                <span className='text-red-500'>*</span> How would you rate the overall experience?
            </h3>
            <div>
                {[...Array(5).keys()].map((_, index) => {
                    index + 1
                    return (
                        <button
                            key={index}
                            type='button'
                            onClick={() => setRating(index)}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rating)}
                            onDoubleClick={() => { setHover(0); setRating(0) }}
                            className={`${index <= ((rating && hover) || hover) ?
                                "text-yellowColor" :
                                "text-gray-400"
                                } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                        >
                            <AiFillStar />
                        </button>
                    )
                })}
            </div>
            <div className='mt-[30px]'>
                <h3 className='text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0'>
                    <span className='text-red-500'>*</span> Share your feedback or suggestions.
                </h3>
                <textarea
                    rows={5}
                    placeholder='Write your message...'
                    className='border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md'
                    onChange={() => setReviewText(e.target.value)}
                    required
                />
            </div>
            <button type='submit' className='btn' onClick={handleSubmit}>
                Submit Feedback
            </button>
        </form >
    )
}
