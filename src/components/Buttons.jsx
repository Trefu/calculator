export const Buttons = (props) => {
    return (
        <div className="grid grid-cols-4 gap-px text-center text-blue-200 bg-blue-300 ">

            <button className='bg-blue-700 py-4 col-span-2'>AC</button>
            <button className='bg-blue-500 py-4 '>/</button>
            <button className='bg-blue-500 py-4 ' >X</button>
            <button className='bg-blue-500 py-4'>7</button>
            <button className='bg-blue-500 py-4 '>8</button>
            <button className='bg-blue-500 py-4 ' >9</button>
            <button className='bg-blue-500 py-4'>-</button>
            <button className='bg-blue-500 py-4 '>4</button>
            <button className='bg-blue-500 py-4 ' >5</button>
            <button className='bg-blue-500 py-4'>6</button>
            <button className='bg-blue-500 py-4 '>+</button>
            <button className='bg-blue-500 py-4 ' >1</button>
            <button className='bg-blue-500 py-4 ' >2</button>
            <button className='bg-blue-500 py-4 ' >3</button>
            <button className='bg-blue-700 py-4 row-span-2 flex flex-col justify-center' >=</button>
            <button className='bg-blue-500 py-4 col-span-2' >0</button>
            <button className='bg-blue-500 py-4 ' >.</button>

        </div>
    )
}

export default Buttons