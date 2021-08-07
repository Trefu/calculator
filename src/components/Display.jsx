export const Display = (props) => {
    const { input } = props
    return (
        <div className="flex justify-end">
            <span id='display' className='text-right text-4xl mb-2'>{input}</span>
        </div>
    )
}

export default Display